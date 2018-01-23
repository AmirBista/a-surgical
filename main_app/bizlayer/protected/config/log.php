<?php
return array(
    'class'=>'CLogRouter',
    'routes'=>array(
        array(
            'class'=>'CFileLogRoute',
            'levels'=>'error, warning',
            'logFile'=>'application.'.date('Y-m-d').'.log',
            //'levels'=>'trace, info',
            //'categories'=>'system.db.CDbCommand',
        ),
        array(
            'class'=>'CFileLogRoute',
            'levels'=>'trace, info, error, warning',
            'logFile'=>'cron.'.date('Y-m-d').'.log',
            'categories'=>'cronjob',
        ),        
        array(
            'class'=>'CFileLogRoute',
            //'levels'=>'trace, info',
            'logFile'=>'email.'.date('Y-m-d').'.log',
            'categories'=>'ext.yii-mail.YiiMail',
        ),
/*        array(
            'class'=>'CDbLogRoute',
            'levels'=>'trace, info',
            // 'autoCreateLogTable' => 'true',
            'connectionID' => 'db',
            // 'logFile'=>'application.'.date('Y-m-d').'.log',
            //'levels'=>'trace, info',
            //'categories'=>'system.db.CDbCommand',
        ),*/
        /*
        array(
            'class'=>'CFileLogRoute',
            'levels'=>'error, warning, trace, info',
            'logFile'=>'database.'.date('Y-m-d').'.log',
            'categories'=>'system.db.*',
        ),
        */
        // uncomment the following to show log messages on web pages
        /*
        array(
            'class'=>'CWebLogRoute',
            'categories'=>'system.db.CDbCommand',
            'showInFireBug'=>true,
        ),
        */
    ),
);