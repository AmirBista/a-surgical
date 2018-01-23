<?php header("Content-type: text/css"); 
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
.login { background:#ccc; }
h1 { font-size: 24px; }
/*.loginbox { padding: 10px; width: 495px; margin: 15% auto 0 auto; position: relative; }*/
.loginboxinner { 
	background: #fff; position: relative;float: left;width: 500px; 
	font: normal 13px/17px ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,メイリオ,Meiryo,Osaka,ＭＳ Ｐゴシック,MS PGothic,sans-serif;
	
}
.loginheader { height: 40px; }
.loginform { margin-top: 20px; }
.client_login{width: 85px;}
.loginbox h1 { font-size: 30px; letter-spacing: 1px; color: #555; font-weight: normal; padding-top: 10px; }
.logo img { height:60px; width:60px; }
.loginbox p { margin: 5px 0 5px 0; }

.loginbox input.inputbox { 
	padding: 4px 6px; color: #000; 
	font-family: Arial, Helvetica, sans-serif; margin-top: 8px; font-size: 15px; border: 0; width: 95%; border:1px solid #ccc; 
}
.loginbox .client_login { 
	background: #f8759d; padding: 5px; font-size: 12px; border: 0; color: #333; width: 75px; margin-top: 25px;
	cursor: pointer;
}
	
.loginbox .client_login span{
	float: left;
	color:#fff;
}
.loginbox .client_login span.login-icon{background: url(../../../images/login.png<?=$cache_svn?>) no-repeat;
	float: left;
	margin-right: 5px;
	text-indent: -99999px;
	width: 16px;
	height: 16px;
}

.loginerror { color: #990000; background: #fbe3e3; padding: 0 10px; overflow: hidden; display: none; }
.loginerror { -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px; }
.loginerror p { margin: 10px 0; }
.login-form-container{width: 269px; float: left; padding: 3px 8px;}
.title { font-family: 'BebasNeueRegular', Arial, Helvetica, sans-serif; float: right; }
.login-container{float: left; width: 210px; background: url(../../../images/30-40-LoginLOGO.png<?=$cache_svn?>) no-repeat; height: 220px;}
.ui-tooltip {
	padding: 5px;
	position: absolute;
	z-index: 9999;
	max-width: 300px;
	border-radius: 3px;
}
.title-cls{
	font-size: 14px;
	color: #DB161A;
	text-align: center;
	margin-top: 10px;
}
.ui-widget-content {
	border: 5px solid #f8759d;
	background: #f5f5f5;
	color: #222222;
	padding: 0px;
}
.redbg{
	border: 1px solid red !important;
}
.message-icons{
	width: 32px;
	height: 32px;
	float: left;
	background: url(../../../images/icon-error.png<?=$cache_svn?>) no-repeat; 
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
    /*background: url(../images/loading.gif<?=$cache_svn?>) no-repeat 5px 8px;*/
    padding: 1.3em 1.3em !important;
}
.noclose .ui-dialog-titlebar-close,.noclose .ui-dialog-titlebar
{
    display:none;
}
.noclose .ui-dialog-titlebar{
    padding:0;
}