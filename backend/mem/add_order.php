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
echo json_encode($input);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['name']) && isset($input['phone']) && isset($input['addr']) && isset($input['cart']) && isset($input['income'])) {
    if(isset($_SESSION['member'])){
        $memid = $_SESSION['member'];
        $name = $input['name'];
        $phone = $input['phone'];
        $addr = $input['addr'];
        $cart = json_decode($input['cart'], true);
        $income = $input['income'];

        $query = "INSERT INTO orders (`CusID`, `Name`, `Phone`, `address`, `income`) VALUES(?, ?, ?, ?, ?)";
        $stmt = $con->prepare($query);
        $stmt->bind_param("sssss", $memid, $name, $phone, $addr, $income);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => '傳送成功']);
            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => '傳送失敗']);
            $stmt->close();
            $con->close();
            die();
        }
        //get OrdID
        $query = "SELECT LAST_INSERT_ID()";
        $stmt = $con->prepare($query);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($ordid);
        $stmt->fetch();
        if ($stmt->num_rows > 0) {
            $stmt->close();
            foreach ($cart as $merid => $quan) {
                print("Grade: {$gradeText}({$grade}) \n");
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'error']);
            $stmt->close();
            $con->close();
            die();
        }
    } else {
        echo json_encode(['success' => false, 'message' => '尚未登入']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '無效的請求']);
}

$con->close();
?>
