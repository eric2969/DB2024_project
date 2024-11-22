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

    $query = "SELECT SUM(price) FROM money WHERE date = ?";
    $main = $con->prepare($query);
    $main->bind_param('s', $date);
    $main->execute();
    $result = $main->get_result();
    while ($row = $result->fetch_assoc()){
        $data['date'] = $row['SUM(price)'];
        //$data[] = $row;
    }

    $query = "SELECT SUM(price) FROM money WHERE week = ?";
    $main = $con->prepare($query);
    $main->bind_param('s', $week);
    $main->execute();
    $result = $main->get_result();
    while ($row = $result->fetch_assoc()){
        $data['week'] = $row['SUM(price)'];
        //$data[] = $row;
    }

    $query = "SELECT SUM(price) FROM money WHERE month = ?";
    $main = $con->prepare($query);
    $main->bind_param('s', $month);
    $main->execute();
    $result = $main->get_result();
    while ($row = $result->fetch_assoc()){
        $data['month'] = $row['SUM(price)'];
        //$data[] = $row;
    }

    $json_data = json_encode($data);
    echo $json_data;
?>