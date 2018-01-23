<?php
class DatagridTemplateController extends PrivateController {
	private $_app, $_request, $_model;
	public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_app = Yii::app();
        $this->_request = $this->_app->request;
        $this->_model = DatagridTemplate::model();
    }
	/*gets the all the panel name to load in the panel name combo*/
	public function actionGetPanelForCombo() {
		$data = Datagrid::model()->getDatagrid();
		$this->renderJSON($data);
	}

	/*gets the template saved for particular panel*/
	public function actionGetTemplateName() {
		$datagridId = $this->_request->getParam('datagrid_id',1);
		$userId = Yii::app()->user->id;
		$temaplateModel = $this->_model->getTemplateName($datagridId,$userId);
		$arr=array( 'success'=>true, 'data'=>$temaplateModel);
        return $this->renderJSON($arr);
	}

	/*gets the all fields for particuler panel*/
	public function actionGetDefaultPanelFields() {
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$datagridTempId = $this->_request->getParam('datagrid_template_id', 0);
		$shownColId = CJSON::decode($this->_request->getParam('shownColId', null));
		if(!empty($shownColId))
			$shownColId=implode(',', $shownColId);
		if(!$datagridTempId)
			$datagridTempId=0;
		$temaplateModel = $this->_model->getDefaultPanelFields($datagridId, $datagridTempId,$shownColId);
		$arr=array('success'=>true, 'data'=>$temaplateModel);
        return $this->renderJSON($arr);
	}

	/*gets the fields saved for particular panel*/
	public function actionGetTemplatePanelFields() {
		$datagridTempId = $this->_request->getParam('datagrid_template_id',0);
		$shownColId = CJSON::decode($this->_request->getParam('shownColId', null));
		if(!empty($shownColId))
			$shownColId=implode(',', $shownColId);
		if(!$datagridTempId)
			$datagridTempId=0;
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$temaplateModel = $this->_model->getTemplatePanelFields($datagridTempId, $datagridId, $shownColId);
		$arr=array('success'=>true, 'data'=>$temaplateModel);
        return $this->renderJSON($arr);
	}

	/*save the new template name*/
	public function actionSaveTemplateName() {
		$tempName = $this->_request->getParam('template_name','');
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$isPublic = $this->_request->getParam('isPublic',0);
		$columnLocked =$this->_request->getParam('locked_column',null);
		$userId = Yii::app()->user->id;
		$temaplateModel = new DatagridTemplate();
		$temaplateModel->template_name = $tempName;
		$temaplateModel->datagrid_id = $datagridId;
		$temaplateModel->is_public = $isPublic;
		$temaplateModel->created_by = $userId;
		$temaplateModel->locked_column = $columnLocked;
		$temaplateModel->save();
		$lastInsertedDatagridTempId = $temaplateModel->primaryKey;
		$selectedFields = CJSON::decode(Yii::app()->request->getParam('selected_field',''));
		if(count($selectedFields)>0) {
			$display_order=1;
			foreach ($selectedFields as $value) {
				$insertModel = $this->_model->insertTemplatePanelFields($value, $lastInsertedDatagridTempId, $datagridId, $display_order,$userId);
				$display_order++;
			}
		}
		else {
			//no need to save its details
		}
		$arr=array('success'=>true, 'data'=>$temaplateModel);
        return $this->renderJSON($arr);
	}

	public function actionCheckTemplate() {
		$datagridTempId = $this->_request->getParam('template_id', 0);
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$userId = Yii::app()->user->id;
		$user = $this->_checkRights($datagridTempId);
		$arr = array();
		if(!empty($user) && $user['created_by'] == $userId) {
			/*$model = new UserSelectedTemplate();
			$result = $model->checkTemplate($datagridTempId);*/
			$model = new UserPreference();
			$result = $model->checkTemplate($datagridTempId,$datagridId);
			foreach ($result as $key => $value) {
				if($value['user_id'] != $userId) {
					$arr=array( 'success'=>true, 'inUse'=>true);
					break;
				}
			}
			if(empty($arr))
				$arr=array( 'success'=>true, 'inUse'=>false);
		}
		else {
			$arr=array('success'=>false, 'message'=>Yii::t('datagridTemplateHelper','noRights'));
		}
        return $this->renderJSON($arr);
	}

	/*deletes the templates*/
	public function actionTemplateDelete() {
		$datagridTempId = $this->_request->getParam('template_id', 0);
		$globalDatagridTempId = $this->_request->getParam('global_temp_id', 0);
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$isPublic = $this->_request->getParam('is_public', 0);
		$deleteConfirm = $this->_request->getParam('delete_confirm', false);
		$userId = Yii::app()->user->id;
		if($deleteConfirm){
			$this->_deleteConfirm($datagridTempId,$datagridId,$userId,$globalDatagridTempId);
		}
		$user = $this->_checkRights($datagridTempId);
		if(!empty($user) && $user['created_by'] == $userId) {
			if($isPublic == 1) {
				/*$model = new UserSelectedTemplate();
				$result = $model->checkTemplate($datagridTempId);*/
				$model = new UserPreference();
				$result = $model->checkTemplate($datagridTempId,$datagridId);
				foreach ($result as $key => $value) {
					if($value['user_id'] != $userId) {
						$arr=array( 'success'=>true, 'inUse'=>true);
						return $this->renderJSON($arr);
					}
				}
			}
			$this->_deleteConfirm($datagridTempId,$datagridId,$userId,$globalDatagridTempId);
		}
		else {
			$arr=array('success'=>false, 'message'=>Yii::t('datagridTemplateHelper','noRights'));
        	return $this->renderJSON($arr);
		}
	}

	private function _deleteConfirm($datagridTempId,$datagridId,$userId,$globalDatagridTempId) {
		$connection = Yii::app()->db;
        $transaction = $connection->beginTransaction();
        try {
        	/*deletes template from yig_field_template,yig_user_display_field and sys_user_selected_template*/
			$deleteTemp = $this->_model->deleteTemplate($datagridTempId);
			$deleteTempFields = $this->_model->deleteTemplatePanelFields($datagridTempId, $datagridId);
			// $deleteSelectedTemp = $this->_deleteAllSelectedTemp($datagridTempId,$datagridId);
			$deleteUserPrefrenceTemp = $this->_deleteUserPrefrenceTemplate($datagridId,$datagridTempId);
			/*enters if the deleted template was the selected one*/
			if($datagridTempId == $globalDatagridTempId) {
				$temaplateModel = $this->_model->getTemplateName($datagridId,$userId);
				$arr=array( 'success'=>true, 'data'=>$temaplateModel,'wasSelected'=>true,'templateId'=>$datagridTempId);
			}
			else {
				$arr = array('success'=>true, 'data'=>null, 'wasSelected'=>false,'templateId'=>$datagridTempId);
			}
			$transaction->commit();
		    return $this->renderJSON($arr);
        }
        catch(Exception $e) {
        	echo $e;
        	$transaction->rollback();
        }
	}

	/*removes the set selected template from the nst_user_selected_template of created user and other users using that template*/
	private function _deleteAllSelectedTemp($datagridTempId,$datagrid_id) {
		$model = new UserSelectedTemplate;
		$model->deleteAllSelectedTemp($datagridTempId,$datagrid_id);
	}
	private function _deleteUserPrefrenceTemplate($datagridId,$datagridTempId) {
		$model = new UserPreference;
		$model->deleteSelectedTemp($datagridId,$datagridTempId);
	}
	
	
	/*updates the template fields*/
	public function actionUpdateDatagridTemplate() {
		$user_id = Yii::app()->user->id;
		$datagridTempId =$this->_request->getParam('datagrid_template_id',null);
		$fieldTempName =$this->_request->getParam('template_name','');
		$isPublic =$this->_request->getParam('is_public',1);
		$columnLocked =$this->_request->getParam('locked_column',null);
		$datagridId = $this->_request->getParam('datagrid_id',0);
		if(!empty($datagridTempId)) {
			$user = $this->_checkRights($datagridTempId);
			if(!empty($user) && $user['created_by'] == $user_id) {
				if(!$datagridTempId)
					$datagridTempId=0;
				DatagridTemplate::model()->updateByPk($datagridTempId, array('template_name' => $fieldTempName,'is_public'=>$isPublic,'locked_column'=>$columnLocked));
				$selectedFields = CJSON::decode(Yii::app()->request->getParam('selected_field',''));
				$deleteModel = $this->_model->deleteTemplatePanelFields($datagridTempId, $datagridId);
				$display_order=1;
				foreach ($selectedFields as $value) {
					$display_order++;
					$insertModel = $this->_model->insertTemplatePanelFields($value, $datagridTempId, $datagridId,$display_order,$user_id);
				}
				$arr=array('success'=>true, 'message'=>Yii::t('datagridTemplateHelper','updateSuccess'));
	        	return $this->renderJSON($arr);
			}
			else {
				$arr=array('success'=>false, 'message'=>Yii::t('datagridTemplateHelper','noRights'));
	        	return $this->renderJSON($arr);
			}
		}
		else {
			$arr=array('success'=>false, 'message'=>Yii::t('datagridTemplateHelper','unsavedData'));
	        return $this->renderJSON($arr);
		}
	}

	/*checks if the template to be updated is updated by the creator himself*/
	private function _checkRights($datagrid_template_id) {
		$datagridTemplateModel = new DatagridTemplate();
        $result = $datagridTemplateModel->checkRights($datagrid_template_id);
        return $result;
	}

	public function actionTemplateDisplay() {
		$datagridTempId = $this->_request->getParam('templateId', 0);
		if(!$datagridTempId)
			$datagridTempId=0;
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$panelName = $this->_model->getPanelName($datagridId);
		$show_all_field = 'false';
		$abc = false;

		$columns = $this->_model->getDatagridColumnsList($panelName['datagrid_name'], $abc, $show_all_field, $datagridTempId);
        $arr=array('success'=>true, 'data'=>$columns);
        return $this->renderJSON($arr);
	}
	public function actionUpdateDefaultDatagridTemplate() {
		$user_id = Yii::app()->user->id;
		$columnLocked =$this->_request->getParam('locked_column',null);
		$datagridId = $this->_request->getParam('datagrid_id',0);
		$datagridModel = new Datagrid();
		$datagridModel->setLockColumn($datagridId,$columnLocked);	
		$arr=array('success'=>true,'msg'=>'updated');
        return $this->renderJSON($arr);	
	}

	/*public function actionUpdateIsSelected() {
		$datagrid_id = $this->_request->getParam('datagrid_id',0);
		$datagrid_template_id = $this->_request->getParam('template_id',0);
		$user_id = Yii::app()->user->id;
		$isSelected=1;
        $datagridTemplateModel = new DatagridTemplate();
        $datagridTemplateModel->resetIsSelected($user_id,$datagrid_id);
		if(!empty($datagrid_template_id)) {
            $datagridTemplateModel->setIsSelected($user_id,$datagrid_template_id,$datagrid_id);
        }
        $arr=array('success'=>true);
        return $this->renderJSON($arr);
	}*/
	
}
?>