<?php 
/*class created for all page CSV dwnld*/
class AllPageCsv {
    public $callback_obj = null;
    public $callback_func = null;
    function getAllCsvDownload($recordData, $datagrid_id, $prefix, $columns,$_enclosure=null,$_include_column_headers=true,$field_seperator=null) {
        $data = $recordData;
        // $prefix = Yii::app()->request->getParam('prefix', 0);
        // $datagrid_id = isset($_POST['datagrid_id']) ? $_POST['datagrid_id'] : '';
        $labelArray = array();
        $selectColumnsArray = array();
        /*if datagrid_id is not null or column is empty*/
        if(empty($columns)) {
            $i=0;
            $columns = CsvExport::model()->getColumnsListForCsv($datagrid_id);
            foreach ($columns as $column) {
                $labelArray[] = mb_convert_encoding($column['field_label'], 'SJIS-win', 'UTF-8');
                $selectColumnsArray[$i][$column['column_name']] = $column['column_name'];
                if(empty($column['dataFormat'])) {
                    $column['dataFormat']=null;
                }
                if(empty($column['editorxtype'])) {
                    $column['editorxtype']=null;
                }
                if(empty($column['max_length'])) {
                    $column['max_length']=null;
                }
                $selectColumnsArray[$i]['data_format'] = $column['dataFormat'];
                $selectColumnsArray[$i]['max_length'] = $column['max_length'];
                $selectColumnsArray[$i]['editorxtype'] = $column['editorxtype'];
                $i++;
            }
        }
        /*datagrid_id is null or column is not empty*/
        else {
            $i=0;
            foreach ($columns as $column) {
                if(!empty($column['text'])) {
                    $labelArray[] = mb_convert_encoding($column['text'], 'SJIS-win', 'UTF-8');
                    // $labelArray[] = mb_convert_encoding($column['dataIndex'], 'SJIS', 'UTF-8');
                    $selectColumnsArray[$i][$column['dataIndex']] = $column['dataIndex'];
                    if(empty($column['dataFormat'])) {
                        $column['dataFormat']=null;
                    }
                    if(empty($column['editorxtype'])) {
                        $column['editorxtype']=null;
                    }
                    if(empty($column['max_length'])) {
                        $column['max_length']=null;
                    }
                    $selectColumnsArray[$i]['data_format'] = $column['dataFormat'];
                    $selectColumnsArray[$i]['max_length'] = $column['max_length'];
                    $selectColumnsArray[$i]['editorxtype'] = $column['editorxtype'];
                    $i++;
                }
            }
        }
        $date = date('YmdHis');
        $filename = "{$date}.csv";
        // $selectColumnsString = implode(",", $selectColumnsArray);
        $filename = "{$prefix}_{$date}.csv";
        $csvArray = array();
        if (count($data) > 0) {
            foreach ($data as $index=>$row) {
                $temp = array();
                foreach ($selectColumnsArray as $column) {
                    /*gets the first index of the array since it containes column_name at 1st index and data format in 2nd index*/
                    $first_index= current(array_keys($column));
                    if (array_key_exists($first_index, $row)) {
                        // $temp[] = mb_detect_encoding( $row[$column], "auto" );
                        // $temp[] = mb_convert_encoding($row[$column], 'SJIS', 'auto');
                        if(!empty($this->callback_obj) && (!empty($this->trim_callback_func) || !empty($this->callback_func))) {
                            $csvValue = $row[$first_index];
                            if(!empty($this->trim_callback_func)) {
                                $csvValue  = call_user_func(array($this->callback_obj, $this->trim_callback_func),$column,$csvValue);
                            }
                            $csvValue = mb_convert_encoding($csvValue, 'SJIS-win', 'UTF-8');
                            if(!empty($this->callback_func)) {
                                $csvValue  = call_user_func(array($this->callback_obj, $this->callback_func),$column,$csvValue);
                            }
                        } 
                        else {
                            $csvValue = mb_convert_encoding($row[$first_index], 'SJIS-win', 'UTF-8');
                        }
                        $temp[] = $csvValue;
                    }
                }

                $csvArray[] = $temp;
            }
        }
        Yii::import('commonExtension.ECSVExport');
        $csv = new ECSVExport($csvArray);
        $csv->setHeaders($labelArray);
        if(!empty($_enclosure))
            $csv->setEnclosure($_enclosure);
        else
            $csv->setEnclosure(null);
        if(!empty($field_seperator))
            $csv->setDelimiter($field_seperator);
        $csv->includeColumnHeaders = $_include_column_headers;

        header('Content-Type: application/csv; charset=SJIS-win');
        header("Content-Disposition: attachement; filename={$filename}");
        echo $csv->toCSV();
        exit;
    }
}
?>