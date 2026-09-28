#!/bin/bash
# Installs dependencies and starts the local dev server.

set -e

cd "$(dirname "$0")/.."

# package.json requires the Node version in .nvmrc. nvm isn't loaded in non-interactive
# shells like this one, so load it and switch versions if the active Node is too old.
REQUIRED_NODE_MAJOR="$(tr -d 'v[:space:]' < .nvmrc | cut -d. -f1)"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2> /dev/null || echo 0)"
if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_MAJOR" ]; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh" --no-use
    nvm use || nvm install
  else
    echo "Node $REQUIRED_NODE_MAJOR+ is required but found $(node --version 2> /dev/null || echo none)." >&2
    echo "Install it (e.g. with nvm: https://github.com/nvm-sh/nvm) and try again." >&2
    exit 1
  fi
fi

# yarn.lock is the source of truth, so install with yarn (via npx if it isn't installed globally)
if command -v yarn > /dev/null; then
  yarn install
else
  npx --yes yarn@1 install
fi

exec npm start
