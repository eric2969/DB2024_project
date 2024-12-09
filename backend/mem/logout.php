<?php
session_start();
if (isset($_COOKIE['member'])) {
    unset($_COOKIE['member']);
    setcookie('member', '', time() - 3600, '/'); // empty value and old timestamp
}
session_destroy();
echo json_encode(['message' => '登出成功']);
?>