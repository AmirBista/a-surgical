<?php
class UserAuth {
    public $username;
    public $password;
    public $rememberMe=FALSE;

    private $_identity;

    public function authenticate($without_pass=false,$duration=null)
    {
        if($this->_identity===null)
        {
            $this->_identity=new UserIdentity($this->username,$this->password);
            $this->_identity->authenticate($without_pass);
        }
        if($this->_identity->errorCode===UserIdentity::ERROR_NONE)
        {
            // when $this->rememberMe checked 30 days
            //otherwise 60 minutes idle will expire session
            if(empty($duration))
                $duration=$this->rememberMe ? 3600*24*30 : 60*60; // 30 days
            Yii::app()->user->login($this->_identity,$duration);
            return true;
        }
        else
        {
            return false;
        }
    }

    public function getUser($getGroupInfo=false){
        $info = array(
            'username' => NULL,
            'user_id' => NULL,
            'username' => 'guest',
            'logged' => FALSE
        );
        if(Yii::app()->user->isGuest) {
            return $info;
        }   
        else{
            $sql = "SELECT  u.user_id,u.username,u.first_name,u.last_name,u.email,u.phone,
                            u.is_locked,u.department_id,u.language,u.company_id,
                            CASE WHEN u.role IS NULL THEN 1 ELSE u.role END as user_role,
                            u.user_code, c.company_type, c.company_code, c.company_name,
                            d.department_name
                    FROM app_user u
                    left join app_company c on u.company_id = c.id
                    left join app_department d on d.department_id = u.department_id
                    WHERE u.user_id =:user_id ";

            $user_id = Yii::app()->user->id;
            $command = Yii::app()->db->createCommand($sql);
            $command->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $user_info = $command->queryRow();
            if (empty($user_info))
            {
                return $info;
            }
            else
            {
                $info['user_id'] = $user_info['user_id'];
                $info['username'] = $user_info['username'];
                $info['userRole'] =  $user_info["user_role"];
                $info['firstName'] = $user_info['first_name'];
                $info['last_name'] = $user_info['last_name'];
                $info['email'] =  $user_info["email"];
                $info['phone'] = $user_info['phone'];
                $info['is_locked'] = $user_info['is_locked'];
                $info['department_name'] =  $user_info["department_name"];
                $info['department_id'] =  $user_info["department_id"];
                $info['company_id'] =  $user_info["company_id"];
                $info['language'] = $user_info['language'];
                $info['user_code'] = $user_info['user_code'];
                
                $info['company_type'] = $user_info['company_type'];
                $info['company_code'] = $user_info['company_code'];
                $info['company_name'] = $user_info['company_name'];

                $info['is_super_user'] = false;

                // $super_user_email = Yii::app()->params['SUPER_ADMIN_EMAIL'];
                if ($info['userRole'] == 100){
                    $info['is_super_user'] = true;
                    $info['userRole'] = 50;
                }

                $info['logged'] = true;
            }
        }
        return $info;        
    } 
}