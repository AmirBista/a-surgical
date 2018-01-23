<?php
class CsvReport{
	protected $_csv_mapped_master_ids = array(
        'driver_info'        => 6,
        'detail_info'        => 7,
        'order_master'       => 8,
        'order_product'	     => 9,
        'order_detail'	     => 10,
        'product_stock'	     => 12
    );
	protected $_sort_order;

	/*--------------------------------------Bill Order Print  - START ---------------------------------------------*/
	
	public function __construct(){
		$this->_sort_order = t('report','sort_order');

	}

	private function _validateDriverDetail($driverInfo,$detail_info){
		$isValid = TRUE;
		foreach ($detail_info as $key => $value) {
			if(array_key_exists($key, $driverInfo)){
				if($driverInfo[$key] != $detail_info[$key]){
					$isValid = FALSE;
					break;
				}
			}
		}
		return $isValid;
	}

	// public function getCsvReportArray($company_id,$order_detail_ids,$report_id){
	// 	$reportArr = array();
	// 	$driverInfoArray = $this->_getDriverInfo($order_detail_ids);
	// 	foreach ($driverInfoArray as $key1 => $driverInfo) {
	// 		// $sql_where = $this->_getWhereCondition($driverInfo,$order_detail_ids);
	// 		$reportArr[$key1] = array('driver_info' => array(),'task_info' => array());
	// 		// DRIVER INFO
	// 		$reportArr[$key1]['driver_info'] = $driverInfo;
	// 		$detail_info = $this->_getDriverDetailInfo($driverInfo,$order_detail_ids);
	// 		$detailIdx = 0;
	// 		foreach ($detail_info as $key2 => $detail_info) {
	// 			$isValid = $this->_validateDriverDetail($driverInfo,$detail_info);
	// 			if($isValid == TRUE){
	// 				$reportArr[$key1]['task_info'][$detailIdx] = array('detail_info' => array(),'order_master'=> array(),'product_information'=> array(),'order_detail'=>array());
	// 				// ORDER DETAILS:: SINGLE RECORD BASED ON DRIVER INFO
	// 				$reportArr[$key1]['task_info'][$detailIdx]['detail_info'] = $detail_info;

	// 				$order_masters_id = $detail_info['order_masters_id'];
	// 				// ORDER MASTER
	// 				$reportArr[$key1]['task_info'][$detailIdx]['order_master'] = $this->_getOrderMasterInfo($order_masters_id);	
	// 				// ORDER PRODUCTS OF EACH ORDER MASTER RECORD
	// 				$reportArr[$key1]['task_info'][$detailIdx]['product_information'] = $this->_getOrderProductInfo($order_masters_id);
	// 				// ORDER DETAILS LIST OF EACH ORDER MASTER RECORD.
	// 				$reportArr[$key1]['task_info'][$detailIdx]['order_detail'] = $this->_getOrderDetailInfo($order_masters_id);
	// 				$detailIdx++;
	// 			}
	// 		}
			
	// 	}
	// 	if(isset($_GET['show']) && $_GET['show']=="json"){
	// 		echo CJSON::encode($reportArr);
	// 		exit;
	// 	}
	// 	return $reportArr;
	// }

	protected function _getDriverInfo($order_detail_ids){
		$sql = $this->_get_csv_report_query($this->_csv_mapped_master_ids['driver_info'],1);
		if(!empty($order_detail_ids))
			$sql.= " AND t2.id IN ({$order_detail_ids}) ";
		$sql.= $this->_sort_order[$this->_csv_mapped_master_ids['driver_info']];
		$cmd = Yii::app()->db->createCommand($sql);	
		$result = $cmd->queryAll();	
		return $result;		
	}

	protected function _getDriverDetailInfo($record,$order_detail_ids){
		$sql = $this->_get_csv_report_query($this->_csv_mapped_master_ids['detail_info']);
		$sql.= $this->_getWhereCondition($record,$order_detail_ids);
		$sql.= $this->_sort_order[$this->_csv_mapped_master_ids['detail_info']];
		$cmd = Yii::app()->db->createCommand($sql);	
		$result = $cmd->queryAll();	
		return $result;		
	}

	protected function _getOrderMasterInfo($order_masters_id){
		$sql = $this->_get_csv_report_query($this->_csv_mapped_master_ids['order_master']);
		$sql.= " AND t1.id={$order_masters_id} ";
		$cmd = Yii::app()->db->createCommand($sql);	
		$result = $cmd->queryRow();	
		return $result;		
	}

	protected function _getOrderProductInfo($order_masters_id){
		$sql = $this->_get_csv_report_query($this->_csv_mapped_master_ids['order_product']);
		$sql.= " AND t3.order_masters_id={$order_masters_id} ";
		$sql.= $this->_sort_order[$this->_csv_mapped_master_ids['order_product']];
		$cmd = Yii::app()->db->createCommand($sql);	
		$result = $cmd->queryAll();	
		return $result;		
	}

	protected function _getOrderDetailInfo($order_masters_id){
		$sql = $this->_get_csv_report_query($this->_csv_mapped_master_ids['order_detail']);
		$sql.= " AND t2.order_masters_id={$order_masters_id} ";
		$sql.= $this->_sort_order[$this->_csv_mapped_master_ids['order_detail']];
		$cmd = Yii::app()->db->createCommand($sql);	
		$result = $cmd->queryAll();	
		return $result;		
	}

	private function _getWhereCondition($record,$order_detail_ids){
		$sql_where = " AND t2.column_2_37 = '{$record['column_2_37']}' 
						AND t2.column_2_06 = '{$record['column_2_06']}' 
						AND t2.id IN ({$order_detail_ids}) ";
		return $sql_where;
	}

	private function _get_csv_report_query($report_id,$include_distinct_clause=0){
		$sql = "SELECT yigfx_get_csv_report_query({$report_id},1,1,0,$include_distinct_clause)";
		$cmd = Yii::app()->db->createCommand($sql);
		$result = $cmd->queryScalar();	
		return $result;	
	}
	
	public function getCsvReportArray($store_name,$date,$csv_report_id,$order_master_ids,$store_id=null){
		$reportArr = array();
		$formatted_date = date('M\'y',strtotime($date));
		$reportArr['master'] = array(
				'store_name' => $store_name,
				'date'		 => $formatted_date
			);
		// var_dump($reportArr); die;
		if($csv_report_id=='12'){//from product panel print
        	$reportArr['detail'] = $this->_generateSupplierWiseRecord($reportArr, $csv_report_id, $date);
		}else if($csv_report_id=='13'){
        	$reportArr['detail'] = $this->_generateMontlySalseRecord($reportArr,$csv_report_id, $date);
        } else if($csv_report_id=='14'){
        	$reportArr['detail'] = $this->_generateTransferRecord($reportArr,$csv_report_id, $date, $store_id);
        }
        //Order Master Record only print report
        else if($csv_report_id== '18'){
        	$reportArr['detail'] = $this->_generateOrderContract($reportArr,$csv_report_id, $date,$order_master_ids);
        }
        else if($csv_report_id== '20'){
        	$reportArr = $this->_generateServiceInvoice($reportArr,$csv_report_id, $date,$order_master_ids,$store_name);
        }
          // echo CJSON::encode($reportArr);exit;
        return $reportArr;

	}
	private function _generateServiceInvoice($reportArr, $csv_report_id, $date,$order_master_ids,$store_name)
	{
		 $getListDataFuncParams = array(
            'csv_report_id'         => $csv_report_id,
            'order_masters_ids'     => null,
            'order_detail_ids'      => null,
            'searchParams'          => null,
            'pageSize'              => null,
            'page'                  => null,
            'table_alias'           => 't11',
            'date'					=> $date,
            'order_master_ids'		=> $order_master_ids
        );
		$formatted_date = date('M\'y',strtotime($date));
	    $records = ReportField::model()->getListData($getListDataFuncParams);
	    $getListDataFuncParams['csv_report_id'] = '19'; 
	    $details = ReportField::model()->getListData($getListDataFuncParams);
	    $data = array();
	    foreach ($records['data'] as $key => $value) {
	    	$data[$key]['master'] = $value;
        	$data[$key]['master']['store_name'] = $store_name;
        	$data[$key]['master']['date'] = $formatted_date;
		    $data[$key]['detail'] =array();
	    	foreach ($details['data'] as $detailRecords) {
	    		if($value['ID'] == $detailRecords['M_ID'])
	    			array_push($data[$key]['detail'], $detailRecords);
	    	}
	    }
       	return $data;

	}
	private function _generateOrderContract($reportArr, $csv_report_id, $date,$order_master_ids){
	    $getListDataFuncParams = array(
            'csv_report_id'         => $csv_report_id,
            'order_masters_ids'     => null,
            'order_detail_ids'      => null,
            'searchParams'          => null,
            'pageSize'              => null,
            'page'                  => null,
            'table_alias'           => 't1',
            'date'					=> $date,
            'order_master_ids'		=> $order_master_ids
        );
	    $records = ReportField::model()->getListData($getListDataFuncParams);
	    $datas = $records['data'];
	   
	   	/*foreach ($datas as $data) {
	   		if($data['supplier_name'] != $supplier_name){
	   			$supplier_name = $data['supplier_name'];
	   			$supplier_nameArr[$supplier_name] = array();
	   			$supplier_nameArr[$supplier_name]['supplier_name'] = trim($supplier_name);
	   			$currency = null;
	   		}
	   		if($data['currency_type'] != $currency){
	   			$currency = $data['currency_type'];
	   			$supplier_nameArr[$supplier_name][$currency] = array(
		   				'currency_type' => $currency,
		   				'data' => array()
	   				);
	   		}
   			array_push($supplier_nameArr[$supplier_name][$currency]['data'], $data);			
	   	}*/
       return $datas;
	}
	private function _generateSupplierWiseRecord($reportArr, $csv_report_id, $date){
	    $getListDataFuncParams = array(
            'csv_report_id'         => $csv_report_id,
            'order_masters_ids'     => null,
            'order_detail_ids'      => null,
            'searchParams'          => null,
            'pageSize'              => null,
            'page'                  => null,
            'table_alias'           => 't5',
            'date'					=> $date
        );
        $detailArr = array();
        $supplier_nameArr = array();
	    $records = ReportField::model()->getListData($getListDataFuncParams);
	    $datas = $records['data'];
	    $supplier_name = null;
	    $currency = null;
	   	foreach ($datas as $data) {
	   		if($data['supplier_name'] != $supplier_name){
	   			$supplier_name = $data['supplier_name'];
	   			$supplier_nameArr[$supplier_name] = array();
	   			$supplier_nameArr[$supplier_name]['supplier_name'] = trim($supplier_name);
	   			$currency = null;
	   		}
	   		if($data['currency_type'] != $currency){
	   			$currency = $data['currency_type'];
	   			$supplier_nameArr[$supplier_name][$currency] = array(
		   				'currency_type' => $currency,
		   				'data' => array()
	   				);
	   		}
   			array_push($supplier_nameArr[$supplier_name][$currency]['data'], $data);			
	   	}
       return $supplier_nameArr;
	}
	private function _generateMontlySalseRecord($reportArr,$csv_report_id,$date){
	    $getListDataFuncParams = array(
            'csv_report_id'         => $csv_report_id,
            'order_master_ids'     => null,
            'order_detail_ids'      => null,
            'searchParams'          => null,
            'pageSize'              => null,
            'page'                  => null,
            'table_alias'           => 't2',
            'date'					=> $date
        );
        $detailArr = array();
        $supplier_nameArr = array();
        // $supplier_nameArr['currency_type']='$';
        // $supplier_nameArr['data']=array();
	    $records = ReportField::model()->getListData($getListDataFuncParams);
	    $datas = $records['data'];
	    $supplier_name = null;
	    $currency = null;
	    //array_push($supplier_nameArr['currency_type'], '$');
	   	foreach ($datas as $data) {
	   		if($data['currency_type'] != $currency){
	   			$currency = $data['currency_type'];
	   			$supplier_nameArr[$currency] = array(
		   				'currency_type' => $currency,
		   				'data' => array()
	   				);
	   		}
   			array_push($supplier_nameArr[$currency]['data'], $data);			
	   	}
       return $supplier_nameArr;
	}
	private function _generateTransferRecord($reportArr,$csv_report_id,$date,$store_id=null){
	    $getListDataFuncParams = array(
            'csv_report_id'         => $csv_report_id,
            'order_masters_ids'     => null,
            'order_detail_ids'      => null,
            'searchParams'          => null,
            'pageSize'              => null,
            'page'                  => null,
            'table_alias'           => 't5',
            'date'					=> $date,
            'store_id'				=> $store_id
        );
        $detailArr = array();
        $supplier_nameArr = array();
        $supplier1_nameArr	= array();
	    $records = ReportField::model()->getListData($getListDataFuncParams);
	    $records = $records['data'];
	    $to_store = null;
	    $to_store_code = null;
	    $from_store_code = null;
	    $currency = null;
	    $to_store_Arr = array();
	    $from_store_Arr = array();
	    $mergeRec_Arr = array();
	    foreach ($records as $record) {
	    	if($record['to_store_code'] == $store_id)
	    		array_push($to_store_Arr, $record);
	    	else if($record['from_store_code'] == $store_id)
	    		array_push($from_store_Arr, $record);
	    }
	    if(!empty($to_store_Arr)){
		   	foreach ($to_store_Arr as $data) {
		   		if($data['to_store_code'] != $to_store_code){
		   			$to_store_code = $data['to_store_code'];
		   			$to_store = $data['to_store'];
		   			$supplier_nameArr[$to_store_code] = array();
		   			$supplier_nameArr[$to_store_code]['to_store'] = trim($to_store);
		   			$supplier_nameArr[$to_store_code]['to_company_name'] = trim($data['to_company_name']);
		   			$currency = null;
		   		}
		   		if($data['currency_type'] != $currency){
		   			$currency = $data['currency_type'];
		   			$supplier_nameArr[$to_store_code][$currency] = array(
			   				'currency_type' => $currency,
			   				'data' => array()
		   				);
		   		}
	   			array_push($supplier_nameArr[$to_store_code][$currency]['data'], $data);
		   	}
		}
	   	
	   	$mergeRec_Arr['to_store'] = array();
	   	if(!empty($supplier_nameArr))
   			array_push($mergeRec_Arr['to_store'], $supplier_nameArr[$to_store_code]);	
   		// var_dump($supplier_nameArr); die;
   		if(!empty($from_store_Arr)){
		   	foreach ($from_store_Arr as $data) {
		   		if($data['from_store_code'] != $from_store_code){
		   			$from_store_code = $data['from_store_code'];
		   			$from_store = $data['from_store'];
		   			$supplier1_nameArr[$from_store_code] = array();
		   			$supplier1_nameArr[$from_store_code]['from_store'] = trim($from_store);
		   			$supplier1_nameArr[$from_store_code]['from_company_name'] = trim($data['from_company']);
		   			$currency = null;
		   		}
		   		if($data['currency_type'] != $currency){
		   			$currency = $data['currency_type'];
		   			$supplier1_nameArr[$from_store_code][$currency] = array(
			   				'currency_type' => $currency,
			   				'data' => array()
		   				);
		   		}
	   			array_push($supplier1_nameArr[$from_store_code][$currency]['data'], $data);			
		   	}
   		}		
   		// echo CJSON::encode($supplier1_nameArr);exit;
	   	$mergeRec_Arr['from_store'] = array();
	   	if(!empty($supplier1_nameArr))
	   		array_push($mergeRec_Arr['from_store'], $supplier1_nameArr[$from_store_code]);

       return $mergeRec_Arr;
	}
	
	 public function getListData($params) {
        $user_id                = Yii::app()->user->user_id;
        $csv_report_id          = $params['csv_report_id'];
        $order_masters_ids      = array_key_exists('order_masters_ids', $params) ? $params['order_masters_ids'] : '';
        $order_detail_ids       = array_key_exists('order_detail_ids', $params) ? $params['order_detail_ids'] : '';
        // $auction_member_ids     = array_key_exists('auction_member_ids', $params) ? $params['auction_member_ids'] : '';
        $searchParams           = $params['searchParams'];
        $pageSize               = $params['pageSize'];
        $page                   = $params['page'];
        $table_alias            = $params['table_alias'];

        // var_dump($order_masters_ids);
        // var_dump($order_detail_ids);

        $csv_master = ReportCsv::model()->findByPk($csv_report_id);
       // var_dump($csv_master); die;
        $include_from_clause = 1;
        $include_where_clause = 1;
        $include_orderby_clause = 0;


        $sql1 = " SELECT yigfx_get_csv_report_query ($csv_report_id, {$include_from_clause}, {$include_where_clause}, {$include_orderby_clause}) ";
        $cmd = Yii::app()->db->createCommand($sql1);
        $innerQuery = $cmd->queryScalar();
        // echo $innerQuery;die;
        // $innerQuery .= " WHERE ((t3.delete_flg = 0 OR t3.delete_flg IS NULL) 
        //                     AND (t4.delete_flg = 0 OR t4.delete_flg IS NULL))";
        if (!empty($order_masters_ids)){
            // if ($csv_report_id == 4 || $csv_report_id == 5){
                $innerQuery .= " AND $table_alias.id in ($order_masters_ids)";
            // }
            // else
            // {
                // $innerQuery .= " AND t1.id in ($order_masters_ids)";
            // }
        }


        if (!empty($order_detail_ids)){
            if ($csv_report_id == 4 || $csv_report_id == 5){
                $innerQuery .= " AND t5.id in ($order_detail_ids)";
            }
            else
            {
                $innerQuery .= " AND t5.id in ($order_detail_ids)";
            }
        }


        $outerCondition = " WHERE 1 = 1";
        $outerQuery = "SELECT * FROM ({$innerQuery}) AS x1";
        if (!empty($searchParams)) {
            $whereCondition = " AND (" . implode(" AND ", $searchParams) . ") ";
            $outerCondition .= " {$whereCondition} ";
        }  
        // echo $outerQuery; die;
        $outerQuery .= $outerCondition;
        $order_by = "";
        //$order_by = " ORDER BY id ASC";

        $sort_order = Yii::t('report','sort_order');
        $sort_order = array_key_exists($csv_report_id, $sort_order) ? $sort_order[$csv_report_id] :"";

        if (!empty($sort_order)){
            $order_by = $sort_order;
        }

        if(!empty($pageSize)) { 
            $selectQuery = $outerQuery. $order_by ." limit {$pageSize} offset " . $pageSize * ($page - 1);
            // echo $selectQuery; exit;
            $cmd = Yii::app()->db->createCommand($selectQuery);
        }else{
            $cmd = Yii::app()->db->createCommand($outerQuery.$order_by);
        }
        $recordData = $cmd->queryAll(); 
        $countQuery = " select count(*) from ( {$outerQuery}) as x2";
        $cmd = Yii::app()->db->createCommand($countQuery);
        $record_count = $cmd->queryScalar();

        $resultArr= array('data' =>$recordData,
                           'count' =>$record_count
                        );
        return $resultArr;
    }
	/*
	public function getCsvReportArray($company_id,$entry_id,$report_id){
		$reportArr = array();
		$sql = "SELECT yigfx_csv_report({$report_id},'{$entry_id}')";
		$cmd = Yii::app()->db->createCommand($sql);
		$result = $cmd->queryScalar();
		return $result;
	}
	*/

}
?>
