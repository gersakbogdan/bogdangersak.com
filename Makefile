.PHONY: help check build deploy status commit publish

SHELL := /bin/sh

help:
	@printf '%s\n' \
	  'make check                         Build and type-check the site' \
	  'make deploy                        Build and deploy to Cloudflare' \
	  'make status                        Show Git changes' \
	  'make commit FILES="..." MESSAGE="..."  Check, stage named files, and commit' \
	  'make publish FILES="..." MESSAGE="..." Commit, push main, and deploy'

check build:
	npm run build

deploy:
	npm run deploy

status:
	git status --short --branch

commit: check
	@if [ -z "$(FILES)" ]; then echo 'FILES is required, e.g. FILES="content/pages/now.md"'; exit 2; fi
	@if [ -z "$(MESSAGE)" ]; then echo 'MESSAGE is required, e.g. MESSAGE="Link Aluzio on Now page"'; exit 2; fi
	git add -- $(FILES)
	@if git diff --cached --quiet; then echo 'No staged changes. Nothing to commit.'; exit 2; fi
	git commit -m "$(MESSAGE)"

publish: commit
	git push origin main
	npm run deploy
