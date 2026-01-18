#!/usr/bin/env sh
set -e

echo "Running: npm run build"
npm run build

echo "Starting preview: npm run preview --host"
npm run preview --host
