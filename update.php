<?php
// Ensure the script runs in the project directory so relative paths resolve correctly.
chdir(__DIR__);

$script = escapeshellarg(__DIR__ . '/fetch-posts.py');
$cmd = '/usr/bin/env python3 ' . $script . ' 2>&1';
exec($cmd, $output, $return_var);

$logFile = __DIR__ . '/update.log';
$logEntry = sprintf(
    "%s | return=%d | cmd=%s\n%s\n\n",
    date('Y-m-d H:i:s'),
    $return_var,
    $cmd,
    implode("\n", $output)
);
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Silently complete without outputting anything
?>