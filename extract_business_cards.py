#!/usr/bin/env python3
"""
Business Card Extractor
Processes HEIC images and extracts contact information to CSV
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
OUTPUT_CSV = "/Users/525n/clawd/workspaces/WaldenRidge-marketing/business_cards_extracted.csv"
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# Master prompt for extraction
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


def convert_heic_to_jpeg(heic_path):
    """Convert HEIC to JPEG in memory and return bytes"""
    image = Image.open(heic_path)
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')

    # Save to bytes
    from io import BytesIO
    output = BytesIO()
    image.save(output, format='JPEG', quality=95)
    return output.getvalue()


def extract_contact_info(image_path, client):
    """Send image to Claude and extract contact information"""
    print(f"Processing: {image_path.name}")

    try:
        # Convert HEIC to JPEG
        jpeg_data = convert_heic_to_jpeg(image_path)
        image_b64 = base64.standard_b64encode(jpeg_data).decode("utf-8")

        # Send to Claude
        response = client.messages.create(
            model="claude-sonnet-4-5-20250929",
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
        return result, image_path.name

    except Exception as e:
        print(f"✗ Error processing {image_path.name}: {e}")
        return None, image_path.name


def main():
    """Main execution function"""
    print("Business Card Contact Extractor")
    print("=" * 50)

    # Check API key
    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY environment variable not set")
        print("Set it with: export ANTHROPIC_API_KEY='your-key-here'")
        return

    # Initialize Claude client
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    # Get all HEIC files
    cards_path = Path(CARDS_FOLDER)
    heic_files = sorted(cards_path.glob("*.HEIC"))

    print(f"\nFound {len(heic_files)} business card images")
    print(f"Output will be saved to: {OUTPUT_CSV}\n")

    # Process each image
    all_results = []
    errors = []

    for idx, image_path in enumerate(heic_files, 1):
        print(f"[{idx}/{len(heic_files)}] ", end="")
        result, filename = extract_contact_info(image_path, client)

        if result:
            all_results.append({
                'filename': filename,
                'data': result
            })
        else:
            errors.append(filename)

    # Combine all CSV results
    print(f"\n{'=' * 50}")
    print(f"Processed: {len(all_results)} successful, {len(errors)} errors")

    if all_results:
        # Write combined CSV
        with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
            # Write header from first result
            first_result = all_results[0]['data']
            lines = first_result.strip().split('\n')

            if len(lines) > 0:
                # Write header
                f.write(lines[0] + '\n')

                # Write data from all results
                for result_dict in all_results:
                    result_lines = result_dict['data'].strip().split('\n')
                    # Skip header line, write data lines
                    for line in result_lines[1:]:
                        if line.strip():  # Only write non-empty lines
                            f.write(line + '\n')

        print(f"\n✓ CSV saved to: {OUTPUT_CSV}")
        print(f"\nYou can now open this file in Excel or Google Sheets!")

    if errors:
        print(f"\n⚠ Failed to process {len(errors)} files:")
        for err_file in errors:
            print(f"  - {err_file}")


if __name__ == "__main__":
    main()
