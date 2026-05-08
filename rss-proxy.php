<?php
chdir(__DIR__);
$subreddit = 'selfimprovement';
$feedUrl = "https://www.reddit.com/r/{$subreddit}/new.rss?limit=100";

$options = [
    'http' => [
        'method' => 'GET',
        'header' => "User-Agent: selfimprovement-rss-proxy/1.0\r\nAccept: application/rss+xml, application/atom+xml\r\n"
    ]
];

$context = stream_context_create($options);
$feed = @file_get_contents($feedUrl, false, $context);

if ($feed === false) {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Fehler: Konnte den Reddit-RSS-Feed nicht laden.';
    exit;
}

header('Content-Type: application/rss+xml; charset=utf-8');
header('Access-Control-Allow-Origin: *');
echo $feed;
