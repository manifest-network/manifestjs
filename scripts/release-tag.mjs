import assert from "node:assert/strict";

const registry = "https://registry.npmjs.org/";
const tags = new Set(["latest", "next", "legacy"]);

function parseVersion(version) {
  assert.equal(typeof version, "string", "Expected an exact release version");
  assert.ok(version.length <= 256, "Release version is too long");
  const match = version.match(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/
  );
  assert.ok(match, "Expected an exact release version");
  const core = match.slice(1, 4).map(Number);
  assert.ok(
    core.every(Number.isSafeInteger),
    "Release version components must be safe integers"
  );
  const prerelease = match[4];
  for (const part of prerelease?.split(".") ?? []) {
    assert.ok(!/^0\d+$/.test(part), "Invalid numeric prerelease identifier");
  }
  return { core, prerelease };
}

function compareCore(left, right) {
  for (let index = 0; index < 3; index++) {
    if (left[index] !== right[index]) {
      return left[index] < right[index] ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Validate the reviewed dist-tag against the public registry's current latest.
 * Versions use the workflow's exact major.minor.patch[-prerelease] format.
 * A null latestVersion means the registry returned 404 for the latest endpoint.
 * Stable releases may promote an equal-core prerelease under latest; the separate
 * publication existence guard still rejects a version already on the registry.
 * Legacy must be strictly below latest's numeric core, preventing npm's matching
 * latest preference from hiding a newer compatibility correction from ^3 users.
 * Next accepts stable candidates and prereleases without changing latest.
 */
export function assertReleaseTag({ version, tag, latestVersion }) {
  assert.ok(tags.has(tag), "Release tag must be latest, next, or legacy");
  const candidate = parseVersion(version);
  const latest = latestVersion === null ? null : parseVersion(latestVersion);
  if (tag === "latest") {
    assert.equal(
      candidate.prerelease,
      undefined,
      "Prereleases cannot use latest"
    );
    assert.ok(
      !latest || compareCore(candidate.core, latest.core) >= 0,
      "Cannot move latest backward; use legacy or next"
    );
  }
  if (tag === "legacy") {
    assert.equal(
      candidate.prerelease,
      undefined,
      "Legacy releases must be stable"
    );
    assert.ok(
      latest && compareCore(candidate.core, latest.core) < 0,
      "Legacy must be older than current latest; publish the correction under latest first"
    );
  }
  return tag;
}

/**
 * Fetch current latest from public npm and validate the requested publication.
 * Invoke before building and again immediately before publishing. Only a 404
 * permits an absent latest; transport, HTTP, JSON, and identity errors fail closed.
 * fetchImpl is injectable for offline tests. Returns the checked tag and version
 * snapshot; separate publishers can still change registry tags after this read.
 */
export async function checkReleaseTag({
  name,
  version,
  tag,
  fetchImpl = globalThis.fetch,
}) {
  assert.equal(typeof name, "string", "Expected a package name");
  assert.ok(name.length > 0, "Expected a package name");
  assert.ok(tags.has(tag), "Release tag must be latest, next, or legacy");
  parseVersion(version);
  const response = await fetchImpl(
    `${registry}${encodeURIComponent(name)}/latest`,
    { signal: AbortSignal.timeout(30_000), redirect: "error" }
  );
  let latestVersion = null;
  if (response.status !== 404) {
    assert.equal(
      response.status,
      200,
      "Registry could not verify current latest"
    );
    const metadata = await response.json();
    assert.ok(
      metadata && typeof metadata === "object" && !Array.isArray(metadata),
      "Malformed latest registry metadata"
    );
    assert.equal(
      metadata.name,
      name,
      "Latest registry package identity mismatch"
    );
    latestVersion = metadata.version;
    parseVersion(latestVersion);
  }
  assertReleaseTag({ version, tag, latestVersion });
  return { tag, latestVersion };
}
