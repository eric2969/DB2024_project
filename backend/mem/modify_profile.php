<?php
header('Content-Type: application/json');

session_start();

$file_path = '../credentials.txt';

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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_COOKIE['member_id']) && isset($input['name']) && isset($input['addr']) && isset($input['phone']) && isset($input['date']) && isset($input['passwd'])) {
    $uid = $_COOKIE['member_id'];
    //name
    $query = "UPDATE `member` SET `Mem_name`=?,`Mem_bth`=?,`Mem_phone`=?,`Mem_addr`=? WHERE MemID = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("sssss", $input['name'], $input['date'], $input['phone'], $input['addr'], $uid);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => '找不到該會員']);
        $stmt->close();
        $con->close();
        die();
    }
    //passwd
    if($input['passwd'] != '') {
        $password = password_hash($input['passwd'], PASSWORD_BCRYPT);
        $query = "UPDATE `member` SET `Mem_pass`=? WHERE MemID = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param("ss", $password, $uid);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'logout' => 1, 'message' => '修改成功']);
        } else {
            echo json_encode(['success' => false, 'message' => '系統錯誤']);
        }
        $stmt->close();
        $con->close();
        die();
    }
    echo json_encode(['success' => true, 'logout' => 0, 'message' => '修改成功']);
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => '尚未登入']);
}

$con->close();
?>
