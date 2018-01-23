<?php

/**
 * This is the model class for table "hbase.h_customer".
 *
 * The followings are the available columns in table 'hbase.h_customer':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_3_01
 * @property string $column_3_02
 * @property string $column_3_03
 * @property string $column_3_04
 * @property string $column_3_05
 * @property string $column_3_06
 * @property string $column_3_07
 * @property string $column_3_08
 * @property string $column_3_09
 * @property string $column_3_10
 * @property string $column_3_11
 * @property string $column_3_12
 * @property string $column_3_13
 * @property string $column_3_14
 * @property string $column_3_15
 * @property string $column_3_16
 * @property string $column_3_17
 * @property string $column_3_18
 * @property string $column_3_19
 * @property string $column_3_20
 * @property string $column_3_21
 * @property string $column_3_22
 * @property string $column_3_23
 * @property string $column_3_24
 * @property string $column_3_25
 * @property string $column_3_26
 * @property string $column_3_27
 * @property string $column_3_28
 * @property string $column_3_29
 * @property string $column_3_30
 * @property string $column_3_31
 * @property string $column_3_32
 * @property string $column_3_33
 * @property string $column_3_34
 * @property string $column_3_35
 * @property string $column_3_36
 * @property string $column_3_37
 * @property string $column_3_38
 * @property string $column_3_39
 * @property string $column_3_40
 * @property string $column_3_41
 * @property string $column_3_42
 * @property string $column_3_43
 * @property string $column_3_44
 * @property string $column_3_45
 * @property string $column_3_46
 * @property string $column_3_47
 * @property string $column_3_48
 * @property string $column_3_49
 * @property string $column_3_50
 * @property string $column_3_51
 * @property string $column_3_52
 * @property string $column_3_53
 * @property string $column_3_54
 * @property string $column_3_55
 * @property string $column_3_56
 * @property string $column_3_57
 * @property string $column_3_58
 * @property string $column_3_59
 * @property string $column_3_60
 * @property string $column_3_61
 * @property string $column_3_62
 * @property string $column_3_63
 * @property string $column_3_64
 * @property string $column_3_65
 * @property string $column_3_66
 * @property string $column_3_67
 * @property string $column_3_68
 * @property string $column_3_69
 * @property string $column_3_70
 * @property string $column_3_71
 * @property string $column_3_72
 * @property string $column_3_73
 * @property string $column_3_74
 * @property string $column_3_75
 * @property string $column_3_76
 * @property string $column_3_77
 * @property string $column_3_78
 * @property string $column_3_79
 * @property string $column_3_80
 * @property string $column_3_81
 * @property string $column_3_82
 * @property string $column_3_83
 * @property string $column_3_84
 * @property string $column_3_85
 * @property string $column_3_86
 * @property string $column_3_87
 * @property string $column_3_88
 * @property string $column_3_89
 * @property string $column_3_90
 * @property string $column_3_91
 * @property string $column_3_92
 * @property string $column_3_93
 * @property string $column_3_94
 * @property string $column_3_95
 * @property string $column_3_96
 * @property string $column_3_97
 * @property string $column_3_98
 * @property string $column_3_99
 * @property string $column_3_100
 * @property string $ext_id
 */
class Customer extends YIGBaseModel
{
	public function __construct() {
       	parent::__construct();
		$this->_table_id = 3;
		
    }

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_customer';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, store_id, created_by, updated_by, delete_flg, is_draft', 'numerical', 'integerOnly'=>true),
			array('column_3_02, column_3_03, column_3_04, column_3_05, column_3_06, column_3_07, column_3_08, column_3_09, column_3_11, column_3_12, column_3_13, column_3_14, column_3_15, column_3_17, column_3_18, column_3_19, column_3_20, column_3_21, column_3_22, column_3_23, column_3_24, column_3_25, column_3_26, column_3_27, column_3_28, column_3_29, column_3_31, column_3_32, column_3_33, column_3_34, column_3_35, column_3_37, column_3_38, column_3_39, column_3_40, column_3_41, column_3_42, column_3_43, column_3_44, column_3_45, column_3_46, column_3_47, column_3_48, column_3_49, column_3_51, column_3_52, column_3_53, column_3_54, column_3_55, column_3_57, column_3_58, column_3_59, column_3_60, column_3_61, column_3_62, column_3_63, column_3_64, column_3_65, column_3_66, column_3_67, column_3_68, column_3_69, column_3_71, column_3_72, column_3_73, column_3_74, column_3_75, column_3_77, column_3_78, column_3_79, column_3_80, column_3_81, column_3_82, column_3_83, column_3_84, column_3_85, column_3_86, column_3_87, column_3_88, column_3_89, column_3_90, column_3_91, column_3_92, column_3_93, column_3_94, column_3_95, column_3_96, column_3_97, column_3_98, column_3_99, column_3_100, ext_id', 'length', 'max'=>100),
			array('column_3_10, column_3_30, column_3_50, column_3_70', 'length', 'max'=>1000),
			array('column_3_16, column_3_36, column_3_56, column_3_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			array('column_3_05','unique','on'=>'insert,update', 'message'=>'Customer Code already exist'),
			array('column_3_09','unique','on'=>'insert,update', 'message'=>'NRIC Code already exist'),


			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_3_01, column_3_02, column_3_03, column_3_04, column_3_05, column_3_06, column_3_07, column_3_08, column_3_09, column_3_10, column_3_11, column_3_12, column_3_13, column_3_14, column_3_15, column_3_16, column_3_17, column_3_18, column_3_19, column_3_20, column_3_21, column_3_22, column_3_23, column_3_24, column_3_25, column_3_26, column_3_27, column_3_28, column_3_29, column_3_30, column_3_31, column_3_32, column_3_33, column_3_34, column_3_35, column_3_36, column_3_37, column_3_38, column_3_39, column_3_40, column_3_41, column_3_42, column_3_43, column_3_44, column_3_45, column_3_46, column_3_47, column_3_48, column_3_49, column_3_50, column_3_51, column_3_52, column_3_53, column_3_54, column_3_55, column_3_56, column_3_57, column_3_58, column_3_59, column_3_60, column_3_61, column_3_62, column_3_63, column_3_64, column_3_65, column_3_66, column_3_67, column_3_68, column_3_69, column_3_70, column_3_71, column_3_72, column_3_73, column_3_74, column_3_75, column_3_76, column_3_77, column_3_78, column_3_79, column_3_80, column_3_81, column_3_82, column_3_83, column_3_84, column_3_85, column_3_86, column_3_87, column_3_88, column_3_89, column_3_90, column_3_91, column_3_92, column_3_93, column_3_94, column_3_95, column_3_96, column_3_97, column_3_98, column_3_99, column_3_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_3_01' => 'Column 3 01',
			'column_3_02' => 'Column 3 02',
			'column_3_03' => 'Column 3 03',
			'column_3_04' => 'Column 3 04',
			'column_3_05' => 'Column 3 05',
			'column_3_06' => 'Column 3 06',
			'column_3_07' => 'Column 3 07',
			'column_3_08' => 'Column 3 08',
			'column_3_09' => 'Column 3 09',
			'column_3_10' => 'Column 3 10',
			'column_3_11' => 'Column 3 11',
			'column_3_12' => 'Column 3 12',
			'column_3_13' => 'Column 3 13',
			'column_3_14' => 'Column 3 14',
			'column_3_15' => 'Column 3 15',
			'column_3_16' => 'Column 3 16',
			'column_3_17' => 'Column 3 17',
			'column_3_18' => 'Column 3 18',
			'column_3_19' => 'Column 3 19',
			'column_3_20' => 'Column 3 20',
			'column_3_21' => 'Column 3 21',
			'column_3_22' => 'Column 3 22',
			'column_3_23' => 'Column 3 23',
			'column_3_24' => 'Column 3 24',
			'column_3_25' => 'Column 3 25',
			'column_3_26' => 'Column 3 26',
			'column_3_27' => 'Column 3 27',
			'column_3_28' => 'Column 3 28',
			'column_3_29' => 'Column 3 29',
			'column_3_30' => 'Column 3 30',
			'column_3_31' => 'Column 3 31',
			'column_3_32' => 'Column 3 32',
			'column_3_33' => 'Column 3 33',
			'column_3_34' => 'Column 3 34',
			'column_3_35' => 'Column 3 35',
			'column_3_36' => 'Column 3 36',
			'column_3_37' => 'Column 3 37',
			'column_3_38' => 'Column 3 38',
			'column_3_39' => 'Column 3 39',
			'column_3_40' => 'Column 3 40',
			'column_3_41' => 'Column 3 41',
			'column_3_42' => 'Column 3 42',
			'column_3_43' => 'Column 3 43',
			'column_3_44' => 'Column 3 44',
			'column_3_45' => 'Column 3 45',
			'column_3_46' => 'Column 3 46',
			'column_3_47' => 'Column 3 47',
			'column_3_48' => 'Column 3 48',
			'column_3_49' => 'Column 3 49',
			'column_3_50' => 'Column 3 50',
			'column_3_51' => 'Column 3 51',
			'column_3_52' => 'Column 3 52',
			'column_3_53' => 'Column 3 53',
			'column_3_54' => 'Column 3 54',
			'column_3_55' => 'Column 3 55',
			'column_3_56' => 'Column 3 56',
			'column_3_57' => 'Column 3 57',
			'column_3_58' => 'Column 3 58',
			'column_3_59' => 'Column 3 59',
			'column_3_60' => 'Column 3 60',
			'column_3_61' => 'Column 3 61',
			'column_3_62' => 'Column 3 62',
			'column_3_63' => 'Column 3 63',
			'column_3_64' => 'Column 3 64',
			'column_3_65' => 'Column 3 65',
			'column_3_66' => 'Column 3 66',
			'column_3_67' => 'Column 3 67',
			'column_3_68' => 'Column 3 68',
			'column_3_69' => 'Column 3 69',
			'column_3_70' => 'Column 3 70',
			'column_3_71' => 'Column 3 71',
			'column_3_72' => 'Column 3 72',
			'column_3_73' => 'Column 3 73',
			'column_3_74' => 'Column 3 74',
			'column_3_75' => 'Column 3 75',
			'column_3_76' => 'Column 3 76',
			'column_3_77' => 'Column 3 77',
			'column_3_78' => 'Column 3 78',
			'column_3_79' => 'Column 3 79',
			'column_3_80' => 'Column 3 80',
			'column_3_81' => 'Column 3 81',
			'column_3_82' => 'Column 3 82',
			'column_3_83' => 'Column 3 83',
			'column_3_84' => 'Column 3 84',
			'column_3_85' => 'Column 3 85',
			'column_3_86' => 'Column 3 86',
			'column_3_87' => 'Column 3 87',
			'column_3_88' => 'Column 3 88',
			'column_3_89' => 'Column 3 89',
			'column_3_90' => 'Column 3 90',
			'column_3_91' => 'Column 3 91',
			'column_3_92' => 'Column 3 92',
			'column_3_93' => 'Column 3 93',
			'column_3_94' => 'Column 3 94',
			'column_3_95' => 'Column 3 95',
			'column_3_96' => 'Column 3 96',
			'column_3_97' => 'Column 3 97',
			'column_3_98' => 'Column 3 98',
			'column_3_99' => 'Column 3 99',
			'column_3_100' => 'Column 3 100',
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
		$criteria->compare('column_3_01',$this->column_3_01);
		$criteria->compare('column_3_02',$this->column_3_02,true);
		$criteria->compare('column_3_03',$this->column_3_03,true);
		$criteria->compare('column_3_04',$this->column_3_04,true);
		$criteria->compare('column_3_05',$this->column_3_05,true);
		$criteria->compare('column_3_06',$this->column_3_06,true);
		$criteria->compare('column_3_07',$this->column_3_07,true);
		$criteria->compare('column_3_08',$this->column_3_08,true);
		$criteria->compare('column_3_09',$this->column_3_09,true);
		$criteria->compare('column_3_10',$this->column_3_10,true);
		$criteria->compare('column_3_11',$this->column_3_11,true);
		$criteria->compare('column_3_12',$this->column_3_12,true);
		$criteria->compare('column_3_13',$this->column_3_13,true);
		$criteria->compare('column_3_14',$this->column_3_14,true);
		$criteria->compare('column_3_15',$this->column_3_15,true);
		$criteria->compare('column_3_16',$this->column_3_16,true);
		$criteria->compare('column_3_17',$this->column_3_17,true);
		$criteria->compare('column_3_18',$this->column_3_18,true);
		$criteria->compare('column_3_19',$this->column_3_19,true);
		$criteria->compare('column_3_20',$this->column_3_20,true);
		$criteria->compare('column_3_21',$this->column_3_21,true);
		$criteria->compare('column_3_22',$this->column_3_22,true);
		$criteria->compare('column_3_23',$this->column_3_23,true);
		$criteria->compare('column_3_24',$this->column_3_24,true);
		$criteria->compare('column_3_25',$this->column_3_25,true);
		$criteria->compare('column_3_26',$this->column_3_26,true);
		$criteria->compare('column_3_27',$this->column_3_27,true);
		$criteria->compare('column_3_28',$this->column_3_28,true);
		$criteria->compare('column_3_29',$this->column_3_29,true);
		$criteria->compare('column_3_30',$this->column_3_30,true);
		$criteria->compare('column_3_31',$this->column_3_31,true);
		$criteria->compare('column_3_32',$this->column_3_32,true);
		$criteria->compare('column_3_33',$this->column_3_33,true);
		$criteria->compare('column_3_34',$this->column_3_34,true);
		$criteria->compare('column_3_35',$this->column_3_35,true);
		$criteria->compare('column_3_36',$this->column_3_36,true);
		$criteria->compare('column_3_37',$this->column_3_37,true);
		$criteria->compare('column_3_38',$this->column_3_38,true);
		$criteria->compare('column_3_39',$this->column_3_39,true);
		$criteria->compare('column_3_40',$this->column_3_40,true);
		$criteria->compare('column_3_41',$this->column_3_41,true);
		$criteria->compare('column_3_42',$this->column_3_42,true);
		$criteria->compare('column_3_43',$this->column_3_43,true);
		$criteria->compare('column_3_44',$this->column_3_44,true);
		$criteria->compare('column_3_45',$this->column_3_45,true);
		$criteria->compare('column_3_46',$this->column_3_46,true);
		$criteria->compare('column_3_47',$this->column_3_47,true);
		$criteria->compare('column_3_48',$this->column_3_48,true);
		$criteria->compare('column_3_49',$this->column_3_49,true);
		$criteria->compare('column_3_50',$this->column_3_50,true);
		$criteria->compare('column_3_51',$this->column_3_51,true);
		$criteria->compare('column_3_52',$this->column_3_52,true);
		$criteria->compare('column_3_53',$this->column_3_53,true);
		$criteria->compare('column_3_54',$this->column_3_54,true);
		$criteria->compare('column_3_55',$this->column_3_55,true);
		$criteria->compare('column_3_56',$this->column_3_56,true);
		$criteria->compare('column_3_57',$this->column_3_57,true);
		$criteria->compare('column_3_58',$this->column_3_58,true);
		$criteria->compare('column_3_59',$this->column_3_59,true);
		$criteria->compare('column_3_60',$this->column_3_60,true);
		$criteria->compare('column_3_61',$this->column_3_61,true);
		$criteria->compare('column_3_62',$this->column_3_62,true);
		$criteria->compare('column_3_63',$this->column_3_63,true);
		$criteria->compare('column_3_64',$this->column_3_64,true);
		$criteria->compare('column_3_65',$this->column_3_65,true);
		$criteria->compare('column_3_66',$this->column_3_66,true);
		$criteria->compare('column_3_67',$this->column_3_67,true);
		$criteria->compare('column_3_68',$this->column_3_68,true);
		$criteria->compare('column_3_69',$this->column_3_69,true);
		$criteria->compare('column_3_70',$this->column_3_70,true);
		$criteria->compare('column_3_71',$this->column_3_71,true);
		$criteria->compare('column_3_72',$this->column_3_72,true);
		$criteria->compare('column_3_73',$this->column_3_73,true);
		$criteria->compare('column_3_74',$this->column_3_74,true);
		$criteria->compare('column_3_75',$this->column_3_75,true);
		$criteria->compare('column_3_76',$this->column_3_76,true);
		$criteria->compare('column_3_77',$this->column_3_77,true);
		$criteria->compare('column_3_78',$this->column_3_78,true);
		$criteria->compare('column_3_79',$this->column_3_79,true);
		$criteria->compare('column_3_80',$this->column_3_80,true);
		$criteria->compare('column_3_81',$this->column_3_81,true);
		$criteria->compare('column_3_82',$this->column_3_82,true);
		$criteria->compare('column_3_83',$this->column_3_83,true);
		$criteria->compare('column_3_84',$this->column_3_84,true);
		$criteria->compare('column_3_85',$this->column_3_85,true);
		$criteria->compare('column_3_86',$this->column_3_86,true);
		$criteria->compare('column_3_87',$this->column_3_87,true);
		$criteria->compare('column_3_88',$this->column_3_88,true);
		$criteria->compare('column_3_89',$this->column_3_89,true);
		$criteria->compare('column_3_90',$this->column_3_90,true);
		$criteria->compare('column_3_91',$this->column_3_91,true);
		$criteria->compare('column_3_92',$this->column_3_92,true);
		$criteria->compare('column_3_93',$this->column_3_93,true);
		$criteria->compare('column_3_94',$this->column_3_94,true);
		$criteria->compare('column_3_95',$this->column_3_95,true);
		$criteria->compare('column_3_96',$this->column_3_96,true);
		$criteria->compare('column_3_97',$this->column_3_97,true);
		$criteria->compare('column_3_98',$this->column_3_98,true);
		$criteria->compare('column_3_99',$this->column_3_99,true);
		$criteria->compare('column_3_100',$this->column_3_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Customer the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function getListData($params) {
    	$for_count				= $params['for_count'];
    	$user_id 				= Yii::app()->user->user_id;
    	$sql_where 				= $params['sql_where'];
    	$user_role				= $params['user_role'];
    	$fields 				= $params['fields'];
    	$pageSize 				= $params['pageSize'];
    	$startFrom 				= $params['startFrom'];
    	$sort 					= $params['sort'];
    	$dgUtil 				= $params['dgUtil'];
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$select_fields 			= null;
    	if ((empty($fields) || count($fields) < 1) && $for_count != true) {
    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
    	}

    	if ($for_count != true)
    		$select_fields = $this->getSelectFields($fields);

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {		
			$sql .= "{$select_fields}, t3.column_3_28, t3.id, t3.ext_id";
			// $sql .= ",CASE WHEN 1 = t3.store_id THEN (t3.id + 1000) ELSE t3.id END AS display_order ";
			$sql .= $this->getSyncStatusColumn('t3', $synctime, $user_id);
    	}

    	$sql .= " from ".$this->tableName()." as t3";

		if(!empty($synctime)) {
        	$sql .= " where (t3.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t3.delete_flg = 0 ";
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

    	if ($for_count != true){
			$default_sort_order = "t3.column_3_01 DESC";
			// $default_sort_order = "t3.column_3_01 desc";
			// $default_sort_order = "display_order DESC";
			$sort_order = $this->getSortOrder('t3', $sort, $default_sort_order);
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

    public function getFilterByRoleCondition($params)
    {
		$alais          =  $params['alais'];
		$user_info      =  $params['user_info'];
		$user_role      = $user_info['userRole'];
		$company_id     = $user_info['company_id'];
		$department_id  = $user_info['department_id'];
		$role_condition = "";
        if (!empty($alais))
            $alais .= ".";
        if (RoleUtil::isSuperAdmin($user_role) || RoleUtil::isAdmin($user_role)){
            //allow all records for for super user.
        }
        else 
        {
            // all department of same company
            $role_condition = " {$alais}company_id = {$company_id} ";
        }
        
        return $role_condition;
    }
    public function getCustomerRecord($customer_code, $login_company_id){
    	if(empty($customer_code))
    		return array();
    	$sql = "SELECT * 
    			FROM ".$this->tableName() 
    			." WHERE (delete_flg= 0 OR delete_flg IS NULL)";
		$sql.=" AND column_3_05 = '{$customer_code}'";
		$sql.=" AND company_id = '{$login_company_id}'";
		
    	$cmd = Yii::app()->db->createCommand($sql);
    	return $cmd->queryRow();
    }
}
