<?php
session_start();
if (isset($_COOKIE['admin'])) {
    unset($_COOKIE['admin']);
    setcookie('admin', '', time() - 3600, '/'); // empty value and old timestamp
}
if (isset($_SESSION['admin'])) {
    unset($_SESSION['admin']);
}
session_destroy();
echo json_encode(['message' => '登出成功']);
?>