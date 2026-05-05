import urllib.request
import json
from datetime import datetime

reddit_url = 'https://www.reddit.com/r/selfimprovement/new.json?limit=100'

req = urllib.request.Request(reddit_url, headers={
    'User-Agent': 'script:scrollingtext:v1.0 (by /u/anonymous)'
})

with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

posts = []
for child in data['data']['children']:
    post = {
        'title': child['data']['title'],
        'author': child['data']['author'],
        'url': f"https://reddit.com{child['data']['permalink']}",
        'created': datetime.fromtimestamp(child['data']['created_utc']).strftime('%d.%m.%Y %H:%M:%S')
    }
    posts.append(post)

with open('posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print('Posts saved to posts.json')