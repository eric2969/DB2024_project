<?php
    $db_host = "localhost";
    $db_user = "iim";
    $db_pass = "fuckyou";
    $db_name = "iim";
    $con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $con -> query("SET NAMES 'utf8'");

    $date = $_POST['date'];

    $query = "SELECT `date` FROM `holiday` WHERE date >= ? ORDER BY `date` ASC";
    $main = $con->prepare($query);
    $main->bind_param('s', $date);
    $main->execute();
    $result = $main->get_result();
    if($result -> num_rows){
        while ($row = $result->fetch_assoc()){
            $data[] = $row['date'];
            //$data[] = $row;
        }
        $json_data = json_encode($data);
        echo $json_data;
    }
    else
        echo "empty";
?>