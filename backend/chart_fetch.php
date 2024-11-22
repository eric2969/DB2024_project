<?php
    $db_host = "localhost";
    $db_user = "iim";
    $db_pass = "fuckyou";
    $db_name = "iim";
    $con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $con -> query("SET NAMES 'utf8'");

    $week = $_POST['week'];

    for ($i = 20; $i >= 1; $i--) {
        $query = "SELECT SUM(price) FROM money WHERE week = (?)";
        $main = $con->prepare($query);
        $par = $week - $i;
        $main->bind_param('s', $par);
        $main->execute();
        $result = $main->get_result();
        while ($row = $result->fetch_assoc()){
            $data[] = $row['SUM(price)'];
        }
    }

    $json_data = json_encode($data);
    echo $json_data;
?>