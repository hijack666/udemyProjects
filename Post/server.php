<?php
$_POST = json_decode(file_get_contents("php://input"), true); // Конвертация в жсон
echo var_dump($_POST); // response от сервера