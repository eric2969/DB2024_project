<?php
session_start();
if (isset($_COOKIE['member']) && $_COOKIE['member'] != "") {
    echo json_encode(['logged_in' => true, 'username' => $_COOKIE['member']]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>