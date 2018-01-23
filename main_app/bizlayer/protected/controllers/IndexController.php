<?php
class IndexController extends PublicController {
	public function actionIndex() {
		$this->lang = GET_LANG();
		$login_branch='/login/';
        $main_url =getMainUrl(false);
        $app_params = Yii::app()->params;
        $ext_path = $app_params['extjs_path'].$app_params['extjs_version'].'/';
        $buildPath = "build/".BUILD_ENVIRONMENT;
		if(!Yii::app()->user->isGuest) {
			registerScriptFile("app/lang/ybase-lang-".$this->lang, TRUE);
	        if(USE_COMPILED_JAVASCRIPT === true)
	        {
	        	$buildPath .= "/tbase";
				registerCssFile($buildPath."/resources/JRQSVoice-all",TRUE);
				registerScriptFile($buildPath."/app",TRUE);
			}
			else
			{
				registerScriptFile("js/login/jquery-1.11.0.min", CClientScript::POS_HEAD);
				registerScriptFile("app/utility/jstz.min", TRUE);
				registerScriptFile('loader', TRUE);
				if(POPUP_SELECTION == TRUE){
					registerScriptFile('ybase_popup', TRUE);
				}
				else{
					registerScriptFile('ybase', TRUE);
				}

			//	registerScriptFile("ybase", TRUE);

				registerCssFile("bootstrap.style",TRUE);
			}
			registerScriptFile($ext_path."locale/ext-lang-".$this->lang, TRUE);
			$this->render('main');
		} else {
			// if (USE_LOGIN_HTML === true)
			// {
				registerScriptFile("app/lang/login-lang-".$this->lang, CClientScript::POS_HEAD);
				registerScriptFile("js/login/jquery-1.11.0.min", CClientScript::POS_HEAD);
				registerScriptFile("js/login/jquery-ui-1.10.4.custom.min", CClientScript::POS_HEAD);
				registerCssFile("bizlayer/css".$login_branch."style", CClientScript::POS_HEAD);
				registerCssFile("bizlayer/css".$login_branch."jquery-ui-1.10.4.custom.min",TRUE);
		        if(USE_COMPILED_JAVASCRIPT === true)
		        {
		        	$buildPath .= "/login";
					registerScriptFile($buildPath.'/login_script_minified',CClientScript::POS_HEAD);
				}
				else
				{
					registerScriptFile('login_script',CClientScript::POS_HEAD);
				}
				$this->render('login_html');
			// }
		}
	}

	/**
     * This is the action to handle external exceptions.
     */
    public function actionError()
    {
        if($error=Yii::app()->errorHandler->error)
        {
            if(Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('//layouts/error', $error);
        }
    }
}