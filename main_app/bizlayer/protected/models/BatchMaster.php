<?php

/**
 * This is the model class for table "hbase.h_batch_master".
 *
 * The followings are the available columns in table 'hbase.h_batch_master':
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
 * @property integer $column_4_01
 * @property string $column_4_02
 * @property string $column_4_03
 * @property string $column_4_04
 * @property string $column_4_05
 * @property string $column_4_06
 * @property string $column_4_07
 * @property string $column_4_08
 * @property string $column_4_09
 * @property string $column_4_10
 * @property string $column_4_11
 * @property string $column_4_12
 * @property string $column_4_13
 * @property string $column_4_14
 * @property string $column_4_15
 * @property string $column_4_16
 * @property string $column_4_17
 * @property string $column_4_18
 * @property string $column_4_19
 * @property string $column_4_20
 * @property string $column_4_21
 * @property string $column_4_22
 * @property string $column_4_23
 * @property string $column_4_24
 * @property string $column_4_25
 * @property string $column_4_26
 * @property string $column_4_27
 * @property string $column_4_28
 * @property string $column_4_29
 * @property string $column_4_30
 * @property string $column_4_31
 * @property string $column_4_32
 * @property string $column_4_33
 * @property string $column_4_34
 * @property string $column_4_35
 * @property string $column_4_36
 * @property string $column_4_37
 * @property string $column_4_38
 * @property string $column_4_39
 * @property string $column_4_40
 * @property string $column_4_41
 * @property string $column_4_42
 * @property string $column_4_43
 * @property string $column_4_44
 * @property string $column_4_45
 * @property string $column_4_46
 * @property string $column_4_47
 * @property string $column_4_48
 * @property string $column_4_49
 * @property string $column_4_50
 * @property string $column_4_51
 * @property string $column_4_52
 * @property string $column_4_53
 * @property string $column_4_54
 * @property string $column_4_55
 * @property string $column_4_56
 * @property string $column_4_57
 * @property string $column_4_58
 * @property string $column_4_59
 * @property string $column_4_60
 * @property string $column_4_61
 * @property string $column_4_62
 * @property string $column_4_63
 * @property string $column_4_64
 * @property string $column_4_65
 * @property string $column_4_66
 * @property string $column_4_67
 * @property string $column_4_68
 * @property string $column_4_69
 * @property string $column_4_70
 * @property string $column_4_71
 * @property string $column_4_72
 * @property string $column_4_73
 * @property string $column_4_74
 * @property string $column_4_75
 * @property string $column_4_76
 * @property string $column_4_77
 * @property string $column_4_78
 * @property string $column_4_79
 * @property string $column_4_80
 * @property string $column_4_81
 * @property string $column_4_82
 * @property string $column_4_83
 * @property string $column_4_84
 * @property string $column_4_85
 * @property string $column_4_86
 * @property string $column_4_87
 * @property string $column_4_88
 * @property string $column_4_89
 * @property string $column_4_90
 * @property string $column_4_91
 * @property string $column_4_92
 * @property string $column_4_93
 * @property string $column_4_94
 * @property string $column_4_95
 * @property string $column_4_96
 * @property string $column_4_97
 * @property string $column_4_98
 * @property string $column_4_99
 * @property string $column_4_100
 * @property string $ext_id
 */
class BatchMaster extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_id = 1;
		$this->_table_id = 4;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_batch_master';
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
			array('column_4_02, column_4_03, column_4_04, column_4_05, column_4_06, column_4_07, column_4_08, column_4_09, column_4_11, column_4_12, column_4_13, column_4_14, column_4_15, column_4_17, column_4_18, column_4_19, column_4_20, column_4_21, column_4_22, column_4_23, column_4_24, column_4_25, column_4_26, column_4_27, column_4_28, column_4_29, column_4_31, column_4_32, column_4_33, column_4_34, column_4_35, column_4_37, column_4_38, column_4_39, column_4_40, column_4_41, column_4_42, column_4_43, column_4_44, column_4_45, column_4_46, column_4_47, column_4_48, column_4_49, column_4_51, column_4_52, column_4_53, column_4_54, column_4_55, column_4_57, column_4_58, column_4_59, column_4_60, column_4_61, column_4_62, column_4_63, column_4_64, column_4_65, column_4_66, column_4_67, column_4_68, column_4_69, column_4_71, column_4_72, column_4_73, column_4_74, column_4_75, column_4_77, column_4_78, column_4_79, column_4_80, column_4_81, column_4_82, column_4_83, column_4_84, column_4_85, column_4_86, column_4_87, column_4_88, column_4_89, column_4_90, column_4_91, column_4_92, column_4_93, column_4_94, column_4_95, column_4_96, column_4_97, column_4_98, column_4_99, column_4_100, ext_id', 'length', 'max'=>100),
			array('column_4_10, column_4_30, column_4_50, column_4_70', 'length', 'max'=>1000),
			array('column_4_16, column_4_36, column_4_56, column_4_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, supplier_id, column_4_01, column_4_02, column_4_03, column_4_04, column_4_05, column_4_06, column_4_07, column_4_08, column_4_09, column_4_10, column_4_11, column_4_12, column_4_13, column_4_14, column_4_15, column_4_16, column_4_17, column_4_18, column_4_19, column_4_20, column_4_21, column_4_22, column_4_23, column_4_24, column_4_25, column_4_26, column_4_27, column_4_28, column_4_29, column_4_30, column_4_31, column_4_32, column_4_33, column_4_34, column_4_35, column_4_36, column_4_37, column_4_38, column_4_39, column_4_40, column_4_41, column_4_42, column_4_43, column_4_44, column_4_45, column_4_46, column_4_47, column_4_48, column_4_49, column_4_50, column_4_51, column_4_52, column_4_53, column_4_54, column_4_55, column_4_56, column_4_57, column_4_58, column_4_59, column_4_60, column_4_61, column_4_62, column_4_63, column_4_64, column_4_65, column_4_66, column_4_67, column_4_68, column_4_69, column_4_70, column_4_71, column_4_72, column_4_73, column_4_74, column_4_75, column_4_76, column_4_77, column_4_78, column_4_79, column_4_80, column_4_81, column_4_82, column_4_83, column_4_84, column_4_85, column_4_86, column_4_87, column_4_88, column_4_89, column_4_90, column_4_91, column_4_92, column_4_93, column_4_94, column_4_95, column_4_96, column_4_97, column_4_98, column_4_99, column_4_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_4_01' => 'Column 4 01',
			'column_4_02' => 'Column 4 02',
			'column_4_03' => 'Column 4 03',
			'column_4_04' => 'Column 4 04',
			'column_4_05' => 'Column 4 05',
			'column_4_06' => 'Column 4 06',
			'column_4_07' => 'Column 4 07',
			'column_4_08' => 'Column 4 08',
			'column_4_09' => 'Column 4 09',
			'column_4_10' => 'Column 4 10',
			'column_4_11' => 'Column 4 11',
			'column_4_12' => 'Column 4 12',
			'column_4_13' => 'Column 4 13',
			'column_4_14' => 'Column 4 14',
			'column_4_15' => 'Column 4 15',
			'column_4_16' => 'Column 4 16',
			'column_4_17' => 'Column 4 17',
			'column_4_18' => 'Column 4 18',
			'column_4_19' => 'Column 4 19',
			'column_4_20' => 'Column 4 20',
			'column_4_21' => 'Column 4 21',
			'column_4_22' => 'Column 4 22',
			'column_4_23' => 'Column 4 23',
			'column_4_24' => 'Column 4 24',
			'column_4_25' => 'Column 4 25',
			'column_4_26' => 'Column 4 26',
			'column_4_27' => 'Column 4 27',
			'column_4_28' => 'Column 4 28',
			'column_4_29' => 'Column 4 29',
			'column_4_30' => 'Column 4 30',
			'column_4_31' => 'Column 4 31',
			'column_4_32' => 'Column 4 32',
			'column_4_33' => 'Column 4 33',
			'column_4_34' => 'Column 4 34',
			'column_4_35' => 'Column 4 35',
			'column_4_36' => 'Column 4 36',
			'column_4_37' => 'Column 4 37',
			'column_4_38' => 'Column 4 38',
			'column_4_39' => 'Column 4 39',
			'column_4_40' => 'Column 4 40',
			'column_4_41' => 'Column 4 41',
			'column_4_42' => 'Column 4 42',
			'column_4_43' => 'Column 4 43',
			'column_4_44' => 'Column 4 44',
			'column_4_45' => 'Column 4 45',
			'column_4_46' => 'Column 4 46',
			'column_4_47' => 'Column 4 47',
			'column_4_48' => 'Column 4 48',
			'column_4_49' => 'Column 4 49',
			'column_4_50' => 'Column 4 50',
			'column_4_51' => 'Column 4 51',
			'column_4_52' => 'Column 4 52',
			'column_4_53' => 'Column 4 53',
			'column_4_54' => 'Column 4 54',
			'column_4_55' => 'Column 4 55',
			'column_4_56' => 'Column 4 56',
			'column_4_57' => 'Column 4 57',
			'column_4_58' => 'Column 4 58',
			'column_4_59' => 'Column 4 59',
			'column_4_60' => 'Column 4 60',
			'column_4_61' => 'Column 4 61',
			'column_4_62' => 'Column 4 62',
			'column_4_63' => 'Column 4 63',
			'column_4_64' => 'Column 4 64',
			'column_4_65' => 'Column 4 65',
			'column_4_66' => 'Column 4 66',
			'column_4_67' => 'Column 4 67',
			'column_4_68' => 'Column 4 68',
			'column_4_69' => 'Column 4 69',
			'column_4_70' => 'Column 4 70',
			'column_4_71' => 'Column 4 71',
			'column_4_72' => 'Column 4 72',
			'column_4_73' => 'Column 4 73',
			'column_4_74' => 'Column 4 74',
			'column_4_75' => 'Column 4 75',
			'column_4_76' => 'Column 4 76',
			'column_4_77' => 'Column 4 77',
			'column_4_78' => 'Column 4 78',
			'column_4_79' => 'Column 4 79',
			'column_4_80' => 'Column 4 80',
			'column_4_81' => 'Column 4 81',
			'column_4_82' => 'Column 4 82',
			'column_4_83' => 'Column 4 83',
			'column_4_84' => 'Column 4 84',
			'column_4_85' => 'Column 4 85',
			'column_4_86' => 'Column 4 86',
			'column_4_87' => 'Column 4 87',
			'column_4_88' => 'Column 4 88',
			'column_4_89' => 'Column 4 89',
			'column_4_90' => 'Column 4 90',
			'column_4_91' => 'Column 4 91',
			'column_4_92' => 'Column 4 92',
			'column_4_93' => 'Column 4 93',
			'column_4_94' => 'Column 4 94',
			'column_4_95' => 'Column 4 95',
			'column_4_96' => 'Column 4 96',
			'column_4_97' => 'Column 4 97',
			'column_4_98' => 'Column 4 98',
			'column_4_99' => 'Column 4 99',
			'column_4_100' => 'Column 4 100',
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
		$criteria->compare('column_4_01',$this->column_4_01);
		$criteria->compare('column_4_02',$this->column_4_02,true);
		$criteria->compare('column_4_03',$this->column_4_03,true);
		$criteria->compare('column_4_04',$this->column_4_04,true);
		$criteria->compare('column_4_05',$this->column_4_05,true);
		$criteria->compare('column_4_06',$this->column_4_06,true);
		$criteria->compare('column_4_07',$this->column_4_07,true);
		$criteria->compare('column_4_08',$this->column_4_08,true);
		$criteria->compare('column_4_09',$this->column_4_09,true);
		$criteria->compare('column_4_10',$this->column_4_10,true);
		$criteria->compare('column_4_11',$this->column_4_11,true);
		$criteria->compare('column_4_12',$this->column_4_12,true);
		$criteria->compare('column_4_13',$this->column_4_13,true);
		$criteria->compare('column_4_14',$this->column_4_14,true);
		$criteria->compare('column_4_15',$this->column_4_15,true);
		$criteria->compare('column_4_16',$this->column_4_16,true);
		$criteria->compare('column_4_17',$this->column_4_17,true);
		$criteria->compare('column_4_18',$this->column_4_18,true);
		$criteria->compare('column_4_19',$this->column_4_19,true);
		$criteria->compare('column_4_20',$this->column_4_20,true);
		$criteria->compare('column_4_21',$this->column_4_21,true);
		$criteria->compare('column_4_22',$this->column_4_22,true);
		$criteria->compare('column_4_23',$this->column_4_23,true);
		$criteria->compare('column_4_24',$this->column_4_24,true);
		$criteria->compare('column_4_25',$this->column_4_25,true);
		$criteria->compare('column_4_26',$this->column_4_26,true);
		$criteria->compare('column_4_27',$this->column_4_27,true);
		$criteria->compare('column_4_28',$this->column_4_28,true);
		$criteria->compare('column_4_29',$this->column_4_29,true);
		$criteria->compare('column_4_30',$this->column_4_30,true);
		$criteria->compare('column_4_31',$this->column_4_31,true);
		$criteria->compare('column_4_32',$this->column_4_32,true);
		$criteria->compare('column_4_33',$this->column_4_33,true);
		$criteria->compare('column_4_34',$this->column_4_34,true);
		$criteria->compare('column_4_35',$this->column_4_35,true);
		$criteria->compare('column_4_36',$this->column_4_36,true);
		$criteria->compare('column_4_37',$this->column_4_37,true);
		$criteria->compare('column_4_38',$this->column_4_38,true);
		$criteria->compare('column_4_39',$this->column_4_39,true);
		$criteria->compare('column_4_40',$this->column_4_40,true);
		$criteria->compare('column_4_41',$this->column_4_41,true);
		$criteria->compare('column_4_42',$this->column_4_42,true);
		$criteria->compare('column_4_43',$this->column_4_43,true);
		$criteria->compare('column_4_44',$this->column_4_44,true);
		$criteria->compare('column_4_45',$this->column_4_45,true);
		$criteria->compare('column_4_46',$this->column_4_46,true);
		$criteria->compare('column_4_47',$this->column_4_47,true);
		$criteria->compare('column_4_48',$this->column_4_48,true);
		$criteria->compare('column_4_49',$this->column_4_49,true);
		$criteria->compare('column_4_50',$this->column_4_50,true);
		$criteria->compare('column_4_51',$this->column_4_51,true);
		$criteria->compare('column_4_52',$this->column_4_52,true);
		$criteria->compare('column_4_53',$this->column_4_53,true);
		$criteria->compare('column_4_54',$this->column_4_54,true);
		$criteria->compare('column_4_55',$this->column_4_55,true);
		$criteria->compare('column_4_56',$this->column_4_56,true);
		$criteria->compare('column_4_57',$this->column_4_57,true);
		$criteria->compare('column_4_58',$this->column_4_58,true);
		$criteria->compare('column_4_59',$this->column_4_59,true);
		$criteria->compare('column_4_60',$this->column_4_60,true);
		$criteria->compare('column_4_61',$this->column_4_61,true);
		$criteria->compare('column_4_62',$this->column_4_62,true);
		$criteria->compare('column_4_63',$this->column_4_63,true);
		$criteria->compare('column_4_64',$this->column_4_64,true);
		$criteria->compare('column_4_65',$this->column_4_65,true);
		$criteria->compare('column_4_66',$this->column_4_66,true);
		$criteria->compare('column_4_67',$this->column_4_67,true);
		$criteria->compare('column_4_68',$this->column_4_68,true);
		$criteria->compare('column_4_69',$this->column_4_69,true);
		$criteria->compare('column_4_70',$this->column_4_70,true);
		$criteria->compare('column_4_71',$this->column_4_71,true);
		$criteria->compare('column_4_72',$this->column_4_72,true);
		$criteria->compare('column_4_73',$this->column_4_73,true);
		$criteria->compare('column_4_74',$this->column_4_74,true);
		$criteria->compare('column_4_75',$this->column_4_75,true);
		$criteria->compare('column_4_76',$this->column_4_76,true);
		$criteria->compare('column_4_77',$this->column_4_77,true);
		$criteria->compare('column_4_78',$this->column_4_78,true);
		$criteria->compare('column_4_79',$this->column_4_79,true);
		$criteria->compare('column_4_80',$this->column_4_80,true);
		$criteria->compare('column_4_81',$this->column_4_81,true);
		$criteria->compare('column_4_82',$this->column_4_82,true);
		$criteria->compare('column_4_83',$this->column_4_83,true);
		$criteria->compare('column_4_84',$this->column_4_84,true);
		$criteria->compare('column_4_85',$this->column_4_85,true);
		$criteria->compare('column_4_86',$this->column_4_86,true);
		$criteria->compare('column_4_87',$this->column_4_87,true);
		$criteria->compare('column_4_88',$this->column_4_88,true);
		$criteria->compare('column_4_89',$this->column_4_89,true);
		$criteria->compare('column_4_90',$this->column_4_90,true);
		$criteria->compare('column_4_91',$this->column_4_91,true);
		$criteria->compare('column_4_92',$this->column_4_92,true);
		$criteria->compare('column_4_93',$this->column_4_93,true);
		$criteria->compare('column_4_94',$this->column_4_94,true);
		$criteria->compare('column_4_95',$this->column_4_95,true);
		$criteria->compare('column_4_96',$this->column_4_96,true);
		$criteria->compare('column_4_97',$this->column_4_97,true);
		$criteria->compare('column_4_98',$this->column_4_98,true);
		$criteria->compare('column_4_99',$this->column_4_99,true);
		$criteria->compare('column_4_100',$this->column_4_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return BatchMaster the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/*
    @params $id primary key
    */
    public function getBatchMasterRecord($id){
    	if (empty($id))
    		return;
    	$sql = "SELECT *
				FROM {$this->tableName()} 
				WHERE id =:id AND  (delete_flg = 0 OR delete_flg = NULL)";
				$user_info       = Yii::app()->user->getUserInfo();
		$params = array(
			'alais' => '',
			'user_info'	=> $user_info
			);
		$sql_role_wise = $this->getFilterByRoleCondition($params);
		if(!empty($sql_role_wise))
		{
			if(!empty($sql)){
                $sql.= " AND ";
            }
            $sql.= $sql_role_wise;
		}
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':id', $id, PDO::PARAM_INT);
        $record = $cmd->queryRow();
        return $record;
    }

	public function getEntryData($entryDataParams){
		$id 				= $entryDataParams['id']; 
		$mode 				= $entryDataParams['mode'];
		$user_info 			= $entryDataParams['user_info'];
		$parent_screen_id	= !empty($entryDataParams['parent_screen_id']) ? $entryDataParams['parent_screen_id'] : 0;
		$is_clone			= !empty($entryDataParams['is_clone']) ? $entryDataParams['is_clone'] : 0;
		$normArr			= !empty($entryDataParams['normArr']) ? $entryDataParams['normArr'] : array();
		$popup				= !empty($entryDataParams['popup']) ? $entryDataParams['popup'] : FALSE;
    	
    	$user_role = $user_info['userRole'];
    	$user_id = $user_info['user_id'];
        $dynamic_fields = array();
        $hlpr = new ScreenHelper();
        $created_by="";
        $action_roles = array();
        // $screen_roles = array();
        $orderDetailRecords = array();
        $order_master_code = $a2Code = "";
        $entryMasterRecord = $this->getBatchMasterRecord($id);
        
        if ($mode == 'new')
    	{
    		$entryMasterRecord = new BatchMaster();
	        $user_info = Yii::app()->user->getUserInfo();
	        
	        $this->setInitialValue($dynamic_fields,$user_info,null);
			$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				if(!empty($dynamic_fields['dynamic_fields['.$field['column_name'].']'])){
					$entryMasterRecord->$field['column_name'] = $dynamic_fields['dynamic_fields['.$field['column_name'].']'];
				}
			}

			$entryMasterRecord->created_by = $user_id;
			$entryMasterRecord->created_datetime = date('Y-m-d H:i:s');

			$entryMasterRecord->column_4_10 = $dynamic_fields['dynamic_fields[column_4_10]'] = NULL;
			$entryMasterRecord->column_4_11 = $dynamic_fields['dynamic_fields[column_4_11]'] = NULL;
			
			if($entryMasterRecord->save()){
				$id = $entryMasterRecord->getPrimaryKey();
			}
			
			$entry_code = $dynamic_fields['dynamic_fields[column_4_01]'];
		}
    	else{
	        if (empty($entryMasterRecord)){
	        	$response=array(
	                'success'=>FALSE,
	                'msg'=> Yii::t('user','Access Not Allowed')
	            );
	        	echo CJSON::encode($response);
	        	exit;
	        }

	        // $parent_gift_order_code = !empty($parent_gift_order_code) ? $parent_gift_order_code : $entryMasterRecord['parent_gift_order_code'];
			
			$id = $entryMasterRecord['id'];
			$entry_code = $entryMasterRecord['column_4_01'];

	  		$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				$dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $entryMasterRecord[$field['column_name']];
			}
			if($is_clone == 1){
				$mode = 'new';
				$this->setInitialValue($dynamic_fields,$user_info,$is_clone);
			}
			/*Order Remarks Fld*/
			// $dynamic_fields['dynamic_fields[column_4_57]'] = $entryMasterRecord['column_4_57'];
			$created_by=$entryMasterRecord['created_by'];
    	}
    	
    	if($normArr) {
            $dynamic_fields = $dynamic_fields_;
        }
        
        $action_roles = $this->getRecordActionRoles($mode,$popup,null,$entryMasterRecord);
        
        // SET DELETE BUTTON AS DISABLED.
        $disableDeleteBtn = FALSE;
        if(!empty($entryMasterRecord)){
	        
        }
	  	$orderMaster = array(
  			'action_roles'	=>$action_roles, 
  			'id'			=>$id, 
  			'entry_code'	=>$entry_code,
  			// 'parent_order_code' => $entryMasterRecord['column_4_48'],
  			'dynamic_fields'=>$dynamic_fields,
  		);

	  	return $orderMaster;
    }

    public function getRecordActionRoles($mode,$popup=FALSE,$createBill=0,$entryMasterRecord=null){
    	$role_arr = array(
    		'new'       =>  true,
    		'save'		=>	true,
    		'delete'	=>	false,
    		'bill'		=>	false,
    		'cancel'	=>	true,
    		'print'     =>  false
    	);
    	switch ($mode) {
    		case 'new':
    			
				break;
    		case 'edit':
                $stockStatusArr = t('entryPanel','stockUpdateStatus');
    			if($popup === TRUE){
    				$role_arr['new'] = FALSE;	
    			}
    			if($createBill == 0){
	    			$role_arr['delete'] = TRUE;
	    			$role_arr['print'] = TRUE;
    			}
    			$user_info = Yii::app()->user->getUserInfo();
                if(RoleUtil::isAdmin($user_info['userRole']))
                {
    				$role_arr['new'] = FALSE;	
                }
                if($entryMasterRecord['column_4_26'] == $stockStatusArr['done'] )
                {
    				$role_arr['save'] = FALSE;	
                }
				break;
    		default:
    			break;
    	}

    	return $role_arr;
    }

    public function setInitialValue(&$dynamic_fields,$user_info,$is_clone=0){
    	$date = date('Y-m-d');
    	$parent_screen_id = 15;

    	if($is_clone == 0){
    		$this->setDefaultValues($dynamic_fields,$user_info,$parent_screen_id);
    	}
    	if($is_clone == 0){
    		/*Get Next Sequence Value for column_4_01 ::A1 */
    		$dynamic_fields['dynamic_fields[column_4_01]'] = $this->getNextSequenceValue();
    	}
	}
	public function getListData($params) {
    	$for_count				= $params['for_count'];
    	$user_id 				= Yii::app()->user->user_id;
    	$sql_where 				= $params['sql_where'];
    	$user_role				= $params['user_role'];
    	$is_draft				= $params['is_draft'];
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
			$sql .= "{$select_fields}, t4.id, t4.ext_id";
			$sql .= $this->getSyncStatusColumn('t4', $synctime, $user_id);
    	}

    	$sql .= " from ".$this->tableName()." as t4";

		if(!empty($synctime)) {
        	$sql .= " where (t4.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t4.delete_flg = 0 ";
        }
		if (!empty($sql_where))
		{
			$sql .= " AND {$sql_where}";
		}
		if(!$is_draft)
		{
			$sql .= "AND is_draft = '$is_draft'";
		}
		if (!empty($bulk_sql_where))
		{
			$sql .= " AND ({$bulk_sql_where})";
		}

		$sql .=")";

    	if ($for_count != true){
			$default_sort_order = "t4.column_4_07 desc, t4.column_4_01 desc";
			// $default_sort_order = "t4.column_5_01 desc";
			$sort_order = $this->getSortOrder('t4', $sort, $default_sort_order);
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
