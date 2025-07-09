<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Prepare email to site owner
$recipients = [
  'civils@fossilzim.co.zw',
  'tinoda.matewe@students.uz.ac.zw'
];

// implode them into a single string:
$to = implode(', ', $recipients);

$subject = 'New Notification Signup';
$message = "A new user has subscribed with the email: {$email}";
$headers = "From: civils@fossilzim.co.zw\r\n"
         . "Reply-To: {$email}\r\n"
         . "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail sending failed']);
}
