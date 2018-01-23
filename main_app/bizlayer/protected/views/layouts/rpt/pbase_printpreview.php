<?php
	require_once(Yii::app()->basePath.'/views/layouts/'.RPT_FOLDER.'common_header.php');
	$viewFileName = Yii::app()->request->getParam('type',null);
?>
	<!-- <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/<?php echo RPT_FOLDER.PROJECT_NAME;?>/reset.css" /> -->
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/<?php echo RPT_FOLDER.PROJECT_NAME.'/'.$viewFileName.'.css';?>" />
<?php
	require_once(Yii::app()->basePath.'/views/layouts/'.RPT_FOLDER.'common_main.php');
?>
