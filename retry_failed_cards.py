#!/usr/bin/env python3
"""
Retry failed business cards with image resizing
"""

import anthropic
import base64
import os
from pathlib import Path
from PIL import Image
import pillow_heif

# Register HEIF opener with PIL
pillow_heif.register_heif_opener()

# Configuration
CARDS_FOLDER = os.environ.get("CARDS_FOLDER", "./business_cards")
OUTPUT_CSV = os.environ.get("OUTPUT_CSV", "./business_cards_extracted.csv")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# Failed images to retry
FAILED_IMAGES = [
    "IMG_1857.HEIC",
    "IMG_1859.HEIC",
    "IMG_1869.HEIC"
]

EXTRACTION_PROMPT = """You are a business card data extraction specialist. Extract all available contact information from the business card image and return it in CSV format.

**Extract these fields (use empty string if not present):**
- Full Name
- Job Title
- Company Name
- Email Address
- Phone Number
- Mobile Number (if different from phone)
- Website URL
- Street Address
- City
- State/Province
- Postal Code
- Country

**Instructions:**
1. Extract information exactly as it appears (preserve capitalization, spacing)
2. For phone numbers, include country code if visible
3. If multiple phone numbers exist, put primary in "Phone Number" and secondary in "Mobile Number"
4. If no clear distinction between phone types, put both in "Phone Number" separated by semicolon
5. Extract full address components separately when possible
6. If the card has multiple people, create separate rows for each

**Output Format:**
Return ONLY the CSV data with headers on the first line. No explanations or additional text.

**Example Output:**
Full Name,Job Title,Company Name,Email Address,Phone Number,Mobile Number,Website URL,Street Address,City,State/Province,Postal Code,Country
John Smith,Senior Developer,Tech Corp,john@techcorp.com,+1-555-0123,,www.techcorp.com,123 Main St,San Francisco,CA,94105,USA

Now process the business card image provided."""


def convert_heic_to_jpeg(heic_path, max_size_bytes=4_500_000):
    """Convert HEIC to JPEG with size optimization"""
    image = Image.open(heic_path)

    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')

    # Try progressively lower quality until size is acceptable
    from io import BytesIO
    for quality in [95, 85, 75, 65, 55]:
        output = BytesIO()

        # Also reduce dimensions if needed
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
            print(f"  Optimized to {len(jpeg_bytes) / 1_000_000:.1f} MB (quality={quality})")
            return jpeg_bytes

    # If still too large, try more aggressive resizing
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
        # Convert HEIC to JPEG with optimization
        jpeg_data = convert_heic_to_jpeg(image_path)
        image_b64 = base64.standard_b64encode(jpeg_data).decode("utf-8")

        # Send to Claude
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
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
        print(f"✓ Extracted data from {image_path.name}")
        return result

    except Exception as e:
        print(f"✗ Error processing {image_path.name}: {e}")
        return None


def main():
    """Main execution function"""
    print("Retrying Failed Business Cards")
    print("=" * 50)

    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY environment variable not set")
        return

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    cards_path = Path(CARDS_FOLDER)

    print(f"\nRetrying {len(FAILED_IMAGES)} failed images...\n")

    new_results = []
    still_failed = []

    for idx, filename in enumerate(FAILED_IMAGES, 1):
        print(f"[{idx}/{len(FAILED_IMAGES)}] ", end="")
        image_path = cards_path / filename

        if not image_path.exists():
            print(f"File not found: {filename}")
            still_failed.append(filename)
            continue

        result = extract_contact_info(image_path, client)

        if result:
            new_results.append(result)
        else:
            still_failed.append(filename)

    # Append new results to existing CSV
    if new_results:
        print(f"\n{'=' * 50}")
        print(f"Successfully extracted {len(new_results)} more cards!")

        with open(OUTPUT_CSV, 'a', newline='', encoding='utf-8') as f:
            for result in new_results:
                lines = result.strip().split('\n')
                # Skip header, write data lines
                for line in lines[1:]:
                    if line.strip():
                        f.write(line + '\n')

        print(f"✓ Appended to: {OUTPUT_CSV}")

    if still_failed:
        print(f"\n⚠ Still failed ({len(still_failed)}):")
        for filename in still_failed:
            print(f"  - {filename}")
    else:
        print(f"\n✓ All cards successfully processed!")


if __name__ == "__main__":
    main()
