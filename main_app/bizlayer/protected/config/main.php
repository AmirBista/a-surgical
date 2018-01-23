<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
Yii::setPathOfAlias('commonExtension', COMMON_EXTENSION);
return array(
    'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
    'name'=>'hBase',
    'defaultController' => 'index',
    // preloading 'log' component
    'preload'=>array('log'),

    // autoloading model and component classes
    'import'=>array(
        'application.models.*',
        'application.components.*',
        // 'application.extensions.wideimage.*',
        // 'ext.yii-mail.YiiMailMessage'
    ),

    'modules'=>array(
        // uncomment the following to enable the Gii tool
        'gii'=>array(
            'class'=>'system.gii.GiiModule',
            'password'=>FALSE,
            // If removed, Gii defaults to localhost only. Edit carefully to taste.
            'ipFilters'=>array('127.0.0.1','::1'),
        ),
    ),
    'timeZone' => 'Asia/Kathmandu',  //'Asia/Tokyo',
    // application components
    'components'=>array(
        'user'=>array(
            'class' => 'WebUser',
            // enable cookie-based authentication
            'allowAutoLogin'=>true,
            'autoRenewCookie'=>true,
            'loginUrl'=>array('site/login'),
        ),
        //enable db session
        'session'=>array(
            'class' => 'CAppDbHttpSession',//CDbHttpSession',
            'connectionID' => 'db',
            'sessionTableName' => 'app_session',
            'autoCreateSessionTable' => false,
            'sessionName'=>'hbase@123',
            'autoStart' => true,
            'timeout' => 86400,
            'gcProbability'=>'5'
        ),
        // uncomment the following to enable URLs in path-format
        'urlManager'=>array(
            'urlFormat'=>'path',
            'showScriptName'=>false,
            'rules'=>array(
                '<controller:\w+>/<id:\d+>'=>'<controller>/view',
                '<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
                '<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
            ),
        ),

        // 'db'=>array(
        //     'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
        // ),
        // uncomment the following to use a MySQL database
        'db'=>require(dirname(__FILE__).'/database.php'),
        'errorHandler'=>array(
            // use 'site/error' action to display errors
            'errorAction'=>'index/error',
        ),
        'log'=>require(dirname(__FILE__).'/log.php'),
        // for mail 
        // 'mail' => array(
        //   'class' => 'ext.yii-mail.YiiMail',
        //   'transportType' => 'smtp',
        //   'transportOptions'=>array(
        //   'host'=>'smtp.vianet.com.np',
        //  // ssl port for gmail
        //    ),
        //   'viewPath' => 'application.views.mail',
        //   'logging' => true,
        //   'dryRun' => false
        // ),
        // 'log'=>array(
        //     'class'=>'CLogRouter',
        //     'routes'=>array(
        //         array(
        //             'class'=>'CFileLogRoute',
        //             'levels'=>'error, warning',
        //             'logFile'=>'application.log.'.date('Y-m-d'),
        //         ),
        //         // uncomment the following to show log messages on web pages
        //         /*
        //         array(
        //             'class'=>'CWebLogRoute',
        //         ),
        //         */
        //     ),
        // )
    ),

    // application-level parameters that can be accessed
    // using Yii::app()->params['paramName']
    'params'=>require(dirname(__FILE__).DIRECTORY_SEPARATOR.'params.php'),
    'sourceLanguage'=>'en_us',
    // if sourceLanguage == language then no translation will be done
    'language'=>'ja',
);