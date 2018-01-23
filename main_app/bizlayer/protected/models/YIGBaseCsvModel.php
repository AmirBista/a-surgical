<?php

class YIGBaseCsvModel extends CActiveRecord {

    public function getColumnsListForCsv($csv_report_id) {

        $sql = " SELECT 
            	cmd.csv_field_name AS field_label
            FROM
            	sys_csv_report AS cmm
            JOIN sys_csv_report_field AS cmd ON (
            	cmm.csv_report_id = cmd.csv_report_id
            )
            WHERE cmm.csv_report_id=:csv_report_id
            ORDER BY
            	cmd.display_order ASC ";
        
        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':csv_report_id', $csv_report_id, PDO::PARAM_INT);
        $results = $command->queryAll();
        
        return $results;
    }

    public function getDatagridColumnsList($csv_report_id) {
        $selectFields = "   cmd.csv_report_field_id,
                            cmd.csv_field_name,
                            tf.table_id,
                            tf.field_type_id,
                            tf.table_field_id,
                            tf.field_label,
                            tf.field_option_id,
                            tf.system_field_flg,
                            tf. COLUMN_NAME,
                            tf.has_detail_link,
                            tf.column_width,
                            tf.allow_blank,
                            tf.message,
                            tf.sys_column_name,
                            (
                                CASE
                                WHEN ft.xtype = ''
                                OR ft.xtype IS NULL THEN
                                    'textfield'
                                ELSE
                                    ft.xtype
                                END
                            ) AS xtype,
                            (
                                CASE
                                WHEN ft.type_key = ''
                                OR ft.type_key IS NULL THEN
                                    'string'
                                ELSE
                                    ft.type_key
                                END
                            ) AS type_key,
                            (
                                CASE 
                                    WHEN cmm.menu_column = cmd.csv_field_name 
                                        THEN TRUE
                                        ELSE FALSE
                                END
                            )as menu_column,
                            fop.key_column,
                            fop.value_column,
                            fop.option_name,
                            fop.option_data,
                            fop.option_sql";
        $sql = " SELECT {$selectFields}
        FROM yig_csv_report AS cmm
        JOIN yig_csv_report_field AS cmd ON (
            cmm.csv_report_id = cmd.csv_report_id
        )
        LEFT JOIN sys_table_field AS tf ON (
            cmd.table_field_ids[1] =  tf.table_field_id AND tf.delete_flg = 0
        )
        LEFT JOIN sys_field_type AS ft ON (
            ft.field_type_id = tf.field_type_id
            AND ft.delete_flg = 0
        )
        LEFT JOIN sys_field_option AS fop ON (
            fop.field_option_id = tf.field_option_id
        )
        WHERE
            cmm.csv_report_id =:csv_report_id
        ORDER BY
            cmd.display_order ASC";
        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':csv_report_id', $csv_report_id, PDO::PARAM_INT);
        $results = $command->queryAll();
        unset($sql);
        unset($command);

        $columns = array();
        $fields = array();
        $align = 'left';

        foreach ($results as $row) {

            // if (!empty($row['table_field_id'])) {
            //     $itemId = 'column_item_' . $row['table_id'] . '_' . $row['table_field_id'];
            // }else{
            //     $itemId = NUll;
            // }
            if($row['menu_column']) {
                $menuDisabled = false;
            }else {
                $menuDisabled = true;
            }
            if (!empty($row['table_field_id'])) {
                $itemId = 'column_item_' . $row['csv_report_field_id'];
            } else {
                $itemId = NUll;
            }
            $dataIndex = $row['csv_field_name'];
            $mapped = $row['column_name'];

            $modelFieldArray = array(
                'name' => $dataIndex,
                'type' => $row['type_key']
            );
            $editorArray = array(
                'xtype' => $row['xtype'],
                'itemId' => $itemId,
                'selectOnFocus' => true,
            );
            if ($row['xtype'] == 'numberfield') {
                $editorArray['xtype'] = 'numberfield';
                $editorArray['minValue'] = 0;
                $editorArray['hideTrigger'] = true;
                $align = 'left';
            }

            if ($row['xtype'] == 'datefield') {
                $editorArray['format'] = 'Y-m-d';
                $editorArray['submitFormat'] = 'Y-m-d';
                $editorArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['type'] = 'date';
            }
            if ($row['xtype'] == 'datefieldex') {
                $editorArray['format'] = 'Y-m-d';
                $editorArray['submitFormat'] = 'Y-m-d';
                $editorArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['dateFormat'] = 'Y-m-d';
                $modelFieldArray['type'] = 'date';
            }
            if ($row['xtype'] == 'combobox' && $row['field_option_id'] != '') {
                if ($row['table_id'] == "100") {
                    $editorArray['xtype'] = 'numberfield';
                } else {
                    $editorArray['fields'] = $row['value_column'];
                    $editorArray['displayField'] = $row['value_column'];
                    $editorArray['valueField'] = $row['value_column'];
                    $editorArray['listeners'] = $row['value_column'];
                    $editorArray['queryMode'] = 'local';
                    $sql = $row['option_sql'];
                    $editorArray['storeData'] = $row['option_data'];

                    if ($row['option_data'] == '') {
                        if (empty($sql)) {
                            $option_id = $row['field_option_id'];
                            $sql = "select name from sys_field_option_data where field_option_id = $option_id order by display_order ";
                        } else {
                            $editorArray["key"] = $row['key_column'];
                        }
                        $command = Yii::app()->db->createCommand($sql);
                        $innerResults = $command->queryAll();
                        $jsonData = CJSON::encode($innerResults);
                        $editorArray['storeData'] = $jsonData;
                    }
                }
            }
            if($row['xtype'] == 'textareafield') {
                $editorArray['height'] =18;
            }

            $filterArray = $editorArray;
            $editorxtype = $editorArray['xtype'];
            $gridPanelItemArray = array(
                'xtype' => 'gridcolumn',
                'itemId' => $itemId,
                'table_field_id' => $row['table_field_id'],
                'dataIndex' => $dataIndex,
                'field_type_id' => $row['field_type_id'],
                'message' => $row['message'],
                'sysColumnName' => $row['sys_column_name'],
                'text' => $row['csv_field_name'],
                'mapped' => $mapped,
                //'text' => $row['sys_column_name'],
                'hideable' => true,
                'menuDisabled' => $menuDisabled,
                'resizable' => true,
                'align' => $align,
                'allowBlank' => $row['allow_blank'],
                'has_detail_link' => $row['has_detail_link'],
                'system_field_flg' => $row['system_field_flg'],
                'filter' => $filterArray,
                'editorxtype' => $editorxtype
            );
            // if ($row['edit_flag'] == true) {
            if ($editorArray['xtype'] == 'combobox') {
                $gridPanelItemArray['editorprop'] = 'filter';
            } else {
                $gridPanelItemArray['editor'] = $editorArray;
            }
            $gridPanelItemArray['tdCls'] = 'editable-cell';
            //} else {
            //$gridPanelItemArray['tdCls'] = 'non-editable-cell';
            //}

            if (isset($row['column_width']) && $row['column_width'] != '0' && $row['column_width'] != null && $row['column_width'] != '') {
                $gridPanelItemArray['width'] = $row['column_width'];
            }
            $columns[] = $gridPanelItemArray;
            $fields[] = $modelFieldArray;
        }
        $data = array(
            'columns' => $columns,
            'fields' => $fields,
        );
        return $data;
    }

    public function getDatagridPageSize($csv_report_id) {
        $sql = " SELECT page_size FROM yig_csv_report AS cmm WHERE cmm.csv_report_id =:csv_report_id ";
        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':csv_report_id', $csv_report_id, PDO::PARAM_INT);
        $results = $command->queryAll();
        $pageSize = (isset($results[0]['page_size'])) ? $results[0]['page_size'] : 50;
        return $pageSize;
    }
}

?>
