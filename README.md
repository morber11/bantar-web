# Bantar Web

Frontend for Bantar

API: [morber11/bantar-api](https://github.com/morber11/bantar-api)

## Quick start

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview --host`

## Build & deploy

Run the following script:

`./build-and-deploy.sh`

## Environment (.env)

Copy `.env.example` to `.env` and set values before building:

- `VITE_API_URL` — API base URL used when running with `VITE_APP_ENV=prod`. This should be a full URL (e.g. `https://api.example.com`). If not set, the dev proxy (`http://localhost:8080`) will be used.
- `VITE_APP_ENV` — set to `prod` for production proxy behavior (controls which proxy target is used by the dev server).
- `VITE_APP_ENV` — set to `prod` for production proxy behavior (controls which proxy target is used by the dev server).

Validation: when running the dev server or building with `VITE_APP_ENV=prod`, the following environment variables are required and the config will fail fast if they're missing:

- `VITE_API_URL` - API base URL (e.g. `https://api.example.com`).
- `VITE_ALLOWED_HOSTS` - comma-separated list of allowed hosts for the Vite server (e.g. `example.com,api.example.com`).

Ensure you set these variables in your `.env` or CI environment when targeting production.

## Features

Features are organized as vertical slices. Each feature should live in its own folder under `src/features/<name>`. Shared functionality should be placed in `src/shared`.
