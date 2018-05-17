
<?php
$to      = 'spbgazon@gmail.com';
$subject = 'Письмо с сайта Петербургские газоны';
$message = 'Имя: ' . $_POST["name"] . ' Телефон: ' . $_POST["phone"] . ' Email: ' . $_POST["email"] . ' Размер участка: ' . $_POST["size"] ;
$headers = 'From: hello@spbgazon.ru' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: hello@spbgazon.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
?>
