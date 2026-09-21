#!/usr/bin/env node
import assert from "node:assert/strict";
import { assertVerifiedProvenance } from "./npm-provenance.mjs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const repository = "manifest-network/manifestjs";
export const workflow = ".github/workflows/release.yaml";
export const targets = {
  lcd: { name: "@manifest-network/lcd", directory: "vendor/lcd" },
  manifestjs: { name: "@manifest-network/manifestjs", directory: "." },
};
const root = fileURLToPath(new URL("../", import.meta.url));
const registry = "https://registry.npmjs.org/";
const json = (path) => JSON.parse(readFileSync(path, "utf8"));

export function assertReleaseContext(context) {
  assert.equal(
    context.eventName,
    "workflow_dispatch",
    "Publication requires a manual workflow dispatch"
  );
  assert.equal(context.ref, "refs/heads/main", "Publication requires main");
  assert.equal(context.repository, repository, "Wrong publication repository");
  assert.match(
    context.requestedSha ?? "",
    /^[a-f0-9]{40}$/,
    "Expected a full reviewed commit SHA"
  );
  assert.equal(
    context.sha,
    context.requestedSha,
    "Dispatch SHA must equal the reviewed SHA"
  );
  assert.equal(
    context.head,
    context.sha,
    "Checkout must equal the workflow SHA used by npm provenance"
  );
}

export function assertPackedManifest(manifest, target, version, expected) {
  assert.ok(Object.hasOwn(targets, target), "Unsupported package target");
  assert.match(
    version ?? "",
    /^\d+\.\d+\.\d+(?:-[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*)?$/,
    "Expected an exact version"
  );
  assert.equal(manifest.name, targets[target].name, "Unexpected package name");
  assert.equal(manifest.version, version, "Unexpected package version");
  assert.equal(
    manifest.repository?.url,
    `git+https://github.com/${repository}.git`,
    "Wrong source repository"
  );
  assert.equal(
    manifest.repository?.directory,
    targets[target].directory,
    "Wrong source directory"
  );
  assert.notEqual(manifest.private, true, "Package must be public");
  assert.equal(
    expected.version,
    version,
    "Source version must match requested version"
  );
  assert.equal(manifest.publishConfig?.access, "public");
  assert.equal(
    manifest.publishConfig?.registry?.replace(/\/$/, ""),
    registry.slice(0, -1)
  );
  assert.notEqual(
    manifest.publishConfig?.provenance,
    false,
    "Provenance cannot be disabled"
  );
  assert.equal(
    manifest.peerDependencies,
    undefined,
    "Unexpected peer dependencies"
  );
  assert.equal(
    manifest.overrides,
    undefined,
    "Dependency repair must be in published declarations"
  );
  assert.equal(
    manifest.bundleDependencies,
    undefined,
    "Bundled dependencies are not reviewed"
  );
  assert.equal(
    manifest.bundledDependencies,
    undefined,
    "Bundled dependencies are not reviewed"
  );
  assert.deepEqual(
    manifest.dependencies,
    expected.dependencies,
    "Packed dependencies differ from reviewed source"
  );
  for (const dependency of Object.values(manifest.dependencies ?? {})) {
    assert.ok(
      !/^(?:file:|workspace:|https?:|git)/.test(dependency),
      "Non-registry production dependency"
    );
  }
}

function run(command, args, cwd = root, capture = false) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
    timeout: 600_000,
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  assert.equal(
    result.status,
    0,
    `${command} ${args.join(" ")} failed\n${capture ? result.stderr : ""}`
  );
  return result.stdout;
}

function expectedManifest(target) {
  assert.ok(Object.hasOwn(targets, target), "Unsupported package target");
  const manifest = json(join(root, targets[target].directory, "package.json"));
  return manifest;
}

export function validateArtifact(output, target, version, sha) {
  const summary = json(join(output, "release.json"));
  assert.equal(summary.target, target);
  assert.equal(summary.sha, sha, "Artifact was built from a different commit");
  assert.equal(
    basename(summary.filename),
    summary.filename,
    "Artifact path must be a filename"
  );
  assert.ok(summary.filename.endsWith(".tgz"));
  const artifact = join(output, summary.filename);
  const integrity = `sha512-${createHash("sha512")
    .update(readFileSync(artifact))
    .digest("base64")}`;
  assert.equal(
    integrity,
    summary.integrity,
    "Packed artifact integrity changed"
  );
  const manifest = JSON.parse(
    run("tar", ["-xOf", artifact, "package/package.json"], root, true)
  );
  assertPackedManifest(manifest, target, version, expectedManifest(target));
  return {
    ...summary,
    artifact,
    name: manifest.name,
    version: manifest.version,
    integrity,
  };
}

async function main() {
  const [command, target, outputArgument, version, sha] = process.argv.slice(2);
  if (command === "guard") {
    assertReleaseContext({
      eventName: process.env.GITHUB_EVENT_NAME,
      ref: process.env.GITHUB_REF,
      repository: process.env.GITHUB_REPOSITORY,
      sha: process.env.GITHUB_SHA,
      requestedSha: process.env.RELEASE_SHA,
      head: run("git", ["rev-parse", "HEAD"], root, true).trim(),
    });
    const manifest = expectedManifest(process.env.RELEASE_TARGET);
    assertPackedManifest(
      manifest,
      process.env.RELEASE_TARGET,
      process.env.RELEASE_VERSION,
      manifest
    );
    return;
  }
  assert.ok(Object.hasOwn(targets, target), "Unsupported package target");
  assert.ok(outputArgument, "Missing artifact directory");
  const output = resolve(outputArgument);
  if (command === "build") {
    run(process.execPath, ["scripts/build-release.mjs", target, output]);
    const manifest = expectedManifest(target);
    validateArtifact(
      output,
      target,
      manifest.version,
      run("git", ["rev-parse", "HEAD"], root, true).trim()
    );
    return;
  }
  const artifact = validateArtifact(output, target, version, sha);
  if (command === "validate") return;
  if (command === "publish") {
    assert.equal(
      run("npm", ["--version"], root, true).trim(),
      "11.19.1",
      "Use the pinned npm CLI"
    );
    // Token authentication is deliberately unavailable in this workflow.
    assert.ok(
      process.env.ACTIONS_ID_TOKEN_REQUEST_URL &&
        process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN,
      "GitHub OIDC authentication is required"
    );
    for (const name of ["NODE_AUTH_TOKEN", "NPM_TOKEN", "NPM_AUTH_TOKEN"]) {
      assert.ok(!process.env[name], `Token fallback is forbidden: ${name}`);
    }
    await mainGuard();
    assert.equal(target, process.env.RELEASE_TARGET);
    assert.equal(version, process.env.RELEASE_VERSION);
    assert.equal(sha, process.env.GITHUB_SHA);
    // Never republish an existing version, including an unattested manual release.
    const existing = await fetch(
      `${registry}${encodeURIComponent(artifact.name)}/${artifact.version}`,
      { signal: AbortSignal.timeout(30_000) }
    );
    assert.equal(
      existing.status,
      404,
      "Version already exists, or registry could not verify availability"
    );
    run("npm", [
      "publish",
      artifact.artifact,
      "--ignore-scripts",
      "--access=public",
      "--tag=latest",
      "--provenance",
      `--registry=${registry}`,
    ]);
    return;
  }
  assert.equal(command, "verify", "Unknown release command");
  assert.equal(
    run("npm", ["--version"], root, true).trim(),
    "11.19.1",
    "Use the pinned, patched npm verifier"
  );

  const consumer = mkdtempSync(join(tmpdir(), "manifest-signatures-"));
  writeFileSync(
    join(consumer, "package.json"),
    JSON.stringify({
      name: "manifest-release-verification",
      version: "1.0.0",
      private: true,
    })
  );
  run(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--audit=false",
      "--fund=false",
      "--save-exact",
      `${artifact.name}@${artifact.version}`,
      `--registry=${registry}`,
    ],
    consumer
  );
  // Decoding a payload does not verify its signature. npm verifies the registry
  // signatures and Sigstore provenance before this job accepts publication.
  let audit;
  for (let attempt = 0; attempt < 12; attempt++) {
    try {
      audit = JSON.parse(
        run(
          "npm",
          [
            "audit",
            "signatures",
            "--json",
            "--include-attestations",
            `--registry=${registry}`,
          ],
          consumer,
          true
        )
      );
      assertVerifiedProvenance(audit, {
        ...artifact,
        repository,
        workflow,
        ref: "refs/heads/main",
      });
      break;
    } catch (error) {
      if (attempt === 11) throw error;
      await new Promise((resolveWait) => setTimeout(resolveWait, 3000));
    }
  }
  const installed = json(join(consumer, "package-lock.json")).packages[
    `node_modules/${artifact.name}`
  ];
  assert.equal(
    installed?.integrity,
    artifact.integrity,
    "Installed registry artifact differs from the tested tarball"
  );
  writeFileSync(
    join(output, "verified-publication.json"),
    `${JSON.stringify({ ...artifact, audit }, null, 2)}\n`
  );
}

async function mainGuard() {
  assertReleaseContext({
    eventName: process.env.GITHUB_EVENT_NAME,
    ref: process.env.GITHUB_REF,
    repository: process.env.GITHUB_REPOSITORY,
    sha: process.env.GITHUB_SHA,
    requestedSha: process.env.RELEASE_SHA,
    head: run("git", ["rev-parse", "HEAD"], root, true).trim(),
  });
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await main();
