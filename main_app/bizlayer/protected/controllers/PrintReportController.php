<?php

class PrintReportController extends Controller
{
	var $csvFileFullPath 		= NULL;
	var $templateFileName 		= NULL;
	var $templateFileFullPath 	= NULL;

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */

	public function actionIndex() {
		die("System Error! Unauthorized Access.");
	}

	/*
	* inputs
		$csvFileName: name of CSV file for DATA input
		$template: number for DATA Rendering
	* output
		will generate a HTML file for Print Purpose
	* Usage
		/printReport/getReport?csvFileName=csv_report.csv&template=1
	*/
	public function actionGetReport($csvFileName=NULL, $template=NULL) {
		// prepare template file name as per req. template number

		list($templateFileName,$get_view_path) = $this->getTemplateViewPath($template);
		list($templateData,$count_bills) = ReadCsvData::getCsvData($csvFileName,$template,$get_view_path);
		$this->renderPartial("previewPrint",
			array(
				'templateData' 		=> $templateData,
				'templateFileName' 	=> $templateFileName,
				'count_bills' 		=> $count_bills,
				'action' 			=> "previewPrint",
				'template' 			=> $template,
				'csvFilename'		=> $csvFileName
			)
		);
	}

	public function actionPreviewExportHtml($csvFileName=NULL, $template=NULL) {
		list($templateFileName,$get_view_path) = $this->getTemplateViewPath($template);
		list($templateData,$count_bills) = ReadCsvData::getCsvData($csvFileName,$template,$get_view_path);
		$this->renderPartial("previewExportHtml",
			array(
				'templateData' 		=> $templateData,
				'templateFileName' 	=> $templateFileName,
				'count_bills' 		=> $count_bills,
				'save_html'			=> false,
				'action' 			=> "previewExportHtml",
				'template' 			=> $template
			)
		);
	}

	public function actionHtmlSave($csvFileName=NULL, $template=NULL){
		list($templateFileName,$get_view_path) = $this->getTemplateViewPath($template);
		list($templateData,$count_bills) = ReadCsvData::getCsvData($csvFileName,$template,$get_view_path);
		$this->renderPartial('saveAsHtml', array(
				'templateData' 		=> $templateData,
				'templateFileName' 	=> $templateFileName,
				'count_bills' 		=> $count_bills,
				'save_html'			=> true,
				'action' 			=> "saveAsHtml",
				'template' 			=> $template
			));
	}

	public function getTemplateViewPath($template){
		if(intval($template)>0) {
			$templateFileName = TEMPLATE_FILENAME_SUFFIX.$template;
		} else {
			Yii::log("Invalid / Empty Template Requested.", 'error');
			die("System Error! Invalid / Empty Template Requested.");
		}
		$get_view_path = $this->getViewPath().DS.$templateFileName.".php";
		return array($templateFileName,$get_view_path);
	}
}
// PrintReportController.php
// ../protected/controllers/PrintReportController.php