<?php
    $img_path =  Yii::app()->baseUrl.'/image/';
    $css_path =  Yii::app()->baseUrl.'/css/';
    $js_path =  Yii::app()->baseUrl.'/js/';

    $username = isset(Yii::app()->request->cookies['username']) ? Yii::app()->request->cookies['username']->value : '';
    $remember_me = isset(Yii::app()->request->cookies['remember_me']) ? Yii::app()->request->cookies['remember_me']->value : 0;
    $userManual = Yii::t('general','userManual');
    $firstText = Yii::t('general','firstText');
    $company = Yii::t('general','company');

?>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<link rel="stylesheet" href="<?php echo $css_path;?>login/jquery-ui-1.10.4.custom.min.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $css_path;?>login/style.css.php" type="text/css" />
<title>JRVoice</title>
 -->
<!-- </head>

<body class="login"> -->

<div class="wrapper">
<!-- <div class="header-bar">
<p class="left_yofile"><a href ="http://yofile.xyz" target="_blank"><?php echo $userManual; ?></a></p>
<p class="ryt_yonefu"><?php echo $firstText." "; ?><a href ="http://yonefu.com" target="_blank"><?php echo $company; ?></a></p>
</div> -->
<div class="top-box-bg"></div>
<div class="black-box-bg"></div>
<div class="yonefu-logo-top"><a href="http://www.yonefu.com/hp/" target="_blank"><img src="images/yonefu-logo.png" width="100"></a></div>
<div class="loginbox radius hideme">
 <div class="outer-login-container">
    <div class="loginboxinner radius">
<!-- <div class="login-container"></div> -->
<div class="login-form-container">
          <div class="company_logo_container">
              <div class="adernas_logo">
                  <a href="http://www.aderans.com.sg/" target="_blanks"><img src="images/aderans_logo.png" /></a>
              </div>
              <!-- <div class="and_icon">
                  <img src="images/header_2.gif" />
              </div> -->
              <div class="fortune_wigs_logo">
                  <a href="http://www.fortunewigs.com.sg/index.php" target="_blank"><img src="images/logo-top.png" /></a>
              </div>
          </div>
        <div class="loginform">
            <div class="main_logo">
                <img src="images/login-logo-ybase.png" width="200" />
            </div>
            <form id="login" action="" method="post">
                <!-- <p class="username-ico label-text">ユーザー名</p> -->
                <p class="login-input">
                  <span class="username-ico label-text"></span>
                    <input type="text" id="username" name="username" class="inputbox" title=""/>
                </p>
                <!-- <p class="password-ico label-text">パスワード</p> -->
                <p class="login-input">
                <span class="password-ico label-text"></span>
                    <input type="input" id="pass_hidden" name="pass_hidden"  class="inputbox" title=""/>
                    <input type="password" id="password" name="password"  class="inputbox" title=""/>
                </p>
                 <p class="checkbox_radio">
                    <label>
                    <input type="checkbox" name="remember_me" id="remember_me" <?php if ($remember_me == 1) echo 'checked'; ?>/><span id="lblRememberMe"></span>
                    </label>
                </p>
                <div class="error_msg" >
                  <div class="dialog-message" id="headerLoginFail" title="" style="display:none">
                    <div class="message-box">
                      <div class="message-icons" ></div>
                      <div class="message"></div>
                    </div>
                  </div>
                </div>
                <div class="btn">
                    <div id="client_login" class="radius title client_login" name="client_login"><span class="login-icon">login</span><span id="btnLogin"></span></div>
                </div>
            </form>
        </div><!--loginform-->
    </div><!--loginboxinner-->
    </div>
</div>
</div>
</div>


<<!-- div class="dialog-message" id="headerLoginFail" title="" style="display:none">
 <div class="message-box"><div class="message-icons"></div><div class="message"></div><div id="msg-button"></div></div>
</div> -->

<div id="loadingScreen"></div>
<!--
</body>

</html> -->
