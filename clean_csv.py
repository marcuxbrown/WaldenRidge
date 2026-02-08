#!/usr/bin/env python3
"""Clean up CSV file by removing explanatory text"""

# Read and clean CSV
with open('business_cards_enhanced.csv', 'r') as f:
    lines = f.readlines()

# Keep header and valid data rows only
clean_lines = []
for line in lines:
    # Keep header
    if line.startswith('Source File,'):
        clean_lines.append(line)
    # Keep data rows that start with IMG_ and have proper CSV structure
    elif line.startswith('IMG_') and line.count(',') > 10:
        # Skip lines with explanation text or markdown
        if 'extract' not in line.lower() and '```' not in line:
            clean_lines.append(line)

# Write cleaned file
with open('business_cards_enhanced.csv', 'w') as f:
    f.writelines(clean_lines)

print(f'✓ Cleaned CSV: {len(clean_lines)-1} data rows ({len(lines) - len(clean_lines)} junk rows removed)')
