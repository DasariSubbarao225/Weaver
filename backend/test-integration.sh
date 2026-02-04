#!/bin/bash

# Integration test script for Weaver backend

echo "==========================================="
echo "  Weaver Backend Integration Tests"
echo "==========================================="
echo ""

# Test 1: Backend health check
echo "Test 1: Backend health check..."
HEALTH_RESPONSE=$(curl -s http://localhost:3000/health)
if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
    echo "✓ Health check passed"
else
    echo "✗ Health check failed"
    exit 1
fi
echo ""

# Test 2: Get content
echo "Test 2: GET /api/content..."
CONTENT_RESPONSE=$(curl -s http://localhost:3000/api/content)
if echo "$CONTENT_RESPONSE" | grep -q "Weaver Interiors"; then
    echo "✓ Content retrieved successfully"
else
    echo "✗ Failed to retrieve content"
    exit 1
fi
echo ""

# Test 3: Update content
echo "Test 3: POST /api/content..."
TEST_DATA='{"site":{"name":"Test Update","tagline":"Test"},"test":true}'
UPDATE_RESPONSE=$(curl -s -X POST http://localhost:3000/api/content \
    -H "Content-Type: application/json" \
    -d "$TEST_DATA")
if echo "$UPDATE_RESPONSE" | grep -q "success"; then
    echo "✓ Content updated successfully"
else
    echo "✗ Failed to update content"
    exit 1
fi
echo ""

# Test 4: Verify update
echo "Test 4: Verify content update..."
VERIFY_RESPONSE=$(curl -s http://localhost:3000/api/content)
if echo "$VERIFY_RESPONSE" | grep -q "Test Update"; then
    echo "✓ Content update verified"
else
    echo "✗ Failed to verify content update"
    exit 1
fi
echo ""

# Restore original content
echo "Restoring original content..."
git show HEAD:backend/data/content.json > /tmp/original_content.json
curl -s -X POST http://localhost:3000/api/content \
    -H "Content-Type: application/json" \
    -d @/tmp/original_content.json > /dev/null
echo "✓ Original content restored"
echo ""

echo "==========================================="
echo "  All tests passed! ✓"
echo "==========================================="
