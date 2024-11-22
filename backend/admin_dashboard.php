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
