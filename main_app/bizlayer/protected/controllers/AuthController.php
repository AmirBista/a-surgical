<?php
class AuthController extends PublicController {

    public function actionLogin()
    {
        $res=array(
            'success'=>FALSE,
            'isLoggedIn'=>FALSE,
            'data'=>Yii::t('user','Invalid Credentials')
        );
        //if already logged in, no need to recheck
        if(!Yii::app()->user->isGuest) {
            $res=array(
                'success'=>TRUE,
                'isLoggedIn'=>TRUE,
                'autoLogin'=>TRUE,
                'data'=>array('session_id'=>Yii::app()->session->sessionID)
            );
            echo CJSON::encode($res);
            Yii::app()->end();
        }
        if(Yii::app()->request->isAjaxRequest)
        {
            $b = Yii::app()->request->getPost('_b');
            if (!($b == "70" || $b == "30"))
                $b = 30;
            $username=trim(Yii::app()->request->getPost('username'));
            $password=Yii::app()->request->getPost('password');
            $remember_me=Yii::app()->request->getPost('remember_me',0);
            /*if (!is_numeric($username))
            {
                $res=array(
                    'success'=>FALSE,
                    'isLoggedIn'=>FALSE,
                    'data'=>Yii::t('user','Invalid Credentials')
                );
                echo CJSON::encode($res);
                exit;      
            }*/

            $auth=new UserAuth();
            $auth->username=$username;
            $auth->password=$password;
            //$auth->rememberMe=TRUE;
            // if(empty($remember_me)) {
                $auth->rememberMe=FALSE;
            // }

            if ($remember_me == 1)
            {
                Yii::app()->request->cookies['username'] = new CHttpCookie('username', $username);       
                Yii::app()->request->cookies['remember_me'] = new CHttpCookie('remember_me', $remember_me);
            }
            else
            {
                unset(Yii::app()->request->cookies['username']);
                unset(Yii::app()->request->cookies['remember_me']);
            }

            Yii::import('commonExtension.EWebBrowser');
            $ua = new EWebBrowser();
            $user_agent = $ua->browser . " " . $ua->version . ", " . $ua->platform;
            $dt = date('Y-m-d H:i:s');
            $ip = $_SERVER['REMOTE_ADDR'];
            $user = User::model()->findByAttributes(array('username'=>$username));
            
            if($auth->authenticate())
            {
                $user->user_agent = $user_agent;
                $user->ip = $ip;
                $user->last_login_time = $dt;
                $user->login_access_count = !empty($user->login_access_count) ? ($user->login_access_count + 1) : 1; 
                //var_dump($user);
                $user->save();

                $res=array(
                    'success'=>TRUE,
                    'isLoggedIn'=>TRUE,
                    'data'=>array()
                );
            } else {
                if(!empty($user)){
                    $user->user_agent = $user_agent;
                    $user->ip = $ip;
                    $user->last_login_time = $dt;
                    $user->login_failure_count = !empty($user->login_failure_count) ? ($user->login_failure_count + 1) : 1;    
                    $user->save();
                }
            }
        }
        echo CJSON::encode($res);
    }
    public function actionSwitchUser()
    {
        if (Yii::app()->user->isGuest){
            $res=array(
                'success'=>FALSE,
                'isLoggedIn'=>FALSE,
                'data'=>Yii::t('user','Un authorized access.')
            );
            echo CJSON::encode($res);
            exit;
        }
        
        $res=array(
            'success'=>FALSE,
            'isLoggedIn'=>FALSE,
            'data'=>Yii::t('user','Invalid Credentials')
        );

        $auth=new UserAuth();
        $userInfo = $auth->getUser(true);


        // //if already logged in, no need to recheck
        // if(Yii::app()->request->isAjaxRequest)
        // {
            $username = trim(Yii::app()->request->getParam('username'));
            $password = Yii::app()->request->getParam('password');
            /*$username = '1041';
            $password = '1041';*/
            $user = User::model()->findByAttributes(array('username'=>$username,'user_code'=>$password));
            if (empty($user)){
                $res=array(
                    'success'=>FALSE,
                    'isLoggedIn'=>FALSE,
                    'data'=>Yii::t('user','userName Password Mismatch')
                );
                echo CJSON::encode($res);
                exit;
            }
            else
            {
                if (empty($userInfo['group_info']) || $userInfo['group_info']['group_code'] != $user['group_code']){
                    $res=array(
                        'success'=>FALSE,
                        'isLoggedIn'=>FALSE,
                        'data'=>Yii::t('user','Invalid group user')
                    );
                    echo CJSON::encode($res);
                    exit;
                }
            }

            $auth->username=$username;
            $auth->password=$password;
            //  $auth->rememberMe=TRUE;
            // if(empty($remember_me)) {
                // $auth->rememberMe=FALSE;
            // }

            // if ($remember_me == 1)
            // {
            //     Yii::app()->request->cookies['username'] = new CHttpCookie('username', $username);       
            //     Yii::app()->request->cookies['remember_me'] = new CHttpCookie('remember_me', $remember_me);
            // }
            // else
            // {
            //     unset(Yii::app()->request->cookies['username']);
            //     unset(Yii::app()->request->cookies['remember_me']);
            // }

            Yii::import('ext.EWebBrowser');
            $ua = new EWebBrowser();
            $user_agent = $ua->browser . " " . $ua->version . ", " . $ua->platform;
            $dt = date('Y-m-d H:i:s');
            $ip = $_SERVER['REMOTE_ADDR'];
            $user = User::model()->findByAttributes(array('username'=>$username));
            
            if($auth->authenticate(true))
            {
                $user->user_agent = $user_agent;
                $user->ip = $ip;
                $user->last_login_time = $dt;
                $user->login_access_count = !empty($user->login_access_count) ? ($user->login_access_count + 1) : 1; 
                //var_dump($user);
                $user->save();

                $userInfo = $auth->getUser(true);
                $userInfo['language'] = GET_LANG($userInfo['language']);

                $res=array(
                    'success'=>TRUE,
                    'isLoggedIn'=>TRUE,
                    'data'=>array(),
                    'user_info'=>$userInfo
                );
            } else {
                if(!empty($user)){
                    $user->user_agent = $user_agent;
                    $user->ip = $ip;
                    $user->last_login_time = $dt;
                    $user->login_failure_count = !empty($user->login_failure_count) ? ($user->login_failure_count + 1) : 1;    
                    $user->save();
                }
            }
        // }
        echo CJSON::encode($res);
    }
	public function actionLogout()
	{

        Yii::app()->user->logout();
        Yii::app()->session->clear();
        Yii::app()->session->destroy();
        unset(Yii::app()->request->cookies['confirm_setting']);
        $res=array(
            'success'=>TRUE,
            'isLoggedIn'=>FALSE,
            'data'=>''
        );
        echo CJSON::encode($res);
        Yii::app()->end();
	}
}
