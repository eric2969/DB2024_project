<?php
header('Content-Type: application/json');

$db_host = "localhost";
$db_user = "iim";
$db_pass = "fuckyou";
$db_name = "iim";

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
$con->query("SET NAMES 'utf8'");

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['username']) && isset($input['password'])) {
    $username = $input['username'];
    $password = password_hash($input['password'], PASSWORD_BCRYPT);
    //find exist user
    $query = "SELECT `indice` FROM admins WHERE `username` = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    if($stmt->num_rows > 0){
        echo json_encode(['success' => false, 'message' => '使用者已被註冊!']);
    }
    else{
        $query = "INSERT INTO admins (`username`, `password`) VALUES (?, ?)";
        $stmt = $con->prepare($query);
        $stmt->bind_param("ss", $username, $password);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => '註冊成功!']);
        } else {
            echo json_encode(['success' => false, 'message' => '註冊失敗!']);
        }
        $stmt->close();
    }
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求!']);
}

$con->close();
?>
