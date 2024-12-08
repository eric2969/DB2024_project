<?php
session_start();
function remember(){
    if (!isset($_SESSION['member']) && isset($_COOKIE['member'])) {
        $_SESSION['member'] = $_COOKIE['member'];
    }

    if (isset($_SESSION['admin'])) {
        echo json_encode(['logged_in' => true, 'username' => $_SESSION['member']]);
    } else {
        echo json_encode(['logged_in' => false]);
    }
}

?>
