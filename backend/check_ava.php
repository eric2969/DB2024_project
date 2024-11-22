<?php
    $db_host = "localhost";
    $db_user = "iim";
    $db_pass = "fuckyou";
    $db_name = "iim";
    $con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $con -> query("SET NAMES 'utf8'");

    $date = $_POST['date'];
    $time = $_POST['time'];
    $limit = $_POST['limit'];
    $people = $_POST['people'];

    $query = "SELECT SUM(people) FROM `book` WHERE date = ? AND time = ?";
    $main = $con->prepare($query);
    $main->bind_param('ss', $date, $time);
    $main->execute();
    $result = $main->get_result();
    while ($row = $result->fetch_assoc()){
        if($row['SUM(people)'] + $people > $limit)
            echo json_encode(['success' => true, 'message' => 'not_ava']);
        else
            echo json_encode(['success' => true, 'message' => 'ava']);
        //$data[] = $row;
    }
?>