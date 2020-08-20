#!/bin/bash
set -eu

rm -rf dist
npm run generate
cd web
git init
git add -A
git commit -m "deploy"
git remote add origin git@github.com:viasite/site-audit-seo.git
git push --force origin master:gh-pages
cd ..
