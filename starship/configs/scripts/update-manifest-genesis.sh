#!/bin/bash

DENOM="${DENOM:=umfx}"
CHAIN_BIN="${CHAIN_BIN:=manifestd}"
CHAIN_DIR="${CHAIN_DIR:=$HOME/.manifest}"

set -eux

ls $CHAIN_DIR/config

echo "Update genesis.json file with updated local params"
sed -i -e "s/\"stake\"/\"$DENOM\"/g" $CHAIN_DIR/config/genesis.json
sed -i "s/\"time_iota_ms\": \".*\"/\"time_iota_ms\": \"$TIME_IOTA_MS\"/" $CHAIN_DIR/config/genesis.json

echo "Update max gas param"
jq -r '.consensus.params.block.max_gas |= "100000000000"' $CHAIN_DIR/config/genesis.json > /tmp/genesis.json; mv /tmp/genesis.json $CHAIN_DIR/config/genesis.json

echo "Updated genesis.json file"
cat $CHAIN_DIR/config/genesis.json

echo "Node ID"
$CHAIN_BIN tendermint show-node-id
