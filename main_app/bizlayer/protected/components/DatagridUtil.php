<?php
class DatagridUtil
{
    public $_datagrid_id;
    public $_default_sort_field = "_default_sort";
    
    public function getColumnInfo($user_role,$pk_col=null,$datagrid_template_id,$forSkuMasterGrid=false,$item_master_id=0,$force_set_item_master_id_fld=false,$gridCellReadOnly=0) {
        $lang    = Yii::app()->user->_user_info['language'];
        $columns = $this->getDatagridColumnInfo($user_role,$pk_col,$datagrid_template_id,false,$forSkuMasterGrid,$item_master_id,$gridCellReadOnly,$lang);
        $columns['fields'][] = array('name'=>'id','mapping' => "id");
        if($forSkuMasterGrid == true || $force_set_item_master_id_fld==true){
            $columns['fields'][] = array('name'=>"item_master_id",'mapping'=>"item_master_id");
        }
        return $columns;
    }

    public function getDatagridColumnInfo($user_role,$pk_col,$datagrid_template_id=null,$is_screen_datagrid=false,$forSkuMasterGrid=false,$item_master_id=0,$gridCellReadOnly=0,$lang="") {
        $datagrid_info =  $this->getDatagridInfo($user_role,$datagrid_template_id);
        $datagrid_id = $datagrid_info['datagrid_id'];
        
        $show_row_number = $datagrid_info['show_row_number'];
        $show_action_column = $datagrid_info['show_action_column'];
        $tables_from = $datagrid_info['tables_from'];
        $datagrid_has_detail_link = $datagrid_info['has_detail_link'];
        $page_size = $datagrid_info['page_size'];
        $menu_column = $datagrid_info['menu_column'];
        // $show_readunread_column = $datagrid_info['show_readunread_column'];
        $show_readunread_column ='';

        //by default hide read/unread colun
        $default_hidden_readunread_column = true;
        // $show_hashid_column = $datagrid_info['show_hashid_column'];
        $show_hashid_column = '';
        
        $datagrid_fields =  $this->getDatagridFields($user_role,null,$datagrid_template_id,$lang);
        // var_dump($datagrid_fields);exit;
        $columns = $fields = array();
        if ($show_row_number == '1') {
            $columns[] =  array("xtype" => 'sno_col_renderer', 'width' => 50, 'sortable'=>false);
        }
        // if($datagrid_id=='23'){
        //     $columns[] =  array("xtype" => 'gridcolumn','itemId' => 'drag_drop_column', 'width' => 30);
        // }
        // if($datagrid_id=='27'){
        //     $columns[] =  array("xtype" => 'gridcolumn','itemId' => 'action_column', 'width' => 110);
        // } 
        // if($datagrid_id=='29'){
        //     $columns[] =  array("xtype" => 'gridcolumn','itemId' => 'action_column','menuDisabled'=>true, 'width' => 60);
        // }
        if ($show_action_column == '1') {
            $actionColWidth = 60;
            // if($datagrid_id == 3) {
            //     $actionColWidth = 180;
            // }
            $columns[] = array(
                "xtype" => 'gridcolumn', 
                'colItemId' => 'action_column', 
                'itemId' => 'action_column_'.$datagrid_id, 
                'width' => $actionColWidth,
                'componentCls'=>"default-sortable-col", 
                'tdCls' => 'action_replica',
                "dataIndex"=>$this->_default_sort_field,
                'menuDisabled' => false,
                'sortable'=>true
            );
        }

        if ($show_readunread_column == '1') {
            $columns[] = array("xtype" => 'gridcolumn',
                'width' => 70,
                'itemId' => 'readunread_column',
                'componentCls'=>"sortable-col",
                'dataIndex'=>"is_read",
                'hidden'=>$default_hidden_readunread_column,
                'menuDisabled' => true
            );
            $fields[] = array('name' => 'is_read','mapping' => 'is_read');
        } 
        // else if($datagrid_id=='15'){
        //     $columns[] =  array(
        //         "xtype" => 'gridcolumn',
        //         'itemId' => 'is_matched_column', 
        //         'width' => 60,
        //         'menuDisabled' => true
        //     );
        // }
        // else if($datagrid_id=='16'){
        //     $columns[] =  array(
        //         "xtype" => 'gridcolumn',
        //         'itemId' => 'is_matched_column', 
        //         'width' => 60,
        //         'menuDisabled' => true
        //     );
        // } 

        else {
            //do nth
        }
        $align = 'left';
        $first_col_index = null;
        $detail_link_exists = false;
        $lang = GET_LANG();
        foreach ($datagrid_fields as $field) {
            if($menu_column == $field['column_name'] && $show_action_column == '0') {
                $menuDisabled = false;
            }else {
                $menuDisabled = true;
            }
            //for summary grid
            $field['summaryType']=null;
            // if($field['column_name'] == 'column_1_07'||$field['column_name'] == 'column_1_08'||$field['column_name'] == 'column_1_09') {
            if($field['table_field_id'] == 89 || $field['table_field_id'] == 92 || $field['table_field_id'] == 93) {
                $field['summaryType']='sum';
            }
            // if($field['column_name'] == 'column_1_37'||$field['column_name'] == 'column_1_38'||$field['column_name'] == 'column_1_39') {
            //     $field['hidden']=true;
            // }

            //column index in which detail link will be showed if required
            if ($first_col_index === null){
                $first_col_index = count($columns);
            }

            /*removed link from datagrid whose link is disabeld*/
            if($datagrid_has_detail_link == 0) {
                $field['has_detail_link']=0;
            }else{
                if ($detail_link_exists === false && $field['has_detail_link'] == 1){
                    $detail_link_exists = true;
                }
            }

            $align = 'left';

            $itemId = 'column_' . $field['table_id'] . '_' . $field['table_field_id'];
            $dataIndex = $field['column_name'];
            $mapping = $dataIndex;

            $model_field_info = array(
                'name' => $dataIndex,
                'mapping' => $mapping,
                'type' => $field['type_key'],
                'default_value'=>$field['default_value']
            );

            if($field['xtype'] == 'textareafield') {
                $field['xtype'] ='textfield';
            }
            
            $editorArray = array(
                'xtype' => $field['xtype'],
                'itemId' => $itemId,
                'gridDataIndex' => $dataIndex,
                'selectOnFocus' => true,
            );


            if ($field['xtype'] == 'numberfield') {
                $editorArray['minValue'] = 0;
                //$editorArray['maxValue'] = 100000;
                $editorArray['hideTrigger'] = true;
                $editorArray['enableKeyEvents'] = true;
                $align = 'right';
            }

            if ($field['xtype'] == 'datefield') {
                $editorArray['format'] = 'Y-m-d';
                $editorArray['submitFormat'] = 'Y-m-d';
                $editorArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['type'] = 'date';
            }
            if ($field['xtype'] == 'datefieldex') {
                $editorArray['format'] = 'Y-m-d';
                $editorArray['submitFormat'] = 'Y-m-d';
                $editorArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['type'] = 'date';
            }
            if ($field['xtype'] == 'timefield') {
                $editorArray['format'] = 'H:i' ;
                $editorArray['submitFormat'] = 'H:i' ;
                $editorArray['timeFormat'] = 'H:i' ;
                $modelFieldArray['timeFormat'] = 'H:i' ;
                $modelFieldArray['type'] = 'time';
            }
            if ($field['xtype'] == 'combobox') {
                $editorArray['fields'] = array('catp_id',$field['value_column']);
                $editorArray['displayField'] = $field['value_column'];
                $editorArray['valueField'] = $field['value_column'];
                $editorArray['listeners'] = $field['value_column'];
                $editorArray['queryMode'] = 'local';
                $editorArray['store_url'] = $field['store_url'];
                if(!empty($editorArray['store_url']))
                {
                    $editorArray['queryMode'] = 'remote';
                }
                $sql = $field['option_sql'];
                $editorArray['storeData'] = $field['option_data'];
                /*adds the clear btn in the combobox*/
                $editorArray['plugins'] = 'clearbutton';
                $editorArray['field_option_id'] = $field['field_option_id'];
                
                $setting_config = array();
                $setting_config['field_option_id'] = $field['field_option_id'];
                $setting_config['field_option_name'] = $field['option_name'];
                $setting_config['new_role'] = $field['field_option_new_role']; 
                $setting_config['edit_role'] = $field['field_option_edit_role']; 
                $setting_config['delete_role'] = $field['field_option_delete_role']; 
                $setting_config['enabled'] = $field['field_option_new_role'] || $field['field_option_edit_role'] || $field['field_option_delete_role'];
                
                $editorArray['setting_cfg'] = $setting_config;
                $editorArray['enable_auto_insert'] = $setting_config['enabled'] == TRUE ? $field['enable_auto_insert'] : 0;

                /*makes the combo untypeable*/
                $editorArray['editable'] = true;
                if($field['field_type_id']==104 || $field['field_type_id']==105){
                    $dgUtil = new DatagridUtil();
                    $dgUtil->_datagrid_id = $field['datagrid_id'];
                    $storeModelInfo = $dgUtil->getStoreModelFields($user_role, null);
                    // if($field['field_type_id']==104)
                    //     $storeModelInfo = $dgUtil->getStoreModelFields($user_role, null);
                    // else
                    //     $storeModelInfo = $dgUtil->getDgFieldsFromFieldOptions($user_role);
                            
                    $editorArray['tpl_fields'] = $storeModelInfo['tpl_fields'];
                    $editorArray['fields']=$storeModelInfo['fields'];//$storeModelInfo['tpl_fields'];
                    $editorArray['store_page_size'] = $storeModelInfo['datagrid_info']['page_size'];
                    $editorArray['editable'] = true;
                    $editorArray['queryMode'] = 'remote';
                    $editorArray['store_url'] = $storeModelInfo['datagrid_info']['store_url'];//$field['store_url'];
                    $editorArray['hide_label'] = TRUE;
                    $editorArray['is_form_combo_grid'] = FALSE; 
                    $editorArray['extraParams'] = array('datagrid_id'=> $field['datagrid_id']);
                }
                else if ($field['option_data'] == '') {
                    if (empty($sql)) {
                        $option_id = $field['field_option_id'];
                    if($field['field_option_id']==6 && !empty($item_master_id)){
                        $company_id = Yii::app()->user->getAttr('company_id');//user company_id
                        $sql = "SELECT oic.display_order, 
                                    sfod.code as code, sfod.name as name
                                    from oms_item_color as oic
                                        INNER JOIN oms_item_master as oim on oic.item_master_id = oim.id
                                        INNER JOIN sys_field_option_data as sfod ON sfod.field_option_data_id = oic.field_option_data_color_id
                                    where oic.item_master_id=$item_master_id ";          
                            if(FILTER_COMPANY_CONDITION == true){
                                $sql .= " AND oic.company_id=$company_id";
                            }
                            $sql .= " order by oic.display_order asc"; 
                    }else{
                        $sql = "select name, code from ".t('tblSchema','sys_').".sys_field_option_data where field_option_id = $option_id AND (delete_flg = 0 or delete_flg is null) order by display_order ";
                    }
                    
                    } else {
                        $editorArray["key"] = $field['key_column'];
                          
                    }
                    // die($sql);
                    $command = Yii::app()->db->createCommand($sql);
                    $innerResults = array();
                    try {
                        $innerResults = $command->queryAll();
                    } catch (Exception $e) {
                        var_dump($field);
                        echo 'Caught exception: ',  $e->getMessage(), "\n";
                        exit;
                    }
                    
                    $jsonData = CJSON::encode($innerResults);
                    $editorArray['storeData'] = $jsonData;
                }


            }

            

            // $editorArray['allowBlank'] = true;
            $filterArray = $editorArray;
            $editorxtype = $editorArray['xtype'];
            $col_info = array(
                'xtype' => 'gridcolumn',
                'itemId' => $itemId,
                'table_alais' => 't'. $field['table_id'].'.',
                'table_field_id' => $field['table_field_id'],
                'dataIndex' => $dataIndex,
                'field_type_id' => $field['field_type_id'],
                'text' => $field['field_label'],
                'allowBlank' => $field['allow_blank'],
                'hideable' => true,
                'menuDisabled' => $menuDisabled,
                'resizable' => true,
                'align'=> $align,
                'has_detail_link' => $field['has_detail_link'],
                'hidden' => $field['hidden'],
                'map_tbl_system_field_flg' => $field['map_tbl_system_field_flg'],
                'filter' => $filterArray,
                'editorxtype' => $editorxtype,
                'summaryType' => $field['summaryType']
                //'locked'=>false
                //'editable'=> FALSE,

            );

            //control language;
            if ($lang == 'en')
                $col_info['text'] = $field['sys_column_name'];

            $col_info['componentCls'] = "sortable-col";
            /*finds which columns are editable*/
            if ($field['edit_flg'] == 1 && $gridCellReadOnly==0) {
                if ($editorArray['xtype'] == 'combobox') {
                    $col_info['editorprop'] = 'filter';
                } else {
                    $col_info['editor'] = $editorArray;
                }
                $col_info['tdCls'] = 'editable-cell'; 
                $col_info['componentCls'] .= " editable-col";
                $col_info['editable'] = true;
            }
            else{
                $col_info['tdCls'] = 'non-editable-cell';
                $col_info['componentCls'] .= " non-editable-col";
                $col_info['editable'] = false;
            }
            $col_info['width'] = !empty($field['column_width']) ? $field['column_width'] : 100;
            

            if ($field['xtype'] == 'numberfield') {
                $align = 'right';
            }

            if ($field['xtype'] == 'datefield') {
                $model_field_info['dateFormat'] = 'Y-m-d';
                $model_field_info['type'] = 'date';
            }
            if ($field['xtype'] == 'datefieldex') {
                $model_field_info['dateFormat'] = 'Y-m-d';
                $model_field_info['type'] = 'date';
            }
            if ($field['xtype'] == 'timefield') {
                $model_field_info['dateFormat'] = 'H:i';
                $model_field_info['type'] = 'date';
            }

            $col_info['tdCls'] .= ' '. $field['td_cls'];
            $col_info['componentCls'] .= ' '. $field['component_cls'];

            $columns[] = $col_info;
            $fields[] = $model_field_info;
        }

        //show detail link on first column
        if ($datagrid_has_detail_link == 1 && $detail_link_exists === false && $first_col_index !== null){
            $columns[$first_col_index]['has_detail_link'] = 1;
        }
        //:: make grid column lockable
        $lockCols = $datagrid_info['locked_column'];
        if(!empty($lockCols)){
            for($i=0; $i<count($columns); $i++){
                $columns[$i]['locked']=true;
                if(!empty($columns[$i]['text']) && $columns[$i]['text']==$lockCols){
                    $columns[$i]['locked']=true;
                    break;
                }
            }
        }
        $data = array(
            'columns' => $columns,
            'fields' => $fields,
            'page_size'=>$page_size,
            'datagrid_info'=>$datagrid_info,
            'isScreenDatagrid' => $is_screen_datagrid
        );
        return $data;
    }

    public function getDatagridInfo($user_role, $datagrid_template_id=null) {
        $user_id = Yii::app()->user->user_id;
        $role_arr = formatPGArray($user_role);
        $sql = "SELECT dg.datagrid_id, dg.datagrid_name,COALESCE(up.preference_value, dg.page_size::text) as page_size,store_url,store_group_field,";
        if(!empty($datagrid_template_id)) {
            $sql .=" COALESCE(yft.locked_column, dg.locked_column::text) as locked_column,";
        }
        else {
            $sql .=" COALESCE(up1.preference_value, dg.locked_column::text) as locked_column,";
        }
        $sql .=" dg.show_row_number, dg.display_column_count, dg.show_action_column, dg.tables_from, dg.menu_column, 
                case when dg.view_role @> :role_arr then true else false end as view_role, 
                case when dg.edit_role @> :role_arr then true else false end as edit_role, 
                case when dg.delete_role @> :role_arr then true else false end as delete_role,
                dg.has_detail_link
                FROM ".t('tblSchema','sys_').".sys_datagrid AS dg 
                LEFT JOIN app_user_preference up 
                ON (
                    up.user_id = :user_id and 
                    dg.datagrid_id::text = up.panel_no and 
                    up.preference_name = 'datagrid_page_size'
                    )";
        if(!empty($datagrid_template_id)) {
            $sql .=" LEFT JOIN ".t('tblSchema','app_').".sys_datagrid_template yft 
                    ON (
                            yft.created_by = :user_id and 
                            dg.datagrid_id = yft.datagrid_id and 
                            yft.datagrid_template_id = $datagrid_template_id
                        )";
        }
        else {
            $sql .= " LEFT JOIN ".t('tblSchema','app_').".app_user_preference up1 
                    ON (
                            up1.user_id = :user_id and 
                            dg.datagrid_id::text = up1.panel_no and 
                            up1.preference_name = 'datagrid_locked_column'
                        )";
        }
        $sql .=" WHERE dg.datagrid_id = :datagrid_id";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $this->_datagrid_id, PDO::PARAM_STR);
        $cmd->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        $result = $cmd->queryRow();
        return $result;
    }

    public function getDatagridFields($user_role,$where="",$datagrid_template_id=null,$lang="") {
        $role_arr       = formatPGArray($user_role);
        $user_id        = Yii::app()->user->user_id;
        $lang_columns   = Yii::app()->params['availableLanguagesCol'];
        $label          = Yii::t('app','defaultLabel');
        $datagrid_id    = $this->_datagrid_id;
        if (!empty($datagrid_template_id)) {
            //check if $datagrid_template_id is valid
            $tempSql= " SELECT count(datagrid_id) 
                FROM ".t('tblSchema','app_').".sys_datagrid_template_field 
                where datagrid_template_id = :datagrid_template_id
                AND datagrid_id = '{$datagrid_id}'";

            $cmd = Yii::app()->db->createCommand($tempSql);
            $cmd->bindParam(':datagrid_template_id', $datagrid_template_id, PDO::PARAM_STR);

            $result = $cmd->queryScalar();
            if (empty($result)) {
                $datagrid_template_id = null;
            }
        }
        if(array_key_exists($lang, $lang_columns)) {
            $label = $lang_columns[$lang];
        }
        // var_dump($lang_columns);
        // var_dump($lang);
        // var_dump($label);die;
        $sql = "SELECT tf.table_id,tf.table_field_id,tf.$label AS field_label, tf.default_value,
                tf.allow_blank,tf.column_name, tf.has_detail_link,tf.sys_column_name,
                CASE WHEN df.column_width > 0 THEN df.column_width ELSE tf.column_width END AS column_width,
                case when df.edit_role @> :role_arr then 1 else 0 end as edit_flg,
                CASE WHEN df.component_cls is null or df.component_cls = '' THEN tf.component_cls ELSE df.component_cls END AS component_cls,
                CASE WHEN df.td_cls is null or df.td_cls = '' THEN tf.td_cls ELSE df.td_cls END AS td_cls,
                df.system_field_flg AS map_tbl_system_field_flg,
                ft.field_type_id, ft.xtype, ft.type_key, ft.type_name, ft.description,
                op.key_column, op.value_column,op.field_option_id, op.option_name, op.option_data, op.option_sql,
                op.store_url,op.datagrid_id,op.enable_auto_insert,
                case when op.field_option_new_role @> :role_arr then true else false end as field_option_new_role,
                case when op.field_option_edit_role @> :role_arr then true else false end as field_option_edit_role,
                case when op.field_option_delete_role @> :role_arr then true else false end as field_option_delete_role,
                ";
        if (!empty($datagrid_template_id)){
            $sql.= " udf.hidden";
        }
        else
        {
            $sql.= "case when df.default_role @> :role_arr then false else true end as hidden,
                    df.display_order as item_display_order";
        }
        $sql.= " FROM ".t('tblSchema','sys_').".sys_datagrid_field AS df ";
        if (!empty($datagrid_template_id)){
            $sql.= " INNER JOIN ".t('tblSchema','app_').".sys_datagrid_template_field udf ON df.datagrid_id = udf.datagrid_id 
                AND df.table_field_id = udf.table_field_id and udf.datagrid_template_id = '{$datagrid_template_id}'";
        }

        $sql.= " INNER JOIN
                ".t('tblSchema','sys_').".sys_table_field AS tf ON (df.table_id = tf.table_id and df.table_field_id = tf.table_field_id AND tf.delete_flg = 0)
                LEFT JOIN
                ".t('tblSchema','sys_').".sys_field_type AS ft ON (ft.field_type_id = COALESCE(df.field_type_id,tf.field_type_id))
                LEFT JOIN
                ".t('tblSchema','sys_').".sys_field_option AS op ON (op.field_option_id = COALESCE(df.field_option_id,tf.field_option_id))
                WHERE
                df.datagrid_id = :datagrid_id
                and df.view_role @> :role_arr ";
        if(!empty($where)){
            $sql.= $where;
        }

        else if (!empty($datagrid_template_id)){
            $sql.= " ORDER BY udf.display_order asc";
        }
        else
        {
            $sql.= " ORDER BY df.display_order asc";
        }

        $cmd = Yii::app()->db->createCommand($sql);

        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $cmd->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
        $results = $cmd->queryAll();
        unset($sql);
        unset($cmd); 
        
        return $results;
    }

    public function getStoreModelFields($user_role, $pk_col){
        $user_id = Yii::app()->user->user_id;
        
        $datagrid_info =  $this->getDatagridInfo($user_role);
        $page_size = $datagrid_info['page_size'];
        $datagrid_fields =  $this->getDatagridFields($user_role); 
        $tpl_fields = array();
        $fields = array();
        // if(!empty($pk_col))
        //     $fields[] = $pk_col;
        foreach ($datagrid_fields as $field) {
            $dataIndex = $field['column_name'];
            $mapping = $dataIndex;
            $model_field_info = array(
                'name' => $dataIndex,
                'mapping' => $mapping,
                'type' => $field['type_key'],
                'sys_column_name'=>$field['sys_column_name'],
                'field_label'=>$field['field_label']
            );
            if ($field['xtype'] == 'datefield') {
                $model_field_info['dateFormat'] = 'Y-m-d';
                $model_field_info['type'] = 'string';
            }
            if ($field['xtype'] == 'datefieldex') {
                $model_field_info['dateFormat'] = 'Y-m-d';
                $model_field_info['type'] = 'string';
            }
            $model_field_info['width'] = !empty($field['column_width']) ? $field['column_width'] : 100;
            if($field['hidden'] === false){
                $tpl_fields[] = $model_field_info;
            }
            $fields[] = $model_field_info;
        }
        // $this->addCompanyProductFields($fields);
        $data = array(
            'fields' => $fields,
            'tpl_fields'=>$tpl_fields,
            'page_size'=>$page_size,
            'datagrid_info' => $datagrid_info
        );
        return $data;  
    }

    public function getDgFieldsFromFieldOptions($user_role){
        $datagrid_info =  $this->getDatagridInfo($user_role);
        $page_size = $datagrid_info['page_size'];
        $tpl_fields = array();
        $fields = array();
        $datagrid_fields = array(
            array('name' => 'name', 'width' => 150, 'field_label' => t('tplComboFields','name')),
            array('name' => 'rate', 'width' => 100, 'field_label' => t('tplComboFields','rate')),
            // array('name' => 'code', 'width' => 100, 'field_label' => 'code'),
            // array('name' => 'group_name', 'width' => 100, 'field_label' => 'group')
        );
        foreach ($datagrid_fields as $field) {
            $dataIndex = $field['name'];
            $mapping = $dataIndex;
            $model_field_info = array(
                'name' => $dataIndex,
                'mapping' => $mapping,
                'type' => 'string',
                'sys_column_name'=>$field['name'],
                'field_label'=>$field['field_label']
            );
            $model_field_info['width'] = !empty($field['width']) ? $field['width'] : 100;
            $tpl_fields[] = $model_field_info;
        }
        $data = array(
            'fields' => $fields,
            'tpl_fields'=>$tpl_fields,
            'page_size'=> null
        );
        return $data;
    }

    public function setPageSize( $page_size){

        $dt = date('Y-m-d H:i:s');

        $sql = "UPDATE ".t('tblSchema','sys_').".sys_datagrid 
                SET page_size= :page_size, updated_datetime=:updated_datetime 
                WHERE datagrid_id= :datagrid_id";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':page_size', $page_size, PDO::PARAM_STR);
        $cmd->bindParam(':datagrid_id', $this->_datagrid_id, PDO::PARAM_INT);
        $cmd->bindParam(':updated_datetime', $dt, PDO::PARAM_STR);
        
        $result = $cmd->execute();
        return $result;
    
    }

    public function getDatagridPgSize(){
        
        $sql = "SELECT page_size 
                FROM ".t('tblSchema','sys_').".sys_datagrid 
                WHERE datagrid_id= {$this->_datagrid_id}";

        $cmd = Yii::app()->db->createCommand($sql);
         
        $result = $cmd->queryRow();
        return $result;
    }
    
}
