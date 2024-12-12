<?php
session_start();
if (isset($_COOKIE['member'])) {
    unset($_COOKIE['member']);
    setcookie('member', '', time() - 3600, '/'); // empty value and old timestamp
}
if (isset($_COOKIE['member_id'])) {
    unset($_COOKIE['member_id']);
    setcookie('member_id', '', time() - 3600, '/'); // empty value and old timestamp
}
if (isset($_SESSION['member'])) {
    unset($_SESSION['member']);
}
if (isset($_SESSION['member_id'])) {
    unset($_SESSION['member_id']);
}
session_destroy();
echo json_encode(['message' => '登出成功']);
?>