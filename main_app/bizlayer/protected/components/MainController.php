<?php
/*
 * all functions which do not require user login
*/
class MainController extends Controller {
	//
	public $layout='//layouts/ybase';
	public $lang='ja';

    protected function isMultidimensionalArray($arr) {
		$rv = array_filter($arr, 'is_array');
		if (count($rv) > 0) {
			return true;
		}
		return false;
	}

    protected function convertToMultidimArray($arr) {
        $multiDimArr = array();
         if ($this->isMultidimensionalArray($arr) === false) {
            $temp = array();
            $temp[] = $arr;
            $multiDimArr = $temp;
         }
         else
         {
            $multiDimArr = $arr;
         }

        return $multiDimArr;
    }


	/**
	 * Encode the given array into JSON Format
	 * @param array $data
	 * @return none
	 */
    protected function renderJSON($data) {
        header('Content-Type: application/json; charset=utf-8');
        echo CJSON::encode($data);
        Yii::app()->end();
    }

    /**
     * just a replacement of die()...handles utf8 encoding
     * @param <type> $message
     */
    protected function killSoftly($message='') {
        ob_start();
        header('Content-Type: text/html; charset=utf-8');
        echo $message;
        ob_end_flush();
        exit;
    }

    protected function getSNo($code) {
        $sql =  "select generate_serialno('$code')";
        $cmd = Yii::app()->db->createCommand($sql);
        $sno = $cmd->queryScalar();
        return $sno;
    }

}