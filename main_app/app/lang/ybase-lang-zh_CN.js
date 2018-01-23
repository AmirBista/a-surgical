var Ext=Ext||{};
Ext.LANG = {
	"globalLang":{
		"app":{
			appTitle:"hBase",
			copyright:"[hBase] Developed by YONEFU"
		},
		"specialChar":{
			openBracket: "【",
			closeBracket: "】",
			square:"■ ",
			dot:"● ",
			comma:",",
			previous:"<",
			first:"<<",
			last:">>",
			next:">",
			tilde:"～",
			people:"人",
			blankInquiry:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
			noUpdateDate:"",
			hyphon: "-",
			star:"\u2605"
		},
		"general" : {
			yes : '是',
			no  : '否'
		},
		"dateTime":{
			today:"今天",
			week:"周",
			month:"月",
			year:"年",
			date:"日期",
			dateTime:"时间",
			previousDate:"前一天",
			nextDate:"下一天",
			fromDate:"何时开始",
			toDate:"何时结束",
			modifiedDate: "更新日期",
			saturday: '六',
			sunday : '日'
		},
		"confirmMsg":{
			deleteConfirm:"删除。",
			winCloseConfirm:"关闭编辑画面",
			overwriteRecord: '已经存在的登录资料，要覆盖它嘛？',
			askBeforeClose : '还有尚未储存的资料，不存档直接离开嘛？',
			saveRecordBeforeActionConfirm : '变更的内容需要储存，执行它嘛？',
			hasDetailData: "详细情报已经建立。全部删除嘛？",
			createBillOrderCreatedConfirm : "Order Already Generated From This Estimate. Create New Bill?",
			createBillOrderConvertedConfirm : "Estimate Record Already Converted To Bill.Convert New Bill?",
			purchaseQtyExceedsOrderedQtyConfirm: 'Purchased Qty Exceeds Ordered Qty. Do You Want To Update Ordered Qty Stock?',
			findedDoneStatus : 'Transfer Status Done  Finded  would you like to  update Stock Data ?'
		},
		"alertMsg":{
			emptyField:"必须项目的输入有缺漏。",
			invalidFieldData:"输入的值有误。",
			systemError:"系统发生错误。请稍待一会儿再确认一次。",
			searchReOrderMessage:"该记录项目不存在。",
			maxUserExceed:"超过最大使用者数。<br>加入最大使用者数外超过的人数必须变更授权。",
			selectMembers:"请选择使用者。",
			selectCombo:"请指定群组(群组)",
			rowsNotSelect:"请指定记录项目(行)",
			invalidFileType: "文件格式错误",
			noSaveRights:"没有储存的权限",
			unsavedRecordContinue: "更新",
			bulkActionConfirm:"执行海量更新处理　※执行後无法取消，请注意！",
			deleteSearchName: "消除检索条件",
			noRecordAdded:"没有增加新纪录",
			alreadyLoaded:"读取完成",
			mustHaveOneColumn:"请选择项目。",
			unique:"独特",
			alreadyMapped:"已经关连",
			selectValue:"请选择值。",
			recordExits:"重复错误！已经登录了。",
			failure:"处理失败",
			unsavedRecordExportCSV: "有尚未保存内容的记录项目，确定要这样输出嘛？(未保存的内容将不会输出)",
			noTemplate: "不支援打印。※一部分的内容请使用帐票软件。",
			deleteRecord: "确定要删除嘛？",
			alreadySelected:'重复错误！已经有相同的颜色・相同的尺寸的物品。',
			invalidExtension  :'非对应的文件格式',
			windowReload:'更新完成。为了完成更新请重新读取系统。',
            noRowsSelected:"请选择记录项目。",
            recordDirty:"有尚未保存的资料。",
            noData : "没有找到对应的记录项目。",
            confirmSave:'更新',
            fieldNotValid:'项目的值不可为空栏或是小於1',
            paymentAmountLess:'支付金额小於未支付金额',
			paymentAmountEqual:'支付金额和未支付金额相等',
			paymentAmountGreater:'支付金额大於未支付金额',
			noRecordToUpdate:'记录项目已更新',
			accessError	:'Unauthorized Access'
		},
		"successMsg":{
			saveSuccess:'保存完成。',
			updateSuccess:"更新完成。",
			deleteSuccess:"删除完了。",
			toggleSuccess:"状态切换完了。",
			importSuccess:"输入完成。",
			exportSuccess:"输出完成。",
			uploadSuccess:"上传完成。",
			downloadSuccess:"下载完成。",
			actionApplied:"更新完成。",
			refreshSuccess: "再读取完成。",
			saveSuccessGiftOrder: '保存完成。接下来制作商品订单。'
		},
		"errorMsg":{
			saveError:"保存错误",
			updateError:"更新错误",
			deleteError:"删除错误",
			importError:"资料输入错误",
			exportError:"资料输出错误",
			uploadError:"文件上传错误",
			downloadError:"文件下载错误",
			duplicateEntry:"重复错误",
			accessDenied:"未经授权的访问错误",
			invalidFormFields:"必须项目的输入有缺漏。",
			fileSizeLimit: "超过最大的文件容量限制。附件的文件大小为3MB以下。",
			fileUploadLimit: "超过了附加文件的容量限制。",
			cannotSave: "必须项目的输入有所缺漏。请再度确认後储存。",
			requiredFieldMissing: '必须项目的输入有所缺漏。请再度确认後储存。',
			mandatoryField : '必须项目',
			refreshError:"再读取错误",
			fixError:'输入值有误请确认後再保存',
            validateError:"必须输入的项目。请输入正确的值。",
            emptyOrderDetailEntry:'有上位数入的项目。请填写订单的详细内容。',
            fileSelectionSaveFailed : '文件选择保存失败',
            importTypeMissing : '输入类型遗失',
            fileNotFound : '文件未找到或是已被使用',
            productNotSelectedError : '请选择一个有效的产品，然後再继续',
            packingQtyExceeded : '包装数量超出客户指定的数量',
            noQtyToPurchase : '所有预定数量已购买'
		},
		"progressBarText":{
			saving:"保存中…",
			updating:"更新中…",
			deleting:"删除中…",
			importing:"输入中…",
			exporting:"输出中…",
			uploading:"上传中…",
			downloading:"下载中…",
			processing:"处理中…",
			loading:"读取中…",
			reloading:"重新读取中…",
			validating:"资料确认中…",
			syncing:"同步中..."
		},
	   	"headerMenu":{
			btnLogout:"登出",
			menuUserProfile: '个人资料',

		 	entryPnlMenuItem: 'Order/Sales Entry',
		 	menuItemOrderEntry: 'Order Entry',
		 	menuItemSalesEntry: 'Sales Entry',
		 	btnCustomer: "Customer",
			//Order Menu
			btnOrderMaster: "订单管理",
			orderMasterMenuItem: "销售订单列表",
			serivceMasterMenuItem : 'Service Master',
			repairMasterPnlMenuItem : 'Repair Master',
			salesEntryMenuItem : "③ Sales List",
		 	//Stock Menu
			btnStore: "商店",
			purchaseEntryPnlMenuItem: '新的采购项目',
			productPnlMenuItem: "商品菜单面板",
			batchMasterPnlMenuItem: "批次主菜单",
			batchDetailPnlMenuItem: "批次详细内容",	
			supplierPnlMenuItem: "Supplier Panel",
			btnSupport : 'Support',
			//store
			btnStoreTransfer: 'store transfer1',
			stockTransferEntryPnlMenuItem : 'transfer entry',
			stockTransferMasterPnlMenuItem : 'transfer master'
		},	
		"csvExport":{
			btnCSVExport:"CSV输出",
			btnCSVExportAllclmAllrec:"CSV输出「所有项目」",
			btnCSVExportAllclmSelrec:"输出所有项目",
			btnCSVExportSleclmSlerec:"只输出显示的项目",
			btnCSVExportSleclmAllrec:"CSV输出「显示中的所有项目」"			
		},
		"csvImport":{
			csvImportWin:"CSV上传",
			btnFileUpload:"① CSV文件选择",
			btnCsvCheck: "② 资料确认",
			btnImportData: "③ 执行（更新・保存）",
			btnErrorCsvDownload:"下载",
			btnCancel:"取消",
			lbltotalCsvRecords:"全件数",
			lblcorrectCsvRecords:"成功件数",
			lblincorrectCsvRecords:"错误件数",
			lblCheckMask: "资料确认中・・・・请稍待。",
			"log":{
				log : "资料确认结果",
				success: "成功",
				error: "错误",
				csvRowNumber: "CSV行番号",
				csvErrorCode: "错误码",
				csvErrorMsg: "错误内容"	
			},
			"msgBox" : {
				// deleteFile: '文件删除。',
				closeWin: '关闭CSV输入画面。',
				invalidCsvData: 'CSV文件类型错误（附件名错误）<br>请确认後再试一次。',
				importOnlyCorrectCsv : '只更新成功的件数。'
			}
		},
		"buttons":{
			ok:"OK",
			btnBulkUpdate:"処理",
			btnView:"详细",
			btnEdit:"编集",
			btnDraft:"下书き保存",
			btnSave:"保存",
			btnDelete:"删除",
			btnPrint:"打印",
			btnClose:"闭じる",
			btnClone:"文件复制",
			btnAdditionalClone:"文件复制 2",
			btnSelect:"选择",			
			btnAttachFile:"追加",
			btnOk:"OK",
			btnYes: "是",
			btnNo: "否",
			btnCancel:"取消",
			btnEditSave: "报告",
			btnSearch: "搜寻",
			btnExcelExp: 'Excel输出',
			btnRefresh: "再读取",
			btnReset: '重置',
			btnCopyRecord : '复制',
			menuSelectRecord:"只输出选择中的记录项目",
			menuAllRecords:"输出所有相关的记录项目",
			btnAdvancedSearch : '批次搜寻机能',
			btnAdd:'新规登録',
			btnPrintReport : '打印「受理通知」',
			cboSettingBtn:'备考设定',
			btnCsvImport : 'CSV取込',
			btnNewRegister:"新规登録",
			btnPrintCSV : '打印 Csv',
			btnPurchaseEntry: '采购登录',
			btnInsertRow : 'Insert Row ',
			btnUpdateStock: 'Update Stock',
			btnCreateOrder : '变换成订单',
			btnNewEntry : '登录新订单',
			btnEditPopupEntry: '详细画面の立ち上げ'
		},
		"subMenuText":{
			saveSearch: '保存搜寻条件',
            saveGridLayout: '保存表示项目',
            showAllFields: '显示所有的项目',
            resetAllFields: '重置所有的领域'
		},
		"iconToolTip":{
			searchSaveHistory: "搜寻履歴",
			setting: "设定"
		},
		"buttonToolTip":{
			moveUp:"往上移动",
			moveDown:"往下移动"
		},
		"gridHeader": {
			lblAction: "操作",
			lblColumnSetting: "项目",
			lblcolumnListMenu : '表示项目'
		},
		"searchCriteria":{
			winTitle:"新规搜寻条件",
			lblSearchConditon:"搜寻条件",
			emptySearchField:"请输入搜寻条件",
			isPublic:"一般共享",
        	chkBoxShowTemplate: 'chkBoxShowTemplate',
        	publicSearchChkBoxArr: [50]
		},
		"searchEditCriteria":{
			winTitle:"新规搜寻条件",
			btnAdd:'btnAdd',
			btnSave:'btnSave',
			btnCancel:'btnCancel',
			moveColSelected: 'moveColSelected',
			searchNameCol: 'searchNameCol',
			searchCriteriaCol: 'searchCriteriaCol',
			displayCol: 'displayCol',
			systemFlagCol: 'systemFlagCol',
			isPublicCol: 'isPublicCol',
			showTemplateCol: 'showTemplateCol',
			removeAction: 'removeAction',
			usernameCol: 'username'
		},
		'comboGrid' : {
			loadingText : '搜寻中…',
			emptyText : '没有相关的资料。'
		}
	},
	"BasicBasePanel": {
		btnAdd:"新规登録",
		btnSave:"保存",
		btnDelete : '删除',
		btnCsvDwnld:"CSV输出",
		menuSelectedCsv:"选择记录项目のみ",
		menuAllCsv:"所有的相关记录项目",
		btnFileAdd:'文件登録',
		btnPrint:"打印",
		menuSelectedTemp91Print : '收益明细表',
		menuSelectedTemp92Print: '采购明细表',
		menuSelectedDataPrint:'收据',
		menuSelectedTemp93Print: '商品清单',
		menuSelectedTemp95Print: '收据（预览内容）',
		rwChkBox: 'rwChkBox',
		btnNewEntry: '订单登录',
		menuSelectedTemp91Print : 'stock print'
	},
	"BasePanel": {
		leftPanelUpdateBtn:'更新',
		leftPanelAddBtn:'新规追加',
		middleCntSaveBtn:'保存',
		middleCntDeleteBtn:'删除',
		middleCntCsvBtn:"CSV输出",
		selectedCsvMenu:"选择记录项目のみ",
		allCsvMenu:"所有的相关记录项目",
		middleCntPrintBtn:'打印',
		selectedPrintMenu:'选择中',
		allPrintMenu:'全部'
	},
	"bulkUpdate":{
		bulkUpdateTitle: "批次搜寻・更新工具",
        getClickItem: "关键字一览表に追加する",
        clearButton: "清除",
        copyValued: "复制",
        action: "操作",
        fieldSelectedValue: "选择的値",
        replaceValueGrid: "替换的値",
        getButton: "取得",
        setButton: "设定",
        bulkUpdate: "批次搜寻・更新工具",
        getClickedValue: "是否追加到关键字一览表",
        bulkUpdateExpand: "显示批次更新工具",
        bulkUpdateCollapes: "关闭批次更新工具",
        copyClickedValue: "追加到关键字一览表",
        dontCopyClickedValue: "不追加到关键字一览表",
        replaceValue: "置换",
        specifiedFormat: "追加/修正",
        percentage: "百分比(%)",
        addDays: "增加日期",
        textText: "合并",
        atFront: "到最前头",
        btnSearch:"搜寻"
	},
	"dashboard":{
		breadcrumb:'首页',
		lblInformation:"通知",
		lblNewpost:"最新情报"	
	},
	"dateFormat" :{
   		defaultDateFormat: "Y-m-d"
	},
	'help_link':{
		reportLink:'http://yofile.xyz/',
	},
	'help_label':{
		help:'帮助',
		auto_save:'※自动保存有効'
	},
	"datagridTemplate":{
        winTitle: "一览表表示项目（查看）管理画面",
        panelNameCombo: "面板名",
        datagridTemplateCombo: "查看模版名",
        btnUpdateDatagridTemplate : "更新",
        btnSaveAsDatagridTemplate : "另存新档",
        leftGridFieldName : "项目",
        displayCol:"顺番",
        removeCol:"删除",
        remove:"选择",
        displayOrderColumn:"表示顺序",
        save:"保存",
        successMsg:"保存完成。",
        transferOneColumnAtleast:"请选择显示项目。最少需1个项目。",
        tempNameExists:"同名称的查看模版已存在。",
        isPublic:"一般共享",
        datagridTemplateHelp:"",
        columnHideShow:'表示(ON/OFF)',
        noChange:'没有任何内容变更。',
        characterExceeds:"超过限制的文字数。",
        columnLock:'固定项目'
    },
    "template":{
        templateSave : "表示项目管理",
        defaultTemplate : "所有项目表示"
    },
	"userProfiles":{
		winTitle:'使用者个人情报画面',
		btnSave : '保存',
		btnCancel:'取消',
		lblUserName:'使用者名',
		lblFirstName:'姓名',
		lblPassword:'密码',
		lblLastName:'缩写（半角2文字）',
		lblPhoneNo:'电话',
		lblEmail:'E-mail',
		lblAvaiableLangauge:'表示言语',
		lblResetPassword:'重设密码',
		textPhoneNo:'使用 - 来登录'
	},
	'report': {
		panelTitle:'各种帐票',
		leftPanelTitle:'帐票一览表'
	},
	'tplValues': {
		'{today}': Ext.Date.format(new Date(), 'Y-m-d'),
        '{username}' : Ext.CURRENT_USER.username,
        '{user}' : Ext.CURRENT_USER.username,
        '{company}' : Ext.CURRENT_USER.company_name,
        '{department}' : Ext.CURRENT_USER.department_name
	},
	"settingsPanel":{
		settingPnlTitle:'设定画面',
		btnCsvMap :"CSV映射",
		btnProductMaster :"Product Master",
		btnClientMaster :"Client Master",
		btnStaff :"Staff",
	},
	"addCsvField": {
		headerTitle:'CSV映射　※上级使用者机能'
	},
	"ecSiteExport":{
		operation:"操作",
		fieldLabel:"项目",
		tableId:"表单ID",
		tableFieldId:"项目ID",
		fieldType:"属性",
		isMapped:"纽付中",
		csvFieldName:"CSV项目名",
		displayOrder:"表示顺序",
		mappedFields:"关连项目",
		mappedTableName:"关连表单名",
		mappedTableId:"关连表单ID",
		fieldId:"项目ID",
		csvReportFieldId:"csvReportFieldId",
		isSingleMapped:"isSingleMapped",
		csvReportId:"csvReportId",
		mappedFieldType:"mappedFieldType",
		DefaultValue:"默认値",
		optionValue:"Option値",
		idFieldTable:"・项目ID",
		actions:"解除",
		csvImport:"输出形式",
		btnBrowse:"CSV文件选择",
		comboDoesnotHaveValue:"选择値错误",
		formatName:"格式名称"
	},
	"importExportCsvWindow": {
		headerTitle: 'CSV项目管理画面　※系统管理者専用画面。',
		csvName: 'CSV英文名',
		csvNameJp: 'CSV日文名',
		csvBillCode: 'CSV　CD',
		csvReportName: '报表名',
		mappedFrom: 'Mapped From',
		csvType: 'CSV Type',
		csvFieldName: 'CSV Field Name',
		displayColCsvImport:'显示顺序',
		removeActionCsvImport:'移除'
	},
	'helpTextWindow':{
		winTitle: "帮助画面",
		btnHelpTextEdit: "编集",
		btnHelpTextSave : "保存",
		btnCancel: "取消",
		btnOk: "OK",
		help_code_col: "CD",
		help_name_col: "帮助名",
		deleteHelpCol: "操作",
		btnHelpTextAdd: "新规登録",
		noChange:'没有任何内容变更。',
		saveSuccessCloseWindow:'保存完成。 </br> 关闭帮助画面嘛？'
	},
	'multiImageWin': {
        winTitle: '文件上传',
        fileUpload: '上传',
        readyToUpload: "上传准备完了",
        Start: "上传开始",
        removeAll: "全部删除",
        cancel: "取消",
        removeUploaded: "删除上传",
        upload: "上传",
        completed: '上传完成。',
        statusFailed:'错误！',
        statusInvalidSize:'文件容量制限错误！',
        statusInvalidExtension:'文件形式制限错误！',
        dragDropFile:'【Drag & Drop】'
    },
    'cloneArray' : ['column_4_02','column_4_03','column_4_04','column_4_14','column_4_15'],
 	/*'auctionFileViewWindow':{
    	title : '商品画像'
    },*/
    'fileViewWindow':{
    	title : '商品画像'
    },
    'imageDragDropWin':{
    	winTitle:'商品画像'
    },
	'fieldOptionWindow':{
		WinTitle: '项目マスタ管理',
		btnAdd:'追加',
		btnSave:'保存',
		btnCancel:'取消',
		moveColSelected:'：',
		fieldOptionDataCol:'项目',
		displayCol:'表示顺序',
		removeAction:'删除',
		fieldOptionNameDisplayFld:'■'

	},
	'taskRunner': {
		interval: 0 * 1000
	},
	"entryPanel" : {
		pnlTitle:'①　Order Entry',
		// pnlTitle : '订单登录画面',
		salesTitle: '①　Sales Entry',
		entryCode : '伝票番号',
		btnAddComment: '连络/注解',
		btnNewServiceEntry: 'New Service',
		btnNewSalesEntry: 'New Sales Entry',
		btnNewOrderEntry: 'New order Entry',
		btnConvertToSales: 'Convert To Sales',
		latestComment: '▶ ',
		convertedToOrder : 'convertedToOrder',
		orderCreated : 'orderCreated',
		menuItemPrintJson : '见积书（社内）',
		menuItemPrintCsv : '见积书',
		menuItemOrderPrint : '订购书',
		salesEntryPanel : 'salesEntry1',
		orderEntryPanel : 'orderEntry1',
		// productAcquireFrom : {
		// 	fromStock : 'Stock',
		// 	fromSupplier : 'Supplier'
		// },
		customerType : {
			registered : 'Registered',
			notRegistered : 'Not Registered'
		},
		serviceFlag : {
			yes : 'Yes',
			no : 'No'
		},
		productType : {
			item : 'Item',
			product : 'Product',
			gift : 'Gift',
			others: 'Others'
		},
		order_type : {
			sales : 'sales',
			order : 'order'
		},
		receiveStatus : {
			received : 'Received',
			notReceived : 'Not Received'
		},
		invalidQuantity: 'Quantity Exceeds Maximum allowed Balance',
		orderContractPrintMenu : 'Order Contract Report',
		menuItemServiceInvoice : 'Service Invoice Report'

	},
	"serviceEntryPanel": {
		pnlTitle:'Service Entry Panel',
		isFree : {
			yes : 'Yes',
			no : 'No'
		},
		inValidServiceBalance : "quantity is  Exceeded then balance service",
		invalidQuantity: 'Quantity Exceeds Maximum allowed Balance'
		
	},
	"purchaseEntryPanel": {
		pnlTitle:'采购登录面板'
	},
	"supplierEntryPanel" : {
		pnlTitle : '供应商登录',
		purchasePnlTitle : '采购登录',
		supplierOrderStatus : {
			NA                : 'N/A',
		    orderDone         : '订购完成',
		    partiallyReceived : '部分接收',
		    allReceived       : '全部接收'		
		},
		supplierStockStatus : {
			NA         : 'N/A',
			notUpdated : 'Stock Not Confirmed',
			updated    : 'Stock Clear',
			reupdate   : 'Partially Clear',
			rejected   : 'Stock Rejected'
		}
	},
	"pickingEntryPanel" : {
		pnlTitle : 'Picking Entry',
		entryDetail : {
			stockQty : 'Stock Qty',
			totalQty : 'Total Ordered Qty',
			noOfOrders: 'No. Of Orders'
		}
	},
	"transferEntryPanel" : {
		pnlTitle : 'Transfer Entry',
		entryDetail : {
			btn_entry_detail : 'Set Entry Detail'
		},
		transferStatus : {
			OnProcess : 'On Process',
			done      : '完成',
			'return'    : '返回'
		},
		transferStockFailed : 'Stock Transfer Failed. Invalid Record Found.',
		invalidQuantity: 'Quantity Exceeds Maximum allowed Balance',
		storeNameDuplicate : 'store From and  To Store Dupliate'
	},
	"repairEntryPanel" : {
		pnlTitle : '修复输入面板'
	},
	"repairList":{
		pnlTitle : '修复主菜单面板'
	},
	"order": {
		panelTitle: '订单面板',
		// panelTitle: '订单管理',
		monthlySalesPrintMenu : 'sales Report',
		orderContractPrintMenu : 'Order Contract Report',
		detailReportPanelTitle: '票据明细',
		btnNewEntry: '订单登录',
		btnEditPopupEntry : '【详细表示画面】立上げ',
		menuItemServiceInvoice : 'Service Invoice Report',
		orderType : {
			order : 'order',
			sales : 'sales'
		},
		selectionEmptyMsg:{
			order : 'Please select order',
			sales : 'Please select sales'
		}		
	},
	"sales": {
		panelTitle: '③　Sales List',
		// panelTitle: '受注管理',
		monthlySalesPrintMenu : 'Sales Report',
		menuitem : 'Order Contract Report',
		detailReportPanelTitle: '伝票明細',
		btnNewEntry: '受注入力',
		btnEditPopupEntry : '【詳細表示画面】立上げ',
		orderContractPrintMenu : 'Order Contract Report',
		menuItemServiceInvoice : 'Service Invoice Report',
		orderType : {
			order : 'order',
			sales : 'sales'
		},
		selectionEmptyMsg:{
			order : 'Please select order',
			sales : 'Please select sales'
		}
	},
	"orderDetails": {
		pnlTitle: '订单明细',
		showSummaryGrouping: '详细行も表示',
		csvPrefix : '订单明细',
		tasks : 'Tasks'
	},
	"estimationDetails" :{
		pnlTitle : 'Estimation Details '
	},
	"orderFileSelection" :{
		fileListPnl : '文件一览表',
		selectedFileListPnl : '登録済み文件一览表',
		filePreviewPnl : '预览'
	},
	"orderFileMaster":{
		winTitle:"文件",
		txtfieldOrderId:"订购CD"
	},
	"fileMenu":{
		edit:"编集",
		remove:"删除",
		download:"下载",
		status:"种别",
		view:"表示",
		fileManage:"文件管理",
		status1:"订购",
		status2:"回答",
		status3:"确定"

	},
	"CommentPanel": {
		panelTitle:"连络/注解",
		commentEmptyText: '请登录便笺・注解・留言等资讯。',
		commentOnEnter:'按Enter键来保存投稿',
		tabTitle:'连络/注解',
		noComment:'没有登录任何注解。',
		commentTabTitle:'连络/注解',
		horensoTabTitle:'horenso',
		emailTabTitle:'邮件'
	},
	"defaultValues" : {
		b_fld 		: '委托人',
		c_fld 		: 'C:寄送人',
		i6DateFld 	: 'I6:作业日★',
		i9_option_C : 'opt1 [C]',
		i9_option_B : 'opt2 [B]',
		i9_option_From : 'opt3 [From]',
		i12_option_B : 'opt2 [B]',
		i12_option_D : 'opt1 [D]',
		j1_combo : 'J1:●リーダー',
		txtAreaWithComboLbl : '管理 ',
		product : 'Product',
		others : 'Others',
		tax_included : '含税',
		tax_excluded : '未税',
		currencyType : {
			usd : 'US($)',
			yen : '¥',
			sgd : 'SG($)'
		},
		taxValue : '7'
		
	},
	"supplierPanel":{
		btnAdd:"新规登録",
		btnSave:"保存",
		btnDelete : '删除',
		btnCsvDwnld:"CSV输出",
		btnAddSupplier:"New Supplier",
		menuSelectedCsv:"只有选择的记录项目",
		menuAllCsv:"所有的相关纪录项目",
		btnPrint:"打印",
		btnEditPopupEntry :'EditPopupEntry',
		menuSelectedCsv:"只有选择记录项目",
		menuAllCsv:"所有的相关记录项目",
		clientPanelTitle:'客户端面板',
		supplierPnlTitle:'供应商面板',
		txtAreaWithComboLbl : '管理 ',
		product : '商品',
		supplierNotSelected:"供应商未选择",
		btnSupplierOrder:'supplierOrder',
		btnSupplierPurchaseOrder:'purchaseOrder'

	},
	"productPanel":{
		pnlTitle : "Product master1",
		btnNewEntry: '订单登录',
		productDetailTab : 'Product Batch Detail',
		storeTab:'store'
	},
	"transferMasterPanel":{
		pnlTitle : "Transfer Master",
		transferGridTitle : "Transfer Master Grid",
		transferDetailGridTitle : "Transfer Master Detail Grid",
		transferPrintMenu : 'Transfer Report',
		recievedTransferChkBox : 'Recieved Transfer'
		
		// btnNewEntry: '订单登录',
	},
	//
	"customerPanel":{
		pnlTitle : "客户",
		historyTab : "履历",
		salesTab : "Sales Tab",
		serviceTab : "服务",
		repairTab : "修复",
		btnOrderEntryEdit : "订单登录编辑",
		btnServiceEntryEdit : "服务登录编辑",
		btnRepairEntryEdit : "修复登录编辑",
		btnSale : "New Sales",
		invalidDateOfBirth : " Invalid Date of Birth "
	},
	"batchMasterPanel":{
		pnlTitle : "批次主选单",
		btnNewEntry: '订单登录',
		stockUpdateStatus : {
			OnProcess : 'On Process',
			done      : '完成',
			return    : '返回'
		}
	},
	"batchDetailPanel":{
		pnlTitle : "批次详细内容"
	},
"supplierPanel":{
		pnlTitle : "供应商详细信息"
	},
	//
	"messagePanel": {
		panelTitle: '信息',
		clientTitle:'客户',
		dblRecCheckboxLbl: 'doubleRec',
		msgUnionCheckboxLbl: 'unionRec',
		orderAppName: 'order',
		horensoAppName: 'horenso',
		emailAppName: 'E-mail',
		statusCombo: 'statusCombo',
		emptyValue: 'emptyTxt',
		editedOn:'editedOn',
		opt1:'报告',
		orderCode:'订单号码',
		customerCode:'客户号码',
		報告:'opt1',
		連絡:'opt2',
		相談:'opt3',
	},
	"tabBar": {
        newTabBar : 'newTabBar'
    },
    "servicePanel":{
		pnlTitle : "Service master1",
		btnNewEntry: '订单登录',
		
	},
	"prinReportPopUp":{
		pnlTitle : "Print Report Pop Up",
		btnPrint : "印刷"
	}
};