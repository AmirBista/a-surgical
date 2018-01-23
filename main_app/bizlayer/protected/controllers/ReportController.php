<?php
class ReportController extends PrivateController {

	/*gets the 	csv_report_id and mapped name*/
	public function actionGetCsvMappedMaster() {
		$csvMappedName = ReportCsv::model()->getCsvMappedMaster();
		// $helpInfo=HelpText::model()->getHelpTextForCsvMap();
		$helpInfo=null;
		$arr = array(
            'success' => TRUE,
            'data' => $csvMappedName,
            'helpInfo'=>$helpInfo
        );
        $this->renderJSON($arr);
	}

	/*saves and updates the yig_csv_mapped_master table and yig_csv_mapped_detail table*/
	public function actionSaveCsvMappedName() {
		$user_info = Yii::app()->user->getUserInfo();
        $user_id = $user_info['user_id'];
		$model = new ReportCsv;
		$csvReportId = Yii::app()->request->getPost('csvReportId', null);
		$csvMappedName = Yii::app()->request->getPost('csvMappedName',null);
		$csvBillCodeValue = Yii::app()->request->getPost('csvBillCodeValue',null);
		$csvNameJpValue = Yii::app()->request->getPost('csvNameJpValue',null);
		$csvReportNameValue = Yii::app()->request->getPost('csvReportNameValue',null);
		$importExportCsvComboValue = Yii::app()->request->getPost('importExportCsvComboValue');
		$mapTableId = Yii::app()->request->getPost('mapTableId');
		//$model->mapped_name = $csvMappedName;
		$model->bill_code = $csvBillCodeValue;
		//$model->name_jp = $csvNameJpValue;
		$model->report_name = $csvReportNameValue;
		$model->mapped_table_ids = '{'.$mapTableId.'}';
		$model->created_by =$user_id; //user id
		$model->created_datetime = new CDbExpression('NOW()');
		$model->csv_type=$importExportCsvComboValue;
		$model->page_size=20;
		// $model->created_by = $model->updated_by = $this->_app->user->id; //user id
		// $model->created_datetime = $model->updated_datetime = new CDbExpression('NOW()');
	 	//$response = $model->update();
		/*save new data*/
		if($csvReportId == null)
		{
			$connection=Yii::app()->db;
	        $transaction=$connection->beginTransaction();
	        try
	        {        	
				if(!$model->save())
				{
					$response=array(
	                    'success'=>FALSE,
	                    'data'=>Yii::t('userManagement','csv mapped name cannot be saved')
	                    );

	                if ($transaction)
	                    $transaction->rollback();
	                    echo CJSON::encode($response);
	                    exit;
	            }
	            else
	            {

	            	/*gets the last inserted id*/
					$pkId = $model->csv_report_id;
					$csvMappedDetailModel = new ReportField;
					$csvFieldName = CJSON::decode(Yii::app()->request->getPost('csvFieldName'));
					$response = $csvMappedDetailModel->SaveCsv($pkId, $csvFieldName);
					if(!$response )
					{
						$response=array(
	                    'success'=>FALSE,
	                    'data'=>Yii::t('userManagement','cannot be saved')
	                    );

	                	if ($transaction)
	                    	$transaction->rollback();
	                    echo CJSON::encode($response);
	                    exit;					
					}
					else
					{
						$transaction->commit();
		                $response=array(
		                    'success'=>TRUE,
		                    'data'=> Yii::t('userManagement','field named saved'),
		                    'csvReportId'=>$pkId
		                );
		                echo CJSON::encode($response);
		                exit;
					}		
	    		}
	    	}

	        catch (Exception $e)
	        {
	            $transaction->rollback();
	            $res=array(
			                'success'=>FALSE,
			                'data'=>$e->getMessage()
			            	);
	        }
	        $this->renderJSON($res);	

		}

		/*edits old data*/
		else
		{
            // ReportField::model()->updateByPk($csvReportId, array(
            // 		  'mapped_table_ids' => '{1,2}',
            // 		 // 'bill_code' => 1111111,
            // 		  //'report_name' => $report_name,
            // 		//  'csv_type' => $importExportCsvComboValue
            // 	)
            // );
            // die;
			 $model = new ReportCsv;
			// /*updates the yig_csv_mapped_master table*/

			 $model->updateCsvMappedMaster($csvReportId, $csvMappedName, $mapTableId, $importExportCsvComboValue,$csvBillCodeValue,$csvNameJpValue,$csvReportNameValue);	
			/*updates the yig_csv_mapped_detail table*/
			$csvMappedDetailModel = new ReportField;
			$csvFieldName = CJSON::decode(Yii::app()->request->getPost('csvFieldName'));
			$csvMappedDetailModel->updateCsvMappedDetail($csvReportId, $csvFieldName);	    
			$response=array(
                'success'=>TRUE,
                'message'=>Yii::t('csv', 'updateSuccess'),
                'csvReportId'=>$csvReportId
            );
	        $this->renderJSON($response);	
		}
	}
	public function actionGetCsvExportName() {
		$csvMappedName = ReportCsv::model()->getCsvExportMappedName();
		$arr = array(
            'success' => TRUE,
            'data' => $csvMappedName
        );
        $this->renderJSON($arr);
	}
	
	public function actionReportList() {
		$result = ReportCsv::model()->getReportList();
		$helpInfo=HelpText::model()->getHelpTextForReportPanel();
		$res = array(
            'success' => TRUE,
            'data' => $result,
            'helpInfo'=>$helpInfo
        );
        $this->renderJSON($res);
	}		
}
?>