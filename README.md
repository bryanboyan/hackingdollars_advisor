# Purplefish Project

The codebase is a [monorepo](https://en.wikipedia.org/wiki/Monorepo).

- Apps & web services are located in `apps`.
- Shared modules and libraries are located in `packages`.

It uses [Turborepo](https://turbo.build/) to orchestrate and manage builds efficiently across the monorepo. Code quality is maintained using ESLint for linting and Prettier for formatting.

## Development

To ensure the best development experience with VSCode, install the recommended extensions listed in `.vscode/extensions.json`. These extensions enable automatic code quality checks and formatting on save, streamlining your workflow and helping maintain consistent standards across the project.

## Features

This app is a wrapper for ChatGPT-4, utilizing ReAct (Reasoning and Acting) prompting to improve user interactions. It integrates several external tools, including:

- Seeking Alpha for real-time stock prices.
- OpenWeather Map for weather forecasts.
- Tavily for web searches.
- Wikipedia for quick lookups.
- Math.js for advanced mathematical calculations.

Additionally, the app displays widgets for weather and stock information, and chat history is stored locally using SQLite.

## How to Run

This app requires Node.js 20.

API keys are hard-coded in the repository for convenience. Ensure that this code is not made public.

1. Run `yarn` to install dependencies. (To run `yarn`, make sure Corepack is working: https://yarnpkg.com/corepack).
2. To start the app: `npx turbo dev --filter=@purplefish/web`.
3. Open `http://localhost:5206/` in the browser.

## CLI

- Install packages: `yarn install`
- Run development server: `npx turbo dev`
- Run development server (one project): `npx turbo dev --filter=[PROJECT]`
- Build for production: `npx turbo build`
- Build for production (one project): `npx turbo build --filter=[PROJECT]`
- Format code with Prettier: `npx turbo format`
- Run linter and format checker: `npx turbo lint`

You can also navigate to a specific project's directory to run it, for example:

```bash
cd apps/web
npx turbo dev
```
