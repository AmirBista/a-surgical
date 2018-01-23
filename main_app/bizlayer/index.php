<?php
defined('POPUP_SELECTION') or define('POPUP_SELECTION',FALSE);
$indexcommon=dirname(__FILE__).'/indexcommon.php';
require_once($indexcommon);

Yii::createWebApplication($config)->run();
