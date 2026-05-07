import os
import sys
import urllib.request
import json
from datetime import datetime

reddit_url = 'https://old.reddit.com/r/selfimprovement/new.json?limit=100&raw_json=1'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:118.0) Gecko/20100101 Firefox/118.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://old.reddit.com/',
    'Connection': 'close'
}

req = urllib.request.Request(reddit_url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
except Exception as e:
    print(f'Error fetching Reddit data: {e}', file=sys.stderr)
    sys.exit(1)

posts = []
for child in data['data'].get('children', []):
    post = {
        'title': child['data'].get('title', ''),
        'author': child['data'].get('author', ''),
        'url': f"https://reddit.com{child['data'].get('permalink', '')}",
        'created': datetime.fromtimestamp(child['data'].get('created_utc', 0)).strftime('%d.%m.%Y %H:%M:%S')
    }
    posts.append(post)

script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, 'posts.json')
temp_path = output_path + '.tmp'

# Write to temp file first to avoid partial reads
with open(temp_path, 'w') as f:
    json.dump(posts, f, indent=2)

# Atomically replace the old file
os.replace(temp_path, output_path)

print(f'Posts saved to {output_path}')