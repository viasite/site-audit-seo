#!/bin/bash

# Use environment variable for INSTALL_DIR if it exists, else use default
INSTALL_DIR=${INSTALL_DIR:-"$HOME/.local/share/programs/site-audit-seo"}
echo "INSTALL_DIR: $INSTALL_DIR"

# Check if the install directory exists, create if it does not
if [ ! -d "$INSTALL_DIR" ]; then
    mkdir -p "$INSTALL_DIR"
fi

# Clone the repository (Ensure you have git command available)
cd "$INSTALL_DIR"
if [ ! -d ".git" ]; then
    git clone https://github.com/viasite/site-audit-seo.git "$INSTALL_DIR"
else
    echo "Repository already cloned, updating..."
    git pull
fi

# Assuming docker-compose.yml is at the root of the cloned directory
# Start Docker Compose
docker compose pull
docker compose up -d

# Follow the logs
docker compose logs -tf

echo ""
echo "site-audit-seo will remain running in the background."
echo "To stop the service, run:
cd \"$INSTALL_DIR\"
docker compose down
"
