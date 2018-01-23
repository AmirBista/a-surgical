<?php

class AbasePrintReportController extends RptAdminController
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
			$ordermaster_ids = Yii::app()->request->getParam('ordermaster_ids',null);
			$export_as = Yii::app()->request->getParam('export_as',null);

		 	$user_info = Yii::app()->user->getUserInfo();
	        $company_id = $user_info['company_id'];
	        // Add this parameter for different data render from array
	        $array_data = Yii::app()->request->getParam('array_data',"getCsvReportArray");
	        $templateData = array();

	        if (empty($csv_fileName)) {
		        $csvReport = new CsvReport();
		        $order_master_ids = explode(',',$ordermaster_ids);
		        foreach ($order_master_ids as $key=>$order_id) {
			        // $data_responses[] = $csvReport->getCsvReportArray($company_id,$order_id);
			        $data_responses[] = $csvReport->$array_data($company_id,$order_id);
		        }
		        // echo '<pre>';
		        // echo '<meta charset="utf-8"/><pre>';
		        // print_r($data_responses);
		        // die();
		        $mappedData = $this->mappedData($data_responses);
		        if($viewType=='report-08' || $viewType=='report-09'){

		        	/** add sku in bill */
		        	/* TP_12->product name of bill
		        	/* TP_10 product name of sku Item Info
		        	**/
		        	$mappedData= $this->addSkuForBill($mappedData,'TP_12','TP_10');
		        }
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
				if (!empty($csv_fileName)) {
					$array_data = $data_response['csv_to_array'];
					$total_page = count($array_data);

				}else{
					$array_data = $data_response['post_array'];
					$count_array_data = $this->countData($array_data);
					$total_page = $count_array_data['total_array_data'];
					$sku_count = $count_array_data['sku_counts'];
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
															'sku_count'=>$sku_count
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
						'sku_count'=>$sku_count
					));
				}
			}else{
				die($data_response['msg']);
			}
	}
	//function for multi dimentional sum
	private function multiDimSum($array,$key){
		$total = 0;
		foreach($array as $row) 
			$total = $total + $row[$key]; 
		return $total;
	}
	private function addSkuForBill($mappedData,$bill_key,$item_info_key){
		//custom function for multi dimentional sum
		// $array_value_sum = create_function('$array,$key', '$total = 0; foreach($array as $row) $total = $total + $row[$key]; return $total;');
		if(!empty($mappedData)){
			//mapped data
			foreach($mappedData as $key=>$val){
				if(!empty($val)){
					//each order
					foreach($val as $key2=>$val2){
						$bill_posted =  @$val['bill'];//TP_15
						if(!empty($bill_posted)){
							//loop for multiple bill
							foreach($bill_posted as $key_bill=>$val_bill){
								$product_name = $val_bill[$bill_key];
								$sku_print = $val['sku_print'];
								$count_sku = 0;
								//get all sku print
								if(!empty($sku_print)){
									foreach($sku_print as $key3=>$val3){
										$sku = $val3['sku'];
										if(!empty($sku)){
											//sku data
											foreach($sku as $key4=>$val4){
												if($val4['item_info'][$item_info_key]==$product_name){
													$sku_array = $val4['sku_array'];
													$i = 1;
													$sku_data = '';
													if(!empty($sku_array)){
														$sku_keys = array_keys($sku_array[0]);
														//loop each sku key ie S,L,XL
														foreach($sku_keys as $sku_keys2=>$sku_val2){
															//skip two index..sum of product code and name is not required
															if($i>2){
																$sku_sum = $this->multiDimSum($sku_array, $sku_val2);
																if($sku_sum>0)
																	$sku_data.= $sku_val2.':'.$sku_sum.',';
															}
															$i++;
														}

													}
												}
											}
										}

									}
								}
								if(!empty($sku_data)){
									//remove last comma
									$sku_data = substr($sku_data, 0, -1);
								}
								//add sum of sku values in bill
								$mappedData[$key]['bill'][$key_bill]['SKU'] = $sku_data;
							}
						}
					}
				}
			}
		}
		// print_r($mappedData);die;
		return $mappedData;
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
	public function mappedData($posted_data=array()){
		$config_path = Yii::getPathOfAlias('webroot').'/protected/config/config.csv/csv_config.sbase.ini';
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

	//Function To Render Barcode on Print
	public function actionBarcodeImg() {
        $barcodefunc = new Barcode();
        $jan_code = $_GET['jan_code'];
        // Yii::log("Jan Code: = ".$jan_code, 'error');
        $barcodefunc->barcode_generate($jan_code);
        return;
    }

}