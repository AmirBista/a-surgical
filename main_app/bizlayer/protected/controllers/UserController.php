<?php
class UserController extends PrivateController {

	public function actionGetUser() {
        $app = Yii::app();
        $user_info = $app->user->getUserInfo();
        $user_id = $user_info['user_id'];
        // $id=Yii::app()->request->getParam('id',NULL);        
        $response=array(
            'success'=>FALSE,
            'data'=>NULL
        );
        $user = User::model()->findByPk($user_id);
        $user_data = array();
        $user_data['user_id'] = $user->user_id;
        $user_data['user_code'] = $user->user_code;
        $user_data['username'] = $user->username;
        $user_data['first_name'] = $user->first_name;
        $user_data['last_name'] = $user->last_name;
        $user_data['phone'] = $user->phone;
        $user_data['email'] = $user->email;
        $user_data['role'] = $user->role;
        $user_data['language'] = $user->language;

        $response['success']=TRUE;
        $response['data']=$user_data;
        $this->renderJSON($response);
    }

	public function actionSave(){
        $res=array(
            'success'=>TRUE,
            'data'=>Yii::t('user', 'User Created Succesfully')
        );
        $app = Yii::app();
        $user_info = $app->user->getUserInfo();
        $user_id = $user_info['user_id'];

        $attributes = $_POST;
        if (array_key_exists('resetpassword', $attributes)){
            if ($attributes['resetpassword']){
                $attributes['password'] = User::model()->hashPassword($attributes['password']);
            } 
            unset($attributes['resetpassword']);
        }
        else
        {
            unset($attributes['password']);
        }

        $username = Yii::app()->request->getParam('username',null);

        //check for duplicate user
        $users = User::model()->findAllByAttributes(array('username'=> $username),'user_id <> :user_id', array(':user_id' => $user_id));
        if(!empty($users)) {
            $err = array(
               'success'=>false,
               'data'=>Yii::t('user','User Already Available')
            );
            echo CJSON::encode($err);
            exit;
        }

        $user=User::model()->findByPK($user_id);
        $user->attributes = $attributes;
						      
        if(!$user->save()) {
            $response=array(
                'success'=>FALSE,
                'data'=>Yii::t('user','can not Save')
                );
            $this->renderJSON($response);
        }
        else
        {
            $response=array(
                'success'=>TRUE,
                'data'=> Yii::t('user','User Edited Succesfully')
            );
            $this->renderJSON($response);
        }
    }
}
?>
