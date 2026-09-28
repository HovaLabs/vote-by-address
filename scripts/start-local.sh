#!/bin/bash
# Installs dependencies and starts the local dev server, with env vars pulled from Netlify.

set -e

cd "$(dirname "$0")/.."

# The votebyaddress Netlify project. Set NETLIFY_SITE_ID to pull from a different one.
NETLIFY_SITE_ID="${NETLIFY_SITE_ID:-1242b650-04fc-45d1-901e-3e32b5c29660}"

# Load the project's "dev" context env vars from Netlify (e.g. the Google API keys). Values
# already set in the shell win, and Netlify values win over .env files, except empty ones.
# Skipped with a warning if the Netlify CLI isn't installed or logged in, so .env files still
# work. This runs before the nvm switch below, which would take a globally installed netlify
# off the PATH.
if command -v netlify > /dev/null; then
  if NETLIFY_ENV_JSON="$(netlify env:list --site "$NETLIFY_SITE_ID" --context dev --json < /dev/null)"; then
    NETLIFY_ENV_NAMES=()
    while IFS= read -r -d '' pair; do
      export "$pair"
      NETLIFY_ENV_NAMES+=("${pair%%=*}")
    done < <(printf '%s' "$NETLIFY_ENV_JSON" | node -e '
      const env = JSON.parse(require("fs").readFileSync(0, "utf8"));
      for (const [key, value] of Object.entries(env)) {
        if (value !== "" && process.env[key] === undefined) {
          process.stdout.write(`${key}=${value}\0`);
        }
      }
    ')
    echo "Loaded ${#NETLIFY_ENV_NAMES[@]} env var(s) from Netlify${NETLIFY_ENV_NAMES:+: ${NETLIFY_ENV_NAMES[*]}}"
  else
    echo "Couldn't load env vars from Netlify. Run \`netlify login\` with an account that can access the project." >&2
  fi
else
  echo "Netlify CLI not found, so env vars won't be loaded from Netlify. Install it with \`npm install -g netlify-cli\`, then run \`netlify login\`." >&2
fi

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
