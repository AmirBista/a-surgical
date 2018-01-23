<?php
try {
    $tz = date_default_timezone_get();
    date_default_timezone_set($tz);
} catch (Exception $e) {
    date_default_timezone_set('Asia/Tokyo');
}
ini_set('display_errors', 1); 
error_reporting(E_ALL);

/*
    Returns language for user
*/
function GET_LANG($user_language=null){
    $languages=array_keys(Yii::app()->params['availableLanguages']);

    //1. GET FROM URL PARAMETER
    $lang=Yii::app()->request->getQuery('lang','');

    //2. If not passed in url parameter get from app_user
    if (empty($lang) && !Yii::app()->user->isGuest){
        if ($user_language === null){
            //when $user_language not passed
            $lang = Yii::app()->user->getAttr('language');
        }else
        {
            //when user language passed
            $lang = $user_language;
        }
    }

    //3. If No. 1 and 2 does not exist then use default_language
    if(!in_array($lang,$languages)) {
        $lang=Yii::app()->params['default_language'];
    }
    // echo $lang; exit;
    return $lang;
}

/*
    returns server date
*/
function get_today($format = 'Y-m-d'){
    return date($format);
}

/*
    returns server time
*/
function get_now($format = 'Y-m-d H:i:s'){
    return date($format);
}

function dumbescape($in, $enclosure=false)
{
    static $enc;
    if ($enclosure===false) {
        return str_replace($enc, '\\' . $enc, $in);
    }
    $enc=$enclosure;
}

function getMainUrl($file=true) {
    $protocol = isset($_SERVER['HTTPS']) ? "https" : "http";
    $currentPath = $_SERVER['PHP_SELF'];

    //give something like: /main_app/index.php
    $pathInfo = pathinfo($currentPath);

    $hostName = $_SERVER['HTTP_HOST'];
    //gives something like: localhost
    $appArray = explode('/', $pathInfo['dirname'], -1); //remove bizLayer
    $appPath = implode('/', $appArray); //join
    //return $protocol."://".$hostName.$appPath."/index.php";
    $retVal = $protocol . "://" . $hostName . $appPath . "/";
    return ($file === false) ? ($retVal) : ($retVal . "index.php");
}

function registerScriptFile($file, $dc=FALSE) {
    $cs = Yii::app()->getClientScript();
    if ($dc) {
        $_dc = Yii::app()->params['dc'];
        if (USE_COMPILED_JAVASCRIPT === true)
            $_dc = SVN_CODE_VERSION;
        $cs->registerScriptFile(getMainUrl(false) . $file . '.js?_dc=' . $_dc);
    } else {
        $cs->registerScriptFile(getMainUrl(false) . $file . '.js');
    }
}

function registerScript($id, $script) {
    $cs = Yii::app()->getClientScript();
    $cs->registerScript($id, $script, 0);
}

function registerCssFile($file, $dc=FALSE) {
    $cs = Yii::app()->getClientScript();
    if ($dc) {
        $_dc = Yii::app()->params['dc'];
        if (USE_COMPILED_JAVASCRIPT === true)
            $_dc = SVN_CODE_VERSION;
        $cs->registerCssFile(getMainUrl(false) . $file . '.css?_dc=' . $_dc);
    } else {
        $cs->registerCssFile(getMainUrl(false) . $file . '.css');
    }
}

function registerCss($id, $css) {
    $cs = Yii::app()->getClientScript();
    $cs->registerCss($id, $css);
}

function generateAccessToken() {
    return md5(uniqid(mt_rand(), true));
}

//Added this code for base Url.
function baseUrl($url=null) {
    static $baseUrl;
    if ($baseUrl === null)
        $baseUrl = Yii::app()->getRequest()->getBaseUrl();
    return $url === null ? $baseUrl : $baseUrl . '/' . ltrim($url, '/');
}

/**
 * This is the shortcut to Yii::app()->basePath
 */
function basePath() {
    static $basePath;
    $basePath = Yii::app()->basePath;
    return $basePath;
}

//Here starts cojde for Inflector helper like humanize, underscore blah blah
function camelize($str) {
    $str = 'x' . strtolower(trim($str));
    $str = ucwords(preg_replace('/[\s_]+/', ' ', $str));
    return substr(str_replace(' ', '', $str), 1);
}

function underscore($str) {
    return preg_replace('/[\s]+/', '_', strtolower(trim($str)));
}

function humanize($str) {
    return ucwords(preg_replace('/[_]+/', ' ', strtolower(trim($str))));
}

function plural($str, $force = FALSE) {
    $result = strval($str);
    $plural_rules = array(
        '/^(ox)$/' => '\1\2en', // ox
        '/([m|l])ouse$/' => '\1ice', // mouse, louse
        '/(matr|vert|ind)ix|ex$/' => '\1ices', // matrix, vertex, index
        '/(x|ch|ss|sh)$/' => '\1es', // search, switch, fix, box, process, address
        '/([^aeiouy]|qu)y$/' => '\1ies', // query, ability, agency
        '/(hive)$/' => '\1s', // archive, hive
        '/(?:([^f])fe|([lr])f)$/' => '\1\2ves', // half, safe, wife
        '/sis$/' => 'ses', // basis, diagnosis
        '/([ti])um$/' => '\1a', // datum, medium
        '/(p)erson$/' => '\1eople', // person, salesperson
        '/(m)an$/' => '\1en', // man, woman, spokesman
        '/(c)hild$/' => '\1hildren', // child
        '/(buffal|tomat)o$/' => '\1\2oes', // buffalo, tomato
        '/(bu|campu)s$/' => '\1\2ses', // bus, campus
        '/(alias|status|virus)/' => '\1es', // alias
        '/(octop)us$/' => '\1i', // octopus
        '/(ax|cris|test)is$/' => '\1es', // axis, crisis
        '/s$/' => 's', // no change (compatibility)
        '/$/' => 's',
    );

    foreach ($plural_rules as $rule => $replacement) {
        if (preg_match($rule, $result)) {
            $result = preg_replace($rule, $replacement, $result);
            break;
        }
    }

    return $result;
}

 /**
     * This is the shortcut to Yii::t() with default category = 'stay'
     */
function t($category = 'common', $message, $params = array(), $source = null, $language = null) 
{
    return Yii::t($category, $message, $params, $source, $language);
}

/*
*formats to postgres array type string. which will be 
* used while saving data and comparing data
* $data param can be scalar value or array 
*/
function formatPGArray($data)
{
    if (is_array($data))
    {
        $val = '{'.implode(",",$data).'}';
    }
    else
    {
        $val = '{'.$data.'}';
    }
    return $val;
}

/*
when saving data always use ( mb_convert_kana , OPTION: a (convert multibyte alphanumeric to single byte alphanumeric) and K (convert single byte KATAKANA to multibyte KATAKANA ) 
*/
function convertDBStr($str){
    return mb_convert_kana($str, "aK", "UTF-8");
}

/*
when searching data always use ( mb_convert_kana , OPTION: a (convert multibyte alphanumeric to single byte alphanumeric) and K (convert single byte KATAKANA to multibyte KATAKANA ) and s (Converted to single space double-byte space) 

*/
function convertSearchStr($str){
    return mb_convert_kana($str, "aKs", "UTF-8");
}

function remove_single_quoted($str){
        $quote = "'";
        return remove_quoted($str, $quote);   
}

function remove_dbl_quoted($str){
        $quote = '"';
        return remove_quoted($str, $quote);   
}
function remove_quoted($str, $quote){
        $unquoted_str = $str;
        $is_quoted = false;
        if (empty($str)){
            return $unquoted_str;
        }
        $st = substr($str, 0,1);
        $en = substr($str, -1);
        if ($st === $quote && $en = $quote){
            //remove first and last quote character
            $unquoted_str = substr($str, 1,-1);
            $is_quoted = true;
        }
        else{
            $is_quoted = false;
        }
        return $unquoted_str;
}

/*
returns no of bytes in string
*/
function getByteLength($str, $encoding = "Shift-JIS", $han_zen = true){
    // $han_zen = false;
    //when $han_zen is false will count no of characters
    $el_length = (!$han_zen)?mb_strlen($str, 'UTF8'):strlen(mb_convert_encoding (preg_replace("/\n/", '\n',$str) , $encoding,'UTF8'));
    return $el_length;
}

function getStrByteWidthArr($str){
    $characters = splitMultiByteCharacters($str);
    $arr = array();
    foreach ($characters as $key => $value) {
        $arr[] = array($value, getByteLength($value, 'Shift-JIS'), strlen($value));
    }
    return $arr;
}

function splitMultiByteCharacters($str){
    $treat_spaces_as_chars = true;    
    // remove spaces if we don't want to count them
    if (!$treat_spaces_as_chars) {
      $str = preg_replace('/\s+/u', '', $str);
    }
    // split into characters (not bytes, like explode() or str_split() would)
    $characters = preg_split('//u', $str, -1, PREG_SPLIT_NO_EMPTY);
    return $characters;
}

function trimMultiByteCharacters($str, $maxLength){
    $byteLen = getByteLength($str);
    if ($byteLen <= $maxLength)
        return $str;
    
    $characters = getStrByteWidthArr($str);
    $trimedStr = "";
    $byteLength = 0;
    foreach ($characters as $key => $value) {
        $byteLength += $value[1];
        if ($byteLength == $maxLength)
        {
            $trimedStr .= $value[0];
            return $trimedStr;
        }
        else if ($byteLength > $maxLength)
        {
            return $trimedStr;    
        }
        $trimedStr .= $value[0];
    }
    //if reached here string lenght not exceeds $maxLength
    return $str;
}


// Encrypt/Decrypt Example:
// $string = "This is the original data string!";
// echo $encrypted = encrypt($string, ENCRYPTION_KEY);
// echo "<br />";
// echo $decrypted = decrypt($encrypted, ENCRYPTION_KEY);

/**
 * Returns an encrypted & utf8-encoded
 */
function encrypt($pure_string, $encryption_key) {
    $iv_size = mcrypt_get_iv_size(MCRYPT_BLOWFISH, MCRYPT_MODE_ECB);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    $encrypted_string = mcrypt_encrypt(MCRYPT_BLOWFISH, $encryption_key, utf8_encode($pure_string), MCRYPT_MODE_ECB, $iv);
    return $encrypted_string;
}

/**
 * Returns decrypted original string
 */
function decrypt($encrypted_string, $encryption_key) {
    $iv_size = mcrypt_get_iv_size(MCRYPT_BLOWFISH, MCRYPT_MODE_ECB);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    $decrypted_string = mcrypt_decrypt(MCRYPT_BLOWFISH, $encryption_key, $encrypted_string, MCRYPT_MODE_ECB, $iv);
    return $decrypted_string;
}
function SET_TIMEZONE($tz)
{
    date_default_timezone_set($tz);
}


// Main system functions to be included here!

// BASE-LEGO [PrintReport] functions
@include_once "functions.printreport.php";