<?php

/**
 * This is the model class for table "hbase.h_product".
 *
 * The followings are the available columns in table 'hbase.h_product':
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
 * @property integer $column_5_01
 * @property string $column_5_02
 * @property string $column_5_03
 * @property string $column_5_04
 * @property string $column_5_05
 * @property string $column_5_06
 * @property string $column_5_07
 * @property string $column_5_08
 * @property string $column_5_09
 * @property string $column_5_10
 * @property string $column_5_11
 * @property string $column_5_12
 * @property string $column_5_13
 * @property string $column_5_14
 * @property string $column_5_15
 * @property string $column_5_16
 * @property string $column_5_17
 * @property string $column_5_18
 * @property string $column_5_19
 * @property string $column_5_20
 * @property string $column_5_21
 * @property string $column_5_22
 * @property string $column_5_23
 * @property string $column_5_24
 * @property string $column_5_25
 * @property string $column_5_26
 * @property string $column_5_27
 * @property string $column_5_28
 * @property string $column_5_29
 * @property string $column_5_30
 * @property string $column_5_31
 * @property string $column_5_32
 * @property string $column_5_33
 * @property string $column_5_34
 * @property string $column_5_35
 * @property string $column_5_36
 * @property string $column_5_37
 * @property string $column_5_38
 * @property string $column_5_39
 * @property string $column_5_40
 * @property string $column_5_41
 * @property string $column_5_42
 * @property string $column_5_43
 * @property string $column_5_44
 * @property string $column_5_45
 * @property string $column_5_46
 * @property string $column_5_47
 * @property string $column_5_48
 * @property string $column_5_49
 * @property string $column_5_50
 * @property string $column_5_51
 * @property string $column_5_52
 * @property string $column_5_53
 * @property string $column_5_54
 * @property string $column_5_55
 * @property string $column_5_56
 * @property string $column_5_57
 * @property string $column_5_58
 * @property string $column_5_59
 * @property string $column_5_60
 * @property string $column_5_61
 * @property string $column_5_62
 * @property string $column_5_63
 * @property string $column_5_64
 * @property string $column_5_65
 * @property string $column_5_66
 * @property string $column_5_67
 * @property string $column_5_68
 * @property string $column_5_69
 * @property string $column_5_70
 * @property string $column_5_71
 * @property string $column_5_72
 * @property string $column_5_73
 * @property string $column_5_74
 * @property string $column_5_75
 * @property string $column_5_76
 * @property string $column_5_77
 * @property string $column_5_78
 * @property string $column_5_79
 * @property string $column_5_80
 * @property string $column_5_81
 * @property string $column_5_82
 * @property string $column_5_83
 * @property string $column_5_84
 * @property string $column_5_85
 * @property string $column_5_86
 * @property string $column_5_87
 * @property string $column_5_88
 * @property string $column_5_89
 * @property string $column_5_90
 * @property string $column_5_91
 * @property string $column_5_92
 * @property string $column_5_93
 * @property string $column_5_94
 * @property string $column_5_95
 * @property string $column_5_96
 * @property string $column_5_97
 * @property string $column_5_98
 * @property string $column_5_99
 * @property string $column_5_100
 * @property string $ext_id
 */
class Product extends YIGBaseModel
{
	public function __construct() {
       	parent::__construct();
		$this->_table_id = 5;
		
    }

	/**`
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_product';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, store_id, created_by, updated_by, delete_flg, is_draft, supplier_id', 'numerical', 'integerOnly'=>true),
			array('column_5_02, column_5_03, column_5_04, column_5_05, column_5_06, column_5_07, column_5_08, column_5_09, column_5_11, column_5_12, column_5_13, column_5_14, column_5_15, column_5_17, column_5_18, column_5_19, column_5_20, column_5_21, column_5_22, column_5_23, column_5_24, column_5_25, column_5_26, column_5_27, column_5_28, column_5_29, column_5_31, column_5_32, column_5_33, column_5_34, column_5_35, column_5_37, column_5_38, column_5_39, column_5_40, column_5_41, column_5_42, column_5_43, column_5_44, column_5_45, column_5_46, column_5_47, column_5_48, column_5_49, column_5_51, column_5_52, column_5_53, column_5_54, column_5_55, column_5_57, column_5_58, column_5_59, column_5_60, column_5_61, column_5_62, column_5_63, column_5_64, column_5_65, column_5_66, column_5_67, column_5_68, column_5_69, column_5_71, column_5_72, column_5_73, column_5_74, column_5_75, column_5_77, column_5_78, column_5_79, column_5_80, column_5_81, column_5_82, column_5_83, column_5_84, column_5_85, column_5_86, column_5_87, column_5_88, column_5_89, column_5_90, column_5_91, column_5_92, column_5_93, column_5_94, column_5_95, column_5_96, column_5_97, column_5_98, column_5_99, column_5_100, ext_id', 'length', 'max'=>100),
			array('column_5_10, column_5_30, column_5_50, column_5_70', 'length', 'max'=>1000),
			array('column_5_16, column_5_36, column_5_56, column_5_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, supplier_id, column_5_01, column_5_02, column_5_03, column_5_04, column_5_05, column_5_06, column_5_07, column_5_08, column_5_09, column_5_10, column_5_11, column_5_12, column_5_13, column_5_14, column_5_15, column_5_16, column_5_17, column_5_18, column_5_19, column_5_20, column_5_21, column_5_22, column_5_23, column_5_24, column_5_25, column_5_26, column_5_27, column_5_28, column_5_29, column_5_30, column_5_31, column_5_32, column_5_33, column_5_34, column_5_35, column_5_36, column_5_37, column_5_38, column_5_39, column_5_40, column_5_41, column_5_42, column_5_43, column_5_44, column_5_45, column_5_46, column_5_47, column_5_48, column_5_49, column_5_50, column_5_51, column_5_52, column_5_53, column_5_54, column_5_55, column_5_56, column_5_57, column_5_58, column_5_59, column_5_60, column_5_61, column_5_62, column_5_63, column_5_64, column_5_65, column_5_66, column_5_67, column_5_68, column_5_69, column_5_70, column_5_71, column_5_72, column_5_73, column_5_74, column_5_75, column_5_76, column_5_77, column_5_78, column_5_79, column_5_80, column_5_81, column_5_82, column_5_83, column_5_84, column_5_85, column_5_86, column_5_87, column_5_88, column_5_89, column_5_90, column_5_91, column_5_92, column_5_93, column_5_94, column_5_95, column_5_96, column_5_97, column_5_98, column_5_99, column_5_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_5_01' => 'Column 5 01',
			'column_5_02' => 'Column 5 02',
			'column_5_03' => 'Column 5 03',
			'column_5_04' => 'Column 5 04',
			'column_5_05' => 'Column 5 05',
			'column_5_06' => 'Column 5 06',
			'column_5_07' => 'Column 5 07',
			'column_5_08' => 'Column 5 08',
			'column_5_09' => 'Column 5 09',
			'column_5_10' => 'Column 5 10',
			'column_5_11' => 'Column 5 11',
			'column_5_12' => 'Column 5 12',
			'column_5_13' => 'Column 5 13',
			'column_5_14' => 'Column 5 14',
			'column_5_15' => 'Column 5 15',
			'column_5_16' => 'Column 5 16',
			'column_5_17' => 'Column 5 17',
			'column_5_18' => 'Column 5 18',
			'column_5_19' => 'Column 5 19',
			'column_5_20' => 'Column 5 20',
			'column_5_21' => 'Column 5 21',
			'column_5_22' => 'Column 5 22',
			'column_5_23' => 'Column 5 23',
			'column_5_24' => 'Column 5 24',
			'column_5_25' => 'Column 5 25',
			'column_5_26' => 'Column 5 26',
			'column_5_27' => 'Column 5 27',
			'column_5_28' => 'Column 5 28',
			'column_5_29' => 'Column 5 29',
			'column_5_30' => 'Column 5 30',
			'column_5_31' => 'Column 5 31',
			'column_5_32' => 'Column 5 32',
			'column_5_33' => 'Column 5 33',
			'column_5_34' => 'Column 5 34',
			'column_5_35' => 'Column 5 35',
			'column_5_36' => 'Column 5 36',
			'column_5_37' => 'Column 5 37',
			'column_5_38' => 'Column 5 38',
			'column_5_39' => 'Column 5 39',
			'column_5_40' => 'Column 5 40',
			'column_5_41' => 'Column 5 41',
			'column_5_42' => 'Column 5 42',
			'column_5_43' => 'Column 5 43',
			'column_5_44' => 'Column 5 44',
			'column_5_45' => 'Column 5 45',
			'column_5_46' => 'Column 5 46',
			'column_5_47' => 'Column 5 47',
			'column_5_48' => 'Column 5 48',
			'column_5_49' => 'Column 5 49',
			'column_5_50' => 'Column 5 50',
			'column_5_51' => 'Column 5 51',
			'column_5_52' => 'Column 5 52',
			'column_5_53' => 'Column 5 53',
			'column_5_54' => 'Column 5 54',
			'column_5_55' => 'Column 5 55',
			'column_5_56' => 'Column 5 56',
			'column_5_57' => 'Column 5 57',
			'column_5_58' => 'Column 5 58',
			'column_5_59' => 'Column 5 59',
			'column_5_60' => 'Column 5 60',
			'column_5_61' => 'Column 5 61',
			'column_5_62' => 'Column 5 62',
			'column_5_63' => 'Column 5 63',
			'column_5_64' => 'Column 5 64',
			'column_5_65' => 'Column 5 65',
			'column_5_66' => 'Column 5 66',
			'column_5_67' => 'Column 5 67',
			'column_5_68' => 'Column 5 68',
			'column_5_69' => 'Column 5 69',
			'column_5_70' => 'Column 5 70',
			'column_5_71' => 'Column 5 71',
			'column_5_72' => 'Column 5 72',
			'column_5_73' => 'Column 5 73',
			'column_5_74' => 'Column 5 74',
			'column_5_75' => 'Column 5 75',
			'column_5_76' => 'Column 5 76',
			'column_5_77' => 'Column 5 77',
			'column_5_78' => 'Column 5 78',
			'column_5_79' => 'Column 5 79',
			'column_5_80' => 'Column 5 80',
			'column_5_81' => 'Column 5 81',
			'column_5_82' => 'Column 5 82',
			'column_5_83' => 'Column 5 83',
			'column_5_84' => 'Column 5 84',
			'column_5_85' => 'Column 5 85',
			'column_5_86' => 'Column 5 86',
			'column_5_87' => 'Column 5 87',
			'column_5_88' => 'Column 5 88',
			'column_5_89' => 'Column 5 89',
			'column_5_90' => 'Column 5 90',
			'column_5_91' => 'Column 5 91',
			'column_5_92' => 'Column 5 92',
			'column_5_93' => 'Column 5 93',
			'column_5_94' => 'Column 5 94',
			'column_5_95' => 'Column 5 95',
			'column_5_96' => 'Column 5 96',
			'column_5_97' => 'Column 5 97',
			'column_5_98' => 'Column 5 98',
			'column_5_99' => 'Column 5 99',
			'column_5_100' => 'Column 5 100',
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
		$criteria->compare('supplier_id',$this->supplier_id);
		$criteria->compare('column_5_01',$this->column_5_01);
		$criteria->compare('column_5_02',$this->column_5_02,true);
		$criteria->compare('column_5_03',$this->column_5_03,true);
		$criteria->compare('column_5_04',$this->column_5_04,true);
		$criteria->compare('column_5_05',$this->column_5_05,true);
		$criteria->compare('column_5_06',$this->column_5_06,true);
		$criteria->compare('column_5_07',$this->column_5_07,true);
		$criteria->compare('column_5_08',$this->column_5_08,true);
		$criteria->compare('column_5_09',$this->column_5_09,true);
		$criteria->compare('column_5_10',$this->column_5_10,true);
		$criteria->compare('column_5_11',$this->column_5_11,true);
		$criteria->compare('column_5_12',$this->column_5_12,true);
		$criteria->compare('column_5_13',$this->column_5_13,true);
		$criteria->compare('column_5_14',$this->column_5_14,true);
		$criteria->compare('column_5_15',$this->column_5_15,true);
		$criteria->compare('column_5_16',$this->column_5_16,true);
		$criteria->compare('column_5_17',$this->column_5_17,true);
		$criteria->compare('column_5_18',$this->column_5_18,true);
		$criteria->compare('column_5_19',$this->column_5_19,true);
		$criteria->compare('column_5_20',$this->column_5_20,true);
		$criteria->compare('column_5_21',$this->column_5_21,true);
		$criteria->compare('column_5_22',$this->column_5_22,true);
		$criteria->compare('column_5_23',$this->column_5_23,true);
		$criteria->compare('column_5_24',$this->column_5_24,true);
		$criteria->compare('column_5_25',$this->column_5_25,true);
		$criteria->compare('column_5_26',$this->column_5_26,true);
		$criteria->compare('column_5_27',$this->column_5_27,true);
		$criteria->compare('column_5_28',$this->column_5_28,true);
		$criteria->compare('column_5_29',$this->column_5_29,true);
		$criteria->compare('column_5_30',$this->column_5_30,true);
		$criteria->compare('column_5_31',$this->column_5_31,true);
		$criteria->compare('column_5_32',$this->column_5_32,true);
		$criteria->compare('column_5_33',$this->column_5_33,true);
		$criteria->compare('column_5_34',$this->column_5_34,true);
		$criteria->compare('column_5_35',$this->column_5_35,true);
		$criteria->compare('column_5_36',$this->column_5_36,true);
		$criteria->compare('column_5_37',$this->column_5_37,true);
		$criteria->compare('column_5_38',$this->column_5_38,true);
		$criteria->compare('column_5_39',$this->column_5_39,true);
		$criteria->compare('column_5_40',$this->column_5_40,true);
		$criteria->compare('column_5_41',$this->column_5_41,true);
		$criteria->compare('column_5_42',$this->column_5_42,true);
		$criteria->compare('column_5_43',$this->column_5_43,true);
		$criteria->compare('column_5_44',$this->column_5_44,true);
		$criteria->compare('column_5_45',$this->column_5_45,true);
		$criteria->compare('column_5_46',$this->column_5_46,true);
		$criteria->compare('column_5_47',$this->column_5_47,true);
		$criteria->compare('column_5_48',$this->column_5_48,true);
		$criteria->compare('column_5_49',$this->column_5_49,true);
		$criteria->compare('column_5_50',$this->column_5_50,true);
		$criteria->compare('column_5_51',$this->column_5_51,true);
		$criteria->compare('column_5_52',$this->column_5_52,true);
		$criteria->compare('column_5_53',$this->column_5_53,true);
		$criteria->compare('column_5_54',$this->column_5_54,true);
		$criteria->compare('column_5_55',$this->column_5_55,true);
		$criteria->compare('column_5_56',$this->column_5_56,true);
		$criteria->compare('column_5_57',$this->column_5_57,true);
		$criteria->compare('column_5_58',$this->column_5_58,true);
		$criteria->compare('column_5_59',$this->column_5_59,true);
		$criteria->compare('column_5_60',$this->column_5_60,true);
		$criteria->compare('column_5_61',$this->column_5_61,true);
		$criteria->compare('column_5_62',$this->column_5_62,true);
		$criteria->compare('column_5_63',$this->column_5_63,true);
		$criteria->compare('column_5_64',$this->column_5_64,true);
		$criteria->compare('column_5_65',$this->column_5_65,true);
		$criteria->compare('column_5_66',$this->column_5_66,true);
		$criteria->compare('column_5_67',$this->column_5_67,true);
		$criteria->compare('column_5_68',$this->column_5_68,true);
		$criteria->compare('column_5_69',$this->column_5_69,true);
		$criteria->compare('column_5_70',$this->column_5_70,true);
		$criteria->compare('column_5_71',$this->column_5_71,true);
		$criteria->compare('column_5_72',$this->column_5_72,true);
		$criteria->compare('column_5_73',$this->column_5_73,true);
		$criteria->compare('column_5_74',$this->column_5_74,true);
		$criteria->compare('column_5_75',$this->column_5_75,true);
		$criteria->compare('column_5_76',$this->column_5_76,true);
		$criteria->compare('column_5_77',$this->column_5_77,true);
		$criteria->compare('column_5_78',$this->column_5_78,true);
		$criteria->compare('column_5_79',$this->column_5_79,true);
		$criteria->compare('column_5_80',$this->column_5_80,true);
		$criteria->compare('column_5_81',$this->column_5_81,true);
		$criteria->compare('column_5_82',$this->column_5_82,true);
		$criteria->compare('column_5_83',$this->column_5_83,true);
		$criteria->compare('column_5_84',$this->column_5_84,true);
		$criteria->compare('column_5_85',$this->column_5_85,true);
		$criteria->compare('column_5_86',$this->column_5_86,true);
		$criteria->compare('column_5_87',$this->column_5_87,true);
		$criteria->compare('column_5_88',$this->column_5_88,true);
		$criteria->compare('column_5_89',$this->column_5_89,true);
		$criteria->compare('column_5_90',$this->column_5_90,true);
		$criteria->compare('column_5_91',$this->column_5_91,true);
		$criteria->compare('column_5_92',$this->column_5_92,true);
		$criteria->compare('column_5_93',$this->column_5_93,true);
		$criteria->compare('column_5_94',$this->column_5_94,true);
		$criteria->compare('column_5_95',$this->column_5_95,true);
		$criteria->compare('column_5_96',$this->column_5_96,true);
		$criteria->compare('column_5_97',$this->column_5_97,true);
		$criteria->compare('column_5_98',$this->column_5_98,true);
		$criteria->compare('column_5_99',$this->column_5_99,true);
		$criteria->compare('column_5_100',$this->column_5_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Product the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	// added by Dev fn name = getFilterByRoleCondition
	public function getFilterByRoleCondition($params)
    {
    	$alais 					=  $params['alais'];
    	$user_info 				=  $params['user_info'];
    	$collection_store_id 	= empty($params['collection_store_id'])?null:$params['collection_store_id'];
    	$getStoreOthers 		= empty($params['getStoreOthers'])?'':$params['getStoreOthers'];
    	$role_condition			= "";
    	//$role_condition = parent::getFilterByRoleCondition($user_info,$alais,null);
        $user_role = $user_info['userRole'];
        $company_id = $user_info['company_id'];
        $department_id = $user_info['department_id'];
        if (!empty($alais))
            $alais .= ".";
        if (RoleUtil::isSuperAdmin($user_role) || RoleUtil::isAdmin($user_role)){
            //allow all records for for super user.
        }
        else if (RoleUtil::isCompanyAdmin($user_role))
        {
            // all department of same company
            if(!empty($collection_store_id)){
            	$role_condition = " ({$alais}company_id = {$company_id} OR {$alais}store_id = {$collection_store_id}) ";
            }
            else
	            $role_condition = " {$alais}company_id = {$company_id} ";
        }
        else if (RoleUtil::isStoreManager($user_role))
        {
            // same department of same company
            if($getStoreOthers=='1'){
        		$role_condition = " {$alais}company_id = {$company_id} ";
            }
            else if(!empty($collection_store_id)){
            	$role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$collection_store_id} ";
            }
            else
            	$role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$department_id} ";
        }
        else
        {
            // same department of same company
            $role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$department_id} ";    
        }
        return $role_condition;
    } 
	public function getWhereCondition($params){
		$alais             = $params['alais'];
		$supplier_id       =  empty($params['supplier_id'])?'':$params['supplier_id'];
		$getStoreOthers    =  empty($params['getStoreOthers'])?'':$params['getStoreOthers'];
		$product_code      =  empty($params['product_code'])?'':$params['product_code'];
		$store_id          =  empty($params['collection_store_id'])?'':$params['collection_store_id'];
		$product_type      =  empty($params['product_type'])?'':$params['product_type'];
		$forPurchasePanel  =  empty($params['forPurchasePanel'])?'':$params['forPurchasePanel'];
		$excludeEmptyStock =  empty($params['excludeEmptyStock'])?'0':$params['excludeEmptyStock'];

		$sql_where = parent::getWhereCondition($params);

        if (!empty($supplier_id)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.supplier_id = '{$supplier_id}'";
        }
        else {
        	if(!empty($forPurchasePanel) && $forPurchasePanel==1){
	        	if(!empty($sql_where)){
		                $sql_where.= " AND ";
	            }
	            $sql_where .= " {$alais}.supplier_id is null ";
        	}
        }
        if (!empty($getStoreOthers) && ($getStoreOthers==1)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_5_05 = '{$product_code}'";
           // $sql_where .= " {$alais}.column_5_05 = '{$product_code}' AND  {$alais}.store_id <> '{$store_id}'";
        }
        if (!empty($product_type)){
        	$product_type_lang = Yii::t('entryPanel','productType');
        	$product = $product_type_lang['product'];
        	$gift = $product_type_lang['gift'];
        	$gift_flg = Yii::t('general','yes');
            // if(!empty($sql_where)){
            //     $sql_where.= " AND ";
            // }
            
            if($product_type == $gift){
            	// $sql_where .= " ({$alais}.column_5_06 = '{$product_type}' OR ({$alais}.column_5_06 = '{$product}' AND {$alais}.column_5_29 = '{$gift_flg}'))";
            }
            else{
            	$sql_where .= " AND {$alais}.column_5_06 = '{$product_type}'";
            }
        }


        if (!empty($excludeEmptyStock) && $excludeEmptyStock == 1){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " convert_tonumeric({$alais}.column_5_25) > 0";
        }
        return $sql_where;
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
    	$datagrid_id 			= empty($params['datagrid_id']) ? null:$params['datagrid_id'];
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$select_fields 			= null;
    	$default_sort_order 	= null;
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
			$sql .= "{$select_fields}, t5.id, t5.ext_id,t5.supplier_id,t5.store_id,t5.company_id";
			if($datagrid_id=='16'){
				$sql .= ", t6.column_6_01";
			}
			$sql .= $this->getSyncStatusColumn('t5', $synctime, $user_id);
    	}

    	$sql .= " from ".$this->tableName()." as t5";

    	if($datagrid_id=='16'){
    		$sql .= " JOIN hbase.h_batch_detail as t6
						on t5.column_5_05 = t6.column_6_06"; 
	    	$default_sort_order = " t5.column_5_05 DESC " ;
    	}
		if(!empty($synctime)) {
        	$sql .= " where (t5.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t5.delete_flg = 0 and t5.supplier_id is NOT NULL";
				if($datagrid_id=='16'){
					$sql .= " AND (t6.column_6_25 IS NOT NULL and CAST(t6.column_6_25 as INT) > 0) ";
				}
				
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
    		if(empty($default_sort_order))
				$default_sort_order = "t5.column_5_01 DESC";
			$sort_order = $this->getSortOrder('t5', $sort, $default_sort_order);
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

    public function deductReceivedProductQty($order_master_id,$store_id){
    	$sql = " SELECT hbase.yigfx_deduct_order_received_product_stock({$order_master_id}::integer,{$store_id}::integer) ";
    	$cmd = Yii::app()->db->createCommand($sql);
    	$result = $cmd->queryScalar();
    	return $result;
    }

    public function deductServiceReceivedProductQty($service_master_id,$store_id){
    	$sql = " SELECT hbase.yigfx_deduct_service_received_product_stock({$service_master_id}::integer,{$store_id}::integer) ";
    	$cmd = Yii::app()->db->createCommand($sql);
    	$result = $cmd->queryScalar();
    	return $result;
    }
    public function generateProductCode($supplier_id,$currencyType){
    	$sql = "SELECT hbase.yigfx_generate_product_code('{$supplier_id}','$currencyType')";
        $cmd = Yii::app()->db->createCommand($sql);
    	$result = $cmd->queryScalar();
    	return $result;
    }
    public function generateBatchDetailCode($product_code,$store_id)
    {
	    $sql = "SELECT hbase.yigfx_generate_batch_detail_code('$product_code', $store_id)";
        $cmd = Yii::app()->db->createCommand($sql);
        $result = $cmd->queryScalar();
    	return $result;
    }
    

}
