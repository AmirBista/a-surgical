<?php
/*
 * all functions which do not require user login
 */
class RptAdminController extends PrivateController {
	public function init() {
	    $this->layout = "//layouts/".RPT_FOLDER.PROJECT_NAME."_printpreview";
	}

	public function getCsvData($csv_fileName){
		$validate = $this->validateCsv($csv_fileName);
		$csv_to_array = array();
		if ($validate['isvalid']) {
			$csv_path = $validate['csv_path'];
			$config_path = $validate['config_path'];
			$csv_to_array = $this->readCsv($csv_fileName,$csv_path,$config_path);
			$return_data = array('success'=>true,'csv_to_array'=>$csv_to_array,'msg'=>'');
		}else{
			$return_data = array('success'=>false,'csv_to_array'=>$csv_to_array,'msg'=>$validate['msg']);
		}
		return $return_data;
	}

	public function validateCsv($csv_fileName){
		$params = Yii::app()->params;

		$extension = pathinfo($csv_fileName, PATHINFO_EXTENSION);
		if(!empty($extension) && $extension=='csv'){
			$filebox_path = isset($params['csv_path'])?$params['csv_path']:null;
			$config_path = Yii::getPathOfAlias('webroot').'/protected/config/config.csv/csv_config.abase.ini';

			$file_path=Yii::getPathOfAlias('webroot').'/'.$filebox_path.'abase/'.$csv_fileName;
			if(file_exists($file_path)){
				if (file_exists($config_path)) {
					$return=array('isvalid'=>true,'csv_path'=>$file_path,'config_path'=>$config_path);
				}else{
					$return=array('isvalid'=>false,'msg'=>$config_path.' Does not exist!');
				}
			}else{
				$return=array('isvalid'=>false,'msg'=>$file_path.' Does not exist!');
			}
		}else{
			$return=array('isvalid'=>false,'msg'=>'Invalid file format!');
		}
		return $return;
	}

	public function readCsv($csv_fileName,$csv_path,$config_path,$delimiter=','){
		$header = NULL;
		$params = Yii::app()->params;

		$data = array();
		if (($handle = fopen($csv_path, 'r')) !== FALSE)
		{
			while (($row = $this->_fgetcsv_reg($handle, 1000, $delimiter)) !== FALSE)
			{
				if(!$header){
					$getconfig = parse_ini_file($config_path,true);
					$template_name = Yii::app()->request->getParam('type',null);
					$template_type = explode('_',$template_name);
					$config_csv_header = $getconfig['csv_column_key_template'.$template_type[1]];
					foreach ($row as $key => $value) {
						$encoded_header = jpTextEncode($value);
						if (isset($config_csv_header[$encoded_header])) {
							$returnArray[$key]  =$config_csv_header[$encoded_header];
						}else{
							$returnArray[$key] = $encoded_header;
						}
					}
					$header = $returnArray;
				}
				else{
					foreach ($row as $index => $csv_value) {
						$csv_data[$index]=jpTextEncode($csv_value);
					}
					$data[] = array_combine($header,$csv_data);
				}
			}
			fclose($handle);
		}
		return $data;
	}

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


	public function actionGetDownloadedFile(){
		$current_url = $_SERVER['REQUEST_URI'];
		$type = $_GET['type'];
		$filename = Yii::app()->request->getParam('downloadfile',null);
		$explode_filename = explode('.', $filename);
		$ext_type = $explode_filename[1];
		if ($ext_type=='html') {
			$filepath = Yii::app()->params['export_path']['html_export'].$type.'/'.$filename;
		}else{
			$filepath = Yii::app()->params['export_path']['pdf_export'].$type.'/'.$filename;
		}
		if (isset($_GET['download'])) {
			if ($ext_type=='html') {
					header('Content-Description: File Transfer');
					header("Content-type:text/vcard; charset=utf-8");
					header("Content-Disposition: attachment; filename=".basename($filepath));
					header('Content-Transfer-Encoding: binary');
					header('Expires: 0');
					header('Cache-Control: must-revalidate');
        			header('Pragma: public');
					readfile($filepath);
				}else{
					header("Content-Type: application/octet-stream");
					header("Content-Disposition: attachment; filename=".basename($filepath));
					header('Content-Transfer-Encoding: binary');
					header('Expires: 0');
					header('Cache-Control: must-revalidate');
        			header('Pragma: public');
					readfile($filepath);
				}
		}else{
			$this->renderPartial('//commonview/downloads',array('current_url'=>$current_url,'filename'=>$filename));
		}
	}


	public function emailReport($email_from,$email_to,$email_subject,$email_message,$attach_path){
		$render_email=$this->renderPartial('//commonview/email_message',array('email_message'=>$email_message),true);
		if(sendEmail($email_from,$email_subject,$render_email,$email_to,$attach_path)){
			return TRUE;
		}else{
			return FALSE;
		}
	}

	public function checkViewFile($csv_fileName,$viewType){
		$params = Yii::app()->params;

		$explode_extension = explode('.', $csv_fileName);
		$csv_file = $explode_extension[0];
		$csvType = $params['csvtype'][PROJECT_NAME];
		$count = count($csvType)+1;

		$main_csv = $params['csv'][PROJECT_NAME].$csv_file;
		$csvPath[] = $main_csv.'.csv';
		$csvtypes[] = '';

		foreach ($csvType as $csvtype) {
			$csvtypes[] = $csvtype;
			$csvPath[] = $main_csv.'-'.$csvtype.'.csv';
		}

		for ($i=0; $i < $count ; $i++) {
			$return[$csvtypes[$i]] = array(
					'csvPath'=>$csvPath[$i],
					'csvPath_msg'=>file_exists($csvPath[$i])?TRUE:$csvPath[$i].' not found!',
				);
		}
		return $return;
	}
	public function tplParamsReq($tpl){
		$req = array(
			'template_91'=>array('csvFileName','type'),
			'template_92'=>array('csvFileName','type'),
			'template_93'=>array('csvFileName','type'),
			'template_94'=>array('csvFileName','type'),
			'template_95'=>array('csvFileName','type'),			
			'driver_report'=>array('ordermaster_ids','type'),
			// 'report-07'=>array('ordermaster_ids','type'),
			// 'report-08'=>array('ordermaster_ids','array_data','type'),
			// 'report-09'=>array('ordermaster_ids','array_data','type'),
		);
		if(isset($req[$tpl]))
			return $req[$tpl];
	}
	public function validateUrl(){
		$csvFileName = Yii::app()->request->getParam('csvFileName',null);
		$type = Yii::app()->request->getParam('type',null);
		$ordermaster_ids = Yii::app()->request->getParam('order_detail_ids',null);
		$array_data = Yii::app()->request->getParam('array_data',null);
		$params = Yii::app()->params;
		$filebox_path = isset($params['csv_path'])?$params['csv_path']:null;

		$csvfile_path=Yii::getPathOfAlias('webroot').'/'.$filebox_path.PROJECT_NAME.'/'.$csvFileName;
		$viewPath = Yii::getPathOfAlias('webroot').'/protected/views/'.PROJECT_NAME.'PrintReport/'.$type.'.php';
		$reqParams = $this->tplParamsReq($type);
		if(!empty($reqParams)){
				// var_dump(empty($csvFileName));die;
			if(in_array('csvFileName', $reqParams)){
				if(empty($csvFileName)){
					throw new CHttpException(404,'Empty CSV File');
				}
				else if(!file_exists($csvfile_path)){
					throw new CHttpException(404,'The csv file was not found');
				}
			}
			if(in_array('ordermaster_ids', $reqParams)){
				if(empty($ordermaster_ids)){
					throw new CHttpException(404,'This template must required order master ID');
				}
			}
			if(in_array('array_data', $reqParams)){
				if(empty($array_data)){
					throw new CHttpException(404,'array_data parameter is not defined');
				}
				else if(!method_exists('CsvReport',$array_data)){
					throw new CHttpException(404,$array_data.' function does not exists');
				}
				else {
					$reflection = new ReflectionMethod('CsvReport', $array_data);
				    if (!$reflection->isPublic()) {
				        throw new CHttpException(404,"The called method is not public.");
				    }
				}
			}
		}
		if(empty($type)){
			throw new CHttpException(404,'Template is not defined');
		}
		else if(!file_exists($viewPath)){
			throw new CHttpException(404,$type.' Template not found');
		}
		/*else{
			die('CSV file name is not defined!');
		}*/
	}

	public function emailSubmit($file_name){
		// $viewType = $_GET['type'];
		$viewType = Yii::app()->request->getParam('type',null);
		$get_email = Yii::app()->request->getParam('email',null);
		if (!empty($get_email)) {
			// $email_from = $_GET['emailfrom'];
			$email_from = Yii::app()->params['adminEmail'];Yii::app()->request->getParam('adminEmail',null);
			$email_to = Yii::app()->request->getParam('emailto',null);
			$email_subject = Yii::app()->request->getParam('emailsub',null);
			$email_message = Yii::app()->request->getParam('emailmessage',null);

			$attach_path = Yii::app()->params['export_path']['pdf_export'].$viewType.DS.$file_name.'.pdf';
			$send_email = $this->emailReport($email_from,$email_to,$email_subject,$email_message,$attach_path);
			echo CJSON::encode(array('success'=>TRUE));
		}else{
			echo CJSON::encode(array('success'=>TRUE,'file_name'=>$file_name,'baseUrl'=>Yii::app()->request->baseUrl));
		}
	}
}