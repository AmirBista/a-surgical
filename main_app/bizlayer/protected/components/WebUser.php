<?php
class WebUser extends CWebUser {
    // Store model to not repeat query.
    private $_model;
    public $_user_info;
    public $_creator_info;

    // Return user attribute
    public function getAttr($attr) {
        if(empty($attr)) {
            return '';
        }
        // $auth=new UserAuth();
        // $userInfo = $auth->getUser();
        $userInfo = $this->getUserInfo();
        try {
            return $userInfo[$attr];
        } catch (Exception $e) {
            return '-NA-';
        }
    }

    public function getUserInfo(){
        if ($this->_user_info === null){
            $auth=new UserAuth();
            $this->_user_info = $auth->getUser();
        }

        return $this->_user_info;
    }
    // Load user model.
    protected function loadUser($id=null) {
        if ($this->_model === null) {
            if ($id !== null)
                $this->_model = User::model()->findByPk($id);
        }

        return $this->_model;
    }

    public function getCreatorInfo($user_id){
        if($this->_user_info['user_id']==$user_id){
            $this->_creator_info = $this->_user_info;
        }
        else if(empty($this->_creator_info) || $this->_creator_info['user_id']!=$user_id){
            $auth=new UserAuth();
            $this->_creator_info =$auth->getCreator($user_id);   
        }
        return $this->_creator_info;
    }
}       
