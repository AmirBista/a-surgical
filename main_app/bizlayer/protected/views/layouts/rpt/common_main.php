</head>

<body>
	<div class="print_record">
		<a href="javascript:void(0)" class="printReport" onclick="print_preview(); return false;" title="Print"><?php echo 'Print Report'; ?></a>
		<!--<a href="javascript:void(0)" class="pdfdownload" adminUrl="<?php echo Yii::app()->request->baseUrl;?>/" csvFileName="<?php echo isset($_REQUEST['csvFileName'])?$_REQUEST['csvFileName']:null;?>" type="<?php echo $_REQUEST['type'];?>" project="<?php echo PROJECT_NAME;?>" title="Pdf"><?php echo 'Download Pdf'; ?></a>
		 <a href="javascript:void(0)" class="htmldownload" adminUrl="<?php echo Yii::app()->request->baseUrl;?>/" csvFileName="<?php echo isset($_REQUEST['csvFileName'])?$_REQUEST['csvFileName']:null;?>" type="<?php echo $_REQUEST['type'];?>" project="<?php echo PROJECT_NAME;?>" title="Html"><?php echo 'Download Html'; ?></a>
		<a href="javascript:void(0)" class="email" adminUrl="<?php echo Yii::app()->request->baseUrl;?>/" csvFileName="<?php echo isset($_REQUEST['csvFileName'])?$_REQUEST['csvFileName']:null;?>" type="<?php echo $_REQUEST['type'];?>" project="<?php echo PROJECT_NAME;?>" title="Email"><?php echo 'Emil'; ?></a> -->
	</div>
	<div class="loading_div"><span></span></div>

    <?php
		$this->renderPartial('//layouts/'.RPT_FOLDER.'email_form',array('type'=>$_REQUEST['type']));
    	echo $content;
    ?>
    <?php
    	Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl.'/js/'.RPT_FOLDER.'export_report.js',CClientScript::POS_END);
    	Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl.'/js/'.RPT_FOLDER.'email_report.js',CClientScript::POS_END);
    ?>
</body>
</html>