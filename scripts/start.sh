#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

# Coze 平台要求监听 80 端口，DEPLOY_RUN_PORT 由平台注入
# 如果未设置，默认使用 80
PORT="${DEPLOY_RUN_PORT:-80}"

start_service() {
    cd "${COZE_WORKSPACE_PATH}"
    echo "Starting HTTP service on port ${PORT} for deploy..."
    # 确保使用生产模式
    NODE_ENV=production PORT=${PORT} node dist/server.js
}

echo "Starting HTTP service on port ${PORT} for deploy..."
start_service
