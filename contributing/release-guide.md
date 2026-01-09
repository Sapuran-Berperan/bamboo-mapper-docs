---
sidebar_position: 1
---

# Release Guide

This guide explains how to release the [Bamboo Mapper Android app](https://github.com/Sapuran-Berperan/bamboo-mapper) to GitHub Releases.

## Overview

The release process is automated using GitHub Actions. When you push a version tag (e.g., `v1.0.0`), the workflow automatically:

1. Builds the release APK
2. Extracts release notes from `CHANGELOG.md`
3. Creates a GitHub Release with the APK attached

## Prerequisites

- Push access to the repository
- Git configured locally
- Understanding of [Semantic Versioning](https://semver.org/)

## CHANGELOG Format

The workflow parses `CHANGELOG.md` to extract release notes. The file must follow this format:

```markdown
# Changelog

All notable changes to Bamboo Mapper will be documented in this file.

## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing features

### Fixed
- Bug fixes

### Removed
- Removed features

### Security
- Security patches
```

### Section Reference

| Section    | When to Use                       |
|------------|-----------------------------------|
| `Added`    | New features                      |
| `Changed`  | Changes in existing functionality |
| `Fixed`    | Bug fixes                         |
| `Removed`  | Removed features                  |
| `Security` | Security patches                  |

:::note
The workflow extracts content between `## [VERSION]` headers. Make sure the version number in the changelog matches your tag (without the `v` prefix).
:::

### Example Entry

```markdown
## [1.1.0] - 2026-01-15

### Added
- Dark mode support
- Export data to CSV

### Fixed
- Map marker not displaying on first load
- Crash when location permission denied
```

## Release Steps

### 1. Update CHANGELOG.md

Add a new version entry at the top of the changelog (below the header):

```markdown
## [1.1.0] - 2026-01-15

### Added
- Your new features here
```

### 2. Commit the Changes

```bash
git add CHANGELOG.md
git commit -m "chore: prepare release v1.1.0"
```

### 3. Create and Push the Tag

```bash
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

### 4. Monitor the Release

1. Go to the repository's **Actions** tab
2. Watch the "Release" workflow run
3. Once complete, check the [Releases](https://github.com/Sapuran-Berperan/bamboo-mapper/releases) page for your new release

## How the Workflow Works

The release workflow (`.github/workflows/release.yml`) is triggered by:

- **Tag push**: Any tag matching `v*` pattern (e.g., `v1.0.0`, `v2.1.3`)
- **Manual dispatch**: Can be triggered manually from the Actions tab

### Changelog Parsing

The workflow extracts release notes using this logic:

```bash
VERSION=${GITHUB_REF_NAME#v}  # Removes 'v' prefix from tag
awk "/^## \[${VERSION}\]/{flag=1; next} /^## \[/{flag=0} flag" CHANGELOG.md
```

This extracts all content between the matching version header and the next version header.

### Build Output

- APK filename: `bamboo-mapper-{VERSION}.apk`
- Release title: `Bamboo Mapper v{VERSION}`
- Release body: Extracted from CHANGELOG.md

## Troubleshooting

### Release notes are empty

- Ensure the version in your tag matches the changelog header exactly
- Tag `v1.0.0` should have changelog entry `## [1.0.0]` (not `## [v1.0.0]`)

### Build fails

- Check the Actions log for specific errors
- Verify all required secrets are configured
- Ensure `pubspec.yaml` version is valid

### Tag already exists

If you need to re-release:

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin :refs/tags/v1.0.0

# Create new tag
git tag v1.0.0
git push origin v1.0.0
```
