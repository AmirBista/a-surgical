<?php

/**
 * This is the model class for table "hbase.h_batch_detail".
 *
 * The followings are the available columns in table 'hbase.h_batch_detail':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $supplier_id
 * @property integer $batch_master_id
 * @property integer $column_6_01
 * @property string $column_6_02
 * @property string $column_6_03
 * @property string $column_6_04
 * @property string $column_6_05
 * @property string $column_6_06
 * @property string $column_6_07
 * @property string $column_6_08
 * @property string $column_6_09
 * @property string $column_6_10
 * @property string $column_6_11
 * @property string $column_6_12
 * @property string $column_6_13
 * @property string $column_6_14
 * @property string $column_6_15
 * @property string $column_6_16
 * @property string $column_6_17
 * @property string $column_6_18
 * @property string $column_6_19
 * @property string $column_6_20
 * @property string $column_6_21
 * @property string $column_6_22
 * @property string $column_6_23
 * @property string $column_6_24
 * @property string $column_6_25
 * @property string $column_6_26
 * @property string $column_6_27
 * @property string $column_6_28
 * @property string $column_6_29
 * @property string $column_6_30
 * @property string $column_6_31
 * @property string $column_6_32
 * @property string $column_6_33
 * @property string $column_6_34
 * @property string $column_6_35
 * @property string $column_6_36
 * @property string $column_6_37
 * @property string $column_6_38
 * @property string $column_6_39
 * @property string $column_6_40
 * @property string $column_6_41
 * @property string $column_6_42
 * @property string $column_6_43
 * @property string $column_6_44
 * @property string $column_6_45
 * @property string $column_6_46
 * @property string $column_6_47
 * @property string $column_6_48
 * @property string $column_6_49
 * @property string $column_6_50
 * @property string $column_6_51
 * @property string $column_6_52
 * @property string $column_6_53
 * @property string $column_6_54
 * @property string $column_6_55
 * @property string $column_6_56
 * @property string $column_6_57
 * @property string $column_6_58
 * @property string $column_6_59
 * @property string $column_6_60
 * @property string $column_6_61
 * @property string $column_6_62
 * @property string $column_6_63
 * @property string $column_6_64
 * @property string $column_6_65
 * @property string $column_6_66
 * @property string $column_6_67
 * @property string $column_6_68
 * @property string $column_6_69
 * @property string $column_6_70
 * @property string $column_6_71
 * @property string $column_6_72
 * @property string $column_6_73
 * @property string $column_6_74
 * @property string $column_6_75
 * @property string $column_6_76
 * @property string $column_6_77
 * @property string $column_6_78
 * @property string $column_6_79
 * @property string $column_6_80
 * @property string $column_6_81
 * @property string $column_6_82
 * @property string $column_6_83
 * @property string $column_6_84
 * @property string $column_6_85
 * @property string $column_6_86
 * @property string $column_6_87
 * @property string $column_6_88
 * @property string $column_6_89
 * @property string $column_6_90
 * @property string $column_6_91
 * @property string $column_6_92
 * @property string $column_6_93
 * @property string $column_6_94
 * @property string $column_6_95
 * @property string $column_6_96
 * @property string $column_6_97
 * @property string $column_6_98
 * @property string $column_6_99
 * @property string $column_6_100
 * @property string $ext_id
 * @property integer $product_id
 */
class BatchDetail extends YIGBaseModel
{
	
	public function __construct()
	{
		parent::__construct();
		//$this->_datagrid_id = 1;
		$this->_table_id = 6;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_batch_detail';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, store_id, created_by, updated_by, delete_flg, is_draft, supplier_id, batch_master_id, product_id', 'numerical', 'integerOnly'=>true),
			array('column_6_02, column_6_03, column_6_04, column_6_05, column_6_06, column_6_07, column_6_08, column_6_09, column_6_11, column_6_12, column_6_13, column_6_14, column_6_15, column_6_17, column_6_18, column_6_19, column_6_20, column_6_21, column_6_22, column_6_23, column_6_24, column_6_25, column_6_26, column_6_27, column_6_28, column_6_29, column_6_31, column_6_32, column_6_33, column_6_34, column_6_35, column_6_37, column_6_38, column_6_39, column_6_40, column_6_41, column_6_42, column_6_43, column_6_44, column_6_45, column_6_46, column_6_47, column_6_48, column_6_49, column_6_51, column_6_52, column_6_53, column_6_54, column_6_55, column_6_57, column_6_58, column_6_59, column_6_60, column_6_61, column_6_62, column_6_63, column_6_64, column_6_65, column_6_66, column_6_67, column_6_68, column_6_69, column_6_71, column_6_72, column_6_73, column_6_74, column_6_75, column_6_77, column_6_78, column_6_79, column_6_80, column_6_81, column_6_82, column_6_83, column_6_84, column_6_85, column_6_86, column_6_87, column_6_88, column_6_89, column_6_90, column_6_91, column_6_92, column_6_93, column_6_94, column_6_95, column_6_96, column_6_97, column_6_98, column_6_99, column_6_100, ext_id', 'length', 'max'=>100),
			array('column_6_10, column_6_30, column_6_50, column_6_70', 'length', 'max'=>1000),
			array('column_6_16, column_6_36, column_6_56, column_6_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, supplier_id, batch_master_id, column_6_01, column_6_02, column_6_03, column_6_04, column_6_05, column_6_06, column_6_07, column_6_08, column_6_09, column_6_10, column_6_11, column_6_12, column_6_13, column_6_14, column_6_15, column_6_16, column_6_17, column_6_18, column_6_19, column_6_20, column_6_21, column_6_22, column_6_23, column_6_24, column_6_25, column_6_26, column_6_27, column_6_28, column_6_29, column_6_30, column_6_31, column_6_32, column_6_33, column_6_34, column_6_35, column_6_36, column_6_37, column_6_38, column_6_39, column_6_40, column_6_41, column_6_42, column_6_43, column_6_44, column_6_45, column_6_46, column_6_47, column_6_48, column_6_49, column_6_50, column_6_51, column_6_52, column_6_53, column_6_54, column_6_55, column_6_56, column_6_57, column_6_58, column_6_59, column_6_60, column_6_61, column_6_62, column_6_63, column_6_64, column_6_65, column_6_66, column_6_67, column_6_68, column_6_69, column_6_70, column_6_71, column_6_72, column_6_73, column_6_74, column_6_75, column_6_76, column_6_77, column_6_78, column_6_79, column_6_80, column_6_81, column_6_82, column_6_83, column_6_84, column_6_85, column_6_86, column_6_87, column_6_88, column_6_89, column_6_90, column_6_91, column_6_92, column_6_93, column_6_94, column_6_95, column_6_96, column_6_97, column_6_98, column_6_99, column_6_100, ext_id, product_id', 'safe', 'on'=>'search'),
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
			'supplier_id' => 'Supplier',
			'batch_master_id' => 'Batch Master',
			'column_6_01' => 'Column 6 01',
			'column_6_02' => 'Column 6 02',
			'column_6_03' => 'Column 6 03',
			'column_6_04' => 'Column 6 04',
			'column_6_05' => 'Column 6 05',
			'column_6_06' => 'Column 6 06',
			'column_6_07' => 'Column 6 07',
			'column_6_08' => 'Column 6 08',
			'column_6_09' => 'Column 6 09',
			'column_6_10' => 'Column 6 10',
			'column_6_11' => 'Column 6 11',
			'column_6_12' => 'Column 6 12',
			'column_6_13' => 'Column 6 13',
			'column_6_14' => 'Column 6 14',
			'column_6_15' => 'Column 6 15',
			'column_6_16' => 'Column 6 16',
			'column_6_17' => 'Column 6 17',
			'column_6_18' => 'Column 6 18',
			'column_6_19' => 'Column 6 19',
			'column_6_20' => 'Column 6 20',
			'column_6_21' => 'Column 6 21',
			'column_6_22' => 'Column 6 22',
			'column_6_23' => 'Column 6 23',
			'column_6_24' => 'Column 6 24',
			'column_6_25' => 'Column 6 25',
			'column_6_26' => 'Column 6 26',
			'column_6_27' => 'Column 6 27',
			'column_6_28' => 'Column 6 28',
			'column_6_29' => 'Column 6 29',
			'column_6_30' => 'Column 6 30',
			'column_6_31' => 'Column 6 31',
			'column_6_32' => 'Column 6 32',
			'column_6_33' => 'Column 6 33',
			'column_6_34' => 'Column 6 34',
			'column_6_35' => 'Column 6 35',
			'column_6_36' => 'Column 6 36',
			'column_6_37' => 'Column 6 37',
			'column_6_38' => 'Column 6 38',
			'column_6_39' => 'Column 6 39',
			'column_6_40' => 'Column 6 40',
			'column_6_41' => 'Column 6 41',
			'column_6_42' => 'Column 6 42',
			'column_6_43' => 'Column 6 43',
			'column_6_44' => 'Column 6 44',
			'column_6_45' => 'Column 6 45',
			'column_6_46' => 'Column 6 46',
			'column_6_47' => 'Column 6 47',
			'column_6_48' => 'Column 6 48',
			'column_6_49' => 'Column 6 49',
			'column_6_50' => 'Column 6 50',
			'column_6_51' => 'Column 6 51',
			'column_6_52' => 'Column 6 52',
			'column_6_53' => 'Column 6 53',
			'column_6_54' => 'Column 6 54',
			'column_6_55' => 'Column 6 55',
			'column_6_56' => 'Column 6 56',
			'column_6_57' => 'Column 6 57',
			'column_6_58' => 'Column 6 58',
			'column_6_59' => 'Column 6 59',
			'column_6_60' => 'Column 6 60',
			'column_6_61' => 'Column 6 61',
			'column_6_62' => 'Column 6 62',
			'column_6_63' => 'Column 6 63',
			'column_6_64' => 'Column 6 64',
			'column_6_65' => 'Column 6 65',
			'column_6_66' => 'Column 6 66',
			'column_6_67' => 'Column 6 67',
			'column_6_68' => 'Column 6 68',
			'column_6_69' => 'Column 6 69',
			'column_6_70' => 'Column 6 70',
			'column_6_71' => 'Column 6 71',
			'column_6_72' => 'Column 6 72',
			'column_6_73' => 'Column 6 73',
			'column_6_74' => 'Column 6 74',
			'column_6_75' => 'Column 6 75',
			'column_6_76' => 'Column 6 76',
			'column_6_77' => 'Column 6 77',
			'column_6_78' => 'Column 6 78',
			'column_6_79' => 'Column 6 79',
			'column_6_80' => 'Column 6 80',
			'column_6_81' => 'Column 6 81',
			'column_6_82' => 'Column 6 82',
			'column_6_83' => 'Column 6 83',
			'column_6_84' => 'Column 6 84',
			'column_6_85' => 'Column 6 85',
			'column_6_86' => 'Column 6 86',
			'column_6_87' => 'Column 6 87',
			'column_6_88' => 'Column 6 88',
			'column_6_89' => 'Column 6 89',
			'column_6_90' => 'Column 6 90',
			'column_6_91' => 'Column 6 91',
			'column_6_92' => 'Column 6 92',
			'column_6_93' => 'Column 6 93',
			'column_6_94' => 'Column 6 94',
			'column_6_95' => 'Column 6 95',
			'column_6_96' => 'Column 6 96',
			'column_6_97' => 'Column 6 97',
			'column_6_98' => 'Column 6 98',
			'column_6_99' => 'Column 6 99',
			'column_6_100' => 'Column 6 100',
			'ext_id' => 'Ext',
			'product_id' => 'Product',
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
		$criteria->compare('supplier_id',$this->supplier_id);
		$criteria->compare('batch_master_id',$this->batch_master_id);
		$criteria->compare('column_6_01',$this->column_6_01);
		$criteria->compare('column_6_02',$this->column_6_02,true);
		$criteria->compare('column_6_03',$this->column_6_03,true);
		$criteria->compare('column_6_04',$this->column_6_04,true);
		$criteria->compare('column_6_05',$this->column_6_05,true);
		$criteria->compare('column_6_06',$this->column_6_06,true);
		$criteria->compare('column_6_07',$this->column_6_07,true);
		$criteria->compare('column_6_08',$this->column_6_08,true);
		$criteria->compare('column_6_09',$this->column_6_09,true);
		$criteria->compare('column_6_10',$this->column_6_10,true);
		$criteria->compare('column_6_11',$this->column_6_11,true);
		$criteria->compare('column_6_12',$this->column_6_12,true);
		$criteria->compare('column_6_13',$this->column_6_13,true);
		$criteria->compare('column_6_14',$this->column_6_14,true);
		$criteria->compare('column_6_15',$this->column_6_15,true);
		$criteria->compare('column_6_16',$this->column_6_16,true);
		$criteria->compare('column_6_17',$this->column_6_17,true);
		$criteria->compare('column_6_18',$this->column_6_18,true);
		$criteria->compare('column_6_19',$this->column_6_19,true);
		$criteria->compare('column_6_20',$this->column_6_20,true);
		$criteria->compare('column_6_21',$this->column_6_21,true);
		$criteria->compare('column_6_22',$this->column_6_22,true);
		$criteria->compare('column_6_23',$this->column_6_23,true);
		$criteria->compare('column_6_24',$this->column_6_24,true);
		$criteria->compare('column_6_25',$this->column_6_25,true);
		$criteria->compare('column_6_26',$this->column_6_26,true);
		$criteria->compare('column_6_27',$this->column_6_27,true);
		$criteria->compare('column_6_28',$this->column_6_28,true);
		$criteria->compare('column_6_29',$this->column_6_29,true);
		$criteria->compare('column_6_30',$this->column_6_30,true);
		$criteria->compare('column_6_31',$this->column_6_31,true);
		$criteria->compare('column_6_32',$this->column_6_32,true);
		$criteria->compare('column_6_33',$this->column_6_33,true);
		$criteria->compare('column_6_34',$this->column_6_34,true);
		$criteria->compare('column_6_35',$this->column_6_35,true);
		$criteria->compare('column_6_36',$this->column_6_36,true);
		$criteria->compare('column_6_37',$this->column_6_37,true);
		$criteria->compare('column_6_38',$this->column_6_38,true);
		$criteria->compare('column_6_39',$this->column_6_39,true);
		$criteria->compare('column_6_40',$this->column_6_40,true);
		$criteria->compare('column_6_41',$this->column_6_41,true);
		$criteria->compare('column_6_42',$this->column_6_42,true);
		$criteria->compare('column_6_43',$this->column_6_43,true);
		$criteria->compare('column_6_44',$this->column_6_44,true);
		$criteria->compare('column_6_45',$this->column_6_45,true);
		$criteria->compare('column_6_46',$this->column_6_46,true);
		$criteria->compare('column_6_47',$this->column_6_47,true);
		$criteria->compare('column_6_48',$this->column_6_48,true);
		$criteria->compare('column_6_49',$this->column_6_49,true);
		$criteria->compare('column_6_50',$this->column_6_50,true);
		$criteria->compare('column_6_51',$this->column_6_51,true);
		$criteria->compare('column_6_52',$this->column_6_52,true);
		$criteria->compare('column_6_53',$this->column_6_53,true);
		$criteria->compare('column_6_54',$this->column_6_54,true);
		$criteria->compare('column_6_55',$this->column_6_55,true);
		$criteria->compare('column_6_56',$this->column_6_56,true);
		$criteria->compare('column_6_57',$this->column_6_57,true);
		$criteria->compare('column_6_58',$this->column_6_58,true);
		$criteria->compare('column_6_59',$this->column_6_59,true);
		$criteria->compare('column_6_60',$this->column_6_60,true);
		$criteria->compare('column_6_61',$this->column_6_61,true);
		$criteria->compare('column_6_62',$this->column_6_62,true);
		$criteria->compare('column_6_63',$this->column_6_63,true);
		$criteria->compare('column_6_64',$this->column_6_64,true);
		$criteria->compare('column_6_65',$this->column_6_65,true);
		$criteria->compare('column_6_66',$this->column_6_66,true);
		$criteria->compare('column_6_67',$this->column_6_67,true);
		$criteria->compare('column_6_68',$this->column_6_68,true);
		$criteria->compare('column_6_69',$this->column_6_69,true);
		$criteria->compare('column_6_70',$this->column_6_70,true);
		$criteria->compare('column_6_71',$this->column_6_71,true);
		$criteria->compare('column_6_72',$this->column_6_72,true);
		$criteria->compare('column_6_73',$this->column_6_73,true);
		$criteria->compare('column_6_74',$this->column_6_74,true);
		$criteria->compare('column_6_75',$this->column_6_75,true);
		$criteria->compare('column_6_76',$this->column_6_76,true);
		$criteria->compare('column_6_77',$this->column_6_77,true);
		$criteria->compare('column_6_78',$this->column_6_78,true);
		$criteria->compare('column_6_79',$this->column_6_79,true);
		$criteria->compare('column_6_80',$this->column_6_80,true);
		$criteria->compare('column_6_81',$this->column_6_81,true);
		$criteria->compare('column_6_82',$this->column_6_82,true);
		$criteria->compare('column_6_83',$this->column_6_83,true);
		$criteria->compare('column_6_84',$this->column_6_84,true);
		$criteria->compare('column_6_85',$this->column_6_85,true);
		$criteria->compare('column_6_86',$this->column_6_86,true);
		$criteria->compare('column_6_87',$this->column_6_87,true);
		$criteria->compare('column_6_88',$this->column_6_88,true);
		$criteria->compare('column_6_89',$this->column_6_89,true);
		$criteria->compare('column_6_90',$this->column_6_90,true);
		$criteria->compare('column_6_91',$this->column_6_91,true);
		$criteria->compare('column_6_92',$this->column_6_92,true);
		$criteria->compare('column_6_93',$this->column_6_93,true);
		$criteria->compare('column_6_94',$this->column_6_94,true);
		$criteria->compare('column_6_95',$this->column_6_95,true);
		$criteria->compare('column_6_96',$this->column_6_96,true);
		$criteria->compare('column_6_97',$this->column_6_97,true);
		$criteria->compare('column_6_98',$this->column_6_98,true);
		$criteria->compare('column_6_99',$this->column_6_99,true);
		$criteria->compare('column_6_100',$this->column_6_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);
		$criteria->compare('product_id',$this->product_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return BatchDetail the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getFilterByRoleCondition($params)
    {
    	$alais 					=  $params['alais'];
    	$user_info 				=  $params['user_info'];
    	$collection_store_id 	= empty($params['collection_store_id'])?null:$params['collection_store_id'];
    	$role_condition = parent::getFilterByRoleCondition($params);
        $user_role = $user_info['userRole'];
        $company_id = $user_info['company_id'];
        $department_id = $user_info['department_id'];
        if (!empty($alais))
            $alais .= ".";

        if (RoleUtil::isStoreManager($user_role) && !empty($collection_store_id))
        {
            // same department of same company
            $role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$collection_store_id} ";
        }
        return $role_condition;
    } 

	public function getWhereCondition($params) {
		$alais                    = $params['alais'];
		$mode                     = empty($params['mode']) ? null:$params['mode'];
		$batch_master_id          = empty($params['batch_master_id']) ? 0:$params['batch_master_id'];
		$forBatchDetailPanel      = empty($params['forBatchDetailPanel']) ? 0:$params['forBatchDetailPanel'];
		$forEntryPanel            = empty($params['forEntryPanel']) ? 0:$params['forEntryPanel'];
		$product_code             = empty($params['product_code']) ? null:$params['product_code'];
		$supplier_id              = empty($params['supplier_id']) ? 0:$params['supplier_id'];
		$currency_type            = empty($params['currency_type']) ? null:$params['currency_type'];
		$forOrderMasterEntryPanel = empty($params['forOrderMasterEntryPanel']) ? 0:$params['forOrderMasterEntryPanel'];
		$forServiceEntryPanel 	  = empty($params['forServiceEntryPanel']) ? 0:$params['forServiceEntryPanel'];
		$company_id               = empty($params['company_id']) ? null:$params['company_id'];
		$store_id                 = empty($params['store_id']) ? null:$params['store_id'];
        // forBatchDetailPanel == 1 Product Master Panel
        // forBatchDetailPanel == 2 Batch Master Panel

        $sql_where = parent::getWhereCondition($params);
        if ($forBatchDetailPanel == 1){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_6_06 = '". $product_code."'";
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.company_id = '". $company_id."'";
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.store_id = '". $store_id."'";
            $sql_where .= " AND ({$alais}.column_6_23 IS NOT NULL and CAST({$alais}.column_6_23 as INT) > 0) ";
        }
        else if($forBatchDetailPanel == 2)
        {
        	if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.batch_master_id = ". $batch_master_id;
            
            // if(!empty($sql_where)){
            //     $sql_where.= " AND ";
            // }
            // $sql_where .= " {$alais}.company_id = '". $company_id."'";
            // if(!empty($sql_where)){
            //     $sql_where.= " AND ";
            // }
            // $sql_where .= " {$alais}.store_id = '". $store_id."'";
        }
        else if($forOrderMasterEntryPanel == 1 || $forServiceEntryPanel == 1){
        	if(!empty($sql_where)){
               		$sql_where.= " AND ";
            }
            $sql_where .= " CAST({$alais}.column_6_25 AS INT) <> 0 ";	
            if(!empty($sql_where)){
	                $sql_where.= " AND ";
	            }
            $sql_where .= " {$alais}.column_6_06 = '". $product_code."'";
	        if(!empty($supplier_id)){
	        	if(!empty($sql_where)){
	                $sql_where.= " AND ";
	            }
            	$sql_where .= " {$alais}.supplier_id = convert_tonumeric('{$supplier_id}')";
	        }

	        if(!empty($currency_type)){
	        	if(!empty($sql_where)){
	                $sql_where.= " AND ";
	            }
	           	$sql_where .= " {$alais}.column_6_10 = '{$currency_type}'";
	        }
        }
        else{
        	if(!empty($batch_master_id)){
        		if(!empty($sql_where)){
               		$sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.batch_master_id = ". $batch_master_id;	
        	}
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
		$all_columns                = empty($params['all_columns']) ? 0:$params['all_columns'];
		// $forOrderDetailSummary   = empty($params['forOrderDetailSummary']) ? 0:$params['forOrderDetailSummary'];
		$forEntryPanel              = empty($params['forEntryPanel']) ? 0:$params['forEntryPanel'];
		$forProductBatchDetailPanel = empty($params['forProductBatchDetailPanel']) ? 0:$params['forProductBatchDetailPanel'];
		$forBatchDetailPanel 		= empty($params['forBatchDetailPanel']) ? 0:$params['forBatchDetailPanel'];
		$forOrderMasterEntryPanel   = empty($params['forOrderMasterEntryPanel']) ? 0:$params['forOrderMasterEntryPanel'];
		$groupDir                   = empty($params['groupDir']) ? 'asc':$params['groupDir'];
		$mode                       = empty($params['mode']) ? null:$params['mode'];
		$company_id                 = Yii::app()->user->getAttr('company_id');
		$select_fields              = null;

    	if ((empty($fields) || count($fields) < 1) && $for_count != true && $all_columns != 1) {
    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
    	}
    	
    	if ($for_count != true && $all_columns != 1)
    		$select_fields = $this->getSelectFields($fields);
    	else if($for_count != true && $all_columns == 1){
    		$select_fields = "t6.*";
    	}

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {
			$sql .= "{$select_fields}, t6.id, t6.ext_id,t6.batch_master_id,t6.supplier_id,t4.column_4_04";
			// if($forEntryPanel == 1){
			// 	$sql.= ",t4.column_4_04"; //batch no.
			// }
			$sql .= $this->getSyncStatusColumn('t6', $synctime, $user_id);
			// if($dgUtil->_datagrid_id=='16'){
			// 	$lock = t('orderMaster','order_detail_lock');
			// 	$sql .= ",(CASE WHEN (t6.column_6_35 <>'{$lock}' OR t6.column_6_35 IS NULL) THEN '1'
	  //           		ELSE '0' END) as is_matched";
			// }
			
    	}

    	$sql .= " from ".$this->tableName()." as t6";
		$sql.= " LEFT JOIN ".t('tblSchema','hb_').".h_batch_master t4 ON t4.id = t6.batch_master_id AND t4.delete_flg = 0";

	    if($forProductBatchDetailPanel == 1 || $forBatchDetailPanel == 1){
    		$sql.= " INNER JOIN ".t('tblSchema','hb_').".h_product t5 ON t5.column_5_05 = t6.column_6_06 AND t6.delete_flg = 0";
    	} else {
	    	// do nth
	    }
		if(!empty($synctime)) {
        	$sql .= " where (t6.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t6.delete_flg = 0  ";
			// 	var_dump($forBatchDetailPanel); die;
			// if($datagrid_id=='7')
			// 	$sql .= " AND (t6.column_6_23 IS NOT NULL and CAST(t6.column_6_23 as INT) > 0) ";
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
			$default_sort_order = "convert_tonumeric(t6.column_6_16) ASC";
    		/*if($forEntryPanel == 1){
				$default_sort_order = "convert_tonumeric(t6.column_6_16) ASC";
    		}
			else
				$default_sort_order = "convert_tonumeric(t2.column_2_26) ASC";*/
			$sort_order = $this->getSortOrder('t6', $sort, $default_sort_order);
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
