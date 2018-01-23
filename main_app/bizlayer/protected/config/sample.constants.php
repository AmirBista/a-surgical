<?php
    // user defined CONSTANTS
    defined('SERVER_MODE') or define('SERVER_MODE','dev');//dev,test,beta,stag,live

    //options are true / false
    defined('USE_COMPILED_JAVASCRIPT') or define('USE_COMPILED_JAVASCRIPT', false);

    //if set to true html page will be rendered without extjs
    //if set to false extjs login page will be rendered
    defined('USE_LOGIN_HTML') or define('USE_LOGIN_HTML', true);

    //options production/testing
    defined('BUILD_ENVIRONMENT') or define('BUILD_ENVIRONMENT', 'production');

    defined('CODE_VERSION') or define('CODE_VERSION',1526);//the version no of svn of which is uploaded in server
    defined('DC') or define('DC',time());  //it will be used as the cache management value if compiled javascript = false
    defined('SCREEN_FLD_VERSION') or define('SCREEN_FLD_VERSION',1001);
    defined('DS') or define('DS', DIRECTORY_SEPARATOR);
    defined('FILEBOXFOLDER') or define('FILEBOXFOLDER', '..'.DS.'filebox'.DS);
    defined('MAX_FILE_SIZE') or define('MAX_FILE_SIZE', 3145728); //UPLOAD FILE SIZE LIMIT = 3 MB


    defined('FAX_CSV_PATH') or define('FAX_CSV_PATH', '../filebox/faxCsv');

    defined('MD5_CODE') or define('MD5_CODE', 'yig20152072'); //MD5 security code
    defined('ENCRYPTION_KEY') or define("ENCRYPTION_KEY", "2*$#!@%<&5");

    defined('CSV_FOLDER') or define('CSV_FOLDER','..'.DS.'filebox'.DS.'csv'.DS);

    defined('FILTER_COMPANY_CONDITION') or define('FILTER_COMPANY_CONDITION', true);
    defined('FILENAME_IMPLODE_TEXT') or define('FILENAME_IMPLODE_TEXT','a*_^F>9_');
    defined('COMMON_EXTENSION') or define('COMMON_EXTENSION','../../../../../frameworks/extensions');
    defined('SCREEN_COMPONENT_FOLDER') or define('SCREEN_COMPONENT_FOLDER', '..'.DS.'screen_components'.DS);
    defined('SCREEN_COMPONENT_BACKUP_FOLDER') or define('SCREEN_COMPONENT_BACKUP_FOLDER', '..'.DS.'screen_components'.DS.'backup'.DS);
    defined('SCREEN_COMPONENT_VERSION_FOLDER') or define('SCREEN_COMPONENT_VERSION_FOLDER', '..'.DS.'screen_components'.DS.'version'.DS);
    defined('REPORT_URL') or define('REPORT_URL', 'http://localhost/base_2015/mrf/PrintReport/getJsonReport');
    defined('REPORT_CSV_PATH') or define('REPORT_CSV_PATH','../../../mrf/filebox/json/hbase/');
    @include_once "constants_rpt.php";

