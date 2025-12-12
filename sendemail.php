<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name         = $_POST['name'] ?? '';
    $email        = $_POST['email'] ?? '';
    $phone        = $_POST['phone'] ?? '';
    $subject      = $_POST['subject'] ?? '';
    $inquiry_type = $_POST['inquiry_type'] ?? '';
    $message      = $_POST['message'] ?? '';

    $to = "ronlinx6@gmail.com";  
    $full_subject = "MpaMpe Contact Form: $subject";

    $body = "
    Name: $name
    Email: $email
    Phone: $phone
    Inquiry Type: $inquiry_type
    Message:
    $message
    ";

    $headers = "From: info@mpampe.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $full_subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
