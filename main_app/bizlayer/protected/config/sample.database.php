<?php

return array(
    'connectionString' => 'pgsql:host=192.168.1.198;dbname=hbase;port=5432',
    'username' => 'postgres',
    'password' => 'postgres',
    'charset' => 'utf8',
    'enableProfiling'=>true,
    'enableParamLogging'=>true,
    'initSQLs'=>array(
        "set timezone='Asia/Kathmandu'" //        "Asia/Tokyo"
        ),    
);