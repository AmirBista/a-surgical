<?php

class SearchController extends PrivateController {
    public function actionGetSearchList() {
        $app                    = Yii::app();
        $request                = $app->request;
        $user_id                = $app->user->user_id;
        $datagrid_id            = $request->getParam('datagrid_id', null);
        $grid_header_search     = $request->getParam('grid_header_search', false);
        $grid_temp_search       = $request->getParam('grid_temp_search', false);
        $grid_win_search        = $request->getParam('grid_win_search', false);
        $params = array(
            'datagrid_id'           => $datagrid_id,
            'grid_header_search'    => $grid_header_search,
            'grid_temp_search'      => $grid_temp_search,
            'grid_win_search'       => $grid_win_search
        );
        $searchList  = Search::model()->getSearchList($params);

        if($grid_temp_search) {
            $search_criteria = CJSON::decode($value['search_criteria']);
            $search_criteria = $this->_checkToday($search_criteria);
            $searchList[$key]['search_criteria']=$search_criteria;
        }
        $arr = array(
            'success' => true,
            'data' => $searchList
        );
        $this->renderJSON($arr);
    }
    /*gets allSearchCriteria for particular grid but returned in searchList and templateSearchList array*/
    public function actionGetAllSerachCriteria() {
        $app                = Yii::app();
        $request            = $app->request;
        $user_id            = $app->user->user_id;
        $datagrid_id        = $request->getParam('datagrid_id', 0);
        $data               = $this->_getAllSearchList($datagrid_id);
        $arr = array(
            'success'   => true,
            'msg'       => Yii::t('general','saveSuccess'),
            'data'      => $data
        );
        $this->renderJSON($arr); 
    }
    private function _getAllSearchList($datagrid_id) {
        $search_list_params = array('datagrid_id'   => $datagrid_id, 'grid_header_search'   => true);
        $temp_list_params   = array('datagrid_id'   => $datagrid_id, 'grid_temp_search'     => true);
        $search_list        = Search::model()->getSearchList($search_list_params);
        $temp_list          = Search::model()->getSearchList($temp_list_params);
        foreach ($temp_list as $key => $value) {
            $search_criteria = CJSON::decode($value['search_criteria']);
            $search_criteria = $this->checkDate($search_criteria);
            $temp_list[$key]['search_criteria'] = $search_criteria;
        }
        $data = array(
            'searchList'            => $search_list,
            'searchTemplateData'    => $temp_list
        );
        return $data;
    }
    private function _checkToday($search_criteria) {
        $value_arr = array('{today}'=>date('Y-m-d'));
        foreach ($search_criteria as $key => $value) {
            $templat_value = VText::t($value, $value_arr);
            $search_criteria[$key] = $templat_value;
        }
        return $search_criteria;
    }
    public function actionGridSearchCriteriaSave() {
        $app                = Yii::app();
        $request            = $app->request;
        $user_id            = $app->user->user_id;
        $datagrid_id        = $request->getParam('datagrid_id', null);
        $deletedRecords     = CJSON::decode($request->getParam('deletedRecords', null));
        $modifiedRecords    = CJSON::decode($request->getParam('modifiedRecords', null));
        $newRecords         = CJSON::decode($request->getParam('newRecords', null));
        $grid_header_search = $request->getParam('grid_header_search', false);
        $connection         = Yii::app()->db;
        $transaction        = $connection->beginTransaction();
        $is_duplicate       = false;
        try {
            $model = new Search;
            if(!empty($deletedRecords)) {
                foreach ($deletedRecords as $deletedRecord) {
                    $this->_deleteRecord($model, $deletedRecord);
                }
            }
            if(!empty($modifiedRecords)) {
                foreach ($modifiedRecords as $modifiedRecord) {
                    if(empty($modifiedRecord['datagrid_id'])) {
                        $modifiedRecord['datagrid_id'] = $datagrid_id;
                    }
                    $modifiedRecord['delete_flg'] = 0;
                    if(array_key_exists('is_public', $modifiedRecord)) {
                        if($modifiedRecord['is_public'] == 1) {
                            $is_duplicate = $this->_checkDupicateRec($datagrid_id,$modifiedRecord['search_name'],$modifiedRecord['search_id']);
                        }
                    }else {
                        $record = Search::model()->findByPk(array('search_id'=>$searchRow['search_id']));
                        if($record->is_public == 1) {
                            $is_duplicate = $this->_checkDupicateRec($datagrid_id,$modifiedRecord['search_name'], $modifiedRecord['search_id']);
                        }
                    }
                    if(!$is_duplicate) {
                        $this->_updateRecord($model, $modifiedRecord,$user_id);
                    } else {
                        $arr = array(
                            'success'   => false,
                            'msg'       => Yii::t('general','duplicateData')
                        );
                        $this->renderJSON($arr);
                    }
                }
            }
            if(!empty($newRecords)) {
                foreach ($newRecords as $newRecord) {
                    if(array_key_exists('is_public', $newRecord) && $newRecord['is_public'] == 1) {
                        $is_duplicate = $this->_checkDupicateRec($datagrid_id, $newRecord['search_name'], 0); 
                    }
                    if(!$is_duplicate) {
                        $this->_insertRecord($newRecord);
                    } else {
                        $arr = array(
                            'success'   => false,
                            'msg'       => Yii::t('general','duplicateData')
                        );
                        $this->renderJSON($arr);
                    }
                }
            }
            $transaction->commit();
            $data = $this->_getAllSearchList($datagrid_id);
            $arr = array(
                'success'   => true,
                'msg'       => Yii::t('general','saveSuccess'),
                'data'      => $data
            );
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
    private function _checkDupicateRec($datagrid_id,$search_name,$search_id=0) {
        $duplicate_flag = false;
        $record = Search::model()->findByAttributes(array(
                'datagrid_id'   => $datagrid_id,
                'search_name'   => $search_name,
                'is_public'     => 1,
                'delete_flg'    => 0),
                "search_id != $search_id",
                array()
        );
        if(!empty($record)) {
            $duplicate_flag = true;
        }
        return $duplicate_flag;
    }
    private function _insertRecord($searchRow) {
        $searchModel = new Search();
        $searchModel->system_flg        = 0;
        $searchModel->datagrid_id       = $searchRow['datagrid_id'];
        $searchModel->is_public         = $searchRow['is_public'];
        $searchModel->show_template     = $searchRow['show_template'];
        $searchModel->search_name       = $searchRow['search_name'];
        $searchModel->search_criteria   = $searchRow['search_criteria'];
        $searchModel->created_by        = Yii::app()->user->id;
        $searchModel->user_id           = Yii::app()->user->id;
        $searchModel->created_datetime  = new CDbExpression('NOW()');
        $searchModel->isNewRecord       = true;
        $response                       = $searchModel->save();
        return $response;
    }
    private function _updateRecord($model, $searchRow) {
        $user_id = Yii::app()->user->id;
        $searchRow['updated_datetime'] = date('Y-m-d H:i:s');
        $searchRow['updated_by'] = $user_id;
        $model->updateByPk($searchRow['search_id'], $searchRow);
        return;
    }
    /*deletes record from searchGridWindow*/
    private function _deleteRecord($model,$search_id) {
        $user_id = Yii::app()->user->user_id;
        $result = $model->deleteSearch($search_id,$user_id);
        return $result;
    }
    public function actionGetFieldForCombo() {
        $datagrid_id=Yii::app()->request->getParam('panel_id',1);
        $datagrid_template_id=Yii::app()->request->getParam('datagrid_template_id',null);
        $Fields=Table::model()->GetFields($datagrid_id,$datagrid_template_id);
        $response['success']=TRUE;
        $response['data']=$Fields;
        print_r($this->renderJSON($response));
        exit();
        // $this->renderJSON($response);
    }
}