# Maintained LCD dependency

This package preserves the runtime source of `@cosmology/lcd@0.14.5` from
`hyperweb-io/telescope` commit `eaae9e070119fe97bd63b781e070ef50ad4a35b9`,
directory `packages/lcd`, under its original MIT/Apache-2.0 licenses.

Manifest changes the package identity to `@manifest-network/lcd@0.14.6` and
requires `axios ^1.19.0`. Runtime source and public declarations retain the
upstream contract. Build/test metadata is maintained here; compatibility tests
exercise actual HTTP requests, error responses, cancellation, and timeouts.

ManifestJS consumes this package through the `@cosmology/lcd` npm alias. The
dependency declaration is included in published packages and requires no
application overrides or install scripts. Publish this package before the
ManifestJS patch that consumes it.

The broader CosmJS crypto migration is separate from this repair.
