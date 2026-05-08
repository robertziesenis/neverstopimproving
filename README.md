# Never Stop Improving
An artistic web project that displays the 100 latest post titles from the subreddit `r/selfimprovement` as an infinite scrolling ticker.

***

## Project Info
### View online
See published version at [neverstopimproving.robertziesenis.xyz](https://neverstopimproving.robertziesenis.xyz)

### Credits
Project by Robert Ziesenis
Version 1.0: May 2026

### Contact
[robertziesenis.xyz](https://robertziesenis.xyz)
[hey@robertziesenis.xyz](mailto:hey@robertziesenis.xyz)

***

## Hosting by yourself
### PHP Server requirement
Since the project is using PHP to scrape information from reddit's RSS feed, a PHP-capable web server is required for the code to work.

### Running locally
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
