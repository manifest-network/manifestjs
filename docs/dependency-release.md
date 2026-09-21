# LCD and ManifestJS dependency patch

The patch preserves generated client source and the current CosmJS family.
ManifestJS 3.0.1 requires:

- `@cosmology/lcd: npm:@manifest-network/lcd@^0.14.6`, which requires Axios
  `^1.19.0` in its published dependencies.
- `@cosmjs/stargate: npm:@manifest-network/stargate@0.32.4-ll.4`, which requires
  the maintained ICS23/protobufjs dependency patch.

The new minimum versions prevent a fresh consumer from resolving the older
vulnerable dependency declarations. Existing public import paths remain valid.
Repository `resolutions`, consumer overrides, and install-time patch scripts are
not needed for this runtime repair.

## Publication order

1. Build and test `vendor/lcd` with `npm ci --ignore-scripts`, `npm run build`,
   and `npm test`. Run `npm audit --omit=dev --audit-level=high` and pack it with
   `npm pack --ignore-scripts`. Publish the reviewed `@manifest-network/lcd@0.14.6`
   tarball with `npm publish TAR_FILE --access public --tag latest`.
2. Publish the companion `@manifest-network/ics23@0.6.9` and
   `@manifest-network/stargate@0.32.4-ll.4` patches from the CosmJS fork.
3. Verify the ManifestJS lockfile against public npm, then run
   `yarn install --frozen-lockfile`, `yarn tsc -p tsconfig.json --noEmit`,
   `yarn build`, and `yarn test --runInBand`. The generated-LCD tests use a local
   HTTP server and preserve query parameters, large amounts, and error metadata.
4. Publish ManifestJS 3.0.1 through the existing release process or the reviewed
   tarball. The MCP monorepo must then adopt 3.0.1 and pass its independent packed
   SDK/CLI consumer audits before its release.

Candidate-registry tests before publication prove the staged package graph;
they do not prove that public npm has these releases. Keep that distinction in
release evidence. The separate CosmJS crypto migration remains deferred.
