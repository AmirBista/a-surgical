<?php
class SysFieldOptionDataUtil
{
    
    public function getDiscountInfo($field_option_id){
        $sql = "SELECT field_option_id,code,name,option_1 as column_name,option_2 as rate
                FROM sys_field_option_data AS fd
                WHERE field_option_id =:field_option_id
                AND (delete_flg = 0 OR delete_flg IS NULL) 
                ORDER BY display_order";

        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':field_option_id', $field_option_id, PDO::PARAM_STR);  
        $data = $command->queryAll();
        return $data;
    }

    public function getDiscountMapper($field_option_id){
        $records = $this->getDiscountInfo($field_option_id);
        $mapperArr = array();
        foreach ($records as $row) {
            $mapperArr[$row['column_name']] = $row;
        }
        return $mapperArr;
            
    }

    public function getPrintMapper($field_option_id){
        if(empty($field_option_id)){
            $field_option_id == "'1','2'";
        } 
        $sql = "SELECT field_option_id,code,name,option_1 as column_name,option_2 as rate,code as group_name
                FROM sys_field_option_data AS fd
                WHERE field_option_id IN ($field_option_id)
                ORDER BY display_order";

        $command = Yii::app()->db->createCommand($sql);    
        $data = $command->queryAll();
        return array('data' => $data);
            
    } 
    public function getFieldOptionData($field_option_id){
        $sql = "SELECT field_option_data_id,field_option_id,code,name,
                 option_1 as column_name,option_2 as rate,option_3 as group_name,
                 description,delete_flg,display_order
                FROM sys_field_option_data AS fd
                WHERE field_option_id = '{$field_option_id}' AND (delete_flg = 0 OR delete_flg IS NULL)
                ORDER BY display_order";
        $command = Yii::app()->db->createCommand($sql);    
        $data = $command->queryAll();
        return array('data' => $data);
    }

    public function getSysFieldOptionRecord($field_option_id){
        $sql = "SELECT  * 
                FROM sys_field_option AS fd
                WHERE field_option_id = '{$field_option_id}'";
        $command = Yii::app()->db->createCommand($sql);    
        $data = $command->queryRow();
        return $data;
    }

    public function getFldOptData($field_option_id){
        $sql = "SELECT 
                 fd.field_option_data_id,
                 fd.field_option_id,
                 fd.code,fd.name, 
                 fd.option_1,
                 fd.option_2, 
                 fd.option_3
                FROM sys_field_option_data AS fd
                WHERE field_option_id = '{$field_option_id}' AND (delete_flg = 0 OR delete_flg IS NULL)
                ORDER BY display_order";
        $command = Yii::app()->db->createCommand($sql);    
        $result = $command->queryAll();
        return $result;
    }
}
