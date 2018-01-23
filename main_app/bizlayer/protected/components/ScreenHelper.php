<?php

/**
 * Description of ScreenHelper
 *
 * @author ybase
 */
class ScreenHelper {

    //static screen type variables
    public static $SCREEN_TYPE_PANEL = 0;
    public static $SCREEN_TYPE_FORM = 1;
    public static $SCREEN_TYPE_VIEWPORT = 2;
    public static $SCREEN_TYPE_FILTER = 3;

    // public function getFilterComponents($screen_id, $user_role){
    //     return $this->getScreenComponents($screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FILTER);
    // }

    public function getWindowFormComponents($parent_screen_id, $user_role, $lang){
        return $this->getScreenComponents($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM, array(), $lang);
    }

    public function getScreenFields($parent_screen_id, $user_role, $screen_type,$screen_names=array()){
        $get_component=false;
    return $this->getScreenFieldSettings($parent_screen_id, $user_role, $screen_type, $get_component,$screen_names);
    }

    /*@returns screen field's config*/
    private function getScreenFieldSettings($parent_screen_id, $user_role, $screen_type, $get_component=true,$screen_names=array(), $lang=""){
        $role_arr       = formatPGArray($user_role);
        $lang_columns   = Yii::app()->params['availableLanguagesCol'];
        if (empty($lang)){
            $lang      = Yii::app()->user->_user_info['language'];
        }

        $label          = Yii::t('app','defaultLabel');
        if(array_key_exists($lang, $lang_columns)) {
            $label = $lang_columns[$lang];
        }
        //get screen components
        $sql = "select tf.table_field_id, tf.table_id, tf.column_name, tf.has_detail_link, tf.default_value, tf.allow_blank,
            case when sf.field_type_id is null then tf.field_type_id else sf.field_type_id end as field_type_id,
            case when sf.edit_role @> :role_arr then true else false end as edit_role,
            case when sf.view_role @> :role_arr then true else false end as view_role,
            case when sf.new_role @> :role_arr then true else false end as new_role,
            case when COALESCE(array_length(tf.edit_role,1),0) < 1 or tf.edit_role @> :role_arr then true else false end as field_role,
            COALESCE(sf.focus_on_enterkey,tf.focus_on_enterkey) as focus_on_enterkey,
            s.screen_name,sf.field_width";

        if ($get_component == true)
        {
            $sql.= ", sf.component_cls, sf.category, sf.sub_category,
                tf.$label as field_label,
                case when sf.field_option_id is null then tf.field_option_id else sf.field_option_id end as field_option_id,
                ft.xtype, ft.type_name,
                op.key_column, op.value_column, op.option_data, op.option_sql,
                op.store_url,op.datagrid_id,
                case when op.hide_label = 0 then false else true end as hide_label,
                case when op.is_form_combo_grid = 0 then false else true end as is_form_combo_grid,
                op.option_name,
                case when op.field_option_new_role @> :role_arr then true else false end as field_option_new_role,
                case when op.field_option_edit_role @> :role_arr then true else false end as field_option_edit_role,
                case when op.field_option_delete_role @> :role_arr then true else false end as field_option_delete_role
                ";
        }

        $sql .= " from ".t('tblSchema','sys_').".sys_screen_field as sf
            left join ".t('tblSchema','sys_').".sys_table_field as tf on sf.table_id = tf.table_id and sf.table_field_id = tf.table_field_id 
            LEFT JOIN ".t('tblSchema','sys_').".sys_screen s ON s.screen_id = sf.screen_id ";

        if ($get_component == true)
        {
            if ($screen_type == ScreenHelper::$SCREEN_TYPE_FILTER){
                $sql.= " left join ".t('tblSchema','sys_').".sys_field_type as ft on ft.field_type_id = COALESCE(tf.filter_field_tpe_id,tf.field_type_id)";
            }
            else{
                $sql.= " left join ".t('tblSchema','sys_').".sys_field_type as ft on ft.field_type_id = COALESCE(sf.field_type_id,tf.field_type_id)";
            }

            $sql.= " left join ".t('tblSchema','sys_').".sys_field_option op on op.field_option_id = COALESCE(sf.field_option_id,tf.field_option_id) ";
        }
        $sql .= " where s.parent_screen_id = '{$parent_screen_id}' ";
        
        $sql .= " AND (s.delete_flg = 0 OR s.delete_flg IS NULL) and sf.view_role @> :role_arr
        order by s.display_order,sf.display_order";
        // var_dump($role_arr);
        // echo $sql;exit;
        $command = Yii::app()->db->createCommand($sql);
        // $command->bindParam(':screen_id', $screen_id, PDO::PARAM_INT);
        $command->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
        $fields = $command->queryAll();
        return $fields;
    }

    /* @returns Screen Names for entry fields*/
    public function getScreenNames($parent_screen_id){
        $sql = "SELECT screen_name,screen_title,screen_id,screen_type,display_order,datagrid_id,component_cls,show_button,button_cls,layout_cls,group_name,show_file_popup_win,button_icon_cls,button_ui_cls
                FROM ".t('tblSchema','sys_').".sys_screen
                WHERE parent_screen_id=:parent_screen_id AND (delete_flg=0 OR delete_flg IS NULL) 
                ORDER BY display_order";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':parent_screen_id',$parent_screen_id,PDO::PARAM_INT);
        return $cmd->queryAll();
        
    }
    private function getScreenComponents($parent_screen_id, $user_role, $screen_type,$screen_names=array(), $lang=null){
        $role_arr = formatPGArray($user_role);

        $get_component=true;
        $components = $this->getScreenFieldSettings($parent_screen_id, $user_role, $screen_type, $get_component,$screen_names, $lang);
        
        $sql = "SELECT
                    fd.field_option_id,
                    fd.code,
                    fd. NAME,
                    fd.display_order
                FROM
                (
                    SELECT
                    distinct COALESCE(sf.field_option_id,tf.field_option_id) as field_option_id
                    FROM
                        ".t('tblSchema','sys_').".sys_screen_field AS sf
                    INNER JOIN ".t('tblSchema','sys_').".sys_table_field AS tf ON sf.table_id = tf.table_id AND sf.table_field_id = tf.table_field_id
                    INNER JOIN ".t('tblSchema','sys_').".sys_screen s ON s.screen_id = sf.screen_id AND(s.delete_flg = 0  OR s.delete_flg IS NULL )
                    WHERE
                        COALESCE(sf.field_option_id, tf.field_option_id) is not null
                        and s.parent_screen_id = '{$parent_screen_id}'
                        AND sf.view_role @> :role_arr 
                ) as op1
                INNER JOIN ".t('tblSchema','sys_').".sys_field_option_data AS fd ON fd.field_option_id = op1.field_option_id
                INNER JOIN ".t('tblSchema','sys_').".sys_field_option op ON op.field_option_id = op1.field_option_id
                WHERE fd.view_role @> :role_arr AND COALESCE(fd.delete_flg, 0)= 0
                AND( op.option_data IS NULL/* OR op.option_data = ''*/)
                AND(op.option_sql IS NULL OR op.option_sql = '')
                ORDER BY op1.field_option_id, fd.display_order";

        $command = Yii::app()->db->createCommand($sql);
        // $command->bindParam(':screen_id', $screen_id, PDO::PARAM_INT);
        $command->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
        $datas = $command->queryAll();
        $filter_components= array();
        $cnt = count($datas);
        foreach ($components as $key => $component) {
            $option_data = array();
            if (!empty($component['option_data'])){
                $option_data = CJSON::decode($component['option_data'], true);
            }
            else if (!empty($component['option_sql'])){
                $option_sql = $component['option_sql'];
                $command = Yii::app()->db->createCommand($option_sql);
                $option_data = $command->queryAll();
            }
            else
            {
                for ($i=0; $i < $cnt; $i++) { 
                    $data = $datas[$i];
                    if($component['field_option_id'] == $data['field_option_id']) {
                        // $option_data[]=array_shift($datas);
                        $option_data[] = $data;
                    // } else {
                    //     break;
                    }
                }
            }
            unset($component['option_sql']);
            $component['option_data'] = $option_data;
            $filter_components[] = $component;
        }
        //var_dump($filter_components);exit;
        return $filter_components;
    }

    public function getDefaultValues($_parent_screen_id){
        $sql = "SELECT tf.table_field_id,tf.table_id,tf.column_name,tf.field_type_id,tf.default_value,tf.field_option_id,ft.type_name
                FROM ".t('tblSchema','sys_').".sys_table_field AS tf
                INNER JOIN ".t('tblSchema','sys_').".sys_field_type as ft ON tf.field_type_id=ft.field_type_id
                INNER JOIN ".t('tblSchema','sys_').".sys_screen_field as sf ON sf.table_field_id = tf.table_field_id 
                INNER JOIN ".t('tblSchema','sys_').".sys_screen AS s ON s.screen_id = sf.screen_id AND s.parent_screen_id = :_parent_screen_id
                WHERE tf.default_value IS NOT NULL AND tf.default_value <> '' ";
        
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':_parent_screen_id', $_parent_screen_id, PDO::PARAM_INT);
        $records = $cmd->queryAll();
        return $records;
    }

    public function getScreenFieldsOptionData($parent_screen_id, $user_role){
        $role_arr = formatPGArray($user_role);
        //get screen component option data
        $sql = "select fd.field_option_id, fd.code, fd.name, fd.display_order,tf.column_name
                from ".t('tblSchema','sys_').".sys_screen_field as sf
                inner join ".t('tblSchema','sys_').".sys_table_field as tf on sf.table_id = tf.table_id and sf.table_field_id = tf.table_field_id
                inner join ".t('tblSchema','sys_').".sys_field_option_data as fd on fd.field_option_id = tf.field_option_id
                INNER JOIN ".t('tblSchema','sys_').".sys_screen AS s ON s.screen_id = sf.screen_id AND s.parent_screen_id = :parent_screen_id
                where sf.view_role @> :role_arr and fd.view_role @> :role_arr 
                order by sf.display_order, tf.field_option_id, fd.display_order
        ";
        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':parent_screen_id', $parent_screen_id, PDO::PARAM_INT);
        $command->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
        $records = $command->queryAll();
        return $records;
    }
}
