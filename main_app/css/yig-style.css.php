<?php header("Content-type: text/css");
ob_start();
require_once(dirname(__FILE__).'/../bizlayer/protected/config/constants.php');
$css_dc= "_dc=".DC;
if(USE_COMPILED_JAVASCRIPT === true) $css_dc = SVN_CODE_VERSION;
?> @charset "UTF-8";
body, .x-body, .x-btn-default-small .x-btn-inner, .x-btn-default-medium .x-btn-inner, .x-btn-default-large .x-btn-inner, .x-btn-default-toolbar-small .x-btn-inner, .x-grid-row .x-grid-cell, .x-btn-default-toolbar-medium .x-btn-inner, .x-btn-default-toolbar-large .x-btn-inner, .x-panel-header-text-default, .x-panel-header-text-default-framed, .x-toolbar .x-toolbar-text, .x-window-header-text-default, .x-tab button,.x-column-header-text,.x-grid-row .x-grid-cell {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo,Osaka", "ＭＳ Ｐゴシック", "MS PGothic", "sans-serif"!important;
    font-size: 14px!important;
}

.x-panel-body-default {
    background: #fff;
}
.x-btn-default-small .x-btn-inner{
    font-size: 14px!important
}
.x-grid-row-over .x-grid-cell, .x-grid-row-over .x-grid-rowwrap-div, .x-grid-row-selected .x-grid-cell, .x-grid-row-selected .x-grid-cell-special {
    background: #b8daff!important;
}

.x-grid-with-row-lines .x-grid-cell-inner {
    padding: 2px 6px;
}

.x-column-header-inner .x-column-header-text {
    font-weight: bold;
    font-size: 13px;
}

.x-border-box .x-grid-editor .x-form-text, .x-border-box .x-grid-row-editor .x-form-text, .x-border-box .x-grid-editor .x-form-trigger, .x-border-box .x-grid-row-editor .x-form-trigger {
    height: 21px;
    font-weight: bold;
    font-size: 12px;
}

.des-textarea textarea.x-form-field {
    height: 50px!important;
    margin-top: 10px;
}

.ec_image {
    height: 16px;
    width: 16px;
    margin-top: 4px;
}

.x-grid-header-ct .x-form-text, textarea.x-form-field {
    border-bottom: 0px;
}

.x-btn-default-small,.x-btn-default-toolbar-small {
    border-radius: 0px!important;
}

.x-toolbar-default {
    background: #D9D8D8;
}

.x-column-header,.x-grid-header-ct {
    background: #d5d5d5 !important;
}

.x-column-header-over, .x-column-header-sort-ASC, .x-column-header-sort-DESC {
    background: #C4C4C4 !important;
}

.x-column-header-inner {
    padding: 6px 6px 4px!important;
}

.x-grid-header-ct {
    border-bottom: 5px solid #D7D7D7!important;
}

.x-btn-default-small,.x-btn-default-toolbar-small {
    border-radius: 0px!important;
}

.x-btn-default-small, .x-btn-default-toolbar-small {
    padding: 6px 5px;
    <!-- border: 1px solid #999; -->
}

.x-btn-default-small-icon-text-left button, .x-btn-default-small-icon-text-left a {
    height: 17px !important;
}

.x-btn-default-toolbar-small {
    padding: 1px;
}

.x-btn-default-small-over, .x-btn-default-toolbar-small-over {
    background: #73D9DA!important;
    border: 1px solid #fff!important;
}

.x-menu-item-icon {
    margin-top: 3px;
}

.x-btn-default-toolbar-small {
    border: 1px solid #999;
}
.x-menu-item-link{
    padding: 10px 2px 10px 32px!important;
    line-height: 11px!important;
}
.x-menu-item-active .x-menu-item-link {
    border-radius: 0px !important;
    background: #b8daff!important;
}

.top-drop-menu .x-menu-body .x-menu-item-active .x-menu-item-link , .action-drop-menu .x-menu-body .x-menu-item-active .x-menu-item-link{
    background: transparent!important;
    border: 1px solid #FFFFFF;
}

.profiletable tr:nth-of-type(odd), .x-table-layout tr:nth-of-type(odd) {
    background: #fff;
}

.profiletable tr:nth-of-type(even), .x-table-layout tr:nth-of-type(even) {
    background: #EEEEEE;
}

.x-table-layout tr table tr {
    background: none!important;
}

td.x-table-layout-cell {
    background: #fff;
}

.panel-title {
    font-size: 18px;
    margin-left: 25px;
    font-weight: bold;
    color: #0243D3;
}

.x-column-header-checkbox .x-column-header-text {
    margin: 0 0 0 -2px;
}

.x-window-header-default-top {
    background: #E6E6E6;
}

.x-form-field-focus, input[type="text"]:focus {
    background: #9BD3EE;
}

.x-grid-header-ct-default input[type="text"]:focus {
    background: #91ff99!important;
}

.x-message-box .x-window-body {
    background: #fff!important;
}

.x-window-header-text-default {
    color: #333;
    /*text-shadow:0px 1px 0px #fff;
    -moz-text-shadow:0px 1px 0px #fff;
    -o-text-shadow:0px 1px 0px #fff;
    -webkit-text-shadow:0px 1px 0px #fff;
    -ms-text-shadow:0px 1px 0px #fff;*/
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    font-weight: bold;
    padding-left: 5px;
}

.x-window-header-default-top, .x-window-default,.x-tab-default-top {
    box-shadow: none !important;
    border-radius: 0px!important;
}

.member-code-link {
    color: #000;
    cursor: pointer;
    padding: 1px;
    text-decoration: underline;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    -o-border-radius: 3px;
    -ms-border-radius: 3px;
}

.member-code-link:hover {
    color: #0000FF;
    text-decoration: underline;
    cursor: pointer;
}

.x-window-header-default-top, .x-window-default {
    box-shadow: none !important;
}

.logo-name {
    color: #fff;
    font-size: 18px;
    float: left;
    margin: 2px 0 0 5px;
}

.x-message-box .x-docked-top {
    border-bottom-width: 0!important;
}

.btn-margin {
    margin-bottom: 5px!important;
    background: #E7E7E7!important;
    border: 1px solid #6B9B38!important;
    color: #1a3e66;
    font: normal 11px/1 "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
    padding: 3px;
    text-align: center;
}

.search-tab,.search-tab .x-panel-body-default {
    border: none!important;
}

.btn-margin:hover {
    background: #00DCDE!important;
    border: 1px solid #40AAA5!important;
}

x-window-default {
    background: #e3e4e5;
 /* Old browsers */
    background: -moz-linear-gradient(top,  #e3e4e5 0%, #e5ebee 34%, #f5f7f9 100%);
 /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e3e4e5), color-stop(34%,#e5ebee), color-stop(100%,#f5f7f9));
 /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  #e3e4e5 0%,#e5ebee 34%,#f5f7f9 100%);
 /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  #e3e4e5 0%,#e5ebee 34%,#f5f7f9 100%);
 /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  #e3e4e5 0%,#e5ebee 34%,#f5f7f9 100%);
 /* IE10+ */
    background: linear-gradient(to bottom,  #e3e4e5 0%,#e5ebee 34%,#f5f7f9 100%);
 /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e3e4e5', endColorstr='#f5f7f9',GradientType=0 );
 /* IE6-9 */
    border-color: #919191 !important;
}

.x-grid-with-row-lines .x-grid-cell {
    border-bottom: 1px solid #ccc;
    border-top-color: transparent!important;
}

.x-window-body {
}

.copyright-label {
    color: #000000;
    font-weight: bold;
}

#topContainer {
    background: #326201;
}

.x-autocontainer-form-item, .x-anchor-form-item, .x-vbox-form-item, .x-checkboxgroup-form-item, .x-table-form-item {
    margin-bottom: 0px!important;
}

.x-tab-bar {
}

.x-tab-bar-top .x-tab-bar-body {
    border: 0px!important;
    height: 32px!important;
    margin-top: 5px;
}

.x-border-box .x-tab-default-top {
    height: 32px!important;
}

.x-tab-default-top {
    background: #A3A3A3!important;
    box-shadow: none!important;
    border-radius: 0px!important;
}

.x-border-box .x-tab-bar-top .x-tab-bar-strip {
    border: 0px!important;
    height: 0px!important;
    top: 31px!important;
}

.x-tab button {
    color: #000;
}

.x-tab-active button {
    color: #000;
}

.x-tab-default-top-active {
    background: #FFF!important;
    border: 1px solid #4b9add!important;
    border-radius: 0px!important

    box-shadow:none!important;
}

.x-box-scroller-left, .x-toolbar-scroll-left, .x-box-scroller-left .x-tabbar-scroll-left {
    height: 32px!important;
}

.x-box-scroller-right, .x-toolbar-scroll-right, .x-box-scroller-right .x-tabbar-scroll-right {
    height: 32px!important;
}
/*for a table
.x-grid-row-alt .x-grid-cell, .x-grid-row-alt .x-grid-rowwrap-div{background:rgba(0,255,0,0.30)!important;}
.x-grid-row.x-grid-row-over,  .x-grid-cell-selected{background:rgba(0,255,0,0.60)!important;}
.x-grid-row-alt{background:#fff!important;}
.x-grid-row .x-grid-row-over:hover{background:#fff!important;}*/
.x-tab-icon {
    position: absolute;
    display: block!important;
    background-repeat: no-repeat;
    width: 16px;
    height: auto;
    top: 5px!important;
    left: 0;
    bottom: 0;
    right: auto;
    cursor: pointer;
}

.x-tab-inner {
    height: 16px;
    line-height: 16px;
    padding-left: 20px;
}

.x-form-invalid-field .x-grid-cell-inner {
    background: #FF4848;
    color: #fff;
}
/*css by digesh 2013/06/05*/
.btn-bg {
    background: #6B9B38!important;
    border: 1px solid #6B9B38!important
}
.btn-bg:hover{border:1px solid #FFFFFF!important}
.btnproduct {
    background: #0078D7!important;
    border:1px solid #0078D7!important
}

.btnproduct:hover {
border: 1px solid #1A6CB8!important;
background: #427FB3!important;
}

.btnproduct.x-item-disabled:hover {
    border: 1px solid #999!important;
}

.btnproduct span.x-btn-inner:hover {
    color: #fff!important;
}

.btnproduct .x-btn-inner,.btn-bg .x-btn-inner {
    color: #fff!important;
}

.x-form-checkbox , .x-grid-row-checker , .x-column-header-text {
    cursor: pointer;
    margin-left: 0px;
}

.x-grid-cell {
    vertical-align: middle;
}

table.profiletable {
    border: 1px solid #d0d0d0;
    float: left;
    color: #6c6c6c;
    width: 100%;
}

table.profiletable tr th {
    border: 1px solid #d0d0d0!important;
}

table.profiletable tr td {
    border: 1px solid #d0d0d0!important;
}

.x-grid-row-alt .x-grid-cell, .x-grid-row-alt .x-grid-rowwrap-div {
    background-color: #E9F3FC;
}

.btn-container {
    background: #fff;
}

.x-grid-row-expander {
    top: 2px;
    position: absolute!important;
    cursor: pointer;
}

.x-grid-rowwrap-div {
    position: relative;
}

.payment-inner-grid .x-grid-row-focused .x-grid-cell, .payment-inner-grid .x-grid-row-focused .x-grid-rowwrap-div {
    background: #ccc!important;
    border: 1px solid #999!important;
}

.payment-inner-grid .x-grid-with-row-lines .x-grid-cell {
    background: #000!imporant;
}

.border-bottom .x-box-inner {
    border-bottom: 2px solid #fff;
}
 /*css for bulk update panel*/
.bulk-panel-top {
    border-bottom: 1px solid #ccc;
}

.bulk-panel-down {
    border-top: 1px solid #999;
}

.payment-inner-grid {
    margin-left: 80px!important;
}

.payment-inner-grid .x-panel-body-default {
    border: 1px solid #999!important;
}

.action_remove.ismappedsquare {
    width: 8px;
    height: 8px;
    background: #000;
}

.x-tab-bar,.x-horizontal-box-overflow-body,.x-panel-header-default {
    background: #7E7E7E!important;
    box-shadow: none!important;
}

.x-panel-header-text-container {
    background: #7E7E7E!important;
}

.x-panel-header-text-default {
    color: #fff;
}

.img-style {
    height: 100%;
    width: 100%;
    position: relative;
}

.stock_img {
    width: 80px;
    height: 80px;
    float: left;
    position: relative;
}

.stock_img img {
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

.img-style img {
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    <!--margin: auto;-->
}

.dashoadNote {
    background: #f0f0f0;
 /* Old browsers */
    background: -moz-linear-gradient(top, #f0f0f0 0%, #ffffff 5%);
 /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f0f0f0), color-stop(5%,#ffffff));
 /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top, #f0f0f0 0%,#ffffff 5%);
 /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top, #f0f0f0 0%,#ffffff 5%);
 /* Opera 11.10+ */
    background: -ms-linear-gradient(top, #f0f0f0 0%,#ffffff 5%);
 /* IE10+ */
    background: linear-gradient(to bottom, #f0f0f0 0%,#ffffff 5%);
 /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f0f0', endColorstr='#ffffff',GradientType=0 );
 /* IE6-9 */
    -webkit-background-size: 100% 30px;
    -moz-background-size: 100% 30px;
    -ms-background-size: 100% 30px;
    background-size: 100% 30px;
    border-right: 5px solid #ccc;
    border-left: 5px solid #ccc;
}

.message-list {
    border-right: 5px solid #ccc;
}

.dashoadNote textarea {
    background: transparent!important;
    line-height: 30px!important;
    padding: 0 10px;
    border-left: 1px solid red;
    border-right: none;
    border-top: none;
    border-bottom: none;
    margin-left: 3%;
    width: 97%!important;
}

.color-panel, .size-panel {
    border-bottom: 1px solid #ccc;
    overflow: hidden;
}

.date-container {
    color: #FFF;
}

.non-editable-cell {
    background: #F1F1F1!important;
}

.color-box,.size-box {
    float: left;
    margin: 6px 0 0 0px;
}

.color-item, .size-item {
    width: auto;
    height: 18px;
    float: left;
    border: 1px solid #ccc;
    background: #F5F5F5;
    padding: 2px;
    line-height: 14px;
    margin: 0 3px;
    text-align: center;
}

.panel-help-text,.save-help-text {
    color: #368EE0;
    margin-top: 2px!important;
    font-size: 14px;
}

.panel-help-text {
    font-weight: bold;
    overflow: hidden;
}

.wbase-login {
    background: url(../images/wbase-login.png?<?php echo $css_dc;?>) no-repeat center!important;
    height: 30px;
    float: left;
}

.Multi-Upload img {
    background: url(../images/upload.png?<?php echo $css_dc;?>) no-repeat center!important;
}

.btn-bg .x-btn-arrow {
    background: url(../images/arrow.png?<?php echo $css_dc;?>) no-repeat right!important;
    display: block;
    padding-right: 20px!important;
}

.MultiImage-item ul li {
    display: inline;
}

.x-grid-cell-selected {
    background: #b8daff!important;
}

.MultiImage-container {
    width: 80px;
    height: 80px;
    position: relative;
    float: left;
    border: 1px solid #ccc;
    margin: 2px;
}

.MultiImage-container img {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
}

.x-grid-editor .x-form-text {
    font-size: 12px;
}

.MultiImage-item {
    float: left;
    padding: 5px 0;
}

#bodyTab-body {
    border: none;
}

.x-tab-close-btn {
    background: url(../images/close.png?<?php echo $css_dc;?>) no-repeat right!important;
}

.plugin-window .x-grid-with-row-lines .x-grid-cell-inner {
    padding: 5px!important;
    line-height: 20px;
    margin-top: 5px;
}

.plugin-window .x-horizontal-box-overflow-body {
    background: transparent!important;
}

.imageboxcnt {
    background: #E2E2E2;
}

.small-container .x-panel-body-default {
    border: none!important;
}

.plugin-button {
    float: right;
    margin-right: 5px;
}

.mi-image-upload-btn {
    width: 30px;
    height: 19px;
    left: 25px;
    top: 0;
    padding-top: 2px;
}

#dragload {
    width: 253px;
    height: 165px;
    background: #BBBBBB;
    padding: 5px;
    text-align: center;
    <!-- margin: 0 0 20px 0;
    -->;
}

.label-product .x-form-item-label {
    font-weight: bold;
}

.child-container textarea {
    height: 50px;
    margin-top: 10px;
}

.btn_row_memo {
    float: right;
    background: url(../images/yig-memo.png?<?php echo $css_dc;?>) no-repeat center;
    height: 16px;
    width: 18px;
    cursor: pointer;
}
.btnproduct .x-btn-arrow{
    background-image: url(../images/arrow.png?<?php echo $css_dc;?>);
}
.btnproduct .x-btn-arrow-right{
    padding-right: 15px;
}
.memo-record {
    float: left;
    width: 65%;
    text-align: left;
    overflow: hidden;
}
.autoSave label.x-form-cb-label {
color: #FC0404;
font-weight: bold;
}
.yig-help-b{
  background: url(../images/help-b.png?<?php echo $css_dc;?>) no-repeat ;
  height:16px;
  width:16px;
}
.top-drop-menu .x-menu-body {
    background: #6B9B38!important
}
.top-drop-menu .x-menu-body .x-menu-item-text,.action-drop-menu .x-menu-item-text{
    color: #fff;
    font-size: 14px;
}
.action-drop-menu .x-menu-body{
    background: #4b9add!important
}
//for copy paste grid
.x-grid3-focus {
    left: 0px !important;
}
.btn-bg .x-btn-left, .btn-bg .x-btn-inner {
    width: auto !important;
}
.x-panel-collapsed .x-window-header-default, .x-panel-collapsed .x-panel-header-default {
  border-color: #7E7E7E!important;
}
<?php ob_end_flush();
?>