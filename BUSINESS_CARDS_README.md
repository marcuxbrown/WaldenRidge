# Business Card Extractor

Automatically extracts contact information from business card photos and outputs to CSV.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Your Claude API Key

Get your API key from: https://console.anthropic.com/settings/keys

```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

Or add it to your `~/.zshrc` or `~/.bashrc`:
```bash
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

## Usage

### Process All Business Cards

```bash
python extract_business_cards.py
```

This will:
1. Read all 33 HEIC images from your iCloud folder
2. Send each to Claude for contact extraction
3. Save results to `business_cards_extracted.csv`

### View Results

```bash
open business_cards_extracted.csv
```

Or import into:
- Excel
- Google Sheets
- Any database/CRM system

## Output Format

CSV with columns:
- Full Name
- Job Title
- Company Name
- Email Address
- Phone Number
- Mobile Number
- Website URL
- Street Address
- City
- State/Province
- Postal Code
- Country

## Cost Estimate

- ~33 images × $0.015 per image = **~$0.50 total**

## Troubleshooting

**"ANTHROPIC_API_KEY not set"**
- Run: `export ANTHROPIC_API_KEY='your-key'`

**"No module named 'pillow_heif'"**
- Run: `pip install pillow-heif`

**Rate limit errors**
- The script processes images sequentially to avoid hitting rate limits
- If you hit limits, the script will show which files failed

## Files

- `extract_business_cards.py` - Main extraction script
- `requirements.txt` - Python dependencies
- `business_cards_extracted.csv` - Output file (created after running)
