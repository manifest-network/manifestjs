import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  assertPackedManifest,
  assertReleaseContext,
  repository,
  verifyPublishedArtifact,
  workflow,
} from "./release.mjs";

import {
  assertProvenanceCertificate,
  assertProvenanceStatement,
  assertVerifiedProvenance,
} from "./npm-provenance.mjs";

const sha = "a".repeat(40);
const context = {
  eventName: "workflow_dispatch",
  ref: "refs/heads/main",
  repository,
  sha,
  requestedSha: sha,
  head: sha,
};
test("publication requires the reviewed dispatch and checkout to describe one main commit", () => {
  assertReleaseContext(context);
  for (const changed of [
    { eventName: "pull_request" },
    { eventName: "push" },
    { ref: "refs/heads/feature" },
    { repository: "attacker/cosmjs" },
    { requestedSha: "main" },
    { requestedSha: "b".repeat(40) },
    { head: "c".repeat(40) },
  ])
    assert.throws(() => assertReleaseContext({ ...context, ...changed }));
});

const manifest = JSON.parse(
  readFileSync(new URL("../vendor/lcd/package.json", import.meta.url))
);
test("tarball allowlist rejects package, dependency, and version substitution", () => {
  assertPackedManifest(manifest, "lcd", manifest.version, manifest);
  for (const changed of [
    { name: "@cosmjs/crypto" },
    { version: "0.0.1" },
    { private: true },
    {
      repository: {
        ...manifest.repository,
        url: "git+https://github.com/cosmos/ics23.git",
      },
    },
    { repository: { ...manifest.repository, directory: "packages/crypto" } },
    { dependencies: { ...manifest.dependencies, axios: "^1.8.2" } },
    {
      publishConfig: {
        ...manifest.publishConfig,
        registry: "https://attacker.example",
      },
    },
    { publishConfig: { ...manifest.publishConfig, provenance: false } },
    { overrides: { protobufjs: "7.6.6" } },
    { bundledDependencies: ["protobufjs"] },
  ])
    assert.throws(() =>
      assertPackedManifest(
        { ...manifest, ...changed },
        "lcd",
        manifest.version,
        manifest
      )
    );
  assert.throws(() =>
    assertPackedManifest(manifest, "crypto", manifest.version, manifest)
  );
  assert.throws(() =>
    assertPackedManifest(manifest, "lcd", "latest", manifest)
  );
});

const expected = {
  repository,
  workflow,
  ref: "refs/heads/main",
  name: manifest.name,
  version: manifest.version,
  sha,
  integrity: `sha512-${Buffer.alloc(64, 1).toString("base64")}`,
};
test("policy accepts the real SDK 0.22.0 provenance statement", () => {
  // Retrieved from public npm; source SHA independently matches GitHub's v0.22.0
  // annotated tag. The online validation also ran npm audit signatures; this
  // offline fixture checks schema compatibility, not cryptographic authenticity.
  const fixture = JSON.parse(
    readFileSync(
      new URL("./fixtures/sdk-0.22.0-provenance.json", import.meta.url)
    )
  );
  assertProvenanceStatement(fixture.statement, fixture.expected);
  assertVerifiedProvenance(
    { invalid: [], missing: [], verified: [fixture.verified] },
    fixture.expected
  );
});

test("verified provenance requires the target's actual attestation and rejects policy substitutions", () => {
  const fixture = JSON.parse(
    readFileSync(
      new URL("./fixtures/sdk-0.22.0-provenance.json", import.meta.url)
    )
  );
  const audit = { invalid: [], missing: [], verified: [fixture.verified] };
  assert.throws(() =>
    assertVerifiedProvenance({ ...audit, invalid: [{}] }, fixture.expected)
  );
  assert.throws(() =>
    assertVerifiedProvenance({ ...audit, missing: [{}] }, fixture.expected)
  );
  assert.throws(() =>
    assertVerifiedProvenance({ ...audit, verified: [] }, fixture.expected)
  );
  assert.throws(() =>
    assertVerifiedProvenance(
      { ...audit, verified: [{ ...fixture.verified, attestationBundles: [] }] },
      fixture.expected
    )
  );
  assert.throws(
    () =>
      assertVerifiedProvenance(audit, {
        ...fixture.expected,
        sha: "b".repeat(40),
      }),
    /Fulcio identity extension/
  );
  assert.throws(
    () =>
      assertVerifiedProvenance(audit, {
        ...fixture.expected,
        repository: "attacker/repo",
      }),
    /signing certificate/
  );
  assert.throws(
    () =>
      assertVerifiedProvenance(audit, {
        ...fixture.expected,
        integrity: expected.integrity,
      }),
    /exact packed artifact/
  );
});

test("certificate identity parser rejects malformed or ambiguous extensions", () => {
  const fixture = JSON.parse(
    readFileSync(
      new URL("./fixtures/sdk-0.22.0-provenance.json", import.meta.url)
    )
  );
  const raw = Buffer.from(
    fixture.verified.attestationBundles[0].bundle.verificationMaterial
      .certificate.rawBytes,
    "base64"
  );
  function changeOid(from, to) {
    const changed = Buffer.from(raw);
    const needle = Buffer.from(`2b0601040183bf3001${from}`, "hex");
    const offset = changed.indexOf(needle);
    assert.ok(offset >= 0);
    changed[offset + needle.length - 1] = Number.parseInt(to, 16);
    return changed.toString("base64");
  }
  assert.throws(
    () => assertProvenanceCertificate(changeOid("0d", "1d"), fixture.expected),
    /Missing Fulcio/
  );
  assert.throws(
    () => assertProvenanceCertificate(changeOid("0e", "0d"), fixture.expected),
    /Duplicate certificate extension/
  );
  assert.throws(() =>
    assertProvenanceCertificate(
      raw.subarray(0, raw.length - 1).toString("base64"),
      fixture.expected
    )
  );
  const badLength = Buffer.from(raw);
  badLength[1] = 0x80;
  assert.throws(() =>
    assertProvenanceCertificate(badLength.toString("base64"), fixture.expected)
  );
});
function statement() {
  return {
    _type: "https://in-toto.io/Statement/v1",
    predicateType: "https://slsa.dev/provenance/v1",
    subject: [
      {
        name: `pkg:npm/%40manifest-network/lcd@${manifest.version}`,
        digest: { sha512: Buffer.alloc(64, 1).toString("hex") },
      },
    ],
    predicate: {
      buildDefinition: {
        buildType:
          "https://slsa-framework.github.io/github-actions-buildtypes/workflow/v1",
        externalParameters: {
          workflow: {
            repository: `https://github.com/${repository}`,
            path: workflow,
            ref: "refs/heads/main",
          },
        },
        resolvedDependencies: [
          {
            uri: `git+https://github.com/${repository}@refs/heads/main`,
            digest: { gitCommit: sha },
          },
        ],
      },
      runDetails: {
        builder: { id: "https://github.com/actions/runner/github-hosted" },
      },
    },
  };
}
test("provenance policy rejects wrong artifact, source, workflow, and builder", () => {
  assertProvenanceStatement(statement(), expected);
  for (const mutate of [
    (value) => {
      value.subject[0].digest.sha512 = "0".repeat(128);
    },
    (value) => {
      value.subject[0].name = "pkg:npm/%40manifest-network/lcd@0.0.0";
    },
    (value) => {
      value.predicate.buildDefinition.externalParameters.workflow.path =
        ".github/workflows/other.yml";
    },
    (value) => {
      value.predicate.buildDefinition.externalParameters.workflow.ref =
        "refs/heads/feature";
    },
    (value) => {
      value.predicate.buildDefinition.externalParameters.workflow.repository =
        "https://github.com/attacker/cosmjs";
    },
    (value) => {
      value.predicate.buildDefinition.resolvedDependencies[0].digest.gitCommit =
        "b".repeat(40);
    },
    (value) => {
      value.predicate.buildDefinition.resolvedDependencies = [];
    },
    (value) => {
      value.predicate.runDetails.builder.id = "self-hosted";
    },
  ]) {
    const value = statement();
    mutate(value);
    assert.throws(() => assertProvenanceStatement(value, expected));
  }
});

test("post-publication verification recovers from unavailable versions and delayed attestations", async (t) => {
  const fixture = JSON.parse(
    readFileSync(
      new URL("./fixtures/sdk-0.22.0-provenance.json", import.meta.url)
    )
  );
  const consumer = mkdtempSync(join(tmpdir(), "manifest-verification-retry-"));
  t.after(() => rmSync(consumer, { recursive: true, force: true }));
  const calls = [];
  let installs = 0;
  let audits = 0;
  let waits = 0;
  const verifiedAudit = {
    invalid: [],
    missing: [],
    verified: [fixture.verified],
  };
  const audit = await verifyPublishedArtifact(fixture.expected, consumer, {
    attempts: 3,
    wait: async () => {
      waits++;
    },
    execute(command, args, directory, capture) {
      assert.equal(command, "npm");
      assert.equal(directory, consumer);
      calls.push(args[0]);
      if (args[0] === "install") {
        assert.ok(args.includes("--ignore-scripts"));
        assert.ok(args.includes("--prefer-online"));
        assert.ok(
          args.includes(`${fixture.expected.name}@${fixture.expected.version}`)
        );
        if (++installs === 1)
          throw new Error("E404: new version not visible yet");
        writeFileSync(
          join(consumer, "package-lock.json"),
          JSON.stringify({
            packages: {
              [`node_modules/${fixture.expected.name}`]: {
                integrity: fixture.expected.integrity,
              },
            },
          })
        );
        return;
      }
      assert.deepEqual(args, [
        "audit",
        "signatures",
        "--json",
        "--include-attestations",
        "--prefer-online",
        "--registry=https://registry.npmjs.org/",
      ]);
      assert.equal(capture, true);
      if (++audits === 1)
        return JSON.stringify({
          ...verifiedAudit,
          verified: [{ ...fixture.verified, attestationBundles: [] }],
        });
      return JSON.stringify(verifiedAudit);
    },
  });
  assert.deepEqual(audit, verifiedAudit);
  assert.deepEqual(calls, ["install", "install", "audit", "install", "audit"]);
  assert.equal(waits, 2);
});

test("post-publication verification exhausts installation retries without publishing", async () => {
  let installs = 0;
  let waits = 0;
  const failure = new Error("E404: version remains unavailable");
  await assert.rejects(
    verifyPublishedArtifact(expected, "/unused", {
      attempts: 3,
      wait: async () => {
        waits++;
      },
      execute(command, args) {
        assert.equal(command, "npm");
        assert.equal(args[0], "install");
        installs++;
        throw failure;
      },
    }),
    (error) => error === failure
  );
  assert.equal(installs, 3);
  assert.equal(waits, 2);
});

test("retrying publication verification never accepts a wrong artifact or source identity", async (t) => {
  const fixture = JSON.parse(
    readFileSync(
      new URL("./fixtures/sdk-0.22.0-provenance.json", import.meta.url)
    )
  );
  const consumer = mkdtempSync(join(tmpdir(), "manifest-verification-policy-"));
  t.after(() => rmSync(consumer, { recursive: true, force: true }));
  for (const [integrity, identity, message] of [
    [expected.integrity, fixture.expected, /differs from the tested tarball/],
    [
      fixture.expected.integrity,
      { ...fixture.expected, sha: "b".repeat(40) },
      /Fulcio identity extension/,
    ],
  ]) {
    let installs = 0;
    let waits = 0;
    await assert.rejects(
      verifyPublishedArtifact(identity, consumer, {
        attempts: 2,
        wait: async () => {
          waits++;
        },
        execute(command, args) {
          assert.equal(command, "npm");
          if (args[0] === "install") {
            installs++;
            writeFileSync(
              join(consumer, "package-lock.json"),
              JSON.stringify({
                packages: { [`node_modules/${identity.name}`]: { integrity } },
              })
            );
            return;
          }
          assert.equal(args[0], "audit");
          return JSON.stringify({
            invalid: [],
            missing: [],
            verified: [fixture.verified],
          });
        },
      }),
      message
    );
    assert.equal(installs, 2);
    assert.equal(waits, 1);
  }
});

test("publication CLI rejects a latest rollback and passes the approved legacy tag to npm", (t) => {
  const checkout = fileURLToPath(new URL("../", import.meta.url));
  const head = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: checkout,
    encoding: "utf8",
  }).stdout.trim();
  const directory = mkdtempSync(join(tmpdir(), "manifest-publish-policy-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const stage = join(directory, "stage");
  const output = join(directory, "release");
  const bin = join(directory, "bin");
  mkdirSync(join(stage, "package"), { recursive: true });
  mkdirSync(output);
  mkdirSync(bin);
  writeFileSync(join(stage, "package/package.json"), JSON.stringify(manifest));
  const filename = "fixture.tgz";
  const artifact = join(output, filename);
  const packed = spawnSync("tar", ["-czf", artifact, "-C", stage, "package"], {
    encoding: "utf8",
  });
  assert.equal(packed.status, 0, packed.stderr);
  writeFileSync(
    join(output, "release.json"),
    JSON.stringify({
      target: "lcd",
      filename,
      sha: head,
      integrity: `sha512-${createHash("sha512")
        .update(readFileSync(artifact))
        .digest("base64")}`,
    })
  );
  const npmLog = join(directory, "npm-publish.json");
  const npm = join(bin, "npm");
  writeFileSync(
    npm,
    `#!${process.execPath}
const { writeFileSync } = require("node:fs");
const args = process.argv.slice(2);
if (args[0] === "--version") console.log("11.19.1");
else if (args[0] === "publish") writeFileSync(process.env.MANIFEST_TEST_NPM_LOG, JSON.stringify(args));
else process.exit(1);
`
  );
  chmodSync(npm, 0o755);
  const preload = join(directory, "registry.mjs");
  writeFileSync(
    preload,
    `const endpoint = "https://registry.npmjs.org/" + encodeURIComponent(process.env.MANIFEST_TEST_PACKAGE);
globalThis.fetch = async (url) => {
  if (url === endpoint + "/latest") return {
    status: 200,
    json: async () => ({ name: process.env.MANIFEST_TEST_PACKAGE, version: process.env.MANIFEST_TEST_LATEST }),
  };
  if (url === endpoint + "/" + process.env.RELEASE_VERSION) return { status: 404 };
  throw new Error("Unexpected registry request: " + url);
};
`
  );
  const env = {
    ...process.env,
    PATH: `${bin}:${process.env.PATH}`,
    GITHUB_EVENT_NAME: "workflow_dispatch",
    GITHUB_REF: "refs/heads/main",
    GITHUB_REPOSITORY: repository,
    GITHUB_SHA: head,
    RELEASE_SHA: head,
    RELEASE_TARGET: "lcd",
    RELEASE_VERSION: manifest.version,
    ACTIONS_ID_TOKEN_REQUEST_URL: "https://example.invalid/oidc",
    ACTIONS_ID_TOKEN_REQUEST_TOKEN: "fixture-only",
    NODE_AUTH_TOKEN: "",
    NPM_TOKEN: "",
    NPM_AUTH_TOKEN: "",
    MANIFEST_TEST_PACKAGE: manifest.name,
    MANIFEST_TEST_LATEST: `${Number(manifest.version.split(".")[0]) + 1}.0.0`,
    MANIFEST_TEST_NPM_LOG: npmLog,
  };
  for (const tag of ["latest", "legacy"]) {
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        preload,
        "scripts/release.mjs",
        "publish",
        "lcd",
        output,
        manifest.version,
        head,
      ],
      {
        cwd: checkout,
        env: { ...env, RELEASE_TAG: tag },
        encoding: "utf8",
        timeout: 10_000,
      }
    );
    if (tag === "latest") {
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /Cannot move latest backward/);
      assert.equal(existsSync(npmLog), false);
    } else {
      assert.equal(result.status, 0, result.stderr);
      const args = JSON.parse(readFileSync(npmLog, "utf8"));
      assert.equal(args[0], "publish");
      assert.equal(args[1], artifact);
      assert.ok(args.includes("--tag=legacy"));
      assert.ok(args.includes("--provenance"));
      assert.ok(args.includes("--ignore-scripts"));
    }
  }
});
