<?php

class DataFormatController extends PrivateController {
    public function __construct($arg = NULL)
    {
        parent::__construct($arg);
        // $this->_department_code = 6;
        // $this->_filter_screen_id = 703;
        $this->_controller_name = 'dataFormat';
        $this->_model_name ='dataFormat';
        $this->_table_name = 'yig_data_format';
        $this->_pk_col = 'format_id';
        // $this->_keyword_searchable_fields=array("column_6_1","column_6_2","column_6_20");
        // $this->_creatorParams = array('staff_id_col' => 'user_name','creator' => 'creator');
    }

    public function actionGetDataFormat() {
        $formatList = DataFormat::model()->getFormatList();
        // array_unshift($formatList,array("format_id"=>0,"format_name"=>' '));
        $data = array(
            'success' => TRUE,
            'data' => $formatList
        );
        $this->renderJSON($data);
    }
   
}

