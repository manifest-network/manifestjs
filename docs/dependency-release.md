# Reviewed dependency releases

The manually published LCD 0.14.6, ICS23 0.6.9, Stargate 0.32.4-ll.4, and
ManifestJS 3.0.1 have no npm provenance. Their recorded source comparisons are
useful historical evidence, but are **not an exception permitting an SDK release**.
Already published versions cannot gain a new provenance attestation; successors
must be built and published from reviewed source in GitHub Actions.

This PR prepares that release path. The current package versions remain unchanged
and cannot be republished. Generated client source and the CosmJS crypto family
remain unchanged; the broader crypto migration is deferred.

## Compatibility and coordinated versions

ManifestJS 3.0.1 changed its exact Stargate alias from 0.32.4-ll.3 to ll.4.
Published SDK/core 0.22.0 still pins ll.3 while accepting ManifestJS `^3.0.0`.
A fresh SDK install can therefore contain two Stargate implementations. Passing
`npm ls` or an import smoke test alone does not prove compatible class identities.

Use two explicitly different release lines:

| Package    | Planned version | Purpose                                                                  |
| ---------- | --------------- | ------------------------------------------------------------------------ |
| LCD        | 0.14.7          | Attested successor, patched Axios declaration                            |
| ICS23      | 0.6.10          | Attested successor, patched protobufjs declaration                       |
| Stargate   | 0.32.4-ll.5     | Attested successor requiring ICS23 0.6.10                                |
| ManifestJS | 3.0.2           | Compatibility correction retaining exact Stargate ll.3, using LCD 0.14.7 |
| ManifestJS | 4.0.0           | Repaired line requiring exact Stargate ll.5 and LCD 0.14.7               |

The 3.0.2 correction restores one Stargate identity for old SDK consumers. It
**retains the old ICS23/protobufjs chain and old Stargate's provenance gap**; it
cannot be called a complete security repair. It needs a separate reviewed release
policy for that legacy line: this workflow's production audit currently fails on
that graph. Do not weaken the gate globally or suppress its audit failures.
Existing lockfiles require an explicit update, and the complete repair requires
a new coordinated SDK/core/CLI release using ManifestJS 4.0.0 and Stargate ll.5.

An alternative using a required Stargate peer was tested with real npm resolution.
The published SDK/core topology still produced two copies; it is not an accepted
solution. Monorepo consumer tests cover both the published 0.22.0 entry points
and candidates, including dependency identity, import smoke tests, and audits.

## One-time maintainer configuration

1. Review and merge the source PRs. ManifestJS main requires an approving review;
   release dispatch must run at the exact reviewed main SHA. Configure the
   `npm-release` GitHub environment with required reviewers and main-only
   deployment branches before any dispatch. Naming an environment in YAML alone
   does not create these protections.
2. On **both** npm package settings pages, configure a GitHub Actions trusted
   publisher: owner `manifest-network`, repository `manifestjs`, workflow filename
   `release.yaml`, environment `npm-release`. Use GitHub-hosted runners. This
   workflow intentionally provides no npm token fallback.
3. Configure the trusted publisher to allow **direct publication**. New npm trust
   relationships default to staging; this reviewed workflow uses `npm publish`
   and must fail if the trust policy only permits staging. Do not replace a
   staged-approval policy without maintainer review.

See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) for the
account configuration. Node 24.15.0 and npm 11.19.1 are pinned; the latter includes
the current Sigstore verification fixes. The release no longer runs automatically
on version tags or creates a GitHub Release. Its explicit main-branch dispatch
selects one package, exact version, and full commit SHA.

The dispatch also selects the reviewed npm channel: `latest`, `next`, or
`legacy`. `latest` accepts stable versions and cannot move below the registry's
current `latest`. Use `next` for prereleases or candidate releases. `legacy`
accepts stable versions below an existing `latest`. These checks run before the
build and again immediately before publication.

For the planned ManifestJS lines, publish 3.0.2 under `latest` if it precedes
4.0.0, then publish 4.0.0 under `latest`. If 4.0.0 is already `latest`, publish
3.0.2 under `legacy`. Do not publish 3.0.2 only under `legacy` while 3.0.1 is
still `latest`: npm can prefer the matching `latest` for an old SDK's `^3.0.0`
range. This channel policy does not waive the legacy line's audit or provenance
requirements.

## Release order and evidence

1. Merge the reviewed source and workflow changes, then prepare reviewed leaf
   version bumps: LCD 0.14.7 in this repository and ICS23 0.6.10 in the CosmJS fork.
2. Dispatch each leaf package at its reviewed source-branch SHA: LCD from this
   repository's `main`, ICS23 from the CosmJS fork's `manifest/0.32` maintenance
   branch. The read-only build job
   installs locked build dependencies with lifecycle scripts disabled, explicitly
   builds/tests, packs, and checks a fresh consumer audit. The separate protected
   publish job rechecks the artifact hash and manifest and publishes those exact
   bytes with OIDC/provenance. Existing versions are rejected.
3. The verifier installs the public package without lifecycle scripts and runs
   `npm audit signatures --json --include-attestations` with the pinned npm CLI.
   Installation and verification retry together for up to 12 attempts with
   10-second pauses, requesting fresh registry metadata. Publication is never
   retried, and exhausted or permanent verification failures still fail the job.
   It applies policy to those **cryptographically verified bundles**, checking the
   artifact SHA-512, package/version, GitHub certificate workflow/source/ref/SHA,
   and SLSA source/workflow/builder. Unsigned decoded JSON or the presence of an
   attestation URL alone cannot pass. Preserve the `npm-publication-evidence`
   Actions artifact and public run URL.
4. After the leaves are verified, prepare/review Stargate ll.5 and its lockfile,
   then publish and verify it from the CosmJS repository's protected
   `manifest/0.32` branch. That branch is the fork's default and release branch;
   its `main` remains an upstream reference. Prepare the ManifestJS
   compatibility correction and major upgrade as separate reviewed changes; do
   not make locks resolve nonexistent successor versions.
5. Test old SDK 0.22.0 against the proposed 3.0.2 registry candidate and new SDK/CLI
   tarballs against 4.0.0 before publication using the reviewed channel policy above. The legacy correction
   intentionally has audit/provenance limitations described above. The new SDK
   graph must pass identity, smoke, vulnerability, and provenance gates.
6. Only after all public successor artifacts are verified may the monorepo adopt
   them, refresh its lockfile/evidence and release the SDK. Current unattested
   versions must fail the monorepo release provenance gate.

If publication succeeds but verification fails, stop the sequence and investigate
that published version. Never use an existing-version skip to claim success, and
never adopt an artifact whose source identity or integrity failed verification.
