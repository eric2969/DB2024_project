<?php
header('Content-Type: application/json');

session_start();

$db_host = "localhost";
$db_user = "iim";
$db_pass = "fuckyou";
$db_name = "iim";

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
$con->query("SET NAMES 'utf8'");

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['username']) && isset($input['password'])) {
    $username = $input['username'];
    $password = $input['password'];
    $remember = isset($input['remember']) ? $input['remember'] : false;

    $query = "SELECT `password` FROM admins WHERE `username` = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        $_SESSION['admin'] = $username;
        if ($remember) {
            setcookie('admin', $username, time() + (300), "/"); // 5min
        }
        echo json_encode(['success' => true, 'message' => '登入成功']);
    } else {
        echo json_encode(['success' => false, 'message' => '用戶名或密碼錯誤']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求']);
}

$con->close();
?>
