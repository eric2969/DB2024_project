<?php
header('Content-Type: application/json');

session_start();

if (!isset($_SESSION['admin'])) {
    echo json_encode(['success' => false, 'message' => '未授權的訪問']);
    exit;
}

$db_host = "localhost";
$db_user = "iim";
$db_pass = "fuckyou";
$db_name = "iim";

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
$con->query("SET NAMES 'utf8'");

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['id'])) {
    $id = $input['id'];
    $date = $input['date'];
    $time = $input['time'];
    $name = $input['name'];
    $people = $input['people'];
    $phone = $input['phone'];
    $other = $input['other'];

    $query = "UPDATE book SET `date` = ?, `time` = ?, `name` = ?, `people` = ?, `phone` = ?, `other` = ? WHERE `indice` = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("sssissi", $date, $time, $name, $people, $phone, $other, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => '更新成功']);
    } else {
        echo json_encode(['success' => false, 'message' => '更新失敗']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求']);
}

$con->close();
?>
