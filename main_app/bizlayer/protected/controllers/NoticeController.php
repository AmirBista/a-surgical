<?php

class NoticeController extends PrivateController {

    #10 private vairble Declearation    
    private $_app, $_model, $_id;

    #20 __construct public function define
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_app = Yii::app();
        $this->_model = Notice::model();
        $this->_id = $this->_app->user;
    }
    #30 private functions
    private function _insertRecord($dashBoardData,$company_id) {
        $message = $dashBoardData['message'];
        $model = new Notice;
        $model->message = $message;
        $model->company_id =$company_id;
        $model->created_by = $model->updated_by = $this->_id->id; //user id
        $model->created_datetime = $model->updated_datetime = new CDbExpression('NOW()');
        $response = $model->save();
    }
    private function _updateRecord($dashBoardData, $notice_id) {
        $message = $dashBoardData['message'];
        $model = new Notice;
        $dashBoardData['message'] = $message;
        $model->updated_by = $this->_id->id; //user id
        $model->updated_datetime = new CDbExpression('NOW()');
        $model->updateByPk($notice_id, $dashBoardData);
    }
    
    #40 action functions
    public function actionEdit() {
        $dashBoardData = @$_REQUEST;
        $company_id = Yii::app()->user->getAttr('company_id');
        $userId = $this->_id->id;
        $checkPreviousData = $this->_model->getNotice($userId,$company_id);
        $notice_id = $checkPreviousData['notice_id'];
        if (@empty($checkPreviousData['notice_id'])) {
            $this->_insertRecord($dashBoardData,$company_id);
        } else {
            $this->_updateRecord($dashBoardData, $notice_id);
        }
        $res = array(
            'success' => true
        );
        $this->renderJSON($res);
    }
    public function actionGetNotice() {
        $company_id = Yii::app()->user->getAttr('company_id');
        $userId = $this->_id->id;
        $data = $this->_model->getNotice($userId,$company_id);
        
        if($data) {
            $res = array(
                'success' => true,
                'data' => $data
            );    
        } else {
            $res = array(
                'success' => false,
                'data' => $data
            );
        }
        $this->renderJSON($res);
    }
}