<!DOCTYPE html>
<html>
<head>
<?php
        $_dc = DC;
        $_version = SCREEN_FLD_VERSION;
        $_isGuest = Yii::app()->user->isGuest;

        $version_folder = SCREEN_COMPONENT_VERSION_FOLDER;
        $fileName = $version_folder."version";
        $version_screen_arr = json_decode(file_get_contents($fileName), true);

        if(USE_COMPILED_JAVASCRIPT)
            $_dc = SVN_CODE_VERSION;

        $main_url =getMainUrl(false);
        $app_url = $main_url;
        $app_params = Yii::app()->params;

        // $lang = $this->lang;
        $lang = GET_LANG();
        $ext_path = $main_url.$app_params['extjs_path'].$app_params['extjs_version'].'/';
?>
    <script type="text/javascript">
        window.APP_DC = <?php echo $_dc;?>;
        window.APP_LANG = "<?php echo $lang;?>";
    </script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <base href="<?php echo $main_url;?>" />

    <link rel="icon" href="<?php echo $main_url;?>images/ybase-favico.png?_dc=<?php echo $_dc;?>" type="image/x-icon" />
    <link rel="shortcut icon" href="<?php echo $main_url;?>images/ybase-favico.png?_dc=<?php echo $_dc;?>" type="image/x-icon" />


    <!-- customcss -->
    <link rel="stylesheet" type="text/css" href="<?php echo $main_url;?>css/custom.css?_dc=<?php echo $_dc;?>"/>
        <!--css for sprites-->
    <link rel="stylesheet" type="text/css" href="<?php echo $main_url;?>css/icons_b.css?_dc=<?php echo $_dc;?>"/>
    <link rel="stylesheet" type="text/css" href="<?php echo $main_url;?>css/icons_g.css?_dc=<?php echo $_dc;?>"/>
    <link rel="stylesheet" type="text/css" href="<?php echo $main_url;?>css/icons_w.css?_dc=<?php echo $_dc;?>"/>

    <!-- include extjs framework file -->
    <?php
        if(USE_COMPILED_JAVASCRIPT !== true && (!$_isGuest || USE_LOGIN_HTML == false))
        {
    ?>
        <script type="text/javascript" src="<?php echo $ext_path;?>ext-all-debug.js"></script>
    <?php
        }else{
    ?>
        <title><?php echo $app_params['appTitle'];?></title>
    <?php
        }
    ?>

    <?php
        if(!$_isGuest || USE_LOGIN_HTML == false)
        {
    ?>
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/../ext/ux/upload/plupload/js/plupload.js"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/../ext/ux/upload/plupload/js/plupload.html4.js"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/../ext/ux/upload/plupload/js/plupload.html5.js"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/../ext/ux/upload/plupload/js/plupload.flash.js"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/../ext/ux/upload/plupload/js/plupload.silverlight.js"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/app/getUserDataObj?lang=<?php echo $lang;?>"></script> 
        <!-- <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/entryPanel/getEntryFields?lang=<?php echo $lang;?>"></script> -->
        <script type="text/javascript" src="<?php echo $main_url;?>screen_components/entryPanelFormComponents_<?php echo Yii::app()->user->getAttr('userRole').'-'.$lang;?>.js?lang=<?php echo $lang;?>&amp;_dc=<?php echo $version_screen_arr['entryPanelFormComponents'];?>"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>screen_components/purchaseEntryPanelFormComponents_<?php echo Yii::app()->user->getAttr('userRole').'-'.$lang;?>.js?lang=<?php echo $lang;?>&amp;_dc=<?php echo $version_screen_arr['purchaseEntryPanelFormComponents'];?>"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>screen_components/transferEntryPanelFormComponents_<?php echo Yii::app()->user->getAttr('userRole').'-'.$lang;?>.js?lang=<?php echo $lang;?>&amp;_dc=<?php echo $version_screen_arr['transferEntryPanelFormComponents'];?>"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>screen_components/serviceEntryPanelFormComponents_<?php echo Yii::app()->user->getAttr('userRole').'-'.$lang;?>.js?lang=<?php echo $lang;?>&amp;_dc=<?php echo $version_screen_arr['serviceEntryPanelFormComponents'];?>"></script>
        <script type="text/javascript" src="<?php echo $main_url;?>screen_components/repairEntryPanelFormComponents_<?php echo Yii::app()->user->getAttr('userRole').'-'.$lang;?>.js?lang=<?php echo $lang;?>&amp;_dc=<?php echo $version_screen_arr['repairEntryPanelFormComponents'];?>"></script>
        
        <script type="text/javascript" src="<?php echo $main_url;?>bizlayer/file/getFileStatus?lang=<?php echo $lang;?>"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo $main_url;?>/ext/ux/css/ClearButton.css?_dc=<?php echo $_dc;?>"/>
    <?php
        }
    ?>

    <?php
        if(USE_COMPILED_JAVASCRIPT !== true)
        {
    ?>
        <title><?php echo $app_params['appTitle'];?></title>
    <?php
        }
    ?>
</head>
<body class="login">
    <?php
        if(!$_isGuest || USE_LOGIN_HTML == false)
        {
    ?>
        <div id="app_info" app_url="<?php echo $app_url;?>" style="display:none;"></div>
        <script type="text/javascript">
            var app_info = document.getElementById('app_info').attributes;
            Ext.APP_URL = app_info['app_url'].value;
        </script>
    <?php
        }
    ?>
    <?php echo $content;?>
</body>
</html>