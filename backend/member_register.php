<?php
header('Content-Type: application/json');

session_start();

$file_path = 'credentials.txt';

// 確認檔案存在且可讀取
if (file_exists($file_path) && is_readable($file_path)) {
    // 讀取檔案內容
    $lines = file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    // 確認檔案至少有兩行
    if (count($lines) >= 4) {
        $db_host = trim($lines[0]);
        $db_user = trim($lines[1]);
        $db_pass = trim($lines[2]);
        $db_name = trim($lines[3]);
    } else {
        echo json_encode(['success' => false, 'message' => "SQL file format error"]);
        die("SQL file format error");
    }
} else {
    echo json_encode(['success' => false, 'message' => "SQL file does not exist"]);
    die("SQL file does not exist");
}
$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
// 檢查連線是否成功
if (!$con) {
    // 顯示錯誤資訊並終止程式
    echo json_encode(['success' => false, 'message' => "connection with DataBase failed: " . mysqli_connect_error() . " (err: " . mysqli_connect_errno() . ")"]);
    die("connection with DataBase failed: " . mysqli_connect_error() . " (err: " . mysqli_connect_errno() . ")");
}
$con->query("SET NAMES 'utf8'");

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['username']) && isset($input['mail']) && isset($input['bdate']) && isset($input['password'] )) {
    $query = "SELECT `Mem_pass` FROM member WHERE `Mem_email` = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $input['mail']);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => '使用者已存在']);
        die("User exists");
    }
    $password = password_hash($input['password'], PASSWORD_BCRYPT);

    $query = "INSERT INTO member (`Mem_email`, `Mem_name`, `Mem_bth`, `Mem_pass`) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param("ssss", $input['mail'], $input['username'], $input['bdate'], $password);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => '註冊成功']);
    } else {
        echo json_encode(['success' => false, 'message' => '註冊失敗']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求']);
}

$con->close();
?>
