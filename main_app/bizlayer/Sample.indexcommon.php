<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/../../../../../../frameworks/yii-1.1.15/framework/yii.php';
$config=dirname(__FILE__).'/protected/config/main.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

$constants=dirname(__FILE__).'/protected/config/constants.php';
$globals=dirname(__FILE__).'/protected/config/globals.php';
$functions=dirname(__FILE__).'/protected/config/functions_rpt.php';

$mpdf = dirname(__FILE__).'/protected/extensions/mpdf/mpdf.php';
require_once($mpdf);

require_once($constants);
require_once($globals);
require_once($functions);
require_once($yii);

