
<?php
Class LogUtility {
    public static $file_path;
    public static $file_category = "app";

    public static function getFilePath($file_category){
      if (empty($file_category))
        $file_category = LogUtility::$file_category;

      if (empty(LogUtility::$file_path))
      {
        $file_name = date('Ymd')."_".$file_category.".log";
        LogUtility::$file_path = dirname(__FILE__).LOG_FOLDER.$file_name;
      }
      return LogUtility::$file_path;
    }

    /*
    @params $action = info/userinsert/passwordupdate/userdelete etc
    */
    public static function writeLog($msg_type, $msg, $file_category="")
    {
      $date = date('Y-m-d H:i:s');
      $log = $date. "\t". $msg_type. "\t".  $msg. "\n";
      $file = LogUtility::getFilePath($file_category);
      file_put_contents($file, $log, FILE_APPEND | LOCK_EX);
    }
}
?>
