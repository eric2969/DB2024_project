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

    $query = "DELETE FROM book WHERE `indice` = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => '刪除成功']);
    } else {
        echo json_encode(['success' => false, 'message' => '刪除失敗']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求']);
}

$con->close();
?>
