<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	private $_id;
	public function authenticate($without_pass=false)
	{

		$user=User::model()->findByAttributes(array('username'=>$this->username,'delete_flg'=>0));
        if($user===null) {
            $this->errorCode=self::ERROR_USERNAME_INVALID;
        } else {
            if($user->validateUser($user,$without_pass)){
                if($without_pass === true ){
                    $this->_id=$user->user_id;
                    $this->setState('username', $user->username);
                    $this->setState('user_id', $user->user_id);
                    $this->errorCode=self::ERROR_NONE;
                }                
                else if (!$user->validatePassword($this->password)) {
                    $this->errorCode=self::ERROR_PASSWORD_INVALID;
                }
                else {
                    $this->_id=$user->user_id;
                    $this->setState('username', $user->username);
                    $this->setState('user_id', $user->user_id);
                    $this->errorCode=self::ERROR_NONE;
                }
            }else{
                $this->errorCode=self::ERROR_USERNAME_INVALID;
            }
        }
		return !$this->errorCode;
	}

	public function getId() {
        return $this->_id;
    }
}

