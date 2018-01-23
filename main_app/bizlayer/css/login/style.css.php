<?php
	header("Content-type: text/css");
	$cache_svn ="?_dc=1526";
?>

html, body, div, span,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend {
	background: transparent;
	border: 0;
	margin: 0;
	padding: 0;
	vertical-align: baseline;
}
.login { background:#fff; }
h1 { font-size: 24px; }
/*.loginbox { padding: 10px; width: 495px; margin: 15% auto 0 auto; position: relative; }*/
.top-header{
	height: 410px;
background: rgb(53, 151, 211);
}


body:before{
	background: #157fcc;
	content: "";
	height: 490px;
	width: 100%;
	min-width: 960px;
	position: absolute;
	z-index: -1;
	padding: 0;
}

@media all and (max-width:  1366px){
		 body:before{
					height: 320px !important;
		}
}

.outer-login-container{
	background: rgba(187, 187, 187, 0.7);
	float: left;
	width: 470px;
	padding: 12px; 
	border-radius:10px;
}

.jrqss_tracker_logo{
	text-align:center;
	margin-top:25px;
}

p.login-input{
	 text-align:center;
	 position:relative;
}

.loginboxinner { 
	background: rgb(229, 229, 229);
	 position: relative;
	 float: left;
	 width: 470px;
	 border-radius:7px;
	font: normal 13px/17px ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,メイリオ,Meiryo,Osaka,ＭＳ Ｐゴシック,MS PGothic,sans-serif;
}
.loginheader { height: 40px; }
.loginform { margin-top: 20px; }
.client_login{width: 85px;}
.loginbox h1 { font-size: 30px; letter-spacing: 1px; color: #555; font-weight: normal; padding-top: 10px; }
.logo img { height:60px; width:60px; }
.loginbox p { margin: 10px 0 5px 0; }

.loginbox input.inputbox { 
	padding: 00 6px 0px 12%;
	color: #838383;
	font-family: ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,メイリオ,Meiryo,Osaka,ＭＳ Ｐゴシック,MS PGothic,sans-serif;
	margin-top: 8px;
	font-size: 15px;
	border: 0;
	width: 77%;
	border-radius: 5px;
	border: 2px solid #838383;
	height: 46px; 
}
.loginbox input.inputbox:focus{
    border:2px solid #28b7ed;
}
.username-ico:after{
	background: url(images/login-ico.png) no-repeat;
	content: "";
	height:30px;
	width: 30px;	
	position: absolute;
	top: 17px;
	left:32px;
	z-index: 1;
	padding: 0 5px 0 0;
	border-right:1px solid #e1e1e1;
}

input:focus, textarea:focus {
    outline: none;
}
.password-ico:after{
	background: url(images/password_icon.png) no-repeat;
	content: "";
	height:30px;
	width: 30px;	
	position: absolute;
	top: 17px;
	left:32px;
	z-index: 1;
	padding: 0 5px 0 0;
	border-right:1px solid #e1e1e1;
}
.loginbox .client_login { 
	font-family: ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,メイリオ,Meiryo,Osaka,ＭＳ Ｐゴシック,MS PGothic,sans-serif;
	/* IE10+ */ 
background-image: -ms-linear-gradient(bottom, #E70E0E 0%, #FF0C0C 100%);

/* Mozilla Firefox */ 
background-image: -moz-linear-gradient(bottom, #E70E0E 0%, #FF0C0C 100%);

/* Opera */ 
background-image: -o-linear-gradient(bottom, #E70E0E 0%, #FF0C0C 100%);

/* Webkit (Safari/Chrome 10) */ 
background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #E70E0E), color-stop(100, #FF0C0C));

/* Webkit (Chrome 11+) */ 
background-image: -webkit-linear-gradient(bottom, #E70E0E 0%, #FF0C0C 100%);

/* W3C Markup */ 
background-image: linear-gradient(to top, #E70E0E 0%, #FF0C0C 100%);
	text-align: center;
border-radius: 3px;
margin:0px 4.5% 25px 0;
padding:8px;
width:90px;
}

.loginbox .client_login:hover { 
	/* IE10+ */ 
background-image: -ms-linear-gradient(top, #e70e0e 0%, #FF0C0C 100%);

/* Mozilla Firefox */ 
background-image: -moz-linear-gradient(top, #e70e0e 0%, #FF0C0C 100%);

/* Opera */ 
background-image: -o-linear-gradient(top, #e70e0e 0%, #FF0C0C 100%);

/* Webkit (Safari/Chrome 10) */ 
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #e70e0e), color-stop(100, #FF0C0C));

/* Webkit (Chrome 11+) */ 
background-image: -webkit-linear-gradient(top, #e70e0e 0%, #FF0C0C 100%);

/* W3C Markup */ 
background-image: linear-gradient(to bottom, #e70e0e 0%, #FF0C0C 100%);;
	-webkit-transition: all .45s; 
	-ms-transition: all .45s; 
	transition: all .45s; 
}

.rememberMelbl{
	color: #349800;	
}	

.loginbox .client_login span{
	float: none;
	color: #fff;
	text-align: center;
}
.loginbox .client_login span.login-icon{background: url(../../../images/login.png<?php echo $cache_svn?>) no-repeat;
	float: left;
	margin-right: 5px;
	text-indent: -99999px;
	width: 16px;
	height: 16px;
}

.loginerror { color: #990000; background: #fbe3e3; padding: 0 10px; overflow: hidden; display: none; }
.loginerror { -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px; }
.loginerror p { margin: 10px 0; }
.login-form-container{width: 450px; float: left; padding: 10px;}
.title { font-family: 'BebasNeueRegular', Arial, Helvetica, sans-serif; float: right; }
.login-container{float: left; width: 210px; background: url(../../../images/LoginLOGO.png<?php echo $cache_svn?>) no-repeat; height: 220px;}
.ui-tooltip {
	padding: 5px;
	position: absolute;
	z-index: 9999;
	max-width: 300px;
	border-radius: 3px;
}
.title-cls{
	font-size: 14px;
	color: #FFFFFF;
	text-align: center;
	margin-top: 10px;
}
.ui-widget-content {
	border: 8px solid  #157fcc;
	background: #f5f5f5;
	color: #222222;
	padding: 0px;
	border-radius:10px;
}
.redbg{
	border: 2px solid #E70E0E!important;
}
.message-icons{
	width: 32px;
	height: 32px;
	float: left;
	background: url(../../../images/icon-error.png<?php echo $cache_svn?>) no-repeat; 
    margin: 10px 0 5px 0px;
}
.message{
	font-size: 13px;
	width: auto;
	margin: 10px 15px;
	float: left;
}
@media screen and (max-width: 430px) {
	
	body { font-size: 11px; }
	button, input, select, textarea { font-size: 11px; }
	
	.loginbox { width: auto; margin: 10px; }
	.loginbox input { width: 95%; }
	.loginbox button { width: 100%; }
}	
.hideme{
	display: none;
} 

.custom_dialog .ui-dialog-title{
    _width: 100%;
    _background: #f8759d;
    _padding:5px;
    _margin: -1px 0 0 -1px;
}
.custom_dialog  .ui-dialog-titlebar{
	_padding: 0;
}
.custom_dialog  .ui-dialog-buttonset{
	_margin: 0px 0 0 50px!important;
}
.custom_dialog  .ui-button-text{
	*text-indent: 0;
}
.custom_dialog .ui-button-icon-primary{
	*margin-left: -2px;
}

#loadingScreen {
    /*background: url(../images/loading.gif<?php echo $cache_svn?>) no-repeat 5px 8px;*/
    padding: 1.3em 1.3em !important;
}
.noclose .ui-dialog-titlebar-close,.noclose .ui-dialog-titlebar
{
    display:none;
}
.noclose .ui-dialog-titlebar{
    padding:0;
}