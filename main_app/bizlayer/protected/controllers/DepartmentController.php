<?php

class DepartmentController extends PrivateController
{
	public function actionIndex()
	{
		$this->render('index');
	}
	public function actionGetDepartmentList()
	{
		$this->_departmentList();
		
	}
	private function _departmentList()
	{
		$model = Department:: model();
		$recordData = $model->getDepartmentListData();
		$data = array('data' => $recordData);
        $this->renderJSON($recordData);
	}

	public function actionGetCompanyDepartmentList(){
		$model = Department:: model();
		$company_id =  Yii::app()->request->getParam('company_id',null);
		$recordData = $model->getCompanyDepartmentList($company_id);
		$data = array('data' => $recordData);
        $this->renderJSON($recordData);	
	}
	// Uncomment the following methods and override them if needed
	/*
	public function filters()
	{
		// return the filter configuration for this controller, e.g.:
		return array(
			'inlineFilterName',
			array(
				'class'=>'path.to.FilterClass',
				'propertyName'=>'propertyValue',
			),
		);
	}

	public function actions()
	{
		// return external action classes, e.g.:
		return array(
			'action1'=>'path.to.ActionClass',
			'action2'=>array(
				'class'=>'path.to.AnotherActionClass',
				'propertyName'=>'propertyValue',
			),
		);
	}
	*/
}