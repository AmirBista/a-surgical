<?php

/**
 * This is the model class for table "sys_csv_report".
 *
 * The followings are the available columns in table 'sys_csv_report':
 * @property integer $csv_report_id
 * @property integer $company_id
 * @property integer $department_id
 * @property string $report_code
 * @property string $report_name
 * @property string $display_name
 * @property string $mapped_table_ids
 * @property string $report_sql
 * @property integer $page_size
 * @property integer $csv_type
 * @property string $bill_code
 * @property string $filter_params
 * @property string $csv_file_name_template
 * @property string $group_name
 * @property integer $display_order
 * @property integer $group_display_order
 * @property string $print_template
 * @property string $csv_enclosure
 * @property integer $include_column_headers
 * @property string $field_seperator
 * @property string $record_seperator
 * @property string $csv_log_column
 * @property string $print_log_column
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property string $from_clause
 * @property string $where_clause
 * @property string $order_by_clause
 * @property string $menu_column
 */
class ReportCsv extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_csv_report';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, department_id, page_size, csv_type, display_order, group_display_order, include_column_headers, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('report_code, report_name', 'length', 'max'=>100),
			array('display_name, menu_column', 'length', 'max'=>200),
			array('bill_code', 'length', 'max'=>10),
			array('filter_params', 'length', 'max'=>2000),
			array('group_name, print_template', 'length', 'max'=>50),
			array('csv_enclosure, field_seperator, record_seperator', 'length', 'max'=>5),
			array('csv_log_column, print_log_column', 'length', 'max'=>20),
			array('from_clause, where_clause, order_by_clause', 'length', 'max'=>1000),
			array('mapped_table_ids, report_sql, csv_file_name_template, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('csv_report_id, company_id, department_id, report_code, report_name, display_name, mapped_table_ids, report_sql, page_size, csv_type, bill_code, filter_params, csv_file_name_template, group_name, display_order, group_display_order, print_template, csv_enclosure, include_column_headers, field_seperator, record_seperator, csv_log_column, print_log_column, delete_flg, created_by, created_datetime, updated_by, updated_datetime, from_clause, where_clause, order_by_clause, menu_column', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'csv_report_id' => 'Csv Report',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'report_code' => 'Report Code',
			'report_name' => 'Report Name',
			'display_name' => 'Display Name',
			'mapped_table_ids' => 'Mapped Table Ids',
			'report_sql' => 'Report Sql',
			'page_size' => 'Page Size',
			'csv_type' => 'Csv Type',
			'bill_code' => 'Bill Code',
			'filter_params' => 'Filter Params',
			'csv_file_name_template' => 'Csv File Name Template',
			'group_name' => 'Group Name',
			'display_order' => 'Display Order',
			'group_display_order' => 'Group Display Order',
			'print_template' => 'Print Template',
			'csv_enclosure' => 'Csv Enclosure',
			'include_column_headers' => 'Include Column Headers',
			'field_seperator' => 'Field Seperator',
			'record_seperator' => 'Record Seperator',
			'csv_log_column' => 'Csv Log Column',
			'print_log_column' => 'Print Log Column',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'from_clause' => 'From Clause',
			'where_clause' => 'Where Clause',
			'order_by_clause' => 'Order By Clause',
			'menu_column' => 'Menu Column',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('csv_report_id',$this->csv_report_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('report_code',$this->report_code,true);
		$criteria->compare('report_name',$this->report_name,true);
		$criteria->compare('display_name',$this->display_name,true);
		$criteria->compare('mapped_table_ids',$this->mapped_table_ids,true);
		$criteria->compare('report_sql',$this->report_sql,true);
		$criteria->compare('page_size',$this->page_size);
		$criteria->compare('csv_type',$this->csv_type);
		$criteria->compare('bill_code',$this->bill_code,true);
		$criteria->compare('filter_params',$this->filter_params,true);
		$criteria->compare('csv_file_name_template',$this->csv_file_name_template,true);
		$criteria->compare('group_name',$this->group_name,true);
		$criteria->compare('display_order',$this->display_order);
		$criteria->compare('group_display_order',$this->group_display_order);
		$criteria->compare('print_template',$this->print_template,true);
		$criteria->compare('csv_enclosure',$this->csv_enclosure,true);
		$criteria->compare('include_column_headers',$this->include_column_headers);
		$criteria->compare('field_seperator',$this->field_seperator,true);
		$criteria->compare('record_seperator',$this->record_seperator,true);
		$criteria->compare('csv_log_column',$this->csv_log_column,true);
		$criteria->compare('print_log_column',$this->print_log_column,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('from_clause',$this->from_clause,true);
		$criteria->compare('where_clause',$this->where_clause,true);
		$criteria->compare('order_by_clause',$this->order_by_clause,true);
		$criteria->compare('menu_column',$this->menu_column,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return ReportCsv the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getCsvMappedMaster() {
        $sql = " SELECT mm.csv_report_id, mm.report_name 
                FROM {$this->tableName()} as mm 
                ORDER BY mm.csv_report_id ASC ";
        $cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryAll();
    }
    public function getCsvExportMappedName() {
    	 $sql = " SELECT mm.csv_report_id, mm.report_name 
                FROM {$this->tableName()} as mm 
                WHERE mm.csv_type=1
                ORDER BY mm.csv_report_id ASC ";
        $cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryAll();
    }

	public function getReportList() {
    	 $sql = "SELECT
					cr.csv_report_id,
					cr.report_name,
					cr.bill_code,
					cr.filter_params,
					cr.group_name,
					0 AS record_count,
					cr.print_template,
					cr.csv_enclosure
				FROM
					{$this->tableName()} AS cr
				WHERE
				(
					cr.delete_flg = 0
					OR cr.delete_flg IS NULL
				)
				ORDER BY
					cr.group_display_order,
					cr.display_order";
        $cmd = Yii::app()->db->createCommand($sql);
        $reports = $cmd->queryAll();
        // $data = array();
        /*foreach ($reports as $key => $report) {
        	$filter_params = '';
        	if (!empty($report['filter_params'])){
        		$filter_params =  CJSON::decode($report['filter_params'], true);
        		$sql_count = "SELECT count(*) 
        						from oms_order_master t3
        						inner join oms_order_detail t4 on t3.order_master_id = t4.order_master_id";
        		$where = " WHERE (t3.delete_flg = 0 or t3.delete_flg is null)";
        		$value_arr = array("{BILL_CODE}"=>$report['bill_code']);

        		foreach ($filter_params as $column => $value) {
        			$value = VText::t($value, $value_arr);
        			$filter_value = $value;
    				$where .=" AND ";
        			if (empty($value)){
						$filter_value = "#";
        				$where .= " ({$column}::text is null or {$column}::text = '')";
        			}
        			else
        			{
        				$where .= " {$column}::text = '{$value}'";
        			}
        			$filter_params[$column] = $filter_value;
        		}
        		if (!empty($where))
        			$sql_count .= $where;

		        $cmd1 = Yii::app()->db->createCommand($sql_count);
				$count = $cmd1->queryScalar();
				$report['filter_params'] = $filter_params;
				$report['record_count'] = $count;
        	}
        	$data[] = $report;
        }*/
        return $reports;
    }

    public function actionSaveCsvMappedName() {
        
    }

     public function updateCsvMappedMaster($csvReportId, $csvMappedName, $mapTableId, $importExportCsvComboValue,$bill_code,$name_jp,$report_name) {
        $mapTableId='{'.$mapTableId.'}';
        $sql = "UPDATE {$this->tableName()}
                SET
                    mapped_table_ids =:mapTableId, 
                	bill_code = :bill_code, 
                	report_name=:report_name,
                	csv_type = $importExportCsvComboValue, page_size=20
                WHERE csv_report_id =:csvReportId";
               // echo $sql; die;
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_STR);
       	$cmd->bindParam(':bill_code', $bill_code, PDO::PARAM_STR);
       // $cmd->bindParam(':name_jp', $name_jp, PDO::PARAM_STR);
        $cmd->bindParam(':report_name', $report_name, PDO::PARAM_STR);
        $cmd->bindParam(':mapTableId', $mapTableId, PDO::PARAM_INT);
        return $cmd->queryRow();
    }
    public function getPrintLog_csvLogColumn($csvReportId){
    	$sql="SELECT csv_log_column, print_log_column 
    	from {$this->tableName()}
    	where csv_report_id =:csvReportId";
    	$cmd = Yii::app()->db->createCommand($sql);
    	$cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_STR);
    	return $cmd->queryRow();
    }
    public function _manageReportLastLog($print,$csv_report_id,$orderDetailIds,$orderMasterIds,$user_id,$user_name,$user_role){
         /*begin transaction*/
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            $this->_insertReportLastLog($print,$csv_report_id,$orderDetailIds,$orderMasterIds,$user_id,$user_name,$user_role);
            $transaction->commit();
            $arr = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess')
            );
        }
        catch (Exception $e) {
            $transaction->rollback();
            Yii::app()->user->setFlash('error', "{$e->getMessage()}");
            $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );
        }
    }
    
    private function _insertReportLastLog($print,$csv_report_id,$orderDetailIds,$orderMasterIds,$user_id,$user_name,$user_role){
    	$csv_printLogColumns=CsvMappedMaster::model()->getPrintLog_csvLogColumn($csv_report_id);
		if($print){
			$log_column_name=$csv_printLogColumns['print_log_column'];
        }
        else{
        	$log_column_name=$csv_printLogColumns['csv_log_column'];
        }
        if(empty($log_column_name)){
            return;
        }
		$dateTime = new DateTime();
        $dateTime_formatted = $dateTime->format('Y-m-d H:i:s');
        $log_info='['.$dateTime_formatted.']'.' '.$user_name.'('.$user_role.')';
        $orderDetailIds = implode(",", $orderDetailIds);

        //--update query
        $sql="update oms_report_last_log t12 set $log_column_name = '$log_info'
			from oms_order_detail t4
			where t4.order_detail_id = t12.order_detail_id
			and t4.order_detail_id in ($orderDetailIds)";
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->execute();
		//insert Query
		$sql="insert into oms_report_last_log (order_master_id, order_detail_id, $log_column_name)
			select t4.order_master_id, t4.order_detail_id, '$log_info' as log_info
			from oms_order_detail t4
			left join oms_report_last_log t12 on t4.order_detail_id = t12.order_detail_id
			where t4.order_detail_id in ($orderDetailIds)
			and t12.report_last_log_id is null";
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->execute();
    }
}
