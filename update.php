<?php
// Run the Python script to update posts.json
exec('python3 fetch-posts.py 2>&1', $output, $return_var);

// Output the result for debugging
if ($return_var === 0) {
    echo "Posts updated successfully\n";
} else {
    echo "Error updating posts:\n";
    echo implode("\n", $output);
}
?>