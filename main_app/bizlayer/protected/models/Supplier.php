<?php

/**
 * This is the model class for table "hbase.h_supplier".
 *
 * The followings are the available columns in table 'hbase.h_supplier':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_7_01
 * @property string $column_7_02
 * @property string $column_7_03
 * @property string $column_7_04
 * @property string $column_7_05
 * @property string $column_7_06
 * @property string $column_7_07
 * @property string $column_7_08
 * @property string $column_7_09
 * @property string $column_7_10
 * @property string $column_7_11
 * @property string $column_7_12
 * @property string $column_7_13
 * @property string $column_7_14
 * @property string $column_7_15
 * @property string $column_7_16
 * @property string $column_7_17
 * @property string $column_7_18
 * @property string $column_7_19
 * @property string $column_7_20
 * @property string $column_7_21
 * @property string $column_7_22
 * @property string $column_7_23
 * @property string $column_7_24
 * @property string $column_7_25
 * @property string $column_7_26
 * @property string $column_7_27
 * @property string $column_7_28
 * @property string $column_7_29
 * @property string $column_7_30
 * @property string $column_7_31
 * @property string $column_7_32
 * @property string $column_7_33
 * @property string $column_7_34
 * @property string $column_7_35
 * @property string $column_7_36
 * @property string $column_7_37
 * @property string $column_7_38
 * @property string $column_7_39
 * @property string $column_7_40
 * @property string $column_7_41
 * @property string $column_7_42
 * @property string $column_7_43
 * @property string $column_7_44
 * @property string $column_7_45
 * @property string $column_7_46
 * @property string $column_7_47
 * @property string $column_7_48
 * @property string $column_7_49
 * @property string $column_7_50
 * @property string $column_7_51
 * @property string $column_7_52
 * @property string $column_7_53
 * @property string $column_7_54
 * @property string $column_7_55
 * @property string $column_7_56
 * @property string $column_7_57
 * @property string $column_7_58
 * @property string $column_7_59
 * @property string $column_7_60
 * @property string $column_7_61
 * @property string $column_7_62
 * @property string $column_7_63
 * @property string $column_7_64
 * @property string $column_7_65
 * @property string $column_7_66
 * @property string $column_7_67
 * @property string $column_7_68
 * @property string $column_7_69
 * @property string $column_7_70
 * @property string $column_7_71
 * @property string $column_7_72
 * @property string $column_7_73
 * @property string $column_7_74
 * @property string $column_7_75
 * @property string $column_7_76
 * @property string $column_7_77
 * @property string $column_7_78
 * @property string $column_7_79
 * @property string $column_7_80
 * @property string $column_7_81
 * @property string $column_7_82
 * @property string $column_7_83
 * @property string $column_7_84
 * @property string $column_7_85
 * @property string $column_7_86
 * @property string $column_7_87
 * @property string $column_7_88
 * @property string $column_7_89
 * @property string $column_7_90
 * @property string $column_7_91
 * @property string $column_7_92
 * @property string $column_7_93
 * @property string $column_7_94
 * @property string $column_7_95
 * @property string $column_7_96
 * @property string $column_7_97
 * @property string $column_7_98
 * @property string $column_7_99
 * @property string $column_7_100
 * @property string $ext_id
 */
class Supplier extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		// $this->_datagrid_id = 1;
		$this->_table_id = 7;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_supplier';
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
			array('column_7_02, column_7_03, column_7_04, column_7_05, column_7_06, column_7_07, column_7_08, column_7_09, column_7_11, column_7_12, column_7_13, column_7_14, column_7_15, column_7_17, column_7_18, column_7_19, column_7_20, column_7_21, column_7_22, column_7_23, column_7_24, column_7_25, column_7_26, column_7_27, column_7_28, column_7_29, column_7_31, column_7_32, column_7_33, column_7_34, column_7_35, column_7_37, column_7_38, column_7_39, column_7_40, column_7_41, column_7_42, column_7_43, column_7_44, column_7_45, column_7_46, column_7_47, column_7_48, column_7_49, column_7_51, column_7_52, column_7_53, column_7_54, column_7_55, column_7_57, column_7_58, column_7_59, column_7_60, column_7_61, column_7_62, column_7_63, column_7_64, column_7_65, column_7_66, column_7_67, column_7_68, column_7_69, column_7_71, column_7_72, column_7_73, column_7_74, column_7_75, column_7_77, column_7_78, column_7_79, column_7_80, column_7_81, column_7_82, column_7_83, column_7_84, column_7_85, column_7_86, column_7_87, column_7_88, column_7_89, column_7_90, column_7_91, column_7_92, column_7_93, column_7_94, column_7_95, column_7_96, column_7_97, column_7_98, column_7_99, column_7_100, ext_id', 'length', 'max'=>100),
			array('column_7_10, column_7_30, column_7_50, column_7_70', 'length', 'max'=>1000),
			array('column_7_16, column_7_36, column_7_56, column_7_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_7_01, column_7_02, column_7_03, column_7_04, column_7_05, column_7_06, column_7_07, column_7_08, column_7_09, column_7_10, column_7_11, column_7_12, column_7_13, column_7_14, column_7_15, column_7_16, column_7_17, column_7_18, column_7_19, column_7_20, column_7_21, column_7_22, column_7_23, column_7_24, column_7_25, column_7_26, column_7_27, column_7_28, column_7_29, column_7_30, column_7_31, column_7_32, column_7_33, column_7_34, column_7_35, column_7_36, column_7_37, column_7_38, column_7_39, column_7_40, column_7_41, column_7_42, column_7_43, column_7_44, column_7_45, column_7_46, column_7_47, column_7_48, column_7_49, column_7_50, column_7_51, column_7_52, column_7_53, column_7_54, column_7_55, column_7_56, column_7_57, column_7_58, column_7_59, column_7_60, column_7_61, column_7_62, column_7_63, column_7_64, column_7_65, column_7_66, column_7_67, column_7_68, column_7_69, column_7_70, column_7_71, column_7_72, column_7_73, column_7_74, column_7_75, column_7_76, column_7_77, column_7_78, column_7_79, column_7_80, column_7_81, column_7_82, column_7_83, column_7_84, column_7_85, column_7_86, column_7_87, column_7_88, column_7_89, column_7_90, column_7_91, column_7_92, column_7_93, column_7_94, column_7_95, column_7_96, column_7_97, column_7_98, column_7_99, column_7_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_7_01' => 'Column 7 01',
			'column_7_02' => 'Column 7 02',
			'column_7_03' => 'Column 7 03',
			'column_7_04' => 'Column 7 04',
			'column_7_05' => 'Column 7 05',
			'column_7_06' => 'Column 7 06',
			'column_7_07' => 'Column 7 07',
			'column_7_08' => 'Column 7 08',
			'column_7_09' => 'Column 7 09',
			'column_7_10' => 'Column 7 10',
			'column_7_11' => 'Column 7 11',
			'column_7_12' => 'Column 7 12',
			'column_7_13' => 'Column 7 13',
			'column_7_14' => 'Column 7 14',
			'column_7_15' => 'Column 7 15',
			'column_7_16' => 'Column 7 16',
			'column_7_17' => 'Column 7 17',
			'column_7_18' => 'Column 7 18',
			'column_7_19' => 'Column 7 19',
			'column_7_20' => 'Column 7 20',
			'column_7_21' => 'Column 7 21',
			'column_7_22' => 'Column 7 22',
			'column_7_23' => 'Column 7 23',
			'column_7_24' => 'Column 7 24',
			'column_7_25' => 'Column 7 25',
			'column_7_26' => 'Column 7 26',
			'column_7_27' => 'Column 7 27',
			'column_7_28' => 'Column 7 28',
			'column_7_29' => 'Column 7 29',
			'column_7_30' => 'Column 7 30',
			'column_7_31' => 'Column 7 31',
			'column_7_32' => 'Column 7 32',
			'column_7_33' => 'Column 7 33',
			'column_7_34' => 'Column 7 34',
			'column_7_35' => 'Column 7 35',
			'column_7_36' => 'Column 7 36',
			'column_7_37' => 'Column 7 37',
			'column_7_38' => 'Column 7 38',
			'column_7_39' => 'Column 7 39',
			'column_7_40' => 'Column 7 40',
			'column_7_41' => 'Column 7 41',
			'column_7_42' => 'Column 7 42',
			'column_7_43' => 'Column 7 43',
			'column_7_44' => 'Column 7 44',
			'column_7_45' => 'Column 7 45',
			'column_7_46' => 'Column 7 46',
			'column_7_47' => 'Column 7 47',
			'column_7_48' => 'Column 7 48',
			'column_7_49' => 'Column 7 49',
			'column_7_50' => 'Column 7 50',
			'column_7_51' => 'Column 7 51',
			'column_7_52' => 'Column 7 52',
			'column_7_53' => 'Column 7 53',
			'column_7_54' => 'Column 7 54',
			'column_7_55' => 'Column 7 55',
			'column_7_56' => 'Column 7 56',
			'column_7_57' => 'Column 7 57',
			'column_7_58' => 'Column 7 58',
			'column_7_59' => 'Column 7 59',
			'column_7_60' => 'Column 7 60',
			'column_7_61' => 'Column 7 61',
			'column_7_62' => 'Column 7 62',
			'column_7_63' => 'Column 7 63',
			'column_7_64' => 'Column 7 64',
			'column_7_65' => 'Column 7 65',
			'column_7_66' => 'Column 7 66',
			'column_7_67' => 'Column 7 67',
			'column_7_68' => 'Column 7 68',
			'column_7_69' => 'Column 7 69',
			'column_7_70' => 'Column 7 70',
			'column_7_71' => 'Column 7 71',
			'column_7_72' => 'Column 7 72',
			'column_7_73' => 'Column 7 73',
			'column_7_74' => 'Column 7 74',
			'column_7_75' => 'Column 7 75',
			'column_7_76' => 'Column 7 76',
			'column_7_77' => 'Column 7 77',
			'column_7_78' => 'Column 7 78',
			'column_7_79' => 'Column 7 79',
			'column_7_80' => 'Column 7 80',
			'column_7_81' => 'Column 7 81',
			'column_7_82' => 'Column 7 82',
			'column_7_83' => 'Column 7 83',
			'column_7_84' => 'Column 7 84',
			'column_7_85' => 'Column 7 85',
			'column_7_86' => 'Column 7 86',
			'column_7_87' => 'Column 7 87',
			'column_7_88' => 'Column 7 88',
			'column_7_89' => 'Column 7 89',
			'column_7_90' => 'Column 7 90',
			'column_7_91' => 'Column 7 91',
			'column_7_92' => 'Column 7 92',
			'column_7_93' => 'Column 7 93',
			'column_7_94' => 'Column 7 94',
			'column_7_95' => 'Column 7 95',
			'column_7_96' => 'Column 7 96',
			'column_7_97' => 'Column 7 97',
			'column_7_98' => 'Column 7 98',
			'column_7_99' => 'Column 7 99',
			'column_7_100' => 'Column 7 100',
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
		$criteria->compare('column_7_01',$this->column_7_01);
		$criteria->compare('column_7_02',$this->column_7_02,true);
		$criteria->compare('column_7_03',$this->column_7_03,true);
		$criteria->compare('column_7_04',$this->column_7_04,true);
		$criteria->compare('column_7_05',$this->column_7_05,true);
		$criteria->compare('column_7_06',$this->column_7_06,true);
		$criteria->compare('column_7_07',$this->column_7_07,true);
		$criteria->compare('column_7_08',$this->column_7_08,true);
		$criteria->compare('column_7_09',$this->column_7_09,true);
		$criteria->compare('column_7_10',$this->column_7_10,true);
		$criteria->compare('column_7_11',$this->column_7_11,true);
		$criteria->compare('column_7_12',$this->column_7_12,true);
		$criteria->compare('column_7_13',$this->column_7_13,true);
		$criteria->compare('column_7_14',$this->column_7_14,true);
		$criteria->compare('column_7_15',$this->column_7_15,true);
		$criteria->compare('column_7_16',$this->column_7_16,true);
		$criteria->compare('column_7_17',$this->column_7_17,true);
		$criteria->compare('column_7_18',$this->column_7_18,true);
		$criteria->compare('column_7_19',$this->column_7_19,true);
		$criteria->compare('column_7_20',$this->column_7_20,true);
		$criteria->compare('column_7_21',$this->column_7_21,true);
		$criteria->compare('column_7_22',$this->column_7_22,true);
		$criteria->compare('column_7_23',$this->column_7_23,true);
		$criteria->compare('column_7_24',$this->column_7_24,true);
		$criteria->compare('column_7_25',$this->column_7_25,true);
		$criteria->compare('column_7_26',$this->column_7_26,true);
		$criteria->compare('column_7_27',$this->column_7_27,true);
		$criteria->compare('column_7_28',$this->column_7_28,true);
		$criteria->compare('column_7_29',$this->column_7_29,true);
		$criteria->compare('column_7_30',$this->column_7_30,true);
		$criteria->compare('column_7_31',$this->column_7_31,true);
		$criteria->compare('column_7_32',$this->column_7_32,true);
		$criteria->compare('column_7_33',$this->column_7_33,true);
		$criteria->compare('column_7_34',$this->column_7_34,true);
		$criteria->compare('column_7_35',$this->column_7_35,true);
		$criteria->compare('column_7_36',$this->column_7_36,true);
		$criteria->compare('column_7_37',$this->column_7_37,true);
		$criteria->compare('column_7_38',$this->column_7_38,true);
		$criteria->compare('column_7_39',$this->column_7_39,true);
		$criteria->compare('column_7_40',$this->column_7_40,true);
		$criteria->compare('column_7_41',$this->column_7_41,true);
		$criteria->compare('column_7_42',$this->column_7_42,true);
		$criteria->compare('column_7_43',$this->column_7_43,true);
		$criteria->compare('column_7_44',$this->column_7_44,true);
		$criteria->compare('column_7_45',$this->column_7_45,true);
		$criteria->compare('column_7_46',$this->column_7_46,true);
		$criteria->compare('column_7_47',$this->column_7_47,true);
		$criteria->compare('column_7_48',$this->column_7_48,true);
		$criteria->compare('column_7_49',$this->column_7_49,true);
		$criteria->compare('column_7_50',$this->column_7_50,true);
		$criteria->compare('column_7_51',$this->column_7_51,true);
		$criteria->compare('column_7_52',$this->column_7_52,true);
		$criteria->compare('column_7_53',$this->column_7_53,true);
		$criteria->compare('column_7_54',$this->column_7_54,true);
		$criteria->compare('column_7_55',$this->column_7_55,true);
		$criteria->compare('column_7_56',$this->column_7_56,true);
		$criteria->compare('column_7_57',$this->column_7_57,true);
		$criteria->compare('column_7_58',$this->column_7_58,true);
		$criteria->compare('column_7_59',$this->column_7_59,true);
		$criteria->compare('column_7_60',$this->column_7_60,true);
		$criteria->compare('column_7_61',$this->column_7_61,true);
		$criteria->compare('column_7_62',$this->column_7_62,true);
		$criteria->compare('column_7_63',$this->column_7_63,true);
		$criteria->compare('column_7_64',$this->column_7_64,true);
		$criteria->compare('column_7_65',$this->column_7_65,true);
		$criteria->compare('column_7_66',$this->column_7_66,true);
		$criteria->compare('column_7_67',$this->column_7_67,true);
		$criteria->compare('column_7_68',$this->column_7_68,true);
		$criteria->compare('column_7_69',$this->column_7_69,true);
		$criteria->compare('column_7_70',$this->column_7_70,true);
		$criteria->compare('column_7_71',$this->column_7_71,true);
		$criteria->compare('column_7_72',$this->column_7_72,true);
		$criteria->compare('column_7_73',$this->column_7_73,true);
		$criteria->compare('column_7_74',$this->column_7_74,true);
		$criteria->compare('column_7_75',$this->column_7_75,true);
		$criteria->compare('column_7_76',$this->column_7_76,true);
		$criteria->compare('column_7_77',$this->column_7_77,true);
		$criteria->compare('column_7_78',$this->column_7_78,true);
		$criteria->compare('column_7_79',$this->column_7_79,true);
		$criteria->compare('column_7_80',$this->column_7_80,true);
		$criteria->compare('column_7_81',$this->column_7_81,true);
		$criteria->compare('column_7_82',$this->column_7_82,true);
		$criteria->compare('column_7_83',$this->column_7_83,true);
		$criteria->compare('column_7_84',$this->column_7_84,true);
		$criteria->compare('column_7_85',$this->column_7_85,true);
		$criteria->compare('column_7_86',$this->column_7_86,true);
		$criteria->compare('column_7_87',$this->column_7_87,true);
		$criteria->compare('column_7_88',$this->column_7_88,true);
		$criteria->compare('column_7_89',$this->column_7_89,true);
		$criteria->compare('column_7_90',$this->column_7_90,true);
		$criteria->compare('column_7_91',$this->column_7_91,true);
		$criteria->compare('column_7_92',$this->column_7_92,true);
		$criteria->compare('column_7_93',$this->column_7_93,true);
		$criteria->compare('column_7_94',$this->column_7_94,true);
		$criteria->compare('column_7_95',$this->column_7_95,true);
		$criteria->compare('column_7_96',$this->column_7_96,true);
		$criteria->compare('column_7_97',$this->column_7_97,true);
		$criteria->compare('column_7_98',$this->column_7_98,true);
		$criteria->compare('column_7_99',$this->column_7_99,true);
		$criteria->compare('column_7_100',$this->column_7_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Supplier the static model class
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
        $mode        			= empty($params['mode']) ? null:$params['mode'];
        
    	$alais = "t7";
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
			$sql .= "{$select_fields}, t7.id, t7.ext_id";
    		$sql .= $this->getSyncStatusColumn('t7', $synctime, $user_id);
    	}

    	$sql .= " FROM {$this->tableName()} AS t7";

		if(!empty($synctime)) {
        	$sql .= " WHERE (t7.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " WHERE  (t7.delete_flg = 0  AND  t7.is_draft = 0";
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
    		$default_sort_order = " t7.column_7_01 DESC ";
			$sort_order = $this->getSortOrder('t7', $sort, $default_sort_order);
			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0){
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";
			}

    	}
        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){
			$results = $cmd->queryScalar();
    	}else {
        	$results = $cmd->queryAll();
    	}

		return $results;
    }

    public function getFilterByRoleCondition($params)
    {
    	$alais 					=  $params['alais'];
    	$user_info 				=  $params['user_info'];
        $user_role = $user_info['userRole'];
        $company_id = $user_info['company_id'];
        $department_id = $user_info['department_id'];
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
    public function getSuppplierRecord($supplier_code, $login_company_id){
    	if(empty($supplier_code))
    		return array();
    	$sql = "SELECT * 
    			FROM ".$this->tableName() 
    			." WHERE (delete_flg= 0 OR delete_flg IS NULL)";
		$sql.=" AND column_7_05 = '{$supplier_code}'";
		$sql.=" AND company_id = '{$login_company_id}'";
		
    	$cmd = Yii::app()->db->createCommand($sql);
    	return $cmd->queryRow();
    }
}
