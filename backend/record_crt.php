<?php
    $db_host = "localhost";
    $db_user = "iim";
    $db_pass = "fuckyou";
    $db_name = "iim";
    $con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $con -> query("SET NAMES 'utf8'");

    $date = $_POST['date'];
    $month = $_POST['month'];
    $week = $_POST['week'];
    $time = $_POST['time'];
    $price = $_POST['price'];

    $query = "INSERT INTO money (`date` , `month`, `week`, `time`, `price`) VALUES (?,?,?,?,?)";
    $main = $con -> prepare($query);
    $main -> bind_param("sssss", $date, $month, $week, $time, $price);
    $result = $main -> execute();
    if($result){
        echo "successful";
    }
    else{
        echo "error";
    }
?>