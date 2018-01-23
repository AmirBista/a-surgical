<?php
defined('POPUP_SELECTION') or define('POPUP_SELECTION',TRUE);
$indexcommon=dirname(__FILE__).'/indexcommon.php';
require_once($indexcommon);
Yii::createWebApplication($config)->run();
