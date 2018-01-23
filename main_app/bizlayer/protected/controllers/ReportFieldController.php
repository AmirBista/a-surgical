<?php

class ReportFieldController extends PrivateController {
    private $_app, $_request, $_model,$reportParams=array();
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_app = Yii::app();
        $this->_request = $this->_app->request;
        $this->_model = ReportField::model();
    }

    public function actionGetCsvMappedDetails() {
        $csvReportId = Yii::app()->request->getParam('csv_report_id');
        /*gets the header from left sided grid of the uploaded csv file*/
        $csv_fields = ReportField::model()->getCsvFields($csvReportId);

        /*gets the record information which are mapped from winston_grid */
        $csv_mapped_fields = ReportField::model()->getCsvMappedFields($csvReportId);

        if (!empty($csv_fields) && count($csv_fields) > 0) {
            foreach ($csv_fields as &$csv_field) {
                $csv_field['mapped_fields'] = array();
                foreach ($csv_mapped_fields as $rec) {
                    if ($csv_field['csv_report_field_id'] == $rec['csv_report_field_id']) {
                        $csv_field['mapped_fields'][] = $rec;

                    }
                }
            }
        }

        $arr = array(
            'success' => TRUE,
            'data' => $csv_fields
        );
        $this->renderJSON($arr);
    }

    public function actionGetWinstonFields() {
        $csvReportId = Yii::app()->request->getParam('csv_report_id');
        $result = ReportField::model()->getWinstonFields($csvReportId);
        $arr = array(
            'success' => TRUE,
            'data' => $result
        );
        $this->renderJSON($arr);
    }

    public function actionSave() {
        $csvReportId = Yii::app()->request->getPost('csvReportId');
        $mappedData = CJSON::decode(Yii::app()->request->getPost('mappedData'), true);  
        /*resets the yig_csv_mapped_details table before saving*/
        $sql = 'UPDATE sys_csv_report_field
                SET 
                default_value=NULL,
                    option_value=NULL, 
                    table_field_ids = NULL
                WHERE csv_report_id =:csvReportId';
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
        $result = $cmd->queryAll();
        //var_dump($mappedData); die;
        foreach ($mappedData as $display_order => $data) {
            $display_order = $display_order + 1;
            // $is_single_mapped = $data['is_single_mapped'];
            $csv_report_field_id = $data['csv_report_field_id'];
            $mapped_table_id = $data['mapped_table_id'];
            $default_value = $data['default_value'];
            $option_value = $data['option_value'];
            $table_id = $data['mapped_table_id'];
            $id_field_table = $data['id_field_table'];
            $mapped_fields = $data['mapped_fields'];
            $xtype = $data['xtype'];
            $format_id = $data['format_id'];
            $max_length = $data['max_length'];
            if($xtype == 'datefield' && !empty($default_value))
            {
                $date = new DateTime($default_value);
                $default_value = $date->format('Y-m-d');
            }

            $field_id = $data['field_id'];
            /*changes array into string*/
            $mapped_ids = array();
            foreach ($data['mapped_fields'] as $mapped_field) {
               array_push($mapped_ids, $mapped_field['table_field_id']);
            }
            if(!empty($mapped_ids)){
                $mapped_field_ids = implode(',', $mapped_ids);
                $mapped_field_ids_array = '{'.$mapped_field_ids.'}';
            }
            else{
                $mapped_field_ids_array = null;
            }
            if(!empty($mapped_ids)) {
                /*mulitple mapping*/
                if(count($mapped_ids)>1) {
                    ReportField::model()->updateByPk($csv_report_field_id, array(
                        
                        // 'default_value' => $default_value,
                        // 'option_value' => $option_value,
                        // 'id_field_table' =>$id_field_table,
                        // 'is_single_mapped'=>0,
                        // 'table_id'=>$table_id,
                         'table_field_ids' => $mapped_field_ids_array,
                         'format_id' => $format_id,
                         'max_length'=>$max_length,

                          'display_order' => $display_order,
                         'default_value' => $default_value,
                         'option_value' => $option_value,
                        // 'id_field_table' =>$id_field_table,
                        // 'is_single_mapped'=>0,
                        // 'table_id'=>$table_id,
                        // 'mapped_table_field_id' => $mapped_field_ids_array,
                        // 'format_id' => $format_id,
                        // 'max_length'=>$max_length

                    ));

                }
                /*if only one filed is mapped*/
                else {
                     // var_dump($csv_report_field_id); die;
                    ReportField::model()->updateByPk($csv_report_field_id, array(
                        'display_order' => $display_order,
                        'default_value' => $default_value,
                        'option_value' => $option_value,
                        //'id_field_table' =>$id_field_table,
                        //'is_single_mapped'=>1,
                        //'table_id'=>$table_id,
                        //'field_id' =>$mapped_field_ids,
                        'table_field_ids' => $mapped_field_ids_array,
                        'format_id' => $format_id,
                        'max_length'=>$max_length
                    ));
                }
            }
            /*no fields are mapped from right sided grid to left sided grid*/
            else {
                ReportField::model()->updateByPk($csv_report_field_id, array(
                    'display_order' => $display_order,
                    'default_value' => $default_value,
                    'option_value' => $option_value,
                    'id_field_table' =>$id_field_table,
                    'format_id' => $format_id,
                    'max_length'=>$max_length
                    ));
            }
        }
        $arr = array(
            'success' => true,
            'msg' => Yii::t('csv','updateSuccess')
        );
        $this->renderJSON($arr);
    }

    // private function _updateRecord($table_field_id, $csv_report_field_id, $mapped_table_id, $is_single_mapped, $default_value, $option_value, $id_field_table) {
    //    /*if(empty($mapped_table_id) && empty($mappedFields['mapped_table_id'])){
    //        $mapped_table_id = '1';
    //    }*/

    //    // if($mapped_table_id == 100){
    //    //     $table_id = '100';
    //    // }
    //     // $table_field_id = $table_field_id;
    //     $response = CsvMappedDetails::model()->updateByPk($csv_report_field_id, array('field_id' => $table_field_id,
    //         'table_id' => $mapped_table_id,
    //         'is_single_mapped' => $is_single_mapped            
    //         ));
    // }

    public function actionUploadCsvFile()
    {
        $allowed =  array('csv');
        $temp_locaton = $_FILES["importCsvHeader"]['tmp_name'];
        $csv_file_name = $_FILES["importCsvHeader"]["name"];
        $csvType =  Yii::app()->request->getPost('csvType', null);
        $ext = pathinfo($csv_file_name, PATHINFO_EXTENSION);
        if(in_array($ext,$allowed)) 
        {
            $csv_file_upload_path =Yii::app()->params['csv_map'];
            $perm_location = $csv_file_upload_path.$csv_file_name;
            move_uploaded_file($temp_locaton,$perm_location);
            if($csvType == 'EC')
                $this->_readEcCsvFile($perm_location, true);
            else
                 $this->_readSquareCsvFile($perm_location, true);
        }
        else
        {
            $arr = array('success' => false,'msg' =>Yii::t('csv','invalidFileType'));
            return $this->renderJSON($arr);
        }        
    }

    private function _readEcCsvFile($perm_location, $headerOnly = false)
    {
        define('DATA_FILE','data.json'); // must be writable
            $row = 1;
            $fh = fopen($perm_location,'r');
            $csvdata = array();
            while(($data = fgetcsv($fh, 5000, ",")) !== false)
            {
                if($row==1){
                     $row++;
                     if ($headerOnly === true)
                     {
                        foreach ($data as $key => $value) {
                            // $csvdata[] = $value;
                            $csvdata[] = mb_convert_encoding($value,'UTF-8', 'Shift_JIS' );
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
                    // $rowData[] = $value;
                    $rowData[] = mb_convert_encoding($value,'UTF-8', 'Shift_JIS' );
                }

                $csvdata[]=$rowData;
            }
            // $json = json_encode($rows);
            // file_put_contents(DATA_FILE,$json);
            // echo $json;     
            fclose($fh);
            $arr = array('success' => true,'data' => $csvdata);
            unlink($perm_location);
            return $this->renderJSON($arr);
    }

    private function _readSquareCsvFile($perm_location, $headerOnly = false)
    {
        define('DATA_FILE','data.json'); // must be writable
            $row = 1;
            $fh = fopen($perm_location,'r');
            $csvdata = array();
            while(($data = fgetcsv($fh, 5000, "\t")) !== false)
            {
                if($row==1){
                     $row++;
                     if ($headerOnly === true)
                     {
                        foreach ($data as $key => $value) {
                            // $csvdata[] = $value;
                            $csvdata[] = mb_convert_encoding($value,'UTF-8', 'Shift_JIS' );
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
                    // $rowData[] = $value;
                    $rowData[] = mb_convert_encoding($value,'UTF-8', 'Shift_JIS' );
                }

                $csvdata[]=$rowData;
            }
            // $json = json_encode($rows);
            // file_put_contents(DATA_FILE,$json);
            // echo $json;     
            fclose($fh);
            $arr = array('success' => true,'data' => $csvdata);
            unlink($perm_location);
            return $this->renderJSON($arr);
    }
    
    public function actionSaveHeader() {
        $header = Yii::app()->request->getParam('header');
        $result = CsvMappedDetails::model()->saveHeader($header);
    }

    public function actionSaveCsv() {
        $csvFieldName = CJSON::decode(Yii::app()->request->getPost('csvFieldName'), true); 
        $result = CsvMappedDetails::model()->save($csvFieldName);
        $arr = array(
            'success' => true,
            'msg' => Yii::t('csv','updateSuccess')
        );
        $this->renderJSON($arr);
    }

    public function actionGetSysTables() {
        $result = Table::model()->getSysTables();
        $arr = array(
            'success' => TRUE,
            'data' => $result
        );
        $this->renderJSON($arr);
    }

    public function actionGetCsvFieldName() {
        $csvReportId = Yii::app()->request->getPost('csv_report_id'); 
        $csvFieldName = ReportField::model()->getCsvFieldName($csvReportId);
        $mappedTables = ReportField::model()->mappedTables($csvReportId);
        // if (!empty($mappedTables) && count($mappedTables) > 0) {
        //     foreach ($csvFieldName as $nextData) { 
        //         $nextData['mapped_tables'] = array();
        //         foreach ($mappedTables as $rec) {
        //             $nextData['mapped_tables'] = array('table_name' => $rec['table_name']);
        //         }
        //     }
        // }      
         
        $arr = array(
            'success' => true,
            'csvFields' => $csvFieldName,
            'mappedTables' => $mappedTables
        );
        $this->renderJSON($arr);
    }
    /*deletes selected record from importExportCsvWindow*/
    public function actionDeleteCsvMapped() {
        $csvReportFieldId = Yii::app()->request->getPost('csv_report_field_id'); 
        $csvReportId = Yii::app()->request->getPost('csv_report_id'); 
        ReportField::model()->deleteCsvMapped($csvReportFieldId);
        $arr = array(
            'success' => true,
            'message' => Yii::t('csv', 'deleteSuccess'),
            'csvReportFieldId' => $csvReportFieldId,
            'csvReportId' => $csvReportId
        );
        $this->renderJSON($arr);
    }

    public function actionGetListData() {
        set_time_limit (5*60); //5 minutes
        /*sent via gridHeaderFilter*/
        $filterData =  $this->_request->getParam('filter', null);
        $get_columns = $this->_request->getParam('get_columns', 0);
        $csv_report_id = $this->_request->getParam('csv_report_id', 0);
        $order_master_id = $this->_request->getParam('order_master_id', 0);

        $user_info = Yii::app()->user->getUserInfo();
        $user_name = $user_info['username'];
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];

        $prefix = Yii::app()->request->getParam('prefix', 0);

        /*param sent from client side for all page CSV dwnld*/
        $clientPage = $this->_request->getParam('pages',null);
        /*sorting*/
        $sort = CJSON::decode($this->_request->getParam('sort', ''), true);

        /* PAGINATION combo*/
        $save_page_size = $this->_request->getParam('save_page_size', 0);
        $datagrid_id = $this->_request->getParam('datagrid_id', 0);
        /*gets the saved search list*/
        $searchList = $this->_request->getParam('get_search_list', false);
        if($searchList) {
            $searchList = Search::model()->getSearchResult($datagrid_id, $user_id);
        }
        else {
            $searchList=null;
        }
        /*for search save and csv dwnld*/
        /*gets the datagridid alongwith 9999 attached to it and has to be removed*/
        $datagrid_id = str_split($datagrid_id);
        for($i=0;$i<4;$i++) {
            unset ($datagrid_id[$i]);
        }
        implode($datagrid_id);
        if (!empty($save_page_size) && $save_page_size > 0) {
            ReportCsv::model()->updateByPk($csv_report_id, array('page_size' => $save_page_size));
        }

        $page = Yii::app()->request->getParam('page', 1);
        /*all page download else one page download*/
        if($clientPage == 'allPages')
            $pageSize = 10000;
        else {
            $pageSize = $this->_model->getDatagridPageSize($csv_report_id);
        }

        $cols = array();
        if ($get_columns == 1 ) {
            $cols = $this->_getColumns($csv_report_id);
            /*on all page dwnld the filter params are already mapped to its respective csv field name*/
            if($clientPage!='allPages') {
                $filterData = CJSON::decode($filterData);
                // $filterData = $this->_getColDataIndex($cols['columns'],$filterData);
            }
        }
        $searchParams = $this->getSearchFilters($filterData);
        $getListDataFuncParams = array(
            'csv_report_id'     => $csv_report_id,
            'mapped_ids'        => null,
            'searchParams'      => $searchParams,
            'pageSize'          => $pageSize,
            'page'              => $page,
            'order_masters_ids'=> $order_master_id
        );
        $resultData=ReportField::model()->getListData($getListDataFuncParams);
        $recordData=$resultData['data'];
        $record_count=$resultData['count'];
        $columns = array_key_exists('columns', $cols) ? $cols['columns'] : array();
        $searchTemplate = '9999'.$csv_report_id;
        $userId = 0;
        $searchTemplateData = Search::model()->getTemplateSearchResult($searchTemplate,$userId);
        foreach ($searchTemplateData as $key => $value) {
            $search_criteria = CJSON::decode($value['search_criteria']);
            $search_criteria = $this->_checkToday($search_criteria);
            $searchTemplateData[$key]['search_criteria']=$search_criteria;
        }

        /*record Count*/
        $data = array(
            'success' => TRUE,
            'total' => $record_count,
            'current_page' => 1,
            'total_pages' => 1,
            'pageSize' => $pageSize,
            'isLast' => true,
            'columns' => $columns,
            'fields' => array_key_exists('fields', $cols) ? $cols['fields'] : array(),
            'filter_params'=>$filterData,
            'data' => $recordData, //$stocks
            'searchList'=>$searchList,
            'searchTemplateData' =>$searchTemplateData
        );

        if($clientPage == 'allPages')
        {
            $this->_allPagesCsvDwnld($csv_report_id,$recordData,$columns,$user_name,$user_role, $user_id,$datagrid_id);
        }
        else
            $this->renderJSON($data);
    }
    private function _allPagesCsvDwnld($csv_report_id,$recordData,$columns,$user_name,$user_role, $user_id, $datagrid_id) {
        $orderDetailIds = array();
        $orderMasterIds =array();
        // foreach ($recordData as $index => $data) {
        //     array_push($orderDetailIds,$data['order_detail_id']);
        //     array_push($orderMasterIds,$data['order_master_id']);
        // }
        // $order_detail_id_arr = "{". implode(',', $orderDetailIds)."}";
        $csv_master = ReportCsv::model()->findByPk($csv_report_id);
        $prefix = /*$csv_master->name_jp.*/$csv_master->report_name;
        $_enclosure = $csv_master->csv_enclosure;
        $_include_column_headers = $csv_master->include_column_headers == 1 ? true : false;
        $field_seperator = $csv_master->field_seperator;
        $print=false;
        // $this->_manageReportLog($print,$csv_report_id,$order_detail_id_arr,$user_id,$user_name,$user_role,$csv_master['bill_code'],$csv_master['report_name']);
        // $csv_master->_manageReportLastLog($print,$csv_report_id,$orderDetailIds,$orderMasterIds,$user_id,$user_name,$user_role);
        /*sets reportParams globally for csvData formating*/
        $this->reportParams['csv_report_id']=$csv_report_id;
        // $this->_setReportParams();
        

        $fileName = "{$prefix}";
        $allPageCsv = new AllPageCsv();
        $allPageCsv->callback_obj=$this;
        $allPageCsv->callback_func=null/*'formatCsvData'*/;
        $allPageCsv->trim_callback_func=null/*'trimCsvData'*/;

        /*column parameter sent to get columns instead of using datagrid_id for getting columns*/
        $allPageCsv->getAllCsvDownload($recordData,$datagrid_id, $fileName,$columns,$_enclosure,$_include_column_headers,$field_seperator);
    }
    private function _getColumns($csv_report_id) {
        $columns = $this->_model->getDatagridColumnsList($csv_report_id);
        return $columns;
    }

    /*maps the column with dataindex of cols runs at frist request only*/
    private function _getColDataIndex($cols,$filterData) {
        $arr = array();
        foreach ($cols as $col) {
            foreach ($filterData as $key => $value) {
                if($key == $col['mapped']) {
                    $dataIndex = $col['dataIndex'];
                    $jsonCol = array('property' => $dataIndex,'value' => $value);
                    $arr[] = $jsonCol;
                }
            }
        }
        return json_encode($arr); 
    }
       
}
