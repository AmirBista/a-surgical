<?php
/*
    Filebox Utility Class for
    Remote Filebox Server Access
    for both upload and download (thumbnails)
    settings are located in
    ../protected/config/params.php
    pb@mi 2012-11-22
 */
class FBUtility
{
    /*
    | -------------------------------------------------------------------
    | MIME TYPES
    | -------------------------------------------------------------------
    | This file contains an array of mime types.  It is used to identify file types.
    | Referred from CI_2.1.3
    |
    */

    public static function getMimesArray()
    {
        return array(
                'hqx'   =>  'application/mac-binhex40',
                'cpt'   =>  'application/mac-compactpro',
                'csv'   =>  array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel'),
                'bin'   =>  'application/macbinary',
                'dms'   =>  'application/octet-stream',
                'lha'   =>  'application/octet-stream',
                'lzh'   =>  'application/octet-stream',
                'exe'   =>  array('application/octet-stream', 'application/x-msdownload'),
                'class' =>  'application/octet-stream',
                'psd'   =>  'application/x-photoshop',
                'so'    =>  'application/octet-stream',
                'sea'   =>  'application/octet-stream',
                'dll'   =>  'application/octet-stream',
                'oda'   =>  'application/oda',
                'pdf'   =>  array('application/pdf', 'application/x-download'),
                'ai'    =>  'application/postscript',
                'eps'   =>  'application/postscript',
                'ps'    =>  'application/postscript',
                'smi'   =>  'application/smil',
                'smil'  =>  'application/smil',
                'mif'   =>  'application/vnd.mif',
                'xls'   =>  array('application/excel', 'application/vnd.ms-excel', 'application/msexcel'),
                'ppt'   =>  array('application/powerpoint', 'application/vnd.ms-powerpoint'),
                'wbxml' =>  'application/wbxml',
                'wmlc'  =>  'application/wmlc',
                'dcr'   =>  'application/x-director',
                'dir'   =>  'application/x-director',
                'dxr'   =>  'application/x-director',
                'dvi'   =>  'application/x-dvi',
                'gtar'  =>  'application/x-gtar',
                'gz'    =>  'application/x-gzip',
                'php'   =>  'application/x-httpd-php',
                'php4'  =>  'application/x-httpd-php',
                'php3'  =>  'application/x-httpd-php',
                'phtml' =>  'application/x-httpd-php',
                'phps'  =>  'application/x-httpd-php-source',
                'js'    =>  'application/x-javascript',
                'swf'   =>  'application/x-shockwave-flash',
                'sit'   =>  'application/x-stuffit',
                'tar'   =>  'application/x-tar',
                'tgz'   =>  array('application/x-tar', 'application/x-gzip-compressed'),
                'xhtml' =>  'application/xhtml+xml',
                'xht'   =>  'application/xhtml+xml',
                'zip'   =>  array('application/x-zip', 'application/zip', 'application/x-zip-compressed'),
                'mid'   =>  'audio/midi',
                'midi'  =>  'audio/midi',
                'mpga'  =>  'audio/mpeg',
                'mp2'   =>  'audio/mpeg',
                'mp3'   =>  array('audio/mpeg', 'audio/mpg', 'audio/mpeg3', 'audio/mp3'),
                'aif'   =>  'audio/x-aiff',
                'aiff'  =>  'audio/x-aiff',
                'aifc'  =>  'audio/x-aiff',
                'ram'   =>  'audio/x-pn-realaudio',
                'rm'    =>  'audio/x-pn-realaudio',
                'rpm'   =>  'audio/x-pn-realaudio-plugin',
                'ra'    =>  'audio/x-realaudio',
                'rv'    =>  'video/vnd.rn-realvideo',
                'wav'   =>  array('audio/x-wav', 'audio/wave', 'audio/wav'),
                'bmp'   =>  array('image/bmp', 'image/x-windows-bmp'),
                'gif'   =>  'image/gif',
                'jpeg'  =>  array('image/jpeg', 'image/pjpeg'),
                'jpg'   =>  array('image/jpeg', 'image/pjpeg'),
                'jpe'   =>  array('image/jpeg', 'image/pjpeg'),
                'png'   =>  array('image/png',  'image/x-png'),
                'tiff'  =>  'image/tiff',
                'tif'   =>  'image/tiff',
                'css'   =>  'text/css',
                'html'  =>  'text/html',
                'htm'   =>  'text/html',
                'shtml' =>  'text/html',
                'txt'   =>  'text/plain',
                'text'  =>  'text/plain',
                'log'   =>  array('text/plain', 'text/x-log'),
                'rtx'   =>  'text/richtext',
                'rtf'   =>  'text/rtf',
                'xml'   =>  'text/xml',
                'xsl'   =>  'text/xml',
                'mpeg'  =>  'video/mpeg',
                'mpg'   =>  'video/mpeg',
                'mpe'   =>  'video/mpeg',
                'qt'    =>  'video/quicktime',
                'mov'   =>  'video/quicktime',
                'avi'   =>  'video/x-msvideo',
                'movie' =>  'video/x-sgi-movie',
                'doc'   =>  'application/msword',
                'docx'  =>  array('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'),
                'xlsx'  =>  array('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'),
                'word'  =>  array('application/msword', 'application/octet-stream'),
                'xl'    =>  'application/excel',
                'eml'   =>  'message/rfc822',
                'json' => array('application/json', 'text/json')
            );
    }

    /*
    * returns true if the directory path exists/valid else false
    */
    public static function isDirExist($dirPath=null, $create=true)
    {
        if($dirPath==null) return false;
        if(!file_exists($dirPath) && $create==true ){
            //yiilog($thumb_path, "info", "");
            if(mkdir($dirPath)) return true;
            else return false;
        }
        else return true;
    }
    /*
    * returns combined path of $path1 and $path2
    */
    public static function getPathCombine($path1, $path2)
    {
        if (!isset($path1) || empty ($path1))
            return '';

        if (!isset($path2) || empty ($path2))
            return '';

        if (substr($path1, -1) == DS)
            $path = $path1.$path2;
        else
            $path = $path1.DS.$path2;

            return $path;
    }
    /*
    * returns the relative filebox path of a department
    */
    public static function getDepartmentFolder($department_code)
    {
        $rootFolder = FILEBOXFOLDER;
        $dept_folder = 'dept_'.$department_code;
        $dept_path= FBUtility::getPathCombine($rootFolder, $dept_folder).DS;
        return $dept_path;
    }
    /*
    * Upload an attached file
    */
    public static function uploadFile($dept_folder,
                                       $temp_file_path, $original_fileName, $new_filename, $extension,$file_id,$type=''){
        $allow_big_thumb = array("main_image");

        $response = array(
            'success'=>false,
            'msg'=>''
        );

        if (empty($dept_folder))
        {
            $response['msg']=Yii::t('filebox','Invalid table_id');
            return $response;
        }
        // $filename = $file_id.'.'.$extension;
        $rootFolder = FILEBOXFOLDER;
        $relative_path= FBUtility::getPathCombine($rootFolder, $dept_folder).DS;
        if(!file_exists($temp_file_path))
        {
            $response['msg']=Yii::t('filebox','Temporary file does not exist');
            return $response;
        }
        try {
            // uploadProductTempImage($product_id, $_FILE['name'], $_FILE['tmp_name']);
            $response['success']= false;
                $crop_image = Yii::app()->params['imageParams']['comment']['crop_image'];
                $img_ext = array("jpg","jpeg","png","gif","bmp","tif");
                if (!empty($crop_image) && in_array($extension,$img_ext))
                {
                    $filename = $file_id.'.'.$extension;
                    //WideImage::load($temp_file_path)->saveToFile($relative_path.$filename);
                    $img = WideImage::load($temp_file_path);
                    move_uploaded_file($temp_file_path,$relative_path.$new_filename);
                    //$img->saveToFile($relative_path.$filename);

                    if(in_array($type, $allow_big_thumb)){
                        $width_bthumb = Yii::app()->params['imageParams']['comment']['width-bthumb'];
                        $height_bthumb = Yii::app()->params['imageParams']['comment']['height-bthumb'];
                        $filename_bthumb = 'bthumb_'.$file_id.'.'.$extension;
                        //WideImage::load($temp_file_path)->resize($width_bthumb, $height_bthumb)->saveToFile($relative_path.$filename_bthumb);
                        $img->resize($width_bthumb, $height_bthumb)->saveToFile($relative_path.$filename_bthumb);
                    }
                    else{

                        $width_thumb = Yii::app()->params['imageParams']['comment']['width-thumb'];
                        $height_thumb = Yii::app()->params['imageParams']['comment']['height-thumb'];

                        $width_preview = Yii::app()->params['imageParams']['comment']['width-preview'];
                        $height_preview = Yii::app()->params['imageParams']['comment']['height-preview'];

                        $filename_thumb = 'thumb_'.$file_id.'.'.$extension;
                        $filename_preview = 'preview_'.$file_id.'.'.$extension;

                        $img->resize($width_thumb, $height_thumb)->saveToFile($relative_path.$filename_thumb);
                        $img->resize($width_preview, $height_preview)->saveToFile($relative_path.$filename_preview);

                        //WideImage::load($temp_file_path)->resize($width_thumb, $height_thumb)->saveToFile($relative_path.$filename_thumb);
                        //WideImage::load($temp_file_path)->resize($width_preview, $height_preview)->saveToFile($relative_path.$filename_preview);
                    }
                }
                else
                {
                     // WideImage::load($temp_file_path)->saveToFile($relative_path);
                    move_uploaded_file($temp_file_path,$relative_path.$new_filename);

                }
                // if(move_uploaded_file($temp_file_path,$relative_path.$new_filename)){
                    $response['success']= true;
                    $response['msg']= 'File Upload Successful';
                // }

        } catch (Exception $e) {
            $response['msg']= $e->getMessage();
        }

        return $response;
    }

    // public static function getFileboxFolder(){
    //     $path = dirname(__FILE__);
    //     return $path;
    // }

    /*
    returns file MIME Type
     */
    public static function getMimeTypeByFileExtension($fileName)
    {
        $extension = strtolower(substr(strrchr($fileName, '.'), 1));
        $mimes = self::getMimesArray();
        if (array_key_exists($extension, $mimes))
        {
            if (is_array($mimes[$extension]))
            {
                // Multiple mime types, just give the first one
                return current($mimes[$extension]);
            }
            else
            {
                return $mimes[$extension];
            }
        }
        else
        {
            return FALSE;
        }
    }
    /*
    * returns the file in view/download mode
    */
    public static function getFileInfo($fbAccountID=null, $productID=null, $filename=null, $systemCode= null)
    {
        $fb = array('success'=>true,
                    'data'=>'');

        $info_url = self::getFileInfoUrl($fbAccountID, $productID, $filename, $systemCode);
        // Yii::log('info_url >> '. CJSON::encode($info_url), 'error');

        require_once 'HTTP/Request2.php';
        $req = new HTTP_Request2($info_url);
        $res = $req->send();
        $fb['data'] = CJSON::decode($res->getBody());

        return $fb;
    }

    public static function checkFileLimit($fbAccountID=null, $productID=null, $filename=null, $systemCode= null){
        $garage_system_code = self::param('SYSTEM_CODES','GARAGE');

        $fileInfo = self::getFileInfo($fbAccountID, $productID, $filename, $garage_system_code);

        // Yii::log('size_limit >> '.$size_limit. ' fileInfo >> '. CJSON::encode($fileInfo), 'error');
        $ret = self::checkImageValidation($systemCode, $fileInfo["data"]["mimeType"], $fileInfo["data"]["size"]);

        return $ret;
    }

    public static function checkImageValidation($systemCode= null, $mimeType=null, $size=null){
        $size_limit = self::param('FILEBOX', 'IMAGE_SIZE_LIMIT');
        $shimamura_spec_system_code = self::param('SYSTEM_CODES','SHIMAMURA_SPEC');
        $trade_spec_system_code = self::param('SYSTEM_CODES','TRADESPEC');
        $ret = array('img_type_valid'=>true,'size_valid'=>true);

        if($systemCode == $shimamura_spec_system_code || $systemCode == $trade_spec_system_code)
        {
            if ($mimeType != "image/jpeg" )
            {
                $ret['img_type_valid'] = false;
            }
            else if ($size > $size_limit)
            {
                $ret['size_valid'] = false;
            }
        }
        return $ret;
    }

    public static function renderImage($image_id, $table_id, $action="", $img_type='')
    {
        if (!is_numeric($image_id))
            $image_id = 0;
        if (empty($image_id))
            $image_id = 0;

        $file = AppFile::model()->findByAttributes(array('file_id'=>$image_id));
        $absolute_path = Yii::app()->params['absolute_path'];
        if (empty($file)){
            $filename = 'no-image.png';
            $file_path = FBUtility::getPathCombine($absolute_path, $filename);
            $original_file_name = $filename;
        }
        else
        {
            $original_file_name = $file->original_file_name;
            $filename = $file->file_id.".".$file->extension;

            $file_path = FBUtility::getPathCombine($absolute_path, $file->ref_record_id);
            $file_path = FBUtility::getPathCombine($file_path, $filename);
        }

        if($action=="download"){
            if(!empty($original_file_name))
                $filename = $img_type.$original_file_name;

            // $filename = mb_convert_encoding($filename, 'utf-8', 'HTML-ENTITIES');
            $filename = urlencode($filename);

            header("Content-Type: application/octet-stream");
            header('Cache-Control: jpayotyahi-to-fix-ie8-issue'); //public, no-cache
            header("Content-Transfer-Encoding: Binary");
            header("Content-disposition: attachment; filename=\"" . $filename . "\"");
            ob_clean();
            flush();
            readfile($file_path);


        }
        else{
            $mimeType = FBUtility::getMimeTypeByFileExtension($filename);
            //header('Cache-Control: public');
            header("Content-type: {$mimeType}");
            ob_clean();
            flush();
            readfile($file_path);
        }
        Yii::app()->end();
    }
    public static function renderFile($file_path, $table_id, $action="", $img_type='')
    {   
        $file_path = trim(convertDBStr($file_path));

        $file = null;
        $orginal_filename = null;

        if (strlen(FILENAME_IMPLODE_TEXT) > strlen($file_path)){

        }
        else{
            $explode_file_path = explode(FILENAME_IMPLODE_TEXT,$file_path);
            $file = @$explode_file_path[0];
            $orginal_filename = @$explode_file_path[1];
            $filename = $orginal_filename;
        }

        $absolute_path = Yii::app()->params['absolute_path'];


        if (empty($file)){
            $filename = 'no-image.png';
            $file_path = FBUtility::getPathCombine($absolute_path, $filename);
            $original_file_name = $filename;
        }
        else
        {
            $file_path = FBUtility::getPathCombine($absolute_path, $file);
        }

        if($action=="download"){
            if(!empty($orginal_filename))
                $filename = $img_type.$orginal_filename;

            // $filename = mb_convert_encoding($filename, 'utf-8', 'HTML-ENTITIES');
            $filename = urlencode($filename);

            header("Content-Type: application/octet-stream");
            header('Cache-Control: jpayotyahi-to-fix-ie8-issue'); //public, no-cache
            header("Content-Transfer-Encoding: Binary");
            header("Content-disposition: attachment; filename=\"" . $filename . "\"");
            ob_clean();
            flush();
            readfile($file_path);


        }
        else{
            $mimeType = FBUtility::getMimeTypeByFileExtension($file);
            //header('Cache-Control: public');
            header("Content-type: {$mimeType}");
            ob_clean();
            flush();
            readfile($file_path);
        }
        Yii::app()->end();
    }


    

    /*
    * returns http url address to render the image
    */
    public static function getImgUrl($image_id, $dept_code,$img_type='')
    {
        if (is_numeric($dept_code))
        {
            if ($dept_code == 30)
                $controller='appraisal';
            else if ($dept_code == 40)
                $controller='comment';
            else if ($dept_code == 50)
                $controller='notice';
            else if ($dept_code == 60)
                $controller='meeting';
            else if ($dept_code == 70)
                $controller='incidence';
        }
        else
        {
            $controller=$dept_code;
        }
        if(!empty($img_type)) $img_type="&img_type=".$img_type;
        $p = getMainUrl(false).'bizlayer/'.$controller.'/renderImg?image_id='.$image_id.$img_type;
        return $p;
    }

    public static function getArchiveFiles(){
        $days = CLEANUP_DRAFT_FILE;
        $sql = "SELECT file_id, file_path, extension,  is_draft, created_datetime, updated_datetime
                FROM jr_files
                WHERE is_draft = 1
                AND created_datetime < (CURRENT_DATE - {$days})";
        $command = Yii::app()->db->createCommand($sql);
        $data = $command->queryAll();
        return $data;
    }

    public static function deleteDraftFileData($file_id=NULL){
        $sql = "DELETE FROM jr_files
                WHERE file_id = {$file_id}";
        $command = Yii::app()->db->createCommand($sql);
        $result = $command->execute();
        return $result;
    }

    public static function removeDeletedFiles($file_id,$folder_filename){
        $filePath = Yii::app()->params['absolute_path'];
        if(file_exists($filePath.$folder_filename)){
            @unlink($filePath.$folder_filename);
        }
    }

    public static function moveFile($filename,$actionType,$ref_record_id){
        $old_fb_path = $new_file_path = null;
        $file_list_path = Yii::app()->params['file_list_path'];
        $absolute_path = Yii::app()->params['absolute_path'];
        if($actionType=="newToTemp"){
            $old_fb_path = $file_list_path.'new'.DS.$filename;
            FBUtility::isDirExist($file_list_path.'temp'.DS.$ref_record_id,true);
            $new_file_path = $file_list_path.'temp'.DS.$ref_record_id.DS.$filename;
        }
        else if($actionType=="tempToNew"){
            $old_fb_path = $file_list_path.'temp'.DS.$ref_record_id.DS.$filename;
            $new_file_path = $file_list_path.'new'.DS.$filename;
        }
        else if($actionType=="completedToNew"){
            $fileModel = AppFile::model()->findByAttributes(array('ref_record_id' => $ref_record_id,'file_name' => $filename,'delete_flg' => 0));
            $old_fb_path = $absolute_path.$ref_record_id.DS.$filename;
            $new_file_path = $file_list_path.'new'.DS.$fileModel->original_file_name;
        }
            
        $response = array('success'=> FALSE);
        if(file_exists($old_fb_path) && rename($old_fb_path, $new_file_path)){
            $response['success'] = TRUE;
        }
        return $response;
    }

    
}
