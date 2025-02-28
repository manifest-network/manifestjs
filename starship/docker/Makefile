.PHONY: setup
setup:
	docker buildx create --use

.PHONY: build
build:
	docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/liftedinit/manifest-ledger:v0.0.1-rc.2 .
