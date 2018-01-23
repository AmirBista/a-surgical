<?php

/**
 * This is the model class for table "hbase.h_service_detail".
 *
 * The followings are the available columns in table 'hbase.h_service_detail':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $service_master_id
 * @property integer $column_11_01
 * @property string $column_11_02
 * @property string $column_11_03
 * @property string $column_11_04
 * @property string $column_11_05
 * @property string $column_11_06
 * @property string $column_11_07
 * @property string $column_11_08
 * @property string $column_11_09
 * @property string $column_11_10
 * @property string $column_11_11
 * @property string $column_11_12
 * @property string $column_11_13
 * @property string $column_11_14
 * @property string $column_11_15
 * @property string $column_11_16
 * @property string $column_11_17
 * @property string $column_11_18
 * @property string $column_11_19
 * @property string $column_11_20
 * @property string $column_11_21
 * @property string $column_11_22
 * @property string $column_11_23
 * @property string $column_11_24
 * @property string $column_11_25
 * @property string $column_11_26
 * @property string $column_11_27
 * @property string $column_11_28
 * @property string $column_11_29
 * @property string $column_11_30
 * @property string $column_11_31
 * @property string $column_11_32
 * @property string $column_11_33
 * @property string $column_11_34
 * @property string $column_11_35
 * @property string $column_11_36
 * @property string $column_11_37
 * @property string $column_11_38
 * @property string $column_11_39
 * @property string $column_11_40
 * @property string $column_11_41
 * @property string $column_11_42
 * @property string $column_11_43
 * @property string $column_11_44
 * @property string $column_11_45
 * @property string $column_11_46
 * @property string $column_11_47
 * @property string $column_11_48
 * @property string $column_11_49
 * @property string $column_11_50
 * @property string $column_11_51
 * @property string $column_11_52
 * @property string $column_11_53
 * @property string $column_11_54
 * @property string $column_11_55
 * @property string $column_11_56
 * @property string $column_11_57
 * @property string $column_11_58
 * @property string $column_11_59
 * @property string $column_11_60
 * @property string $column_11_61
 * @property string $column_11_62
 * @property string $column_11_63
 * @property string $column_11_64
 * @property string $column_11_65
 * @property string $column_11_66
 * @property string $column_11_67
 * @property string $column_11_68
 * @property string $column_11_69
 * @property string $column_11_70
 * @property string $column_11_71
 * @property string $column_11_72
 * @property string $column_11_73
 * @property string $column_11_74
 * @property string $column_11_75
 * @property string $column_11_76
 * @property string $column_11_77
 * @property string $column_11_78
 * @property string $column_11_79
 * @property string $column_11_80
 * @property string $column_11_81
 * @property string $column_11_82
 * @property string $column_11_83
 * @property string $column_11_84
 * @property string $column_11_85
 * @property string $column_11_86
 * @property string $column_11_87
 * @property string $column_11_88
 * @property string $column_11_89
 * @property string $column_11_90
 * @property string $column_11_91
 * @property string $column_11_92
 * @property string $column_11_93
 * @property string $column_11_94
 * @property string $column_11_95
 * @property string $column_11_96
 * @property string $column_11_97
 * @property string $column_11_98
 * @property string $column_11_99
 * @property string $column_11_100
 * @property string $ext_id
 */
class ServiceDetail extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_id = 11;
		$this->_table_id = 11;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_service_detail';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, store_id, created_by, updated_by, delete_flg, is_draft, service_master_id', 'numerical', 'integerOnly'=>true),
			array('column_11_02, column_11_03, column_11_04, column_11_05, column_11_06, column_11_07, column_11_08, column_11_09, column_11_11, column_11_12, column_11_13, column_11_14, column_11_15, column_11_17, column_11_18, column_11_19, column_11_20, column_11_21, column_11_22, column_11_23, column_11_24, column_11_25, column_11_26, column_11_27, column_11_28, column_11_29, column_11_31, column_11_32, column_11_33, column_11_34, column_11_35, column_11_37, column_11_38, column_11_39, column_11_40, column_11_41, column_11_42, column_11_43, column_11_44, column_11_45, column_11_46, column_11_47, column_11_48, column_11_49, column_11_51, column_11_52, column_11_53, column_11_54, column_11_55, column_11_57, column_11_58, column_11_59, column_11_60, column_11_61, column_11_62, column_11_63, column_11_64, column_11_65, column_11_66, column_11_67, column_11_68, column_11_69, column_11_71, column_11_72, column_11_73, column_11_74, column_11_75, column_11_77, column_11_78, column_11_79, column_11_80, column_11_81, column_11_82, column_11_83, column_11_84, column_11_85, column_11_86, column_11_87, column_11_88, column_11_89, column_11_90, column_11_91, column_11_92, column_11_93, column_11_94, column_11_95, column_11_96, column_11_97, column_11_98, column_11_99, column_11_100, ext_id', 'length', 'max'=>100),
			array('column_11_10, column_11_30, column_11_50, column_11_70', 'length', 'max'=>1000),
			array('column_11_16, column_11_36, column_11_56, column_11_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, service_master_id, column_11_01, column_11_02, column_11_03, column_11_04, column_11_05, column_11_06, column_11_07, column_11_08, column_11_09, column_11_10, column_11_11, column_11_12, column_11_13, column_11_14, column_11_15, column_11_16, column_11_17, column_11_18, column_11_19, column_11_20, column_11_21, column_11_22, column_11_23, column_11_24, column_11_25, column_11_26, column_11_27, column_11_28, column_11_29, column_11_30, column_11_31, column_11_32, column_11_33, column_11_34, column_11_35, column_11_36, column_11_37, column_11_38, column_11_39, column_11_40, column_11_41, column_11_42, column_11_43, column_11_44, column_11_45, column_11_46, column_11_47, column_11_48, column_11_49, column_11_50, column_11_51, column_11_52, column_11_53, column_11_54, column_11_55, column_11_56, column_11_57, column_11_58, column_11_59, column_11_60, column_11_61, column_11_62, column_11_63, column_11_64, column_11_65, column_11_66, column_11_67, column_11_68, column_11_69, column_11_70, column_11_71, column_11_72, column_11_73, column_11_74, column_11_75, column_11_76, column_11_77, column_11_78, column_11_79, column_11_80, column_11_81, column_11_82, column_11_83, column_11_84, column_11_85, column_11_86, column_11_87, column_11_88, column_11_89, column_11_90, column_11_91, column_11_92, column_11_93, column_11_94, column_11_95, column_11_96, column_11_97, column_11_98, column_11_99, column_11_100, ext_id', 'safe', 'on'=>'search'),
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
			'id' => 'ID',
			'company_id' => 'Company',
			'store_id' => 'Store',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'delete_flg' => 'Delete Flg',
			'is_draft' => 'Is Draft',
			'service_master_id' => 'Service Master',
			'column_11_01' => 'Column 11 01',
			'column_11_02' => 'Column 11 02',
			'column_11_03' => 'Column 11 03',
			'column_11_04' => 'Column 11 04',
			'column_11_05' => 'Column 11 05',
			'column_11_06' => 'Column 11 06',
			'column_11_07' => 'Column 11 07',
			'column_11_08' => 'Column 11 08',
			'column_11_09' => 'Column 11 09',
			'column_11_10' => 'Column 11 10',
			'column_11_11' => 'Column 11 11',
			'column_11_12' => 'Column 11 12',
			'column_11_13' => 'Column 11 13',
			'column_11_14' => 'Column 11 14',
			'column_11_15' => 'Column 11 15',
			'column_11_16' => 'Column 11 16',
			'column_11_17' => 'Column 11 17',
			'column_11_18' => 'Column 11 18',
			'column_11_19' => 'Column 11 19',
			'column_11_20' => 'Column 11 20',
			'column_11_21' => 'Column 11 21',
			'column_11_22' => 'Column 11 22',
			'column_11_23' => 'Column 11 23',
			'column_11_24' => 'Column 11 24',
			'column_11_25' => 'Column 11 25',
			'column_11_26' => 'Column 11 26',
			'column_11_27' => 'Column 11 27',
			'column_11_28' => 'Column 11 28',
			'column_11_29' => 'Column 11 29',
			'column_11_30' => 'Column 11 30',
			'column_11_31' => 'Column 11 31',
			'column_11_32' => 'Column 11 32',
			'column_11_33' => 'Column 11 33',
			'column_11_34' => 'Column 11 34',
			'column_11_35' => 'Column 11 35',
			'column_11_36' => 'Column 11 36',
			'column_11_37' => 'Column 11 37',
			'column_11_38' => 'Column 11 38',
			'column_11_39' => 'Column 11 39',
			'column_11_40' => 'Column 11 40',
			'column_11_41' => 'Column 11 41',
			'column_11_42' => 'Column 11 42',
			'column_11_43' => 'Column 11 43',
			'column_11_44' => 'Column 11 44',
			'column_11_45' => 'Column 11 45',
			'column_11_46' => 'Column 11 46',
			'column_11_47' => 'Column 11 47',
			'column_11_48' => 'Column 11 48',
			'column_11_49' => 'Column 11 49',
			'column_11_50' => 'Column 11 50',
			'column_11_51' => 'Column 11 51',
			'column_11_52' => 'Column 11 52',
			'column_11_53' => 'Column 11 53',
			'column_11_54' => 'Column 11 54',
			'column_11_55' => 'Column 11 55',
			'column_11_56' => 'Column 11 56',
			'column_11_57' => 'Column 11 57',
			'column_11_58' => 'Column 11 58',
			'column_11_59' => 'Column 11 59',
			'column_11_60' => 'Column 11 60',
			'column_11_61' => 'Column 11 61',
			'column_11_62' => 'Column 11 62',
			'column_11_63' => 'Column 11 63',
			'column_11_64' => 'Column 11 64',
			'column_11_65' => 'Column 11 65',
			'column_11_66' => 'Column 11 66',
			'column_11_67' => 'Column 11 67',
			'column_11_68' => 'Column 11 68',
			'column_11_69' => 'Column 11 69',
			'column_11_70' => 'Column 11 70',
			'column_11_71' => 'Column 11 71',
			'column_11_72' => 'Column 11 72',
			'column_11_73' => 'Column 11 73',
			'column_11_74' => 'Column 11 74',
			'column_11_75' => 'Column 11 75',
			'column_11_76' => 'Column 11 76',
			'column_11_77' => 'Column 11 77',
			'column_11_78' => 'Column 11 78',
			'column_11_79' => 'Column 11 79',
			'column_11_80' => 'Column 11 80',
			'column_11_81' => 'Column 11 81',
			'column_11_82' => 'Column 11 82',
			'column_11_83' => 'Column 11 83',
			'column_11_84' => 'Column 11 84',
			'column_11_85' => 'Column 11 85',
			'column_11_86' => 'Column 11 86',
			'column_11_87' => 'Column 11 87',
			'column_11_88' => 'Column 11 88',
			'column_11_89' => 'Column 11 89',
			'column_11_90' => 'Column 11 90',
			'column_11_91' => 'Column 11 91',
			'column_11_92' => 'Column 11 92',
			'column_11_93' => 'Column 11 93',
			'column_11_94' => 'Column 11 94',
			'column_11_95' => 'Column 11 95',
			'column_11_96' => 'Column 11 96',
			'column_11_97' => 'Column 11 97',
			'column_11_98' => 'Column 11 98',
			'column_11_99' => 'Column 11 99',
			'column_11_100' => 'Column 11 100',
			'ext_id' => 'Ext',
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

		$criteria->compare('id',$this->id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('store_id',$this->store_id);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('is_draft',$this->is_draft);
		$criteria->compare('service_master_id',$this->service_master_id);
		$criteria->compare('column_11_01',$this->column_11_01);
		$criteria->compare('column_11_02',$this->column_11_02,true);
		$criteria->compare('column_11_03',$this->column_11_03,true);
		$criteria->compare('column_11_04',$this->column_11_04,true);
		$criteria->compare('column_11_05',$this->column_11_05,true);
		$criteria->compare('column_11_06',$this->column_11_06,true);
		$criteria->compare('column_11_07',$this->column_11_07,true);
		$criteria->compare('column_11_08',$this->column_11_08,true);
		$criteria->compare('column_11_09',$this->column_11_09,true);
		$criteria->compare('column_11_10',$this->column_11_10,true);
		$criteria->compare('column_11_11',$this->column_11_11,true);
		$criteria->compare('column_11_12',$this->column_11_12,true);
		$criteria->compare('column_11_13',$this->column_11_13,true);
		$criteria->compare('column_11_14',$this->column_11_14,true);
		$criteria->compare('column_11_15',$this->column_11_15,true);
		$criteria->compare('column_11_16',$this->column_11_16,true);
		$criteria->compare('column_11_17',$this->column_11_17,true);
		$criteria->compare('column_11_18',$this->column_11_18,true);
		$criteria->compare('column_11_19',$this->column_11_19,true);
		$criteria->compare('column_11_20',$this->column_11_20,true);
		$criteria->compare('column_11_21',$this->column_11_21,true);
		$criteria->compare('column_11_22',$this->column_11_22,true);
		$criteria->compare('column_11_23',$this->column_11_23,true);
		$criteria->compare('column_11_24',$this->column_11_24,true);
		$criteria->compare('column_11_25',$this->column_11_25,true);
		$criteria->compare('column_11_26',$this->column_11_26,true);
		$criteria->compare('column_11_27',$this->column_11_27,true);
		$criteria->compare('column_11_28',$this->column_11_28,true);
		$criteria->compare('column_11_29',$this->column_11_29,true);
		$criteria->compare('column_11_30',$this->column_11_30,true);
		$criteria->compare('column_11_31',$this->column_11_31,true);
		$criteria->compare('column_11_32',$this->column_11_32,true);
		$criteria->compare('column_11_33',$this->column_11_33,true);
		$criteria->compare('column_11_34',$this->column_11_34,true);
		$criteria->compare('column_11_35',$this->column_11_35,true);
		$criteria->compare('column_11_36',$this->column_11_36,true);
		$criteria->compare('column_11_37',$this->column_11_37,true);
		$criteria->compare('column_11_38',$this->column_11_38,true);
		$criteria->compare('column_11_39',$this->column_11_39,true);
		$criteria->compare('column_11_40',$this->column_11_40,true);
		$criteria->compare('column_11_41',$this->column_11_41,true);
		$criteria->compare('column_11_42',$this->column_11_42,true);
		$criteria->compare('column_11_43',$this->column_11_43,true);
		$criteria->compare('column_11_44',$this->column_11_44,true);
		$criteria->compare('column_11_45',$this->column_11_45,true);
		$criteria->compare('column_11_46',$this->column_11_46,true);
		$criteria->compare('column_11_47',$this->column_11_47,true);
		$criteria->compare('column_11_48',$this->column_11_48,true);
		$criteria->compare('column_11_49',$this->column_11_49,true);
		$criteria->compare('column_11_50',$this->column_11_50,true);
		$criteria->compare('column_11_51',$this->column_11_51,true);
		$criteria->compare('column_11_52',$this->column_11_52,true);
		$criteria->compare('column_11_53',$this->column_11_53,true);
		$criteria->compare('column_11_54',$this->column_11_54,true);
		$criteria->compare('column_11_55',$this->column_11_55,true);
		$criteria->compare('column_11_56',$this->column_11_56,true);
		$criteria->compare('column_11_57',$this->column_11_57,true);
		$criteria->compare('column_11_58',$this->column_11_58,true);
		$criteria->compare('column_11_59',$this->column_11_59,true);
		$criteria->compare('column_11_60',$this->column_11_60,true);
		$criteria->compare('column_11_61',$this->column_11_61,true);
		$criteria->compare('column_11_62',$this->column_11_62,true);
		$criteria->compare('column_11_63',$this->column_11_63,true);
		$criteria->compare('column_11_64',$this->column_11_64,true);
		$criteria->compare('column_11_65',$this->column_11_65,true);
		$criteria->compare('column_11_66',$this->column_11_66,true);
		$criteria->compare('column_11_67',$this->column_11_67,true);
		$criteria->compare('column_11_68',$this->column_11_68,true);
		$criteria->compare('column_11_69',$this->column_11_69,true);
		$criteria->compare('column_11_70',$this->column_11_70,true);
		$criteria->compare('column_11_71',$this->column_11_71,true);
		$criteria->compare('column_11_72',$this->column_11_72,true);
		$criteria->compare('column_11_73',$this->column_11_73,true);
		$criteria->compare('column_11_74',$this->column_11_74,true);
		$criteria->compare('column_11_75',$this->column_11_75,true);
		$criteria->compare('column_11_76',$this->column_11_76,true);
		$criteria->compare('column_11_77',$this->column_11_77,true);
		$criteria->compare('column_11_78',$this->column_11_78,true);
		$criteria->compare('column_11_79',$this->column_11_79,true);
		$criteria->compare('column_11_80',$this->column_11_80,true);
		$criteria->compare('column_11_81',$this->column_11_81,true);
		$criteria->compare('column_11_82',$this->column_11_82,true);
		$criteria->compare('column_11_83',$this->column_11_83,true);
		$criteria->compare('column_11_84',$this->column_11_84,true);
		$criteria->compare('column_11_85',$this->column_11_85,true);
		$criteria->compare('column_11_86',$this->column_11_86,true);
		$criteria->compare('column_11_87',$this->column_11_87,true);
		$criteria->compare('column_11_88',$this->column_11_88,true);
		$criteria->compare('column_11_89',$this->column_11_89,true);
		$criteria->compare('column_11_90',$this->column_11_90,true);
		$criteria->compare('column_11_91',$this->column_11_91,true);
		$criteria->compare('column_11_92',$this->column_11_92,true);
		$criteria->compare('column_11_93',$this->column_11_93,true);
		$criteria->compare('column_11_94',$this->column_11_94,true);
		$criteria->compare('column_11_95',$this->column_11_95,true);
		$criteria->compare('column_11_96',$this->column_11_96,true);
		$criteria->compare('column_11_97',$this->column_11_97,true);
		$criteria->compare('column_11_98',$this->column_11_98,true);
		$criteria->compare('column_11_99',$this->column_11_99,true);
		$criteria->compare('column_11_100',$this->column_11_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return ServiceDetail the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function getWhereCondition($params) {
		$alais                    = $params['alais'];
		$mode                     = empty($params['mode']) ? null:$params['mode'];
		$entry_id		          = empty($params['entry_id']) ? 0:$params['entry_id'];
		$currency_type            = empty($params['currency_type']) ? null:$params['currency_type'];
		
        $sql_where = parent::getWhereCondition($params);
    	
    	if(!empty($entry_id)){
    		if(!empty($sql_where)){
           		$sql_where.= " AND ";
        	}
        	$sql_where .= " {$alais}.service_master_id = ". $entry_id;
    	}
        
        return $sql_where;
    }

	public function getListData($params) {
		$for_count                  = $params['for_count'];
		$user_id                    = Yii::app()->user->user_id;
		$sql_where                  = $params['sql_where'];
		$user_role                  = $params['user_role'];
		$fields                     = $params['fields'];
		$pageSize                   = empty($params['pageSize']) ? null:$params['pageSize'];
		$startFrom                  = empty($params['startFrom']) ? 0:$params['startFrom'];
		$sort                       = empty($params['sort']) ? null:$params['sort'];
		$dgUtil                     = $params['dgUtil'];
		$datagrid_template_id       = empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
		$synctime                   = empty($params['synctime']) ? null:$params['synctime'];
		
		$order_master_id			= empty($params['order_master_id']) ? null:$params['order_master_id'];
		
		if(empty($order_master_id)){
	    	if ((empty($fields) || count($fields) < 1) && $for_count != true ) {
	    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
	    	}
	    	
	    	if ($for_count != true)
	    		$select_fields = $this->getSelectFields($fields);
		}
		else{
			$csv_report_id = 11;
			$sql = " SELECT public.yigfx_get_csv_report_query({$csv_report_id}::integer,1,1,0,0) ";
			$cmd = Yii::app()->db->createCommand($sql);
			$innerQuery = $cmd->queryScalar();
			$innerQueryWhere = " AND t2.order_master_id = {$order_master_id}::integer ";
			$innerQuery = $innerQuery.$innerQueryWhere;
		}


    	// else if($for_count != true){
    	// 	$select_fields = "t11.*";
    	// }

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {
			if(empty($order_master_id)){
				$sql .= "{$select_fields}, t11.id, t11.ext_id,t11.service_master_id";
				$sql .= $this->getSyncStatusColumn('t11', $synctime, $user_id);
			}
			else{
				$sql .= " t2.* ";
			}
    	}

    	if(empty($order_master_id)){
	    	$sql .= " from ".$this->tableName()." as t11";
			$sql.= " INNER JOIN ".t('tblSchema','hb_').".h_service_master t10 ON t10.id = t11.service_master_id AND t10.delete_flg = 0";
			if(!empty($synctime)) {
	        	$sql .= " where (t11.updated_datetime > '{$synctime}'";
	        }else {
				$sql .= " where  (t11.delete_flg = 0 ";
	        }
			if (!empty($sql_where))
			{
				$sql .= " AND {$sql_where}";
			}
			if (!empty($bulk_sql_where))
			{
				$sql .= " AND ({$bulk_sql_where})";
			}
			$sql .=")";
    	}
    	else{

    		$sql.= " FROM ({$innerQuery}) t2 ";
    	}

	   
    	

    	if ($for_count != true){
    		if(empty($order_master_id)){
				$default_sort_order = "convert_tonumeric(t11.column_11_29) ASC";
				$sort_order = $this->getSortOrder('t11', $sort, $default_sort_order);
    		}
			else{
				$sort_order = "ORDER BY convert_tonumeric(t2.column_11_29) ASC";
			}    		

			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0)
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";

    	}

        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){

			$results = $cmd->queryScalar();
    	}else{
    		$results = $cmd->queryAll();
    	}
		return $results;
    }
}
