
<?php
$to      = 'tai.traffic@gmail.com';
$subject = 'Обратный звонок с heavensmoke';
$message = 'Заявка.  Имя: ' . $_POST["name"] . ' Телефон: ' . $_POST["phone"] ;
$headers = 'From: hello@heavensmoke.ru' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: hello@heavensmoke.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
?>
