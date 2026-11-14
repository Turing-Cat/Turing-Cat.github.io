#!/usr/bin/env bash
# Publish the site to the gh-pages branch.
#
# Why this exists: the repository's GitHub Actions workflow needs a working
# Actions account, and this account is currently locked by GitHub for a
# billing reason ("The job was not started because your account is locked due
# to a billing issue"). GitHub Pages is set to serve the `gh-pages` branch, so
# building locally and pushing the output keeps the site deployable without
# Actions, without Actions minutes, and without GitHub's own Jekyll builder
# (which cannot install gem themes). `.nojekyll` makes Pages serve the files
# exactly as built.
#
# Usage:
#   tools/deploy.sh
#
# Environment:
#   PAGES_BRANCH   branch to publish to      (default: gh-pages)
#   PAGES_REMOTE   remote URL to push to     (default: the origin remote)
set -euo pipefail

repo=$(cd "$(dirname "$0")/.." && pwd)
cd "$repo"

branch=${PAGES_BRANCH:-gh-pages}
remote=${PAGES_REMOTE:-$(git remote get-url origin)}
name=$(git config user.name || echo "Turing-Cat")
email=$(git config user.email || echo "noreply@localhost")
sha=$(git rev-parse --short HEAD)

echo "==> building $sha"
JEKYLL_ENV=production bundle exec jekyll build -d _site
touch _site/.nojekyll

echo "==> publishing to $branch"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -a _site/. "$tmp"/
cd "$tmp"
git init -q -b "$branch"
git add -A
git -c user.name="$name" -c user.email="$email" commit -q -m "deploy: build of $sha"
git push --force "$remote" "HEAD:$branch"

echo "==> done. Pages will rebuild in a few seconds:"
echo "    https://turing-cat.github.io"
