<?php

class Barcode {

/*    var $file_type;
    var $dpi;
    var $thickness;
    var $scale;
    var $font_size;
    var $font_name;

    function __construct()
	{
        $this->__get_data_from_config_file();

	}

    private function __get_data_from_config_file()
    {
        $this->file_type = Yii::app()->params['barcode']['filetype'];
        $this->dpi = Yii::app()->params['barcode']['dpi'];
        $this->thickness = Yii::app()->params['barcode']['thickness'];
        $this->scale = Yii::app()->params['barcode']['scale'];
        $this->font_size = Yii::app()->params['barcode']['font_size'];
        $this->font_name = Yii::app()->params['barcode']['font_name'];
    } */

    function barcode_generate($jan_code=null)
    {
        $file_type = Yii::app()->params['barcode']['file_type'];
        $dpi = Yii::app()->params['barcode']['dpi'];
        $thickness = Yii::app()->params['barcode']['thickness'];
        $scale = Yii::app()->params['barcode']['scale'];
        $font_size = Yii::app()->params['barcode']['font_size'];
        $font_name = Yii::app()->params['barcode']['font_name'];
//         Yii::log("Data: = ".print_r($file_type,true), 'error');

        $barcode_file = Yii::app()->basePath.'/extensions/barcode/class/BCGcode39.barcode.php';
        // Yii::log("Data: = ".print_r($barcode_file,true), 'error');
        $barcode_font = Yii::app()->basePath.'/extensions/barcode/class/BCGFontFile.php' ;
        $barcode_color = Yii::app()->basePath.'/extensions/barcode/class/BCGColor.php' ;
        $barcode_drawing = Yii::app()->basePath.'/extensions/barcode/class/BCGDrawing.php';
        $font_file= Yii::app()->basePath.'/extensions/barcode/font/Arial.ttf';

        if(file_exists($barcode_file))
        {
            require_once $barcode_file;
        } else {
            die("Could not find barcode generation class file");
        }
        if(file_exists($barcode_font))
        {
            require_once $barcode_font;
        } else {
            die("Could not find barcode font class file");
        }
        if(file_exists($barcode_color))
        {
            require_once $barcode_color;
        } else {
            die("Could not find barcode color class file");
        }
        if(file_exists($barcode_drawing))
        {
            require_once $barcode_drawing;
        } else {
            die("Could not find barcode Drawing class file");
        }

        $font = new BCGFontFile($font_file, $font_size);
        $color_black = new BCGColor(0, 0, 0);
        $color_white = new BCGColor(255, 255, 255);

        // Barcode Part
        $code = new BCGcode39();
        $code->setScale($scale);
        $code->setThickness($thickness);
        $code->setForegroundColor($color_black);
        $code->setBackgroundColor($color_white);
        // $code->setFont($font); //To Enable Code on Barcode Image
        $code->setFont(0); // Add By RLS@mi 20140219 to remove code from barcode

//        $jan_code = $this->input->get('jan_code');
        $code->parse($jan_code);
//        $code->parse('578124871412');

        // Drawing Part
        $drawing = new BCGDrawing('', $color_white);
        $drawing->setBarcode($code);
        $drawing->draw();
        header('Content-Type: image/png');
        $drawing->finish(BCGDrawing::IMG_FORMAT_PNG);
    }

}
/* End of file Barcode.php */
/* Location: ./Components/Barcode.php */