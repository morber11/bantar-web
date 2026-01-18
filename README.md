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

- `VITE_API_URL` — API base URL (leave empty to use dev proxy)
- `VITE_APP_ENV` — set to `prod` for production proxy behavior

## Features

Features are organized as vertical slices. Each feature should live in its own folder under `src/features/<name>`. Shared functionality should be placed in `src/shared`.
