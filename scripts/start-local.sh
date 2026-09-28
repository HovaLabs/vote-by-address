#!/bin/bash
# Installs dependencies and starts the local dev server.

set -e

cd "$(dirname "$0")/.."

# yarn.lock is the source of truth, so install with yarn (via npx if it isn't installed globally)
if command -v yarn > /dev/null; then
  yarn install
else
  npx --yes yarn@1 install
fi

# react-scripts 3 uses webpack 4, which needs the legacy OpenSSL provider on Node 17+
NODE_MAJOR=`node -p "process.versions.node.split('.')[0]"`

if [[ "$NODE_MAJOR" -ge 17 ]]; then
  export NODE_OPTIONS="--openssl-legacy-provider $NODE_OPTIONS"
fi

exec npm start
