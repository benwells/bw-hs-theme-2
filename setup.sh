#!/bin/bash

echo "🚀 Setting up HubSpot Theme with Svelte + Vite + Bun"
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Installing..."
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
    echo "✅ Bun installed successfully"
else
    echo "✅ Bun is already installed"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
bun install

# Build components
echo ""
echo "🔨 Building Svelte web components..."
bun run build

# Check if HubSpot CLI is configured
if [ ! -f "hubspot.config.yml" ]; then
    echo ""
    echo "⚠️  HubSpot CLI is not configured yet."
    echo "Please run: hs init"
    echo "Or copy hubspot.config.yml.example to hubspot.config.yml and add your credentials"
else
    echo "✅ HubSpot CLI is configured"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure HubSpot: hs init"
echo "2. Deploy theme: bun run deploy"
echo "3. Or start dev mode: bun run watch"
