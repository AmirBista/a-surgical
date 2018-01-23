<?php

class UserNoteController extends PrivateController {

    #10 private vairble Declearation    
    private $_app, $_request, $_model, $_id;

    #20 __construct public function define
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_app = Yii::app();
        $this->_request = $this->_app->request;
        $this->_model = UserNote::model();
        $this->_id = $this->_app->user;
    }
    #30 private functions
    
    #40 action functions
    public function actionSave() {
        $dashboardNotes = $this->_app->request->getParam('dashboardNotes');
        $user_id = $this->_id->id;
        $noteModel = $this->_model->findByAttributes(array('created_by' => $user_id));

        if(empty($noteModel)){
            $noteModel = new UserNote();
            $noteModel->title = 'Notes';
            $noteModel->note_type = '1';
            $noteModel->created_by = $this->_id->id;
            $noteModel->created_datetime = date("Y-m-d\TH:i:s", time());
            $noteModel->delete_flg = 0;
            $noteModel->user_id=$this->_id->id;
        }
        else
            $noteModel->isNewRecord = FALSE;

        $noteModel->note = $dashboardNotes;
        $noteModel->updated_by = $this->_id->id;
        $noteModel->updated_datetime =  date("Y-m-d\TH:i:s", time());

        $response = array(
            'success' => FALSE,
            'data' => array(),
            'msg' => NULL
        );

        if($noteModel->save()) {
            $user_tz = $this->_app->request->getParam('user_tz');
            $user_tz_date_time = $noteModel['updated_datetime'];
            /*gets the user timezone object*/
            $user_tz =  new DateTimeZone($user_tz);
            $date = new DateTime($user_tz_date_time);
            $date->setTimeZone($user_tz);
            $response = array(
                'success' => TRUE,
                'data' => array(
                    'updated_datetime' => $date->format('Y-m-d H:i:s')
                )
            );
        } else {
            $response = array(
                'success' => FALSE,
                'data' => ('Update Failed'),
                'msg' => $noteModel->getErrors()
            );
            
        }
        echo CJSON::encode($response);
        
    }
    public function actionGetTime() {

        $arr = array(
            'success' => true,
            'data' => "yes"
        );
        $this->renderJSON($arr);
    }
    public function actionGetUsersNote() {
        $user_id = $this->_id->id;
        $noteModel = $this->_model->getUsersNotes($user_id);
        /*gets the user timezone sent via params*/
        $user_tz = $this->_app->request->getParam('user_tz');
        $user_tz_date_time = $noteModel['updated_datetime'];
        /*gets the user timezone object*/
        $user_tz =  new DateTimeZone($user_tz);
        $date = new DateTime($user_tz_date_time);
        $date->setTimeZone($user_tz);
        $user_tz_date_time = $date->format('Y-m-d H:i:s');
        $noteModel['updated_datetime'] =  $user_tz_date_time;
        $helpInfo=HelpText::model()->getHelpTextForDashboard();
        $arr = array(
            'success' => true,
            'data' => $noteModel,
            'helpInfo'=>$helpInfo
        );
        $this->renderJSON($arr);
    }

}
