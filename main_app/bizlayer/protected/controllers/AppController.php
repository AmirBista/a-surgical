<?php

class AppController extends PublicController {
    /*
     * returns information on current log in user
     */
    public function actionGetUser() {
        $auth=new UserAuth();
        $userInfo = $auth->getUser(true);
        $userInfo['language'] = GET_LANG($userInfo['language']);
        $res=array(
            'success'=>true,
            'isLoggedIn'=>(!Yii::app()->user->isGuest),
            'data'=>$userInfo
        );
        $this->renderJSON($res);
    }

    public function actionGetUserDataObj() {
        $auth=new UserAuth();
        $userInfo = $auth->getUser(true);
        $userInfo['language'] = GET_LANG($userInfo['language']);
        ob_clean();
        header("content-type: application/x-javascript; charset=utf-8");
        header('Cache-Control: public'); //must-revalidate, public, no-cache
        ob_start();

        $user_data= CJSON::encode($userInfo);

        // $group_user = $userInfo['group_user'];
        // $group_code = $userInfo['group_code'];
        // $UserGrp=CJSON::encode(AppUser::model()->getUserGrp($group_user,$group_code));


        $userdata_script = " var Ext=Ext||{}; ";
        $userdata_script .=  " Ext.CURRENT_USER = {$user_data}". ';';
        // $userdata_script .=  " Ext.SWITCH_USERS = $UserGrp". ';';

        echo $userdata_script;
        ob_end_flush();
    }

    public function actionDummy(){
        echo 'Yo have done!';
    }

     public function actionGetAvailableLanguage() {
        $languages = Yii::app()->params['availableLanguages'];
        $i=0;
        if(!empty($languages))
        {
            foreach($languages as $key => $value) {
                $array[$i]['ID'] =$key;
                $array[$i]['name'] =$value;
                $i++;
            }
            $response['success']=TRUE;
            $response['data']=$array; 
            $this->renderJSON($response);
        }
        else {
            $response['success']=FALSE;
            $response['message']='No lanaguage available'; 
            $this->renderJSON($response);
        }
    }
}

