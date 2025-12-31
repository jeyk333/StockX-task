#!/bin/bash

# Setup test environment

set -e

echo "🔧 Setting up test environment..."

# Create test directories
mkdir -p test-data
mkdir -p test-logs

# Set test environment variables
export NODE_ENV=test
export DATABASE_URL="postgresql://test:test@localhost:5432/stockx_test"
export REDIS_URL="redis://localhost:6379/1"

# Start test services
echo "🚀 Starting test services..."

# Docker Compose for test services
if command -v docker-compose &> /dev/null; then
    docker-compose -f infrastructure/docker/docker-compose.test.yml up -d
fi

echo "✅ Test environment ready!"
