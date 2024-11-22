<?php
    $db_host = "localhost";
    $db_user = "iim";
    $db_pass = "fuckyou";
    $db_name = "iim";
    $con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $con -> query("SET NAMES 'utf8'");

    $date = $_POST['date'];
    $time = $_POST['time'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $people = $_POST['people'];
    $other = $_POST['other'];

    $query = "INSERT INTO book (`date`, `time`, `name`, `phone`, `people`, `other`) VALUES (?,?,?,?,?,?)";
    $main = $con -> prepare($query);
    $main -> bind_param("ssssss", $date, $time, $name, $phone, $people, $other);
    $result = $main -> execute();
    if($result){
        echo "successful";
    }
    else{
        echo "error";
    }
?>