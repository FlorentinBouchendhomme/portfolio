# Git workflow + branch naming

This repo follows a simple workflow suitable for Cloudflare Pages deployments.

## Branches

- `main` => production
- `dev` => staging

## Creating a feature branch

Always branch from `dev`:

```bash
git checkout dev
git pull
git checkout -b feat/<short-description>
```

Examples:

- `feat/landing-hero`
- `feat/case-studies-page`
- `feat/contact-form`

## Bugfix branches

```bash
git checkout dev
git pull
git checkout -b fix/<short-description>
```

Examples:

- `fix/nav-overflow-mobile`
- `fix/seo-meta-tags`

## Chore / maintenance branches

```bash
git checkout dev
git pull
git checkout -b chore/<short-description>
```

Examples:

- `chore/update-deps`
- `chore/refactor-sections`

## Commit message convention (recommended)

Use a simple conventional format:

- `feat: ...` for new features
- `fix: ...` for bug fixes
- `chore: ...` for tooling / maintenance
- `docs: ...` for documentation
- `refactor: ...` for refactors (no behavior change)
- `style: ...` for formatting only

Examples:

- `feat: add offers section`
- `fix: correct canonical URL`
- `chore: configure tailwind`

## Pull Requests

- Open PRs from `feat/*`, `fix/*`, `chore/*` => `dev`
- When `dev` is stable, open a PR from `dev` => `main`

### Release to production

```bash
# ensure dev is up to date
git checkout dev
git pull

# open PR dev -> main on GitHub and merge it
```

## Hotfixes (urgent production fix)

If needed, branch from `main`:

```bash
git checkout main
git pull
git checkout -b hotfix/<short-description>
```

PR: `hotfix/*` => `main`, then merge `main` back into `dev`.

## Keeping dev in sync

After merging to `main`, keep `dev` aligned:

```bash
git checkout dev
git merge main
git push
```
