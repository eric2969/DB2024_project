<?php
session_start();
if (isset($_COOKIE['admin'])) {
    unset($_COOKIE['admin']);
    setcookie('admin', '', time() - 3600, '/'); // empty value and old timestamp
}
if (isset($_COOKIE['admin_id'])) {
    unset($_COOKIE['admin_id']);
    setcookie('admin_id', '', time() - 3600, '/'); // empty value and old timestamp
}
if (isset($_SESSION['admin'])) {
    unset($_SESSION['admin']);
}
if (isset($_SESSION['admin_id'])) {
    unset($_SESSION['admin_id']);
}
session_destroy();
echo json_encode(['message' => '登出成功']);
?>