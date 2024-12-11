<?php
session_start();
if (isset($_COOKIE['admin']) && $_COOKIE['admin'] != "") {
    $_SESSION['admin'] = $_COOKIE['admin'];
    echo json_encode(['logged_in' => true, 'username' => $_COOKIE['admin']]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>