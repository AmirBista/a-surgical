<?php

return array(
    'appTitle' => 'hBase',
    'appVersion' => '0.1',
    'adminEmail' => 'min_mi@yonefu.info',
    'adminEmailName' => 'hBase Admin',
    // array of available languages
    'availableLanguages' => array(
        'en' => 'English',
        'ja' => 'Japanese',
        'zh_CN'=> 'Chinese'
    ),
    'availableLanguagesCol' => array(
        'en' => 'sys_column_name',
        'ja' => 'field_label',
        'zh_CN'=> 'field_label2'
    ),
    'default_language' => 'ja', /*default language for application will be overrited by user setting or lang url parameter*/
    // default params for image upload
    'access_settings' => array(
        /** list of available roles * */
        'roles' => array(
            'user' => '1',
            'admin'=>'50'
        ),
        /** list of access for each component * */
        'access' => array(
        //
        ),
    ),
    'extjs_version' => 'extjs-4.2.1',
    'extjs_path' => '../',
    'token_validity' => 24, //hours
    'db_date_format' => '',
    //csv upload directory
    'csv_path' => '../filebox/csv/',
    'csv' => array(
        'csv_upload' => '../filebox/csv/csvupload/',
        'csv_valid' => '../filebox/csv/valid/',
        'csv_error' => '../filebox/csv/error/',
        'csv_success' => '../filebox/csv/success/'
    ),
    'imageParams' => array(
        'comment' => array(
            'crop_image' => true,
            'width' => 600,
            'height' => 600,
            'width-thumb' => 60,
            'height-thumb' => 60,
            'width-preview' => 250,
            'height-preview' => 250,
            'width-bthumb' => 153,
            'height-bthumb' => 153
        ),
    ),
    //for save order files path
     'absolute_path'=>'../filebox/order_img/',
    /*for super admin can edit view all records.*/
    'SUPER_ADMIN_EMAIL' => array('support@yonefu.info'),
    'expire_edit_notification_min' => 60*12, //12 hours
    'data_sync_url'=>"http://192.168.1.140/API_datasync/service.php",
    //config.ini directory according to project name
    'config' => array(
        PROJECT_NAME => 'config/config.csv/csv_config.'.PROJECT_NAME.'.ini',
    ),
    //
    'images'=>array(
        PROJECT_NAME => 'images/'.PROJECT_NAME.'/',
    ),
    'export_path'=>array(
        'html_export' => '../filebox/sbase_export/html/',
        'pdf_export' => '../filebox/sbase_export/pdf/'
    ),
    'barcode'=>require(dirname(__FILE__).DIRECTORY_SEPARATOR.'barcode.php'),
    'absolute_path'=>'../filebox/product_img/',
    'file_list_path'=>'../filebox/file_list/'

);