<?php

class CsvReportController extends PrivateController {
    
    /*get CSV Report Array of OrderMaster*/
    // public function actionGetReportArray() {
    //     $order_detail_ids = Yii::app()->request->getParam('order_detail_ids',null);
    //     $report_id = Yii::app()->request->getParam('report_id',null);
    //     $user_info = Yii::app()->user->getUserInfo();
    //     $company_id = $user_info['company_id'];
    //     $csvReport = new CsvReport();
    //     $resultJson = $csvReport->getCsvReportArray($company_id,$order_detail_ids,$report_id);
        
    //     // $myfile = fopen(FILEBOXFOLDER."csv/myJsonFile.json", "w") or die("Unable to open file!");
    //     // fwrite($myfile, $resultJson);
    //     // fclose($myfile);
    //     // echo ($resultJson);
    //     exit;

    // }
      /*get CSV Report Array of OrderMaster*/
    public function actionGetCsvReportArray() {
        $user_info      = Yii::app()->user->getUserInfo();
        $store_name     = Yii::app()->request->getParam('store_name',null);
        $date           = Yii::app()->request->getParam('date',null);
        $csv_report_id  = Yii::app()->request->getParam('csv_report_id',null);
        $report_type    = Yii::app()->request->getParam('report_type',null);
        $order_master_ids  = Yii::app()->request->getParam('order_master_ids',null);
        //this is the selected store id or afno store 
        $store_id  = Yii::app()->request->getParam('store_id',null);
        $csvReport      = new CsvReport();
        // $reportArr   = $csvReport->getCsvReportArray($company_id,$order_master_id,$order_types);
        $reportArr      = $csvReport->getCsvReportArray($store_name,$date,$csv_report_id,$order_master_ids, $store_id);
       
        $this->createJsonFile($date,$reportArr,$csv_report_id,$report_type);
    }
    public function createJsonFile($date,$reportArr,$csv_report_id,$report_type){
            $filename = "{$csv_report_id}"."-"."{$date}.json";
            $csv_file_dir = REPORT_CSV_PATH/*.$bill_code*/;
            $csv_file_path = $csv_file_dir.$filename;
            //$content = $report_data;
           // echo date($date,'Y');die;
          // $this->renderJSON($reportArr); die;
            $reportArr=CJSON::encode($reportArr);
            $myfile = fopen($csv_file_path, "w+");
            fwrite($myfile, '['.$reportArr.']');
            fclose($myfile);
            $this->redirect(REPORT_URL.'?app_id=h'.'&jsonFileName='.$filename.'&type='.$report_type);
    }

}
