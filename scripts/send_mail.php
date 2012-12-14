<?php

$mailto = "tyz9ra@yandex.ru";
$subject = 'Письмо от: ';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html;	charset=iso-8859-1' . "\r\n";
$user_name = $_POST ['name'];
$user_email = $_POST ['email'];
$user_subject = $_POST ['subject'];
$user_message = $_POST ['message'];

function Validate($user_name, $user_email, $user_subject, $user_message, $mailto, $subject) {
    $result = TRUE;
    if (!empty($_POST)) {
        $user_name = trim(htmlspecialchars(stripslashes($user_name)));
        $user_email = trim(htmlspecialchars(stripslashes($user_email)));
        $user_subject = trim(htmlspecialchars(stripslashes($user_subject)));
        $user_message = trim(htmlspecialchars(stripslashes($user_message)));
    }

    if (empty($_POST ['name'])) {
        $val_errors ['error'][] = 1;
        $result = FALSE;
    }
    if (empty($_POST['email'])) {
        $val_errors['error']['email'] = 'Вы не ввели мыло';
        $result = FALSE;
    } elseif (!preg_match("/^[0-9a-z_\.]+@[0-9a-z_^\.]+\.[a-z]{2,6}$/i", $user_email)) {
        $val_errors['error'][] = 3;
        $result = FALSE;
    }
    if (empty($_POST['subject'])) {
        $val_errors['error'][] = 4;
        $result = FALSE;
    }

    if (empty($_POST['message'])) {
        $val_errors['error'][] = 5;
        $result = FALSE;
    }
    if ($result == FALSE) {
        echo json_encode($val_errors);
        //echo implode($val_errors, ",");
    } else {
        SendMail($user_name, $user_email, $user_subject, $user_message, $mailto, $subject);
    }
}

function SendMail($user_name, $user_email, $user_subject, $user_message, $mailto, $subject) {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8";
    $headers .= "From: \"" . $user_name . "\" <" . $user_email . ">\r\n";
    $headers .= "X-Mailer: E-mail from my super-site \r\n";
    $message = '<html>
    <head>
        <title></title>
    </head>
        <body>
            <p></p>
               <table border="0">
                <tr align="left">
                    <th>Имя:  </th><th>' . $user_name . '</th>
                </tr>
                <tr align="left">
                    <th>Эл. адрес:  </th><th>' . $user_email . '</th>
                </tr>
                </br>
                <p>Тема:' . $user_subject . '</p>
                <p>' . $user_message . '</p> 
         </body>
</html>';

    if (mail($mailto, $subject . $user_name, $message, $headers)) {
        echo "Ваше письмо отправлено";
    } else {
        echo "По техническим причинам сообщение не было отправлено. 
               Попробуйте снова, а если не получится, обратитесь к разработчикам";

        exit();
    }
}
if (!isset($_COOKIE['reg'])){
    setcookie('reg', $user_name, time()+5);
    
Validate($user_name, $user_email, $user_subject, $user_message, $mailto, $subject);
}
else {
    echo "Подождите немножко";
}
?>
