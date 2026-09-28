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

exec npm start
