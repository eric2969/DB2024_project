<?php
header('Content-Type: application/json');

session_start();

if (!isset($_SESSION['admin'])) {
    echo json_encode(['success' => false, 'message' => '未授權的訪問']);
    exit;
}

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
        echo "檔案內容格式不正確！";
    }
} else {
    echo "檔案不存在或無法讀取！";
}



$date = $_POST['date'];

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
$con->query("SET NAMES 'utf8'");

$query = "SELECT `indice`, `date`, `time`, `name`, `phone`, `people`, `other` FROM book where date = ? ORDER BY `time` ASC";
$stmt = $con ->prepare($query);
$stmt->bind_param("s", $date);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $bookings]);
} else {
    echo json_encode(['success' => false, 'message' => '沒有找到任何訂位資訊']);
}

$con->close();
?>
