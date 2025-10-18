# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal resume repository that generates a professional resume website and PDF from Markdown. The resume content is written in Japanese and published via GitHub Pages at https://kawamataryo.github.io/resume/.

## Development Commands

### Text Linting
```bash
yarn lint --fix
```
- Uses textlint for Japanese text proofreading
- Configuration: `.textlintrc`
- Automatically runs on pre-commit via husky

### Development Server
```bash
yarn dev
```
- Starts VitePress development server for the resume website
- Serves from `docs/` directory

### Build Website
```bash
yarn docs:build
```
- Builds the VitePress static site for production
- Preview built site: `yarn docs:preview`

### Generate PDF
```bash
yarn build:pdf
```
- Converts `docs/index.md` to PDF using md-to-pdf
- PDF styling: `pdf-configs/style.css`
- Configuration: `pdf-configs/config.js`

## Architecture

### Content Structure
- **Source**: `docs/index.md` - The single source of truth for resume content
- The content is written in Japanese (with VitePress frontmatter)
- Custom Vue components embedded in Markdown fetch external content dynamically

### VitePress Setup
- **Config**: `docs/.vitepress/config.mts`
- **Theme**: `docs/.vitepress/theme/index.ts` - Extends default VitePress theme
- **Custom Components**: `docs/.vitepress/components/`
  - `GitHubRepositories.vue` - Fetches and displays GitHub repos
  - `ZennArticles.vue` - Displays Zenn articles
  - `QiitaArticles.vue` - Displays Qiita articles
  - `SpeakerDeckSlides.vue` - Displays SpeakerDeck presentations
  - `NoteArticles.vue` - Displays note articles
- These components dynamically fetch content to keep the resume up-to-date

### PDF Generation
- Uses md-to-pdf to convert Markdown to PDF
- Custom CSS styling in `pdf-configs/style.css`
- A4 format with 30mm/20mm margins

### Tech Stack
- **Framework**: VitePress (Vue-based static site generator)
- **Styling**: Tailwind CSS + custom CSS
- **Build**: Vite
- **Text Quality**: textlint with extensive Japanese language rules
- **Version Control**: Git with husky pre-commit hooks

## GitHub Actions Workflows

### `.github/workflows/lint-text.yml`
- Runs textlint on push/PR

### `.github/workflows/build-pdf.yml`
- Generates PDF when tags with `v**` pattern are pushed
- Creates GitHub Release with PDF as asset

### `.github/workflows/deploy.yml`
- Deploys to GitHub Pages on push to master

### `.github/workflows/create-issue.yml`
- Scheduled reminder to update resume (runs periodically)

### `.github/workflows/sync-lapras.yml`
- Syncs resume content with LAPRAS service

## Release Process

To create a new release with updated PDF:
```bash
git commit -m "Update resume content"
git tag v1.0
git push origin --tags
```

This triggers PDF build and GitHub Release creation automatically.

## Key Notes

- Resume content is in Japanese - be mindful of Japanese text formatting rules
- The `.textlintrc` contains extensive Japanese language linting rules (JTF style guide, technical writing presets, etc.)
- Custom Vue components fetch external content at build time to keep portfolio items current
- The single `docs/index.md` file serves both web and PDF outputs

## Communication

- When communicating with the repository owner (kawamataryo), always use Japanese
- The owner is a Japanese speaker and prefers Japanese communication
