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
        die("SQL帳密檔案內容格式不正確！");
    }
} else {
    die("SQL帳密檔案不存在或無法讀取！");
}

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
// 檢查連線是否成功
if (!$con) {
    // 顯示錯誤資訊並終止程式
    die("資料庫連線失敗: " . mysqli_connect_error() . " (錯誤碼: " . mysqli_connect_errno() . ")");
}
$con->query("SET NAMES 'utf8'");

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['username']) && isset($input['password'])) {
    $username = $input['username'];
    $password = password_hash($input['password'], PASSWORD_BCRYPT);

    $query = "INSERT INTO member (`username`, `password`) VALUES (?, ?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param("ss", $username, $password);

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
