<?php
session_start();

if (!isset($_SESSION['member']) && isset($_COOKIE['member'])) {
    $_SESSION['member'] = $_COOKIE['member'];
}

if (isset($_SESSION['member'])) {
    echo json_encode(['logged_in' => true, 'username' => $_SESSION['member']]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>
