#!/usr/bin/env bash
# Script to compile all .drawio files in docs/diagrams/ to SVG and PNG Retina 2x

set -e

DIAGRAM_DIR="docs/diagrams"

if [ ! -d "$DIAGRAM_DIR" ]; then
  echo "Error: Directory $DIAGRAM_DIR does not exist."
  exit 1
fi

echo "=== Exporting Draw.io Diagrams ==="

for file in "$DIAGRAM_DIR"/*.drawio; do
  if [ -f "$file" ]; then
    basename=$(basename "$file" .drawio)
    echo "Processing: $file"
    
    # Export SVG
    echo " -> Exporting SVG: $DIAGRAM_DIR/$basename.drawio.svg"
    npx -y drawio-cli -x -f svg -o "$DIAGRAM_DIR/$basename.drawio.svg" "$file"
    
    # Export PNG Retina 2x
    echo " -> Exporting PNG Retina 2x: $DIAGRAM_DIR/$basename.png"
    npx -y drawio-cli -x -f png --scale 2 -o "$DIAGRAM_DIR/$basename.png" "$file"
  fi
done

echo "=== Export Complete ==="
