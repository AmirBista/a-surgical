<?php

/**
 * This is the model class for table "hbase.h_transfer_master".
 *
 * The followings are the available columns in table 'hbase.h_transfer_master':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_8_01
 * @property string $column_8_02
 * @property string $column_8_03
 * @property string $column_8_04
 * @property string $column_8_05
 * @property string $column_8_06
 * @property string $column_8_07
 * @property string $column_8_08
 * @property string $column_8_09
 * @property string $column_8_10
 * @property string $column_8_11
 * @property string $column_8_12
 * @property string $column_8_13
 * @property string $column_8_14
 * @property string $column_8_15
 * @property string $column_8_16
 * @property string $column_8_17
 * @property string $column_8_18
 * @property string $column_8_19
 * @property string $column_8_20
 * @property string $column_8_21
 * @property string $column_8_22
 * @property string $column_8_23
 * @property string $column_8_24
 * @property string $column_8_25
 * @property string $column_8_26
 * @property string $column_8_27
 * @property string $column_8_28
 * @property string $column_8_29
 * @property string $column_8_30
 * @property string $column_8_31
 * @property string $column_8_32
 * @property string $column_8_33
 * @property string $column_8_34
 * @property string $column_8_35
 * @property string $column_8_36
 * @property string $column_8_37
 * @property string $column_8_38
 * @property string $column_8_39
 * @property string $column_8_40
 * @property string $column_8_41
 * @property string $column_8_42
 * @property string $column_8_43
 * @property string $column_8_44
 * @property string $column_8_45
 * @property string $column_8_46
 * @property string $column_8_47
 * @property string $column_8_48
 * @property string $column_8_49
 * @property string $column_8_50
 * @property string $column_8_51
 * @property string $column_8_52
 * @property string $column_8_53
 * @property string $column_8_54
 * @property string $column_8_55
 * @property string $column_8_56
 * @property string $column_8_57
 * @property string $column_8_58
 * @property string $column_8_59
 * @property string $column_8_60
 * @property string $column_8_61
 * @property string $column_8_62
 * @property string $column_8_63
 * @property string $column_8_64
 * @property string $column_8_65
 * @property string $column_8_66
 * @property string $column_8_67
 * @property string $column_8_68
 * @property string $column_8_69
 * @property string $column_8_70
 * @property string $column_8_71
 * @property string $column_8_72
 * @property string $column_8_73
 * @property string $column_8_74
 * @property string $column_8_75
 * @property string $column_8_76
 * @property string $column_8_77
 * @property string $column_8_78
 * @property string $column_8_79
 * @property string $column_8_80
 * @property string $column_8_81
 * @property string $column_8_82
 * @property string $column_8_83
 * @property string $column_8_84
 * @property string $column_8_85
 * @property string $column_8_86
 * @property string $column_8_87
 * @property string $column_8_88
 * @property string $column_8_89
 * @property string $column_8_90
 * @property string $column_8_91
 * @property string $column_8_92
 * @property string $column_8_93
 * @property string $column_8_94
 * @property string $column_8_95
 * @property string $column_8_96
 * @property string $column_8_97
 * @property string $column_8_98
 * @property string $column_8_99
 * @property string $column_8_100
 * @property string $ext_id
 */
class TransferMaster extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_id = 15;
		$this->_table_id = 8;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_transfer_master';
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
			array('column_8_02, column_8_03, column_8_04, column_8_05, column_8_06, column_8_07, column_8_08, column_8_09, column_8_11, column_8_12, column_8_13, column_8_14, column_8_15, column_8_17, column_8_18, column_8_19, column_8_20, column_8_21, column_8_22, column_8_23, column_8_24, column_8_25, column_8_26, column_8_27, column_8_28, column_8_29, column_8_31, column_8_32, column_8_33, column_8_34, column_8_35, column_8_37, column_8_38, column_8_39, column_8_40, column_8_41, column_8_42, column_8_43, column_8_44, column_8_45, column_8_46, column_8_47, column_8_48, column_8_49, column_8_51, column_8_52, column_8_53, column_8_54, column_8_55, column_8_57, column_8_58, column_8_59, column_8_60, column_8_61, column_8_62, column_8_63, column_8_64, column_8_65, column_8_66, column_8_67, column_8_68, column_8_69, column_8_71, column_8_72, column_8_73, column_8_74, column_8_75, column_8_77, column_8_78, column_8_79, column_8_80, column_8_81, column_8_82, column_8_83, column_8_84, column_8_85, column_8_86, column_8_87, column_8_88, column_8_89, column_8_90, column_8_91, column_8_92, column_8_93, column_8_94, column_8_95, column_8_96, column_8_97, column_8_98, column_8_99, column_8_100, ext_id', 'length', 'max'=>100),
			array('column_8_10, column_8_30, column_8_50, column_8_70', 'length', 'max'=>1000),
			array('column_8_16, column_8_36, column_8_56, column_8_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_8_01, column_8_02, column_8_03, column_8_04, column_8_05, column_8_06, column_8_07, column_8_08, column_8_09, column_8_10, column_8_11, column_8_12, column_8_13, column_8_14, column_8_15, column_8_16, column_8_17, column_8_18, column_8_19, column_8_20, column_8_21, column_8_22, column_8_23, column_8_24, column_8_25, column_8_26, column_8_27, column_8_28, column_8_29, column_8_30, column_8_31, column_8_32, column_8_33, column_8_34, column_8_35, column_8_36, column_8_37, column_8_38, column_8_39, column_8_40, column_8_41, column_8_42, column_8_43, column_8_44, column_8_45, column_8_46, column_8_47, column_8_48, column_8_49, column_8_50, column_8_51, column_8_52, column_8_53, column_8_54, column_8_55, column_8_56, column_8_57, column_8_58, column_8_59, column_8_60, column_8_61, column_8_62, column_8_63, column_8_64, column_8_65, column_8_66, column_8_67, column_8_68, column_8_69, column_8_70, column_8_71, column_8_72, column_8_73, column_8_74, column_8_75, column_8_76, column_8_77, column_8_78, column_8_79, column_8_80, column_8_81, column_8_82, column_8_83, column_8_84, column_8_85, column_8_86, column_8_87, column_8_88, column_8_89, column_8_90, column_8_91, column_8_92, column_8_93, column_8_94, column_8_95, column_8_96, column_8_97, column_8_98, column_8_99, column_8_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_8_01' => 'Column 8 01',
			'column_8_02' => 'Column 8 02',
			'column_8_03' => 'Column 8 03',
			'column_8_04' => 'Column 8 04',
			'column_8_05' => 'Column 8 05',
			'column_8_06' => 'Column 8 06',
			'column_8_07' => 'Column 8 07',
			'column_8_08' => 'Column 8 08',
			'column_8_09' => 'Column 8 09',
			'column_8_10' => 'Column 8 10',
			'column_8_11' => 'Column 8 11',
			'column_8_12' => 'Column 8 12',
			'column_8_13' => 'Column 8 13',
			'column_8_14' => 'Column 8 14',
			'column_8_15' => 'Column 8 15',
			'column_8_16' => 'Column 8 16',
			'column_8_17' => 'Column 8 17',
			'column_8_18' => 'Column 8 18',
			'column_8_19' => 'Column 8 19',
			'column_8_20' => 'Column 8 20',
			'column_8_21' => 'Column 8 21',
			'column_8_22' => 'Column 8 22',
			'column_8_23' => 'Column 8 23',
			'column_8_24' => 'Column 8 24',
			'column_8_25' => 'Column 8 25',
			'column_8_26' => 'Column 8 26',
			'column_8_27' => 'Column 8 27',
			'column_8_28' => 'Column 8 28',
			'column_8_29' => 'Column 8 29',
			'column_8_30' => 'Column 8 30',
			'column_8_31' => 'Column 8 31',
			'column_8_32' => 'Column 8 32',
			'column_8_33' => 'Column 8 33',
			'column_8_34' => 'Column 8 34',
			'column_8_35' => 'Column 8 35',
			'column_8_36' => 'Column 8 36',
			'column_8_37' => 'Column 8 37',
			'column_8_38' => 'Column 8 38',
			'column_8_39' => 'Column 8 39',
			'column_8_40' => 'Column 8 40',
			'column_8_41' => 'Column 8 41',
			'column_8_42' => 'Column 8 42',
			'column_8_43' => 'Column 8 43',
			'column_8_44' => 'Column 8 44',
			'column_8_45' => 'Column 8 45',
			'column_8_46' => 'Column 8 46',
			'column_8_47' => 'Column 8 47',
			'column_8_48' => 'Column 8 48',
			'column_8_49' => 'Column 8 49',
			'column_8_50' => 'Column 8 50',
			'column_8_51' => 'Column 8 51',
			'column_8_52' => 'Column 8 52',
			'column_8_53' => 'Column 8 53',
			'column_8_54' => 'Column 8 54',
			'column_8_55' => 'Column 8 55',
			'column_8_56' => 'Column 8 56',
			'column_8_57' => 'Column 8 57',
			'column_8_58' => 'Column 8 58',
			'column_8_59' => 'Column 8 59',
			'column_8_60' => 'Column 8 60',
			'column_8_61' => 'Column 8 61',
			'column_8_62' => 'Column 8 62',
			'column_8_63' => 'Column 8 63',
			'column_8_64' => 'Column 8 64',
			'column_8_65' => 'Column 8 65',
			'column_8_66' => 'Column 8 66',
			'column_8_67' => 'Column 8 67',
			'column_8_68' => 'Column 8 68',
			'column_8_69' => 'Column 8 69',
			'column_8_70' => 'Column 8 70',
			'column_8_71' => 'Column 8 71',
			'column_8_72' => 'Column 8 72',
			'column_8_73' => 'Column 8 73',
			'column_8_74' => 'Column 8 74',
			'column_8_75' => 'Column 8 75',
			'column_8_76' => 'Column 8 76',
			'column_8_77' => 'Column 8 77',
			'column_8_78' => 'Column 8 78',
			'column_8_79' => 'Column 8 79',
			'column_8_80' => 'Column 8 80',
			'column_8_81' => 'Column 8 81',
			'column_8_82' => 'Column 8 82',
			'column_8_83' => 'Column 8 83',
			'column_8_84' => 'Column 8 84',
			'column_8_85' => 'Column 8 85',
			'column_8_86' => 'Column 8 86',
			'column_8_87' => 'Column 8 87',
			'column_8_88' => 'Column 8 88',
			'column_8_89' => 'Column 8 89',
			'column_8_90' => 'Column 8 90',
			'column_8_91' => 'Column 8 91',
			'column_8_92' => 'Column 8 92',
			'column_8_93' => 'Column 8 93',
			'column_8_94' => 'Column 8 94',
			'column_8_95' => 'Column 8 95',
			'column_8_96' => 'Column 8 96',
			'column_8_97' => 'Column 8 97',
			'column_8_98' => 'Column 8 98',
			'column_8_99' => 'Column 8 99',
			'column_8_100' => 'Column 8 100',
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
		$criteria->compare('column_8_01',$this->column_8_01);
		$criteria->compare('column_8_02',$this->column_8_02,true);
		$criteria->compare('column_8_03',$this->column_8_03,true);
		$criteria->compare('column_8_04',$this->column_8_04,true);
		$criteria->compare('column_8_05',$this->column_8_05,true);
		$criteria->compare('column_8_06',$this->column_8_06,true);
		$criteria->compare('column_8_07',$this->column_8_07,true);
		$criteria->compare('column_8_08',$this->column_8_08,true);
		$criteria->compare('column_8_09',$this->column_8_09,true);
		$criteria->compare('column_8_10',$this->column_8_10,true);
		$criteria->compare('column_8_11',$this->column_8_11,true);
		$criteria->compare('column_8_12',$this->column_8_12,true);
		$criteria->compare('column_8_13',$this->column_8_13,true);
		$criteria->compare('column_8_14',$this->column_8_14,true);
		$criteria->compare('column_8_15',$this->column_8_15,true);
		$criteria->compare('column_8_16',$this->column_8_16,true);
		$criteria->compare('column_8_17',$this->column_8_17,true);
		$criteria->compare('column_8_18',$this->column_8_18,true);
		$criteria->compare('column_8_19',$this->column_8_19,true);
		$criteria->compare('column_8_20',$this->column_8_20,true);
		$criteria->compare('column_8_21',$this->column_8_21,true);
		$criteria->compare('column_8_22',$this->column_8_22,true);
		$criteria->compare('column_8_23',$this->column_8_23,true);
		$criteria->compare('column_8_24',$this->column_8_24,true);
		$criteria->compare('column_8_25',$this->column_8_25,true);
		$criteria->compare('column_8_26',$this->column_8_26,true);
		$criteria->compare('column_8_27',$this->column_8_27,true);
		$criteria->compare('column_8_28',$this->column_8_28,true);
		$criteria->compare('column_8_29',$this->column_8_29,true);
		$criteria->compare('column_8_30',$this->column_8_30,true);
		$criteria->compare('column_8_31',$this->column_8_31,true);
		$criteria->compare('column_8_32',$this->column_8_32,true);
		$criteria->compare('column_8_33',$this->column_8_33,true);
		$criteria->compare('column_8_34',$this->column_8_34,true);
		$criteria->compare('column_8_35',$this->column_8_35,true);
		$criteria->compare('column_8_36',$this->column_8_36,true);
		$criteria->compare('column_8_37',$this->column_8_37,true);
		$criteria->compare('column_8_38',$this->column_8_38,true);
		$criteria->compare('column_8_39',$this->column_8_39,true);
		$criteria->compare('column_8_40',$this->column_8_40,true);
		$criteria->compare('column_8_41',$this->column_8_41,true);
		$criteria->compare('column_8_42',$this->column_8_42,true);
		$criteria->compare('column_8_43',$this->column_8_43,true);
		$criteria->compare('column_8_44',$this->column_8_44,true);
		$criteria->compare('column_8_45',$this->column_8_45,true);
		$criteria->compare('column_8_46',$this->column_8_46,true);
		$criteria->compare('column_8_47',$this->column_8_47,true);
		$criteria->compare('column_8_48',$this->column_8_48,true);
		$criteria->compare('column_8_49',$this->column_8_49,true);
		$criteria->compare('column_8_50',$this->column_8_50,true);
		$criteria->compare('column_8_51',$this->column_8_51,true);
		$criteria->compare('column_8_52',$this->column_8_52,true);
		$criteria->compare('column_8_53',$this->column_8_53,true);
		$criteria->compare('column_8_54',$this->column_8_54,true);
		$criteria->compare('column_8_55',$this->column_8_55,true);
		$criteria->compare('column_8_56',$this->column_8_56,true);
		$criteria->compare('column_8_57',$this->column_8_57,true);
		$criteria->compare('column_8_58',$this->column_8_58,true);
		$criteria->compare('column_8_59',$this->column_8_59,true);
		$criteria->compare('column_8_60',$this->column_8_60,true);
		$criteria->compare('column_8_61',$this->column_8_61,true);
		$criteria->compare('column_8_62',$this->column_8_62,true);
		$criteria->compare('column_8_63',$this->column_8_63,true);
		$criteria->compare('column_8_64',$this->column_8_64,true);
		$criteria->compare('column_8_65',$this->column_8_65,true);
		$criteria->compare('column_8_66',$this->column_8_66,true);
		$criteria->compare('column_8_67',$this->column_8_67,true);
		$criteria->compare('column_8_68',$this->column_8_68,true);
		$criteria->compare('column_8_69',$this->column_8_69,true);
		$criteria->compare('column_8_70',$this->column_8_70,true);
		$criteria->compare('column_8_71',$this->column_8_71,true);
		$criteria->compare('column_8_72',$this->column_8_72,true);
		$criteria->compare('column_8_73',$this->column_8_73,true);
		$criteria->compare('column_8_74',$this->column_8_74,true);
		$criteria->compare('column_8_75',$this->column_8_75,true);
		$criteria->compare('column_8_76',$this->column_8_76,true);
		$criteria->compare('column_8_77',$this->column_8_77,true);
		$criteria->compare('column_8_78',$this->column_8_78,true);
		$criteria->compare('column_8_79',$this->column_8_79,true);
		$criteria->compare('column_8_80',$this->column_8_80,true);
		$criteria->compare('column_8_81',$this->column_8_81,true);
		$criteria->compare('column_8_82',$this->column_8_82,true);
		$criteria->compare('column_8_83',$this->column_8_83,true);
		$criteria->compare('column_8_84',$this->column_8_84,true);
		$criteria->compare('column_8_85',$this->column_8_85,true);
		$criteria->compare('column_8_86',$this->column_8_86,true);
		$criteria->compare('column_8_87',$this->column_8_87,true);
		$criteria->compare('column_8_88',$this->column_8_88,true);
		$criteria->compare('column_8_89',$this->column_8_89,true);
		$criteria->compare('column_8_90',$this->column_8_90,true);
		$criteria->compare('column_8_91',$this->column_8_91,true);
		$criteria->compare('column_8_92',$this->column_8_92,true);
		$criteria->compare('column_8_93',$this->column_8_93,true);
		$criteria->compare('column_8_94',$this->column_8_94,true);
		$criteria->compare('column_8_95',$this->column_8_95,true);
		$criteria->compare('column_8_96',$this->column_8_96,true);
		$criteria->compare('column_8_97',$this->column_8_97,true);
		$criteria->compare('column_8_98',$this->column_8_98,true);
		$criteria->compare('column_8_99',$this->column_8_99,true);
		$criteria->compare('column_8_100',$this->column_8_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return TransferMaster the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/*
    @params $id primary key
    */
    public function getTransferMasterRecord($id){
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

    public function setInitialValue(&$dynamic_fields,$user_info,$is_clone=0){
    	$date = date('Y-m-d');
    	$parent_screen_id = 22;
    	if($is_clone == 0){
    		$this->setDefaultValues($dynamic_fields,$user_info,$parent_screen_id);
    	}
    	if($is_clone == 0){
    		/*Get Next Sequence Value for column_8_01 ::A1 */
    		$dynamic_fields['dynamic_fields[column_8_01]'] = $this->getNextSequenceValue();
    	}
  		// /*Entry Date ::A4 */
		// $dynamic_fields['dynamic_fields[column_8_04]'] = $date;
		// /*User name ::A8 */
		// $dynamic_fields['dynamic_fields[column_8_08]'] = $user_info['last_name'].' '.$user_info['firstName'];
		// /*Entry DateTime ::A9 */
		// $dynamic_fields['dynamic_fields[column_8_09]'] = date('Y-m-d H:i');
		// /*Last Updated By*/
		// $dynamic_fields['dynamic_fields[column_8_10]'] = null;
		// /*Last Updated On*/
		// $dynamic_fields['dynamic_fields[column_8_11]'] = null;
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
        $dynamic_fields_ = array();
        $dynamic_fields = array();
        $hlpr = new ScreenHelper();
        $created_by="";
        $action_roles = array();
        // $screen_roles = array();
        $orderDetailRecords = array();
        $order_master_code = $a2Code = "";
        $entryMasterRecord = $this->getTransferMasterRecord($id);
        
        if ($mode == 'new')
    	{
    		$entryMasterRecord = new TransferMaster();
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

			$entryMasterRecord->column_8_12 = $dynamic_fields['dynamic_fields[column_8_12]'] = NULL;
			$entryMasterRecord->column_8_13 = $dynamic_fields['dynamic_fields[column_8_13]'] = NULL;
			if($entryMasterRecord->save()){
				$id = $entryMasterRecord->getPrimaryKey();
			}
			
			$entry_code = $dynamic_fields['dynamic_fields[column_8_01]'];
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
			$entry_code = $entryMasterRecord['column_8_01'];

	  		$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				$dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $entryMasterRecord[$field['column_name']];
			}
			if($is_clone == 1){
				$mode = 'new';
				/*$order_master_id = $fixed_fields['fixed_fields[order_master_id]'] = null;*/
				$this->setInitialValue($dynamic_fields,$user_info,$is_clone);
			}
			/*Order Remarks Fld*/
			// $dynamic_fields['dynamic_fields[column_8_57]'] = $entryMasterRecord['column_8_57'];
			$dynamic_fields['dynamic_fields[column_8_12]'] = $entryMasterRecord['column_8_12'];
			$dynamic_fields['dynamic_fields[column_8_13]'] = $entryMasterRecord['column_8_13'];
			$created_by=$entryMasterRecord['created_by'];
    	}
    	
    	if($normArr) {
            $dynamic_fields = $dynamic_fields_;
        }
        
        $action_roles = $this->getRecordActionRoles($mode,$popup);
        
        // SET DELETE BUTTON AS DISABLED.
        $disableDeleteBtn = FALSE;
        if(!empty($entryMasterRecord)){
	        
        }
	  	$orderMaster = array(
  			'action_roles'	=>$action_roles, 
  			'id'			=>$id, 
  			'entry_code'	=>$entry_code,
  			// 'parent_order_code' => $entryMasterRecord['column_8_48'],
  			'dynamic_fields'=>$dynamic_fields,
  		);

	  	return $orderMaster;
    }

    public function getRecordActionRoles($mode,$popup=FALSE){
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
    			if($popup === TRUE){
    				$role_arr['new'] = FALSE;	
    			}
    			$user_info = Yii::app()->user->getUserInfo();
                if(RoleUtil::isAdmin($user_info['userRole']))
                {
    				$role_arr['new'] = FALSE;	
                }
				break;
    		default:
    			break;
    	}

    	return $role_arr;
    }

    public function getWhereCondition($params){
		$company_code      = empty($params['company_code']) ? null:$params['company_code'];
		$entry_id          = empty($params['entry_id']) ? null:$params['entry_id'];
		$alais             = $params['alais'];
    	$sql_where = parent::getWhereCondition($params);
    	
    	if (!empty($company_code)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_8_17 = '{$company_code}'";
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
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$select_fields 			= null;
    	// $dataForMemberInfo 		= empty($params['dataForMemberInfo']) ? false:$params['dataForMemberInfo'];
    	// $billClosingDay        	= $params['billClosingDate'];
     //    $order_type             = $params['order_type'];
     //    $order_transaction_id   = $params['order_transaction_id'];
     //    $forInvoicePayment      = $params['forInvoicePayment'];
     //    $forInvoiceBill         = $params['forInvoiceBill'];
     //   	$year					= empty($params['invoiceYear']) ? null:$params['invoiceYear'];
     //    $month   				= empty($params['invoiceMonth']) ? null:$params['invoiceMonth'];
     //    $forPickingEntry      	= empty($params['forPickingEntry']) ? 0:$params['forPickingEntry'];
     //    $delivery_date        	= empty($params['delivery_date']) ? null:$params['delivery_date'];
     //    $mode        			= empty($params['mode']) ? null:$params['mode'];
     //    $picking_master_id      = empty($params['picking_master_id']) ? 0:$params['picking_master_id'];

        
    	$alais = "t8";
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
			$sql .= "{$select_fields}, t8.id, t8.ext_id,t8.column_8_01,t8.column_8_03,t8.column_8_17";
    		$sql .= $this->getSyncStatusColumn('t8', $synctime, $user_id);
    	}
    	$sql .= " FROM {$this->tableName()} AS t8";

		if(!empty($synctime)) {
        	$sql .= " WHERE (t8.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " WHERE  (t8.delete_flg = 0  AND  t8.is_draft = 0";
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
			$default_sort_order = " t8.column_8_01 DESC ";
			$sort_order = $this->getSortOrder('t8', $sort, $default_sort_order);
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
    	}
    	else {
        	$results = $cmd->queryAll();
    	}

		return $results;
    }

    public function getComment($entry_code) {
    	$sql = "SELECT t1.column_8_98 as comment
    			FROM {$this->tableName()} t1 
    			WHERE (t1.column_8_01 =:entry_code AND (t1.delete_flg = 0 OR t1.delete_flg IS NULL))";
    	$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':entry_code', $entry_code, PDO::PARAM_INT);
    	$result = $cmd->queryRow();
	    return $result;
    }

}
