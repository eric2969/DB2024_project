<?php
	header('Content-Type: application/json');

	$db_host = "localhost";
	$db_user = "iim";
	$db_pass = "fuckyou";
	$db_name = "iim";

	$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
	$con->query("SET NAMES 'utf8'");

	$input = json_decode(file_get_contents('php://input'), true);

	if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($input['phone'])) {
	    $phone = $input['phone'];

	    $query = "SELECT `date`, `time`, `name`, `people`, `other` FROM book WHERE `phone` = ?";
	    $main = $con->prepare($query);
	    $main->bind_param("s", $phone);
	    $main->execute();
	    $result = $main->get_result();

	    if ($result->num_rows > 0) {
	        $bookings = [];
	        while ($row = $result->fetch_assoc()) {
	            $bookings[] = [
	                'date' => $row['date'],
	                'time' => $row['time'],
	                'name' => $row['name'],
	                'people' => $row['people'],
	                'other' => $row['other']
	            ];
	        }
	        echo json_encode(['success' => true, 'data' => $bookings]);
	    } else {
	        echo json_encode(['success' => false, 'message' => '沒有找到任何訂位資訊。']);
	    }
	    $main->close();
	} else {
	    echo json_encode(['success' => false, 'message' => '無效的請求。']);
	}

	$con->close();
?>
