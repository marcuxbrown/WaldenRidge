#!/bin/bash

# Walden Ridge - Quick Start Server Script

echo "========================================"
echo "WALDEN RIDGE - Local Development Server"
echo "========================================"
echo ""
echo "Starting server on http://localhost:8000"
echo ""
echo "Pages available:"
echo "  • http://localhost:8000/our-story/"
echo "  • http://localhost:8000/portfolio/"
echo "  • http://localhost:8000/strategy/"
echo "  • http://localhost:8000/leadership/"
echo "  • http://localhost:8000/ops/ (embeds intake tool)"
echo "  • http://localhost:8000/governance/ (redirects)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "TIP: Set your browser to 1440px width"
echo "TIP: Press 'O' key to toggle overlay validation mode"
echo ""
echo "========================================"
echo ""

# Start Python HTTP server
python3 -m http.server 8000
