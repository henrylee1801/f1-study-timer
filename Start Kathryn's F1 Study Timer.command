#!/bin/bash
# Double-click this file in Finder to run the Kathryn's F1 Study Timer locally.
# It serves the built app and opens it in your default browser.
# Close the Terminal window (or press Ctrl+C) to stop it.

cd "$(dirname "$0")" || exit 1

# Make Homebrew tools reachable when launched from Finder.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

PORT=4321
while lsof -i ":$PORT" >/dev/null 2>&1; do PORT=$((PORT + 1)); done

if [ ! -f "out/index.html" ]; then
  echo "First run: building the app (this takes ~30s)..."
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install && pnpm build
  else
    echo "pnpm not found. Open a terminal here and run: npm install -g pnpm && pnpm install && pnpm build"
    read -r -p "Press Return to close."
    exit 1
  fi
fi

echo ""
echo "  Kathryn's F1 Study Timer running at:  http://localhost:$PORT/"
echo "  Leave this window open. Close it to stop."
echo ""

( sleep 1; open "http://localhost:$PORT/" ) &
exec python3 -m http.server "$PORT" --directory out
