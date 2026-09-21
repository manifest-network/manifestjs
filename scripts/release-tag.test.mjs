import assert from "node:assert/strict";
import { test } from "node:test";
import { assertReleaseTag, checkReleaseTag } from "./release-tag.mjs";

const name = "@manifest-network/manifestjs";
const input = { name, version: "4.0.0", tag: "latest" };

test("either supported release order preserves the repaired default line", () => {
  // Compatibility correction first, then the repaired major release.
  assert.equal(
    assertReleaseTag({
      version: "3.0.2",
      tag: "latest",
      latestVersion: "3.0.1",
    }),
    "latest"
  );
  assert.equal(
    assertReleaseTag({
      version: "4.0.0",
      tag: "latest",
      latestVersion: "3.0.2",
    }),
    "latest"
  );
  // Repaired major first, then the older compatibility line without rollback.
  assert.equal(
    assertReleaseTag({
      version: "4.0.0",
      tag: "latest",
      latestVersion: "3.0.1",
    }),
    "latest"
  );
  assert.equal(
    assertReleaseTag({
      version: "3.0.2",
      tag: "legacy",
      latestVersion: "4.0.0",
    }),
    "legacy"
  );
});

test("latest rejects rollback and prereleases, comparing version cores numerically", () => {
  for (const [version, latestVersion] of [
    ["3.0.2", "4.0.0"],
    ["4.1.9", "4.2.0"],
    ["4.2.9", "4.2.10"],
    ["4.0.0-rc.1", "3.0.1"],
    ["4.0.0-rc.1", null],
    ["4.0.0", "4.1.0-rc.1"],
  ]) {
    assert.throws(() =>
      assertReleaseTag({ version, tag: "latest", latestVersion })
    );
  }
  for (const [version, latestVersion] of [
    ["4.2.10", "4.2.9"],
    ["10.0.0", "9.0.0"],
    ["4.0.0", "4.0.0-rc.1"],
    ["4.0.0", null],
  ]) {
    assert.equal(
      assertReleaseTag({ version, tag: "latest", latestVersion }),
      "latest"
    );
  }
});

test("legacy rejects shadowed corrections, absent latest, and prereleases", () => {
  for (const [version, latestVersion] of [
    ["3.0.2", "3.0.1"],
    ["3.0.2", "3.0.2"],
    ["3.0.2", null],
    ["3.0.2-rc.1", "4.0.0"],
  ]) {
    assert.throws(
      () => assertReleaseTag({ version, tag: "legacy", latestVersion }),
      /Legacy/
    );
  }
});

test("next accepts prereleases and stable staging candidates without changing latest", () => {
  for (const version of ["4.0.0-rc.1", "4.0.0", "3.0.2"]) {
    assert.equal(
      assertReleaseTag({ version, tag: "next", latestVersion: "4.0.0" }),
      "next"
    );
  }
});

test("malformed versions, unsafe cores, missing registry versions, and unknown tags fail", () => {
  for (const version of [
    undefined,
    null,
    4,
    "",
    "4.0",
    "v4.0.0",
    "04.0.0",
    "4.0.00",
    "4.0.0\n",
    "4.0.0-rc..1",
    "4.0.0-01",
    "4.0.0-rc.01",
    "4.0.0+build",
    "9007199254740992.0.0",
  ]) {
    assert.throws(() =>
      assertReleaseTag({ version, tag: "next", latestVersion: null })
    );
  }
  for (const latestVersion of [
    undefined,
    "invalid",
    "4.0.0\n",
    "9007199254740992.0.0",
  ]) {
    assert.throws(() =>
      assertReleaseTag({ version: "4.0.0", tag: "next", latestVersion })
    );
  }
  for (const tag of [undefined, "", "beta", "LATEST", "latest\n"]) {
    assert.throws(() =>
      assertReleaseTag({ version: "4.0.0", tag, latestVersion: null })
    );
  }
});

test("registry lookup checks the public package identity and returns the checked snapshot", async () => {
  const result = await checkReleaseTag({
    ...input,
    fetchImpl: async (url, options) => {
      assert.equal(
        url,
        "https://registry.npmjs.org/%40manifest-network%2Fmanifestjs/latest"
      );
      assert.equal(options.redirect, "error");
      assert.ok(options.signal instanceof AbortSignal);
      return { status: 200, json: async () => ({ name, version: "3.0.2" }) };
    },
  });
  assert.deepEqual(result, { tag: "latest", latestVersion: "3.0.2" });
});

test("only registry 404 allows publication without an existing latest", async () => {
  const fetchImpl = async () => ({ status: 404 });
  assert.deepEqual(await checkReleaseTag({ ...input, fetchImpl }), {
    tag: "latest",
    latestVersion: null,
  });
  await assert.rejects(
    checkReleaseTag({ ...input, tag: "legacy", fetchImpl }),
    /Legacy/
  );
  for (const status of [201, 301, 401, 403, 429, 500]) {
    await assert.rejects(
      checkReleaseTag({ ...input, fetchImpl: async () => ({ status }) }),
      /Registry could not verify/
    );
  }
});

test("transport, JSON, and registry identity errors fail closed", async () => {
  await assert.rejects(
    checkReleaseTag({
      ...input,
      fetchImpl: async () => {
        throw new Error("Network failed");
      },
    }),
    /Network failed/
  );
  await assert.rejects(
    checkReleaseTag({
      ...input,
      fetchImpl: async () => ({
        status: 200,
        json: async () => {
          throw new Error("Bad JSON");
        },
      }),
    }),
    /Bad JSON/
  );
  for (const metadata of [
    null,
    [],
    "4.0.0",
    {},
    { name: "attacker", version: "3.0.2" },
    { name },
    { name, version: "invalid" },
  ]) {
    await assert.rejects(
      checkReleaseTag({
        ...input,
        fetchImpl: async () => ({ status: 200, json: async () => metadata }),
      })
    );
  }
});

test("registry lookup applies rollback and legacy shadowing policy before allowing publish", async () => {
  const fetchImpl = async () => ({
    status: 200,
    json: async () => ({ name, version: "4.0.0" }),
  });
  await assert.rejects(
    checkReleaseTag({ ...input, version: "3.0.2", fetchImpl }),
    /backward/
  );
  assert.deepEqual(
    await checkReleaseTag({
      ...input,
      version: "3.0.2",
      tag: "legacy",
      fetchImpl,
    }),
    {
      tag: "legacy",
      latestVersion: "4.0.0",
    }
  );
  await assert.rejects(
    checkReleaseTag({
      ...input,
      version: "3.0.2",
      tag: "legacy",
      fetchImpl: async () => ({
        status: 200,
        json: async () => ({ name, version: "3.0.1" }),
      }),
    }),
    /Legacy/
  );
});
