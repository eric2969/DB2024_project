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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_SESSION['admin'])) {
    //get comp
    $query = "SELECT `compID`, `complainant`, `email`, `reason`, `create_time` FROM `complaint` a LEFT JOIN `admins` b ON a.`EmpID` = b.`indice` WHERE b.`username` = ? OR a.`EmpID` = -1 ORDER BY a.`create_time` DESC";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $_SESSION['admin']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $comps = [];
        while ($row = $result->fetch_assoc()) {
            $comps[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $comps]);
    } else {
        echo json_encode(['success' => false, 'message' => '沒有找到任何投訴資料']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求']);
}

$con->close();
?>

