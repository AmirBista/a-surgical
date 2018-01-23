<?php

class RptUtility {
	//ps::print summary
    public static function searchPsMappedKey($value){
    	// return $value;
		$config_path = Yii::getPathOfAlias('webroot').'/protected/config/config.csv/csv_config.sbase.ini';
		$getconfig = parse_ini_file($config_path,true);
		$summary_header = $getconfig['posted_array_print_summary_report-06'];
		return array_search($value, $summary_header);
		// return !empty($final)?$final:'';
    }
    //ps::print summary
    public static function showPsData($mapped_val){
    	/*print_r($mapped_data);
    	die();*/
    	$print_summary_arr = array();
		// foreach ($mapped_data as $mapped_key => $mapped_val){

				$sku_print = isset($mapped_val['sku_print'])?$mapped_val['sku_print']:array();
				if(!empty($sku_print)){

					foreach($sku_print as $key=>$val){
						$print_summary = isset($val['print_summary']) ? $val['print_summary']:array();
						if(!empty($print_summary)){
							foreach($print_summary as $key1=>$val1){
								if(isset($val1['TP_14']) && $val1['TP_14']>0)
									$print_summary_arr[]='プリント';
								if(isset($val1['TP_15']) && $val1['TP_15']>0)
									// $print_summary_arr[]=self::searchPsMappedKey('TP_15');
									// Add this to change label for TP_15 @20150707	
									$print_summary_arr[]='ラメプリ';
								if(isset($val1['TP_16']) && $val1['TP_16']>0)
									$print_summary_arr[]=self::searchPsMappedKey('TP_16');
								if(isset($val1['TP_17']) && $val1['TP_17']>0)
									$print_summary_arr[]=self::searchPsMappedKey('TP_17');
								if(isset($val1['TP_18']) && $val1['TP_18']>0)
									$print_summary_arr[]=self::searchPsMappedKey('TP_18');
								if(isset($val1['TP_19']) && $val1['TP_19']>0)
									$print_summary_arr[]=self::searchPsMappedKey('TP_19');
							}
						}
					}
				}
		// }
		if(!empty($print_summary_arr)){
			$print_summary_arr = array_unique($print_summary_arr, SORT_REGULAR);
			$print_summary_arr = implode($print_summary_arr,',');
		}
		return !empty($print_summary_arr)?$print_summary_arr:'';
    }

    public static function setGroupByArray($data_responses,$template,$sorting=false){
    	$id_array=array();
    	$templateData=array();
    	if($template=='template_11'){
    		$i = 0;
	    	//group by ID then A2(for bill)
	    	$groupby_id = $templateData = array();
	    	foreach ($data_responses as $csv_key => $csvFields) {
	        	if (isset($csvFields['ID'])) {
	        		if(!in_array($csvFields['A2'], $groupby_id)){
	        			$templateData[$csvFields['ID'] ]['master'] = $csvFields;
	        			array_push($id_array,$csvFields['ID']);
	        		}
	        		$templateData[$csvFields['ID'] ]['bill_grp'][$csvFields['A2']][] = $csvFields;
				}
	    	}
    	}
    	else{
	    	foreach ($data_responses as $csv_key => $csvFields) {
	        	if (isset($csvFields['ID'])) {
	        		if($sorting){
	        			if(isset($csvFields['TP_10'])){
	        				$templateData[$csvFields['ID'] ][$csvFields['TP_10']] = $csvFields;
	        				// var_dump($templateData[$csvFields['ID'] ]);
	        			}
	        		}
	        		else{
	        			$templateData[$csvFields['ID'] ][] = $csvFields;
	        		}
				}
	    	}
	    	$final_sorting = array();
	    	if($sorting && !empty($templateData)){
	    		foreach ($templateData as $key => $val) {
					ksort($templateData[$key]);
					$final_sorting[$key] = array_values($templateData[$key]);
	    		}
    			$templateData = array();
    			$templateData = $final_sorting;
	    	}
    	}
    	return $templateData;
	}
}

