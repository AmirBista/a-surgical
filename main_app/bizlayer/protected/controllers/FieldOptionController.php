<?php
class FieldOptionController extends PrivateController {
    public function __construct($arg = NULL)
	{
		parent::__construct($arg);
		$this->_department_code = 5;
        $this->_controller_name = 'fieldOption';
        $this->_model_name ='FieldOption';
        $this->_table_name = 'sys_field_option';
        $this->_pk_col = 'field_option_id';
        $this->_keyword_searchable_fields = array('code','name', 'description', 'option_1', 'option_2', 'option_3');
    }

	/*
    * retunrs member list for gridview
    */
    public function actionList() {
        $request = Yii::app()->request;
        $keywords = $request->getParam('query', null);
        $page = $request->getParam('page', 1);
        $start = $request->getParam('start', 0);
        $page_size = $request->getParam('limit', 0);
        $user_info = Yii::app()->user->getUserInfo();
        $company_id = $user_info['company_id'];
        $model = FieldOption::model();
        $alais = "t1000";
        $sql_where = $model->getWhereCondition($this->_keyword_searchable_fields,$alais,$keywords,null,null,null,$company_id);
        $total = $model->getPrintTypeRecordCount(null, null, $sql_where,$alais);
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        $printTypeRecords = $model->getPrintType($sql_where,$page_size, $startFrom,$forSbase);
        $data = array(
            'success' => TRUE,
            'data' => $printTypeRecords,
            'total' => $total,
            'current_page' => $currentPage + 1,
            'total_pages' => $totalPages,
            'page_size' => $page_size,
            'isLast' => $isLast,        
        );
        echo CJSON::encode($data);
    }


    public function actionGetFieldOptionData() {
        $fieldOptionId = Yii::app()->request->getParam('field_option_id',1);
        $model = new SysFieldOptionDataUtil();
        $result = $model->getFieldOptionData($fieldOptionId);
        $result['success']=true;
        $this->renderJSON($result, true);
    }
    public function actionGridUpdate() {
        $user_info = Yii::app()->user->getUserInfo();
        $user_id = $user_info['user_id'];
        $field_option_id = Yii::app()->request->getParam('field_option_id',0);
        $from_order_master_entry = Yii::app()->request->getParam('from_order_master_entry',0);
        $fieldOptionDataRows = CJSON::decode(Yii::app()->request->getParam('data'));
        $userRights = $this->_checkUserRights($field_option_id,$user_info['userRole']);
        if ($this->isMultidimensionalArray($fieldOptionDataRows) === false) {
            //convert to multidimension array for single dimension
            $temp = array();
            $temp[] = $fieldOptionDataRows;
            $fieldOptionDataRows = $temp;
        }
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            foreach ($fieldOptionDataRows as $fieldOptionDataRow) {
                $fieldOptionDataRow = array_map('trim', $fieldOptionDataRow);
                if (@empty($fieldOptionDataRow['field_option_data_id'])) {
                    if($userRights['new_role']) {
                        $mode=$this->_insertRecord($fieldOptionDataRow,$user_id);
                    }
                    else {
                        $transaction->rollback();
                        $arr = array(
                            'success' => false,
                            'msg' => Yii::t('error','noRights to insert data'),
                        );
                        echo CJSON::encode($arr);
                        exit;
                    }
                } else {
                    if($fieldOptionDataRow['delete_flg'] == 1) {
                        if($userRights['delete_role']) {
                            $mode=$this->_updateRecord($fieldOptionDataRow,$user_id);
                        } else {
                            $transaction->rollback();
                            $arr = array(
                                'success' => false,
                                'msg' => Yii::t('error','noRights to delete data'),
                            );
                            echo CJSON::encode($arr);
                            exit;
                        }
                    }else {
                        if($userRights['edit_role']) {
                            $mode=$this->_updateRecord($fieldOptionDataRow,$user_id);
                        }else {
                            $transaction->rollback();
                            $arr = array(
                                'success' => false,
                                'msg' => Yii::t('error','noRights to update data'),
                            );
                            echo CJSON::encode($arr);
                            exit;
                        }
                    }
                }
            }
            $transaction->commit();
            $arr = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess'),
            );
            if($from_order_master_entry== 1){
                $sysFieldOptionDataUtil = new SysFieldOptionDataUtil();
                $arr['comboStoreData'] = $sysFieldOptionDataUtil->getFieldOptionData($field_option_id);
            }
            $arr['isUpdate']=$mode;
        } catch (Exception $e) {
            $transaction->rollback();
            Yii::app()->user->setFlash('error', "{$e->getMessage()}");
            $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );
        }
        $this->renderJSON($arr);
    }
    private function _checkUserRights($field_option_id,$userRole) {
        $model = new FieldOption;
        $userRoles = $model->getUserRoles($field_option_id,$userRole);
        return $userRoles;
    }
    private function _insertRecord($fieldOptionDataRow,$user_id) {
        $model = new FieldOptionData;
        $model->field_option_id = $fieldOptionDataRow['field_option_id'];
        $model->code =  $fieldOptionDataRow['name'];
        $model->name = $fieldOptionDataRow['name'];
        $model->description = $fieldOptionDataRow['description'];
        // $model->created_datetime = $model->updated_datetime = date('Y-m-d H:i:s');//new CDbExpression('NOW()');
        $model->created_datetime = $model->updated_datetime = new CDbExpression('NOW()');
        $model->created_by = $model->updated_by = $user_id;
        $model->delete_flg = 0;
        $model->display_order = $fieldOptionDataRow['display_order'];
        $model->view_role = '{1,50}';
        $result = $model->save();
        $isUpdate=false;
        return $isUpdate;
    }
    private function _updateRecord($fieldOptionDataRow,$user_id) {
        $fieldOptionDataRow['updated_by'] = $user_id;
        $model = new FieldOptionData;
        $model->updateByPk($fieldOptionDataRow['field_option_data_id'], $fieldOptionDataRow);
        $isUpdate=true;
        return $isUpdate;
    }

    public function actionInsertFieldOptionData()
    {
        $field_option_id = Yii::app()->request->getParam('field_option_id',0);
        $user_id = Yii::app()->user->getAttr('user_id');
        $value = Yii::app()->request->getParam('value',null);
        $display_order = FieldOptionData::model()->getMaxVal($field_option_id,'display_order');
        $fieldOptionDataRow = array(
                'field_option_id' => $field_option_id,
                'name'            => $value,
                'code'            => $value,
                'description'     => '',
                'display_order'   => $display_order
            );
        $this->_insertRecord($fieldOptionDataRow,$user_id);
        $result = array('success'=>TRUE,'msg'=>t('general','saveSuccess'),'data'=>$fieldOptionDataRow);
        $this->renderJSON($result);
    }
}
