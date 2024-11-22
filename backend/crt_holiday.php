<?php
    $db_host = "localhost";
    $db_user = "iim";
    $db_pass = "fuckyou";
    $db_name = "iim";
    $con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $con -> query("SET NAMES 'utf8'");

    /*$date = $_POST['date'];

    $query = "SELECT `date` FROM `holiday` WHERE date = ?";
    $main = $con->prepare($query);
    $main->bind_param('s', $date);
    $main->execute();
    $result = $main->get_result();
    if($result -> num_rows){
        echo "existed";
    }
    else{
        $query = "INSERT INTO holiday (`date`) VALUES (?)";
        $main = $con -> prepare($query);
        $main -> bind_param("s", $date);
        $result = $main -> execute();
        if($result){
            echo "successful";
        }
        else{
            echo "error";
        }
    }*/
?>