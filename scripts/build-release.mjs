import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const [target, destination] = process.argv.slice(2);
assert.ok(["lcd", "manifestjs"].includes(target), "Select lcd or manifestjs");
assert.ok(
  destination && isAbsolute(destination),
  "Use an absolute artifact directory"
);
assert.ok(
  relative(root, destination).startsWith("../"),
  "Keep artifacts outside the checkout"
);
const directory = target === "lcd" ? join(root, "vendor/lcd") : root;
const expectedName = `@manifest-network/${target}`;
const manifest = JSON.parse(
  readFileSync(join(directory, "package.json"), "utf8")
);
assert.equal(manifest.name, expectedName);
mkdirSync(destination, { recursive: true });

function run(command, args, cwd = directory, capture = false) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
    timeout: 600_000,
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  assert.equal(
    result.status,
    0,
    `${command} ${args.join(" ")} failed\n${result.stderr ?? ""}`
  );
  return result.stdout;
}

if (target === "lcd") {
  run("npm", ["ci", "--ignore-scripts", "--no-audit", "--no-fund"]);
  run("npm", ["run", "build"]);
  run("npm", ["test"]);
} else {
  assert.equal(run("yarn", ["--version"], root, true).trim(), "1.22.22");
  run("yarn", [
    "install",
    "--frozen-lockfile",
    "--ignore-scripts",
    "--non-interactive",
  ]);
  run("yarn", ["tsc", "-p", "tsconfig.json", "--noEmit"]);
  run("yarn", ["build"]);
  run("yarn", ["test", "--runInBand"]);
}

const outputs =
  target === "lcd"
    ? ["main/index.js", "module/index.js", "types/index.d.ts"]
    : ["dist/index.js", "dist/index.mjs", "dist/index.d.ts"];
for (const output of outputs) {
  assert.ok(
    statSync(join(directory, output)).size > 0,
    `Missing build output: ${output}`
  );
}
const packed = JSON.parse(
  run(
    "npm",
    ["pack", "--ignore-scripts", "--json", "--pack-destination", destination],
    directory,
    true
  )
);
assert.equal(packed.length, 1);
const pack = packed[0];
assert.equal(pack.name, expectedName);
assert.equal(pack.version, manifest.version);
assert.equal(basename(pack.filename), pack.filename);
const bytes = readFileSync(resolve(destination, pack.filename));
assert.equal(
  pack.integrity,
  `sha512-${createHash("sha512").update(bytes).digest("base64")}`
);
const consumer = mkdtempSync(join(tmpdir(), "manifest-consumer-"));
writeFileSync(
  join(consumer, "package.json"),
  JSON.stringify({
    name: "manifest-release-consumer",
    version: "1.0.0",
    private: true,
  })
);
run(
  "npm",
  [
    "install",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    resolve(destination, pack.filename),
    "--registry=https://registry.npmjs.org",
  ],
  consumer
);
run(
  "npm",
  [
    "audit",
    "--omit=dev",
    "--audit-level=high",
    "--registry=https://registry.npmjs.org",
  ],
  consumer
);
run(
  process.execPath,
  ["-e", `require(${JSON.stringify(expectedName)})`],
  consumer
);
const commit = run("git", ["rev-parse", "HEAD"], root, true).trim();
writeFileSync(
  join(destination, "release.json"),
  `${JSON.stringify(
    {
      target,
      name: pack.name,
      version: pack.version,
      filename: pack.filename,
      integrity: pack.integrity,
      sha: commit,
    },
    null,
    2
  )}\n`
);
console.log(`Built and tested ${pack.name}@${pack.version}: ${pack.integrity}`);
