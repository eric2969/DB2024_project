<?php
session_start();

if (!isset($_SESSION['admin']) && isset($_COOKIE['admin'])) {
    $_SESSION['admin'] = $_COOKIE['admin'];
}

if (isset($_SESSION['admin'])) {
    echo json_encode(['logged_in' => true, 'username' => $_SESSION['admin']]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>
