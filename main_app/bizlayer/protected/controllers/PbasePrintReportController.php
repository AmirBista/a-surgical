<?php

class PbasePrintReportController extends RptAdminController
{
	public function actionGetReport()
	{
		if (!Yii::app()->request->isPostRequest) {
			$this->validateUrl();
		}

		$this->actionGetReportView();
	}
	public function actionGetReportView()
	{
			if (!Yii::app()->request->isPostRequest) {
				$this->validateUrl();
			}
			// $this->actionGetReport();
			/*Read csv filename*/
			$csv_fileName = Yii::app()->request->getParam('csvFileName',null);

			$viewType = Yii::app()->request->getParam('type',null);
			$ordermaster_ids = Yii::app()->request->getParam('order_detail_ids',null);
			$export_as = Yii::app()->request->getParam('export_as',null);

		 	$user_info = Yii::app()->user->getUserInfo();
	        $company_id = $user_info['company_id'];
	        // Add this parameter for different data render from array
	        $array_data = Yii::app()->request->getParam('array_data',"getCsvReportArray");
	        
	        $templateData = array();
	        $mappedData=array();
	        if (empty($csv_fileName)) {
		        $csvReport = new CsvReport();
		        $order_master_ids = explode(',',$ordermaster_ids);
		        // var_dump($order_master_ids);die;
		        $data_responses = array();
		        foreach ($order_master_ids as $key=>$order_id) {
			        // $data_responses[] = $csvReport->getCsvReportArray($company_id,$order_id);
			        $data_responses[] = $csvReport->$array_data($company_id,$order_id,5);
		        	// new dbug($csvReport->$array_data($company_id,$order_id,5));
		        	// die();
		        }
	        	// new dbug($data_responses);
		        // 	die;
		        // echo '<meta charset="utf-8"/><pre>';
		        // print_r($data_responses);
		        // die();
		        $mappedData = $this->mappedDataDriver($data_responses);
		        // if($viewType=='report-08' || $viewType=='report-09'){

		        	/** add sku in bill */
		        	/* TP_12->product name of bill
		        	/* TP_10 product name of sku Item Info
		        	**/
		        	// $mappedData= $this->addSkuForBill($mappedData,'TP_12','TP_10');
		        // }
		        $data_response = array(
					'post_array'=>$mappedData,
					'success'=>TRUE
				);
	        }else{
	        	$data_responses = $this->getCsvData($csv_fileName);
	        	// var_dump($data_responses);
	        	if(isset($data_responses['csv_to_array']) && empty($data_responses['csv_to_array'])){
	        		die('Empty data');
	        	}
	        	$templateData = RptUtility::setGroupByArray($data_responses['csv_to_array'],$viewType);
	        	// echo '<meta charset="utf-8"/><pre>';
		        // print_r($templateData);
		        // die;
	        	$data_response = array(
					'csv_to_array'=>$templateData,
					'success'=>TRUE
				);
	        }
			//$data_response = $this->getArrayData($viewType);

			$get_page_orientation = 'P';		//orientation for different view files
			/*if csv is converted to array*/
			if ($data_response['success']) {
				$sku_count = 0;
				$total_page=0;
				if (!empty($csv_fileName)) {
					$array_data = $data_response['csv_to_array'];
					$total_page = count($array_data);

				}else{
					$array_data = $mappedData;
					// $count_array_data = $this->countData($array_data);
					// $total_page = $count_array_data['total_array_data'];
					// $sku_count = $count_array_data['sku_counts'];
				}

				if (!empty($export_as)) {
					$jsonResponse = $this->render('common',array(
															'orientation'=>$get_page_orientation,
															'viewType'=>$viewType,
															'params'=>Yii::app()->params,
															// 'file_name'=>$file_name,
															'export_type'=>strtolower($export_as),
															'array_data'=>$array_data,
															'total_page'=>$total_page,
															// 'sku_count'=>$sku_count
														),true);
					$this->emailSubmit(DATE);
				}else{
					$this->render($viewType,array(
						'orientation'=>$get_page_orientation,
						'params'=>Yii::app()->params,
						// 'file_name'=>$file_name,
						'printpdf'=>false,
						// 'checkViewFile'=>$checkViewFile,
						'array_data'=>$array_data,
						'total_page'=>$total_page,
						// 'sku_count'=>$sku_count
					));
				}
			}else{
				die($data_response['msg']);
			}
	}

	public function countData($array_data){
		$count_data = count($array_data);
		$tot = 0;
		foreach ($array_data as $sku_key=>$skudata) {
			$sku_count[$sku_key] = count(@$skudata['sku_print']);
		}
		if(!empty($sku_count)){
			foreach ($sku_count as $sku_value) {
				$tot=$tot+$sku_value;
			}
		}
		$total_array_data = $count_data+$tot;
		$return_counts = array(
				'sku_counts' => $sku_count,
				'total_array_data' => $total_array_data
			);
		return $return_counts;
	}
	public function getArrayData($viewType){
		$return = array(
				'post_array'=>$this->mappedData(),
				'success'=>TRUE
			);
		return $return;
	}
	public function mappedData_old($posted_data=array()){
		$config_path = Yii::getPathOfAlias('webroot').'/protected/config/config.csv/csv_config.'.PROJECT_NAME.'.ini';
		$getconfig = parse_ini_file($config_path,true);
		// echo '<meta charset="utf-8"><pre>';
		$mapped_array = array();
		$master_config = @$getconfig['posted_array_master_report-05-06-07'];
		$bill_config = @$getconfig['posted_array_bill_report-05'];
		$sku_config = @$getconfig['posted_array_sku_report-06'];
		$print_config = @$getconfig['posted_array_print_value_report-06'];
		$print_summary_config = @$getconfig['posted_array_print_summary_report-06'];
		$print_memo_config = @$getconfig['posted_array_memo_report-05'];
		//For Account template 08 and 09
		$account_config = @$getconfig['posted_array_account_report-08'];
		//check if sku header 未確定 has all data empty-->if yes..remove column--exp = exceptional case :P
		$sku_exp_col = '未確定';
		if(empty($posted_data)){
			die('Empty Posted data');
		}
		foreach ($posted_data as $key => $value) {
			foreach($value as $key1=>$val1){
				// $mapped_array[$key1] = $mapped_array;
				//master data
				$master_posted =  isset($posted_data[$key]['master'])?$posted_data[$key]['master']:array();

				if(!empty($master_posted)){
					foreach($master_posted as $key2=>$val2){
						$map_data = "";
						if (array_key_exists($key2, $master_config)){
								$map_data = $master_config[$key2];
						}
						/*if($map_data=='TP_31'){
							$memo = str_replace(array( '(', ')' ), '', $val2);
							$mapped_array[$key]['master'][$map_data] = $print_memo_config[$memo];
						}
						else*/
							$mapped_array[$key]['master'][$map_data] = $val2;
					}
				}

				//bill
				$bill_posted =  isset($posted_data[$key]['bill'])?$posted_data[$key]['bill']:array();
				if(!empty($bill_posted)){
					foreach(@$bill_posted as $key3=>$val3){
						foreach(@$val3 as $key4=>$val4){
							$map_data = "";
							if (array_key_exists($key4, $bill_config)){
									$map_data = $bill_config[$key4];

							}

							if(empty($val4)) $val4='&nbsp;';
							$mapped_array[$key]['bill'][$key3][$map_data] = $val4;
						}
					}
				}
				//sku & print
				$sku_print_posted = isset($posted_data[$key]['sku_print'])?$posted_data[$key]['sku_print']:array();
				if(!empty($sku_print_posted)){
					foreach(@$sku_print_posted as $key5=>$val5){
						//sku,print,print summary
						$sku_posted = isset($sku_print_posted[$key5]['sku']) ? $sku_print_posted[$key5]['sku'] :"";
						$print_posted = isset($sku_print_posted[$key5]['print'])?$sku_print_posted[$key5]['print']:'';
						$print_summary_posted = isset($sku_print_posted[$key5]['print_summary'])?$sku_print_posted[$key5]['print_summary']:"";

						if(!empty($sku_posted)){
							//sku loop
							foreach(@$sku_posted as $key6=>$val6){
								foreach(@$val6 as $key7=>$val7){
									$item_info = $val6['item_info'];
									$sku_array = $val6['sku_array'];


									//item_info
									foreach($item_info as $key8=>$val8){
										$map_data = isset($sku_config[$key8])?$sku_config[$key8]:null;
										if(!empty($map_data))
											$mapped_array[$key]['sku_print'][$key5]['sku'][$key6]['item_info'][$map_data] = $val8;
									}
									//check for text 未確定=undetermined
									// var_dump($sku_array);
									$check_undermined = 0;
									foreach($sku_array as $key_sku_array=>$val_sku_array){
										if(isset($val_sku_array[$sku_exp_col]) && !empty($val_sku_array[$sku_exp_col])){
											$check_undermined++;
										}
									}
									if($check_undermined==0){
										foreach($sku_array as $key_sku_array=>$val_sku_array){
											unset($sku_array[$key_sku_array][$sku_exp_col]);
										}

									}
									// var_dump($sku_array[$key_sku_array]);die;
									$mapped_array[$key]['sku_print'][$key5]['sku'][$key6]['sku_array'] = $sku_array;

									//foreach(@$val7 as $key8=>$val8){

										//$map_data = isset($sku_config[$key8])?$sku_config[$key8]:null;
										//if(!empty($map_data))
											//$mapped_array[$key]['sku_print'][$key5]['sku'][$key6][$key7][$map_data] = $val8;
										//else
											//$mapped_array[$key]['sku_print'][$key5]['sku'][$key6][$key7][$key8] = $val8;
									//}
								}
							}
						}

						if(!empty($print_posted)){
							//print loop
							foreach(@$print_posted as $key9=>$val10){
								foreach(@$val10 as $key11=>$val11){
									$map_data = @$print_config[$key11];
									if(!empty($map_data))
										$mapped_array[$key]['sku_print'][$key5]['print'][$key9][$map_data] = $val11;
								}
							}
						}

						// $mapped_array[$key]['sku_print'][$key5]['print_summary'] = $print_summary_posted;
						if(!empty($print_summary_posted)){
							foreach($print_summary_posted as $key12=>$val12){
								foreach(@$val12 as $key13=>$val13){
									$map_data = @$print_summary_config[$key13];
									if(!empty($map_data))
										$mapped_array[$key]['sku_print'][$key5]['print_summary'][$key12][$map_data] = $val13;
								}
							}
						}
					}
				}
			// Mapped for Account for Report 8
			$account_posted =  isset($posted_data[$key]['account'])?$posted_data[$key]['account']:array();

				if(!empty($account_posted)){
					foreach($account_posted as $key14=>$val14){
						$map_data = "";
						if (array_key_exists($key14, $account_config)){
								$map_data = $account_config[$key14];
						}
						$mapped_array[$key]['account'][$map_data] = $val14;
					}
				}	

			}
		}
		// print_r($mapped_array);
		return $mapped_array;
	}

	//driver map data
	public function mappedDataDriver($posted_data=array()){
		$config_path = Yii::getPathOfAlias('webroot').'/protected/config/config.csv/csv_config.'.PROJECT_NAME.'.ini';
		$getconfig = parse_ini_file($config_path,true);
		// echo '<meta charset="utf-8"><pre>';
		$mapped_array = array();
		$driver_info_conf = @$getconfig['column_key_driver_info'];
		$detail_info_conf = @$getconfig['column_key_driver_task_detail_info'];
		$order_master_conf = @$getconfig['column_key_driver_order_master'];
		$product_information_conf = @$getconfig['column_key_driver_product_information'];
		$order_detail_conf = @$getconfig['column_key_driver_order_detail'];
		// new dbug($driver_info);

		foreach ($posted_data as $key => $value) {
			foreach($value as $key1=>$val1){
				//driver info data
				$driver_info =  isset($val1['driver_info'])?$val1['driver_info']:array();
				if(!empty($driver_info)){
					foreach($driver_info as $key2=>$val2){
						$map_data = "";
						if (array_key_exists($key2, $driver_info_conf)){
							$map_data = $driver_info_conf[$key2];
						}
						else{
							$map_data = $key2;
						}
						$mapped_array[$key]['driver_info'][$map_data] = $val2;
					}
				}
				// new dbug($mapped_array);
				//bill
				$task_info =  isset($val1['task_info'])?$val1['task_info']:array();
				if(!empty($task_info)){
					foreach($task_info as $key3=>$val3){
						$detail_info = $val3['detail_info'];
						foreach($detail_info as $key4=>$val4){
							// $map_data = "";
							if (array_key_exists($key4, $detail_info_conf)){
								$map_data = $detail_info_conf[$key4];
							}
							else{
								$map_data = $key4;
							}

							if(empty($val4)) $val4='&nbsp;';
							$mapped_array[$key]['task_info'][$key3]['detail_info'][$map_data] = $val4;
						}
						
						$order_master = $val3['order_master'];
						foreach($order_master as $key5=>$val5){
							$map_data = "";
							if (array_key_exists($key5, $order_master_conf)){
									$map_data = $order_master_conf[$key5];
							}

							if(empty($val5)) $val5='&nbsp;';
							$mapped_array[$key]['task_info'][$key3]['order_master'][$map_data] = $val5;
						}

						$product_information = $val3['product_information'];
						foreach($product_information as $key6=>$val6){
							foreach($val6 as $key7=>$val7){
								$map_data = "";
								if (array_key_exists($key7, $product_information_conf)){
										$map_data = $product_information_conf[$key7];
								}

								if(empty($val7)) $val7='&nbsp;';
								$mapped_array[$key]['task_info'][$key3]['product_information'][$key6][$map_data] = $val7;
							}
						}
						$order_detail = $val3['order_detail'];
						foreach($order_detail as $key8=>$val8){
							foreach($val8 as $key9=>$val9){
								$map_data = "";
								if (array_key_exists($key9, $order_detail_conf)){
									$map_data = $order_detail_conf[$key9];
								}

								if(empty($val9)) $val9='&nbsp;';
								$mapped_array[$key]['task_info'][$key3]['order_detail'][$key8][$map_data] = $val9;
							}
						}
						// new dbug($mapped_array);die;
					}
				}

			}
		}
		return $mapped_array;
	}
	//Function To Render Barcode on Print
	public function actionBarcodeImg() {
        $barcodefunc = new Barcode();
        $jan_code = $_GET['jan_code'];
        // Yii::log("Jan Code: = ".$jan_code, 'error');
        $barcodefunc->barcode_generate($jan_code);
        return;
    }

}