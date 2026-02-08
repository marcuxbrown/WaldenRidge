#!/usr/bin/env python3
"""
Enhanced Business Card Extractor with Comprehensive Field Capture
"""

import anthropic
import base64
import os
import csv
from pathlib import Path
from PIL import Image
import pillow_heif

# Register HEIF opener with PIL
pillow_heif.register_heif_opener()

# Configuration
CARDS_FOLDER = "/Users/525n/Library/Mobile Documents/com~apple~CloudDocs/New Folder With Items"
OUTPUT_CSV = "/Users/525n/clawd/workspaces/WaldenRidge-marketing/business_cards_enhanced.csv"
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# Enhanced prompt
with open('enhanced_extraction_prompt.txt', 'r') as f:
    EXTRACTION_PROMPT = f.read()

# CSV Headers
CSV_HEADERS = [
    'Source File',  # Added to track which image each entry came from
    'Full Name',
    'Job Title',
    'Company Name',
    'Department',
    'Email Address',
    'Alt Email',
    'Phone Number',
    'Mobile Number',
    'Office Phone',
    'Fax Number',
    'Website URL',
    'LinkedIn URL',
    'Street Address',
    'City',
    'State/Province',
    'Postal Code',
    'Country',
    'Additional Info'
]


def convert_heic_to_jpeg(heic_path, max_size_bytes=4_500_000):
    """Convert HEIC to JPEG with size optimization"""
    image = Image.open(heic_path)

    if image.mode != 'RGB':
        image = image.convert('RGB')

    from io import BytesIO
    for quality in [95, 85, 75, 65]:
        output = BytesIO()

        width, height = image.size
        if quality < 75:
            scale = 0.8
            new_size = (int(width * scale), int(height * scale))
            resized = image.resize(new_size, Image.Resampling.LANCZOS)
            resized.save(output, format='JPEG', quality=quality, optimize=True)
        else:
            image.save(output, format='JPEG', quality=quality, optimize=True)

        jpeg_bytes = output.getvalue()

        if len(jpeg_bytes) <= max_size_bytes:
            return jpeg_bytes

    # Final fallback
    output = BytesIO()
    width, height = image.size
    scale = 0.5
    new_size = (int(width * scale), int(height * scale))
    resized = image.resize(new_size, Image.Resampling.LANCZOS)
    resized.save(output, format='JPEG', quality=50, optimize=True)
    return output.getvalue()


def extract_contact_info(image_path, client):
    """Send image to Claude and extract contact information"""
    print(f"Processing: {image_path.name}")

    try:
        jpeg_data = convert_heic_to_jpeg(image_path)
        image_b64 = base64.standard_b64encode(jpeg_data).decode("utf-8")

        response = client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=2048,  # Increased for more detailed extraction
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": image_b64
                        }
                    },
                    {
                        "type": "text",
                        "text": EXTRACTION_PROMPT
                    }
                ]
            }]
        )

        result = response.content[0].text.strip()

        # Remove any markdown code blocks
        if result.startswith('```'):
            lines = result.split('\n')
            result = '\n'.join([line for line in lines if not line.startswith('```')])
            result = result.strip()

        print(f"✓ Extracted data from {image_path.name}")
        return result, image_path.name

    except Exception as e:
        print(f"✗ Error processing {image_path.name}: {e}")
        return None, image_path.name


def parse_csv_result(csv_text, source_filename):
    """Parse CSV result and add source filename"""
    rows = []
    for line in csv_text.strip().split('\n'):
        if line.strip() and not line.startswith('Full Name'):  # Skip any header rows
            # Prepend source filename to row
            rows.append(f"{source_filename},{line}")
    return rows


def main():
    """Main execution function"""
    print("=" * 60)
    print("ENHANCED Business Card Contact Extractor")
    print("=" * 60)

    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY environment variable not set")
        return

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    cards_path = Path(CARDS_FOLDER)
    heic_files = sorted(cards_path.glob("*.HEIC"))

    print(f"\nFound {len(heic_files)} business card images")
    print(f"Output: {OUTPUT_CSV}\n")
    print("This enhanced extraction captures:")
    print("  • All contact details (multiple phones, emails)")
    print("  • LinkedIn and social media")
    print("  • Departments and additional info")
    print("  • Source file tracking\n")

    # Create CSV file with headers
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(CSV_HEADERS)

    # Process each image
    all_rows = []
    errors = []

    for idx, image_path in enumerate(heic_files, 1):
        print(f"[{idx}/{len(heic_files)}] ", end="")
        result, filename = extract_contact_info(image_path, client)

        if result:
            parsed_rows = parse_csv_result(result, filename)
            all_rows.extend(parsed_rows)
        else:
            errors.append(filename)

    # Write all rows
    if all_rows:
        with open(OUTPUT_CSV, 'a', newline='', encoding='utf-8') as f:
            for row in all_rows:
                f.write(row + '\n')

    print(f"\n{'=' * 60}")
    print(f"COMPLETE: {len(all_rows)} contacts extracted from {len(heic_files) - len(errors)} cards")
    print(f"\n✓ Enhanced CSV saved to:")
    print(f"  {OUTPUT_CSV}")

    if errors:
        print(f"\n⚠ Failed to process {len(errors)} files:")
        for err_file in errors:
            print(f"  - {err_file}")
    else:
        print(f"\n✓ All {len(heic_files)} business cards processed successfully!")

    print(f"\nOpen with: open {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
