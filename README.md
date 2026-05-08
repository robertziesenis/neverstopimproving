# Never Stop Improving
A web project that displays the latest posts from the subreddit `r/selfimprovement` as an infinite scrolling ticker.

## Running locally
Serve the project from a PHP-capable web server and open the site in your browser.

Example:
```bash
cd /path/to/selfimprovement
php -S localhost:8000
```

Then open:
```
http://localhost:8000/
```

The app uses `rss-proxy.php` to fetch Reddit RSS from the server side and avoid browser CORS restrictions.