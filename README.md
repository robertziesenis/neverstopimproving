# Never Stop Improving
A web project that displays the 100 newest posts of the sub reddit r/selfimprovement as an infinite scrolling text.

## Updating Posts
To update the displayed posts with the latest from Reddit, run:
```
python3 fetch-posts.py
```
This will fetch the latest 100 posts and save them to `posts.json`.

### Automatic Updates Every Minute (Alternative Method)
Since SSH cron jobs are not allowed, use an external cron service:

1. Upload `update.php` to your server (it's already created).
2. Sign up for a free cron service like [cron-job.org](https://cron-job.org) or [easycron.com](https://www.easycron.com).
3. Create a new cron job that calls `https://yourdomain.com/update.php` every minute.
4. The service will trigger the PHP script, which runs the Python script to update `posts.json`.

This achieves the same result without needing SSH access.
