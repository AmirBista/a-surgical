<?php

class CsvExportController extends PrivateController {
    private $reportParams=array();

    /*For Report grid data*/
    public function actionGetRptListData(){
        $filterData = Yii::app()->request->getPost('filter', null);
        $searchParams = $this->getSearchFilters($filterData);
        $printAll = Yii::app()->request->getPost('printAll', false);
        $csv_report_id = Yii::app()->request->getPost('csv_report_id', 0);
        $order_masters_ids = Yii::app()->request->getPost('order_masters_ids', '');
        $order_detail_ids = Yii::app()->request->getPost('order_detail_ids', '');
        $table_alias = Yii::app()->request->getPost('table_alias', 't5');
        $getListDataFuncParams = array(
            'csv_report_id'         => $csv_report_id,
            'order_masters_ids'     => $order_masters_ids,
            'order_detail_ids'      => $order_detail_ids,
            'searchParams'          => $searchParams,
            'pageSize'              => null,
            'page'                  => null,
            'table_alias'           => $table_alias
        );

        $resultData=ReportField::model()->getListData($getListDataFuncParams);
        if($printAll) {
            $this->_generateCsv(true,$resultData['data'],$printAll);
        }
    }

    /*for selected csv dwnld of all panel except report panel*/
    public function actionSelectedCsvExport() {
        $data = CJSON::decode(Yii::app()->request->getParam('selectedRows', ''), true);
        $prefix = Yii::app()->request->getParam('prefix', 0);
        $columns = CJSON::decode(Yii::app()->request->getParam('columns', 0));
        $datagrid_id = Yii::app()->request->getParam('datagrid_id', '');
        $force_download = Yii::app()->request->getParam('force_download', 'yes');
        // $columns = CsvExport::model()->getColumnsListForCsv($datagrid_id);
        $this->_commonCsvDwnld($data,$columns,$force_download,$prefix);
    }

    /*for selected print*/
    public function actionMappedCsvPrint(){
        $this->_generateCsv(true);
    }

    /*for selected csv dwnld of report panel only*/
    public function actionMappedCsvExport() {
        $this->_generateCsv(false);
    }

    public function _generateCsv($print=false,$recordDatas=null,$printAll=false){
        $csv_report_id=Yii::app()->request->getParam('csv_report_id', 0);
        $force_download = Yii::app()->request->getParam('force_download', 'yes');
        $user_info = Yii::app()->user->getUserInfo();
        $user_name = $user_info['username'];
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        $dateMaster = date('Y-m-d H:i');

        $csv_master = ReportCsv::model()->findByPk($csv_report_id);
        if(empty($csv_master)) {
            echo t('csv','invalidReportId');
            die();
        }

        if ($printAll) {
            $data=$recordDatas;
        }
        /*from reportPanel selected csv dwnld and selected print*/
        else{
            $data = CJSON::decode($_POST['selectedRows'], true);
        }
        $_enclosure = $csv_master->csv_enclosure;
        $template_id = $csv_master->print_template;
        $includeColumnHeaders =  $csv_master->include_column_headers == 1 ? true : false;
        $field_seperator = $csv_master->field_seperator;
        $bill_code = $csv_master->bill_code;
        $columns = ReportField::model()->getColumnsListForCsv($csv_report_id);

        /*--for triming csv of report panel[start]-----*/
        // $arr_key = $csv_report_id;
        // $max_length_fields = Yii::t('report','max_length_fields');
        // $max_length_fields = array_key_exists($arr_key, $max_length_fields) ? $max_length_fields[$arr_key] :array();
        // $this->reportParams['max_length_fields']=$max_length_fields;
        /*--for triming csv of report panel[end]-----*/
        if ($print === true){
            $prefix = $bill_code."_";
            $this->_commonCsvDwnld($data,$columns,$force_download,
                $prefix,$_enclosure,$includeColumnHeaders,$field_seperator,true,$bill_code,$template_id);
        }
        else{
            $prefix = $csv_master->report_name."_"/*$csv_master->name_jp.$csv_master->report_name*/;

            $this->_commonCsvDwnld($data,$columns,$force_download,$prefix,$_enclosure,$includeColumnHeaders,$field_seperator);
        }
    }

    private function _commonCsvDwnld($data,$columns,$force_download,$prefix,
        $_enclosure=null,$includeColumnHeaders=true,$field_seperator=null,$print=false,
        $bill_code=null,$template_id=null)
    {
       
        $labelArray = array();
        $selectColumnsArray = array();
        $i=0;
        foreach ($columns as $column) {
            $labelArray[] = mb_convert_encoding($column['field_label'], 'SJIS-win', 'UTF-8');
            if(!empty($column['column_name'])) {
                $selectColumnsArray[$i][$column['column_name']] = $column['column_name'];
            }
            if(!empty($column['field_label'])) {
                $selectColumnsArray[$i][$column['field_label']] = $column['field_label'];
            }
            if(empty($column['datatype'])) {
                $column['datatype']=null;
            }
            if(empty($column['max_length'])) {
                $column['max_length']=null;
            }
            $selectColumnsArray[$i]['datatype'] = $column['datatype'];
            $selectColumnsArray[$i]['max_length'] = $column['max_length'];
            $i++;
        }
        $date = date('YmdHis');
        $filename = "{$date}.csv";
        // $selectColumnsString = implode(",", $selectColumnsArray);
        $filename = "{$prefix}{$date}.csv";
        $csvArray = array();
        if (count($data) > 0) {
            foreach ($data as $row) {
                $temp = array();
                foreach ($selectColumnsArray as $column) {
                    /*gets the first index of the array since it containes column_name at 1st index and data format in 2nd index*/
                    $first_index= current(array_keys($column));
                    if (array_key_exists($first_index, $row)) {
                        // $temp[] = mb_detect_encoding( $row[$column], "auto" );
                        /*$csvData = $this->_trimCsvData($column,$row[$column]);
                        $temp[] = mb_convert_encoding($csvData, 'SJIS-win', 'UTF-8');*/
                        if($column['datatype'] == 'multiByte' && !empty($column['max_length'])) {
                            $row[$first_index] = $this->_trimCsvData($column,$row[$first_index]);
                        }
                        $temp[] = mb_convert_encoding($row[$first_index], 'SJIS-win', 'UTF-8');
                    }
                       
                }
                $csvArray[] = $temp;
            }
        }
        Yii::import('commonExtension.ECSVExport');
        $csv = new ECSVExport($csvArray);
        $csv->setHeaders($labelArray);
        if(!empty($_enclosure)) {
            $csv->setEnclosure($_enclosure);
        }
        else {
            $csv->setEnclosure(null);
        }
        if(!empty($field_seperator))
            $csv->setDelimiter($field_seperator);
        $csv->includeColumnHeaders = $includeColumnHeaders;
  
        if($print) {
            $csv_file_dir = REPORT_CSV_PATH.$bill_code;
            if (!FBUtility::isDirExist($csv_file_dir, true)){
                echo t('csv','csvDirNotExists'); die();
            }
            $csv_file_path = $csv_file_dir.DS.$filename;
            $path_for_print = $bill_code.DS.$filename;

            $csv->setOutputFile($csv_file_path);
            $csv->toCSV();
            //$this->redirect(array('ybasePrintReport/getReportView','csvFileName'=>$path_for_print,'type'=>$template_id));
            $this->redirect(REPORT_URL.'?'.'&app_id=h'.'&csvFileName='.$path_for_print.'&type='.$template_id);
        }
        else if ($force_download == 'no') {
            $ftp = Yii::app()->ftp;
            $fileNameEC = "test_{$date}.csv";

            $localFile = Yii::app()->params['ec_temp_storage'] . $fileNameEC;
            $remoteFile = Yii::app()->params['ec_csv_path'] . $fileNameEC;

            $csv->setOutputFile($localFile);
            $csv->toCSV();

            $arr = array();
            try {
                $ftp = Yii::app()->ftp;

                $ftp->put($remoteFile, $localFile);
                @unlink($localFile);
                $arr['success'] = true;
                $arr['message'] = Yii::t('csv', 'csvExportSuccess');
            } catch (Exception $e) {
                $arr['success'] = false;
                $arr['message'] = Yii::t('csv', 'csvExportFailed');
            }

            $this->renderJSON($arr);
        } else {
            header('Expires: 0');
            header('Content-Type: application/csv; charset=SJIS-win');
            header("Content-Disposition: attachement; filename={$filename}");
            echo $csv->toCSV();
            exit;
        }
    }

    /*for triming csv of report panel*/
    private function _trimCsvData($column,$csvData) {
        /*foreach ($this->reportParams['max_length_fields'] as $key => $value_arr) {
            if(in_array($column, $value_arr)) {
                $foramatedValue = trimMultiByteCharacters($csvData, $key);
                $csvData = $foramatedValue;
            }
        }*/
        $foramatedValue = trimMultiByteCharacters($csvData,$column['max_length']);
        $csvData = $foramatedValue;
        return $csvData;
    }

    /*inserts,updates the report log*/
    private function _manageReportLog($print,$csv_report_id,$orderDetailIds,$user_id,$user_name,$user_role,$bill_code,$report_name) {
        /*begin transaction*/
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            $this->_insertLog($print,$csv_report_id,$orderDetailIds,$user_id,$user_name,$user_role,$bill_code,$report_name);
            $transaction->commit();
            $arr = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess')
            );
        }
        catch (Exception $e) {
            $transaction->rollback();
            Yii::app()->user->setFlash('error', "{$e->getMessage()}");
            $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );
        }
    }
    private function _insertLog($print,$csv_report_id,$orderDetailIds,$user_id,$user_name,$user_role,$bill_code,$report_name) {
        $reportLogModel = new ReportLog;
        $reportLogModel->report_id = $csv_report_id;
        $order_detail_id_arr = "{". implode(',', $orderDetailIds)."}";
        /*if print btn is clicked*/
        if($print) {
            $reportLogModel->column_11_2 = $user_id;
            $reportLogModel->column_11_3 = $user_name;
            $reportLogModel->column_11_4 = new CDbExpression('NOW()');
        }
        /*csv dwnld btn*/
        else {
            $reportLogModel->column_11_5 = $user_id;
            $reportLogModel->column_11_6 = $user_name;
            $reportLogModel->column_11_7 = new CDbExpression('NOW()');
        }

        $reportLogModel->order_detail_ids = $order_detail_id_arr;
        $reportLogModel->column_11_8 = $bill_code;
        $reportLogModel->column_11_9 = $report_name;
        $reportLogModel->save();
    }
}
