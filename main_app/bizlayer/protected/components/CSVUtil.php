<?php
class CSVUtil
{
    protected $_validPrefix;
    protected $_errorPrefix;
    protected $_newPrefix;
    protected $_updatePrefix;
    protected $_successPrefix;
    protected $_filenameprefix;
    protected $_allowed_file_types;
    protected $_excludeCompulsaryHeaders;
    protected $_col_01_fld;
    public function __construct($arg = NULL)
    {
        // parent::__construct($arg);
        $this->_validPrefix="valid_";
        $this->_errorPrefix = "error_";
        $this->_successPrefix = "success_";
        $this->_newPrefix = "new_";
        $this->_updatePrefix = "update_";
        $this->_allowed_file_types = array("csv");
        $this->_excludeCompulsaryHeaders=array(
            '1' => array(),
            '2' => array(),
            '3' => array()
        );
    }

    
    public function uploadCSVFile($uploadParams) {
        header('Content-Type: application/json; charset=utf-8');

        $user_info      = $uploadParams['user_info'];
        $_FILE          = $uploadParams['_FILE'];
        $textFldValue   = $uploadParams['textFldValue'];
        $oldFileName    = $uploadParams['oldFileName'];
        // $dynamic        = $uploadParams['dynamic'];
        $csv_report_id  = $uploadParams['csv_report_id'];

        $user_role = $user_info['userRole'];
        $csvFolder=Yii::app()->params['csv']['csv_upload'];
        $btnCtrl=array(
            'btnCsvCheck' => false,
            'btnCsvDelete' => false,
            'btnUpload' => false,
            'btnErrorCsvDownload' => false,
            'btnCpUpdate' => true
        );
        // CHECK IF A CSV FILE BEING UPLOADED EXISTS
        if(empty($_FILE['name'])){
            $response = array(
                'success' => FALSE,
                'missingMsg' => t('csv','noCsvFile')
            );
            echo CJSON::encode($response);
            exit;
        }

        $extension = pathinfo($_FILE['name'], PATHINFO_EXTENSION);
        $mimeType= FBUtility::getMimeTypeByFileExtension($_FILE['name']);
        
        //CHECK IF THE UPLOADED FILE IS A CSV FILE
        if(!in_array($extension, $this->_allowed_file_types)){
            $response=array(
                'success' => FALSE, 
                'missingMsg'=>Yii::t('filebox','Invalid File Format')
            );
            echo CJSON::encode($response);
            exit;
        }

        /*
        * MAKE FILENAME AS :- DEPTCODE_DATE-UPLOADED FILENAME
        * Eg: 40_20140130_125706-csvfile.csv
        */

        // $filename = $this->_filenameprefix.'_'.date('Ymd_His').'-'.$_FILE['name'];
        $filename = '_'.date('Ymd_His').'-'.$_FILE['name'];        
       /* if(!empty($oldFileName))
            $checkNew="no";
        */
        // Create Directory If not exists
        FBUtility::isDirExist($csvFolder,TRUE);

        $relativeFilePath = Yii::app()->params['csv']['csv_upload'] . $filename;

        if (move_uploaded_file($_FILE['tmp_name'], $relativeFilePath)) {
            //$csvUtil = new  CSVUtil();
            $csvHeaders=$this->readCsvdata($relativeFilePath,true);

            //CHECK IF THE CSV FILE HAS ALL THE REQUIRED CSV HEADERS
            $response=$this->checkCsvHeader($csvHeaders,$csv_report_id);

            if($response['success']==TRUE){
                $response['filename']=$filename;

                $btnCtrl['btnCsvCheck']=true; 
                $btnCtrl['btnCsvDelete']=true;  
                $response['checkNew']="yes";
                $response['status']=$btnCtrl;
            }           
        }
        else{
            $response = array(
                'success' => FALSE,
                'missingMsg' => t('filebox','File Upload Failed')
            );    
        }
        //DELETE THE UPLOADED FILE FROM THE SERVER SINCE THE CSV FILE IS INVALID
        /*if($response['success']==FALSE && file_exists($relativeFilePath))
            unlink($relativeFilePath);*/
        
        echo CJSON::encode($response);
        exit;
    }

    /* Read the CSV File
     *
     * @access private
     * @param resource
     * @param integer
     * @param character
     * @param unknown
     *
     * @return mixed
     *
     */
    protected function _fgetcsv_reg(&$handle, $length = null, $d = ',', $e = '"') {
        $d = preg_quote($d);
        $e = preg_quote($e);
        $_line = "";
        $eof=false;
        while ($eof != true) {
            $_line .= (empty($length) ? fgets($handle) : fgets($handle, $length));
            $itemcnt = preg_match_all('/'.$e.'/', $_line, $dummy);
            if ($itemcnt % 2 == 0) $eof = true;
        }
        $_csv_line = preg_replace('/(?:\\r\\n|[\\r\\n])?$/', $d, trim($_line));
        $_csv_pattern = '/('.$e.'[^'.$e.']*(?:'.$e.$e.'[^'.$e.']*)*'.$e.'|[^'.$d.']*)'.$d.'/';
        preg_match_all($_csv_pattern, $_csv_line, $_csv_matches);
        $_csv_data = $_csv_matches[1];
        for($_csv_i=0;$_csv_i<count($_csv_data);$_csv_i++){
            $_csv_data[$_csv_i]=preg_replace('/^'.$e.'(.*)'.$e.'$/s','$1',$_csv_data[$_csv_i]);
            $_csv_data[$_csv_i]=str_replace($e.$e, $e, $_csv_data[$_csv_i]);
        }
        return empty($_line) ? false : $_csv_data;

    }

    public function readCsvdata($filename, $headerOnly=false,$hasHeader=TRUE){
        $row = 1;
        $csvdata=array();
        if (($handle = fopen($filename, "r")) !== FALSE) {
            $encoding_list = "SJIS-win, sjis, jis, EUC-JP, eucjp-win, utf-8";
            while (($data = $this->_fgetcsv_reg($handle, 5000, ",")) !== FALSE) {
                if($row==1 && $hasHeader==TRUE){
                     $row++;
                     if ($headerOnly === true)
                     {
                        foreach ($data as $key => $value) {
                            if(mb_detect_encoding($value)=='UTF-8')
                                $csvdata[] = $value;
                            else
                                $csvdata[] = mb_convert_encoding($value,'UTF-8', $encoding_list);
                        }
                        break;
                     }
                     else
                     {
                        continue;
                     }
                }
                $rowData = array();
                foreach ($data as $key => $value) {
                    // $encoding = mb_detect_encoding($value, "JIS, SJIS, utf-8, eucjp-win, sjis-win");
                    // LogUtility::writeLog("Value : ", $value. " Encoding : ". $encoding);
                    try
                    {
                        $rowData[] = mb_convert_encoding($this->retainNewLine($value),'UTF-8', $encoding_list);
                    }
                    catch( Exception $ex){
                        LogUtility::writeLog("Exception : ", $value);
                    }
                }

                $csvdata[]=$rowData;
            }
        }
        fclose($handle);
        return $csvdata;
    }

    public function retainNewLine($value)
    {
        $value = str_replace("\\r\\n", PHP_EOL,$value);
        // $value = preg_replace("/[\r\n]+/", "\\r\\n", $value);
        return $value;
    }

    protected function checkCsvHeader($csvHeaders,$csv_report_id){
        $missingHeaders=array();
        $compulsaryCsvHeaders=array();
        $compulsaryCsvHeaders = $this->getCsvHeaders($csv_report_id);

        foreach ($compulsaryCsvHeaders as $key => $field) {
            # code...
            if(!in_array($field['field_label'], $csvHeaders)){
                $missingHeaders[]=$field['field_label'];
            }
        }
        // var_dump($compulsaryCsvHeaders);exit; 
        if(count($missingHeaders)>0){
            $response=array(
                'success' => FALSE,
                'missingMsg' => t('csv','reqdCsvHeaderMissing'),
                'availableMsg' => t('csv','availableCsvHeaders'),
                'missingHeaders' => implode(",",$missingHeaders),
                'availableHeaders' => implode(",",$csvHeaders)
            );
        }
        else{
            
            $response=array(
                'success' => TRUE
            );    
        }
        return $response;  
    } 

    private function getCsvHeaders($csv_report_id){
        $sql = "SELECT crf.csv_field_name as field_label, tf.column_name, tf.allow_blank
                FROM yig_csv_report_field as crf
                INNER JOIN sys_table_field as tf ON tf.table_field_id = ANY(crf.table_field_ids)
                WHERE csv_report_id ='{$csv_report_id}'
                ORDER BY crf.display_order";
        $cmd = Yii::app()->db->createCommand($sql);
        $result = $cmd->queryAll();

        return $result;
    }

    private function getExcludedCompulsaryHeaders($csv_report_id){
        $cols = implode("','", $this->_excludeCompulsaryHeaders[$csv_report_id]);
        if(empty($cols))
            return array();
        $sql = "SELECT field_label,column_name,allow_blank
                FROM sys_table_field
                WHERE column_name IN ('{$cols}')";
        $cmd = Yii::app()->db->createCommand($sql);
        $result = $cmd->queryAll();
        return $result; 
    }

    public function checkCsvFile($checkFileParams){
        $fileName = $checkFileParams['fileName'];
        $oldFileName = $checkFileParams['oldFileName'];
        $checkNew = $checkFileParams['checkNew'];
        $user_info = $checkFileParams['user_info'];
        $dynamic = $checkFileParams['dynamic'];
        $csv_report_id = $checkFileParams['csv_report_id'];

        $app=Yii::app();
        $csvFolder=$app->params['csv']['csv_upload'];
        $csvSuccess = $app->params['csv']['csv_valid'];
        $csvError = $app->params['csv']['csv_error'];
        // $csvNew = $app->params['csv']['csv_new'];
        // $csvUpdate = $app->params['csv']['csv_update'];
        $user_role = $user_info['userRole'];
        $filePath=$csvFolder.$fileName;
        
        
        $this->_col_01_fld = $dynamic['col_01_fld']; //SET $_col_01_fld

        if(!file_exists($filePath)){
            $response=array(
                'success' => FALSE,
                'msg' => t('csv','noCsvFile')
            );
            echo CJSON::encode($response);
            exit;
        }
        // $model=$dynamic['model_name'];
        $csvHeaders=$this->readCsvdata($filePath,true);
        $csvData=$this->readCsvdata($filePath);

        $arrComm=implode("','", $csvHeaders);
        $excludedCompulsaryHeaderFlds=$this->getExcludedCompulsaryHeaders($csv_report_id);
        $compulsaryCsvHeaders = $this->getCsvHeaders($csv_report_id);
        $compulsaryCsvHeaders = array_merge($compulsaryCsvHeaders,$excludedCompulsaryHeaderFlds);
        
        $columns_list = array();
        $countCsvRecord=0;
        $successImports=0;
        $failedImports=0;
        $failedImportRec=array();
        $successImportRec=array();
        $checkResult=array();
        $btnCtrl=array(
            'btnCsvCheck' => false,
            'btnCsvDelete' => false,
            'btnUpload' => false,
            'btnErrorCsvDownload' => false,
            'btnNewCsvInsert' => false,
            'btnUpdateCsvDownload' => false,
            'btnCpUpdate' => true,
        );
        $errorStatus='';
        $successStatus='';
        $exclude=array();
        $col_01_fld_idx = -1;
        $order_masters_id_idx = -1;
        foreach ($csvHeaders as $idx => $field_label) {
            $hdr_label = convertDBStr($field_label);
            $csvHeaders[$idx] = $hdr_label;
            $isMatchFound = FALSE;
            // $columns_list[] = '';
            foreach ($compulsaryCsvHeaders as $key => $field) {
                $fld_label = convertDBStr($field['field_label']);
                if($hdr_label == $fld_label)
                {
                    $columns_list[$idx] = $field['column_name'];
                    $isMatchFound = TRUE;
                    if($field['column_name'] == 'order_masters_id'){
                        $order_masters_id_idx = $idx; 
                    }
                    else if($field['column_name'] == $this->_col_01_fld){
                        $col_01_fld_idx = $idx;
                    }
                }
            }
            if($isMatchFound === FALSE){
                $columns_list[$idx] = '';    
            }
        }
        // Add missing headers
        foreach ($compulsaryCsvHeaders as $key => $field) {
            if(!in_array(convertDBStr($field['field_label']), $csvHeaders)){
                $csvHeaders[]=convertDBStr($field['field_label']);
                $columns_list[]=$field['column_name'];
            }   
        }
        
        $model = null;
        //FOR EACH RECORD IN CSV FILE
        foreach($csvData as $csvVal){
            // $is_new = TRUE;
            $model = $this->_getModel($csvVal,$dynamic,$csv_report_id,$order_masters_id_idx,$col_01_fld_idx);
            // $is_new = $model->isNewRecord;
            $temp=array();
            $error=array('errorMsg' =>'', 'errorValue' => '', 'errorCode' => 0);
            $name = null;
            $invalidOrderMastersId = FALSE;
            $emptyOrderMastersId = FALSE;
            $errFld = '';
            // print_r($columns_list);
            foreach ($columns_list as $idx => $db_field) 
            {
                if(!empty($db_field)) {
                    if($db_field == "order_masters_id"){
                        if(empty($csvVal[$order_masters_id_idx])){
                            $emptyOrderMastersId = TRUE;
                            break;
                        }
                        else{
                            $orderMasterModel = OrderMaster::model()->findByAttributes(array('id' => $csvVal[$order_masters_id_idx], 'delete_flg' => 0));
                            if(empty($orderMasterModel)){
                                $invalidOrderMastersId = TRUE;
                                $errFld = $csvVal[$order_masters_id_idx];
                                break;
                            }
                            $model->$db_field = $csvVal[$order_masters_id_idx];
                        }
                    }
                    else if($db_field == $this->_col_01_fld){
                        if(!empty($csvVal[$col_01_fld_idx])){
                            $model->$db_field = $csvVal[$col_01_fld_idx];
                        }
                    }
                    else if(!empty($csvVal[$idx])){
                        $model->$db_field = convertDBStr($csvVal[$idx]);
                    } 
                    $temp[$idx] = array_key_exists($idx, $csvVal)==true ? $csvVal[$idx] : null;   
                }
                else{
                    $temp[$idx] = null;
                }
            }
            if($model->validate()===TRUE && $invalidOrderMastersId==FALSE && $emptyOrderMastersId==FALSE){
                $successImports++;
                $successImportRec[] = $temp;
                // $validImports[] = $temp;
                $checkResult[] = array('success'=> TRUE,'row' => ++$countCsvRecord);     
            }
            else{
                if($invalidOrderMastersId){
                    $error=array('errorMsg' =>t('csv','invalidOrderMastersId'), 'errorValue' => $errFld, 'errorCode' => 2);
                }
                else if($emptyOrderMastersId){
                    $error=array('errorMsg' =>t('csv','emptyOrderMastersId'), 'errorValue' => '', 'errorCode' => 3);    
                }
                else{
                    $error=array('errorMsg' =>t('csv','invalidRecord'), 'errorValue' => '', 'errorCode' => 1);    
                }
                $failedImports++;
                $failedImportRec[] = $csvVal;
                $checkResult[] = array('success'=> FALSE,'model_error'=> $model->getErrors(),'row' => ++$countCsvRecord,'error' => $error);         
            }
            
        }
        //PREPARE CSV FILE FOR SUCCESSFUL CSV DATA AND ERROR CSV DATA

        $successFilename=$csvSuccess.$this->_validPrefix.$fileName;
        $failedFilename=$csvError.$this->_errorPrefix.$fileName; 
        if($failedImports>0){
            $this->writeCsvdata($failedFilename,$csvHeaders,$failedImportRec);
            $btnCtrl['btnErrorCsvDownload']=true;    
        }
        // $newFilename=$csvNew.$this->_newPrefix.$fileName; 

        if($successImports> 0){
            $this->writeCsvdata($successFilename,$csvHeaders,$successImportRec,'w+');
            $btnCtrl['btnUpload']=true;  
        }
        $response=array(
            'success' => TRUE,
            'checkResult' => $checkResult, 
            'totalRecords' => $countCsvRecord,
            'successImports' => $successImports,
            'failedImports' => $failedImports,
            // 'newRecords' => $newImports,
            'status' => $btnCtrl
        );
        header('Content-Type: application/json; charset=utf-8');
        echo CJSON::encode($response);
        exit;
    }

    public function writeCsvdata($filename,$csvHeaders=null,$csvData,$mode="a+"){

        if (($handle = fopen($filename, $mode)) !== FALSE) {

            if(!empty($csvHeaders)){
                //INSERT HEADERS
                $temp=array();
                foreach ($csvHeaders as $key => $value) {
                    $temp[]=mb_convert_encoding($value, 'Shift_JIS', 'auto');
                        # code...
                    
                }
                fputcsv($handle, $temp);   
            }
            foreach ($csvData as $row) {
                $temp=array();
                foreach ($row as $key => $value) {
                    if(!empty($value))
                        $temp[]=mb_convert_encoding($value, 'SJIS-win', 'auto');
                    else{
                        $temp[]=$value;  
                    }
                    # code...
                }
                fputcsv($handle, $temp);
            }
        }
        fclose($handle);
    }

    public function confirmCsvImport($fileName/*,$oldFileName,$fileFolder*/){
        
        $successFilePath=Yii::app()->params['csv']['csv_valid'].$this->_validPrefix.$fileName;
        $errorFilePath=Yii::app()->params['csv']['csv_error'].$this->_errorPrefix.$fileName;
        
        if(!empty($oldFileName))
            $fileName = $oldFileName;
        
        $response=array('success' => FALSE,'hasFailedImports' => FALSE, 'hasSuccessImports' => FALSE);
        
        if(!file_exists($errorFilePath) && file_exists($successFilePath)){
            $response=array('success' => TRUE, 'hasFailedImports' => FALSE, 'hasSuccessImports' => TRUE);
        }
        else if(file_exists($errorFilePath) && file_exists($successFilePath)){
            $response=array('success' => TRUE, 'hasFailedImports' => TRUE, 'hasSuccessImports' => TRUE);    
        }
        else if(file_exists($errorFilePath) && !file_exists($successFilePath)){
            $response=array('success' => FALSE, 'hasFailedImports' => TRUE, 'hasSuccessImports' => FALSE);    
        }
        echo CJSON::encode($response);
        exit();
    }

    public function importCsv($importParams){
        $fileName           = $importParams['fileName'];
        $oldFileName        = $importParams['oldFileName'];
        $dynamic            = $importParams['dynamic'];
        $csv_report_id      = $importParams['csv_report_id'];

        
        // $csvFailedFolder=Yii::app()->params['csv']['csv_error'];
        $csvFolder = Yii::app()->params['csv']['csv_valid'];
        $fullFilename = $this->_validPrefix.$fileName;
        $validFilePath=$csvFolder.$fullFilename;

        if(file_exists($validFilePath)){
            $extractParams = array(
                'csvFile'           => $validFilePath,
                'fileName'          => $fileName,
                'dynamic'           => $dynamic,
                'csv_report_id'     => $csv_report_id
            );
            return $this->extractData($extractParams);    
        }else{
            echo ('file doesnot exist');exit;
        }
    }

    public function extractData($extractParams){
        $csvFile            = $extractParams['csvFile'];
        $originalFilename   = $extractParams['fileName'];
        $csv_report_id      = $extractParams['csv_report_id'];
        $dynamic            = $extractParams['dynamic'];

        $csvUtil = new CSVUtil();
        $csvHeaders=$csvUtil->readCsvdata($csvFile,true);
        $csvData=$csvUtil->readCsvdata($csvFile);
        $pathinfo = pathinfo($csvFile);
        $filename = $pathinfo['basename'];

        $excludedCompulsaryHeaderFlds=$this->getExcludedCompulsaryHeaders($csv_report_id);
        $compulsaryCsvHeaders = $this->getCsvHeaders($csv_report_id);
        $compulsaryCsvHeaders = array_merge($compulsaryCsvHeaders,$excludedCompulsaryHeaderFlds);
        $columnList = array();

        $this->_col_01_fld = $dynamic['col_01_fld']; //SET $_col_01_fld

        $col_01_fld_idx = -1;
        $order_masters_id_idx = -1;
        // set columnList from csv headers
        foreach ($csvHeaders as $idx => $fld_label) {
            $isMatchFound = FALSE;
            foreach ($compulsaryCsvHeaders as $fld) {
                if(convertDBStr($fld['field_label']) == convertDBStr($fld_label)){
                    $columnList[] = $fld['column_name'];
                    $isMatchFound = TRUE;
                    if($fld['column_name'] == 'order_masters_id'){
                        $order_masters_id_idx = $idx; 
                    }
                    else if($fld['column_name'] == $this->_col_01_fld){
                        $col_01_fld_idx = $idx;
                    }
                    break;
                }
            }
            if($isMatchFound === FALSE){
                $columnList[$idx] = '';
            }
        }


        $failedImports = 0;
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();

        try{
            $model = null;
            $orderMasterIds = array();
            foreach($csvData as $key => $csvVal){
                $model = $this->_getModel($csvVal,$dynamic,$csv_report_id,$order_masters_id_idx,$col_01_fld_idx);
                
                foreach ($columnList as $idx => $db_field){
                    if(!empty($db_field) && !empty($csvVal[$idx])){
                        $model->$db_field = convertDBStr($csvVal[$idx]);
                    }
                }
                $saved = $model->save();
                
                if (!$saved){
                    // Yii::log($message, $level, $category);
                    Yii::log($model->getErrors(), 'error');
                    $failedImports++;
                    break;    
                }
            }
            //ALL RECORDS ARE SAVED SUCCESSFULLY i.e, $record->save() => TRUE
            if($failedImports==0){
                //TRANSACTION IS COMMITTED
                $transaction->commit();
                $csvSuccessPath = Yii::app()->params['csv']['csv_success'];
                $successFilePath = $csvSuccessPath.$this->_successPrefix.$originalFilename;
                rename($csvFile,$successFilePath);

                $response=array('success'=> TRUE , 'msg' => t('csv','importSuccess'));
                return $response;

            }
            else{
                if($transaction)
                    $transaction->rollback();
                $csvFailedPath = Yii::app()->params['csv']['csv_error'];
                $failedFilePath = $csvFailedPath.$this->_errorPrefix.$originalFilename;
                $response=array('success'=> FALSE , 'msg' => t('csv','importFailed'));  
                $this->writeCsvdata($failedFilePath,null,$csvData);
                
                //DELETE FILE FROM VALID FOLDER SINCE THE CSV DATA HAS BEEN MOVED TO ERROR CSV DATA
                if(file_exists($csvFile))
                    unlink($csvFile);
                return $response;
            }
        }
        catch (Exception $e){
            if($transaction)
                $transaction->rollback();
            
            $response=array('success'=> FALSE , 'msg' => t('csv','importFailed'),'error' => $e); 
            return $response;
        }
    }

    public function downloadFailedCsv($fileName){
        $csvFolder=Yii::app()->params['csv']['csv_error'];
        $errorFile=$this->_errorPrefix.$fileName;
        $filePath=$csvFolder.$errorFile;

        if(file_exists($filePath)){
            header("Content-Type: application/octet-stream");
            header('Cache-Control: jpayotyahi-to-fix-ie8-issue'); //public, no-cache
            header("Content-Transfer-Encoding: Binary");
            header("Content-disposition: attachment; filename=\"" . $fileName . "\"");
            ob_clean();
            flush();
            readfile($filePath);    
        }
        else{
            //Do Something
        }
    }

    private function _getModel($csvVal,$dynamic,$csv_report_id,$order_masters_id_idx,$col_01_fld_idx){
        $model = null;
        $col_01 = 'column_'.$dynamic['table_id'].'_01';
        $searchCondition = array();
        $setModelNull = TRUE;
        if($col_01_fld_idx > -1 && !empty($csvVal[$col_01_fld_idx])){
            $searchCondition = array(
                $col_01 => $csvVal[$col_01_fld_idx],
                'delete_flg' => 0
            );
            if($csv_report_id == 1){
                $setModelNull = FALSE;
            }
            else if($csv_report_id == 2 || $csv_report_id == 3){
                if($order_masters_id_idx > -1 && !empty($csvVal[$order_masters_id_idx])){
                    $setModelNull = FALSE;
                    $searchCondition['order_masters_id'] = $csvVal[$order_masters_id_idx];
                    
                }
            }
        }

        if(!$setModelNull){
            $model = $dynamic['model_name']::model();
            $model = $model->findByAttributes($searchCondition);  
        } 
        
        if(!empty($model)){
            $model->isNewRecord = FALSE;    
        }
        else{
            $model = new $dynamic['model_name'];
            $model->isNewRecord = true;
            $model->created_by = Yii::app()->user->getAttr('user_id');
            $model->created_datetime = date('Y-m-d H:i:s');
            $model->company_id = 1;
            $model->department_id = 1;
            $model->delete_flg = 0;
        }

        $model->updated_by = Yii::app()->user->getAttr('user_id');
        $model->updated_datetime = date('Y-m-d H:i:s');
        
        return $model;
        
    }

    
}
