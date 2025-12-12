<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    // Save to a file (simple method)
    file_put_contents('subscribers.txt', $email . "\n", FILE_APPEND);

    echo "success";
}
?>
