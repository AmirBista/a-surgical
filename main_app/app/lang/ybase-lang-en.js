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
			yes : 'はい',
			no  : 'いいえ'
		},
		"dateTime":{
			today:"今日",
			week:"週",
			month:"月",
			year:"年",
			date:"日付",
			dateTime:"時刻",
			previousDate:"前日",
			nextDate:"次日",
			fromDate:"いつから",
			toDate:"いつまで",
			modifiedDate: "更新日",
			saturday: '土',
			sunday : '日'
		},
		"confirmMsg":{
			deleteConfirm:"削除します。",
			winCloseConfirm:"編集画面を閉じます。",
			overwriteRecord: 'すでに登録されているデータがあります。上書き保存しますか？',
			askBeforeClose : '保存してないデータがあります。保存せずに閉じますか？',
			saveRecordBeforeActionConfirm : '変更内容の保存が必要です。実行しますか？',
			hasDetailData: "詳細情報が登録されています。すべて削除しますか？",
			createBillOrderCreatedConfirm : "Order Already Generated From This Estimate. Create New Bill?",
			createBillOrderConvertedConfirm : "Estimate Record Already Converted To Bill.Convert New Bill?",
			purchaseQtyExceedsOrderedQtyConfirm: 'Purchased Qty Exceeds Ordered Qty. Do You Want To Update Ordered Qty Stock?',
			findedDoneStatus : 'Transfer Status Done  Finded  would you like to  update Stock Data ?'
		},
		"alertMsg":{
			emptyField:"必須項目の入力漏れがあります。",
			invalidFieldData:"入力された値に誤りがあります。",
			systemError:"システムエラーが発生しました。しばらくしてからご確認ください。",
			searchReOrderMessage:"該当するレコードがありません。",
			maxUserExceed:"最大ユーザー数を超えています。</br>最大ユーザー数を超える人数を招待する場合はライセンス変更が必要です。",
			selectMembers:"ユーザーを選択してください。",
			selectCombo:"グループを選択してください。",
			rowsNotSelect:"レコードを選択して下さい。",
			invalidFileType: "ファイル形式エラー",
			noSaveRights:"保存できる権限がありません。",
			unsavedRecordContinue: "更新します。",
			bulkActionConfirm:"一括更新処理を実行します。※実行の取り消しは出来ませんのでご注意ください。",
			deleteSearchName: "検索条件を削除します。",
			noRecordAdded:"新規レコードの登録がありません。",
			alreadyLoaded:"読込済みです",
			mustHaveOneColumn:"項目を選択してください。",
			unique:"ユーニック",
			alreadyMapped:"すでに紐づけしています。",
			selectValue:"値を選択してください。",
			recordExits:"重複エラー！すでに登録しています。",
			failure:"処理失敗",
			unsavedRecordExportCSV: "保存されていないレコードは、存在している,エクスポートしますか？",
			noTemplate: "印刷対応していません。※一部の内容は伝票ソフトから行ってください。",
			deleteRecord: "削除してもいいですか",
			alreadySelected:'重複エラー！すでに同カラー　同サイズのアイテムがあります。',
			invalidExtension  :'対応してない形式です。',
			windowReload:'更新しました。反映する為にシステムのリロードします。',
            noRowsSelected:"レコードを選択してください。",
            recordDirty:"保存してないデータがあります。",
            noData : "該当するレコードがありません。",
            confirmSave:'更新します。',
            fieldNotValid:'column does not  blank or  less than 1',
            paymentAmountLess:'payment amont less than Unpaid amount',
			paymentAmountEqual:'payment amount and unpaid amount equal',
			paymentAmountGreater:'payment amount greater thant unpaid amount',
			noRecordToUpdate:'Record Already updated',
			accessError	:'Unauthorized Access'
		},
		"successMsg":{
			saveSuccess:'保存しました。',
			updateSuccess:"更新しました。",
			deleteSuccess:"削除しました。",
			toggleSuccess:"状態を切替ました。",
			importSuccess:"インポートが完了しました。",
			exportSuccess:"出力が完了しました。",
			uploadSuccess:"アップロードしました。",
			downloadSuccess:"ダウンロードしました。",
			actionApplied:"更新しました。",
			refreshSuccess: "再読込しました。",
			saveSuccessGiftOrder: '保存しました。 続けて、ギフト注文伝票を作成します。'
		},
		"errorMsg":{
			saveError:"保存エラー",
			updateError:"更新エラー",
			deleteError:"削除エラー",
			importError:"データ入力エラー",
			exportError:"データ出力エラー",
			uploadError:"ファイルアップロードエラー",
			downloadError:"ファイルダウンロードエラー",
			duplicateEntry:"重複エラー",
			accessDenied:"不正なアクセスエラー",
			invalidFormFields:"必須項目の入力漏れがあります。",
			fileSizeLimit: "最大ファイルサイズの制限を超えています。添付可能ファイルサイズは３MB以内です。",
			fileUploadLimit: "添付可能ファイル数制限を超えています。",
			cannotSave: "必須項目の入力漏れがあります。確認の上保存してください。",
			requiredFieldMissing: '必須項目の入力漏れがあります。確認の上保存してください。',
			mandatoryField : '必須項目',
			refreshError:"再読込エラー",
			fixError:'入力された値に誤りがあります。確認の上保存してください。',
            validateError:"入力必須項目です。正しい値を入力して下さい。",
            emptyOrderDetailEntry:'未入力項目があります。受注詳細内容の登録してください。',
            fileSelectionSaveFailed : 'File Selection Save Failed',
            importTypeMissing : 'Import Type Missing',
            fileNotFound : 'File Not Found or Already In Use',
            productNotSelectedError : 'Please Select A Valid Product Before Proceeding',
            packingQtyExceeded : 'Packing Qty Exceeded Client Ordered Qty',
            noQtyToPurchase : 'All Ordered Qty Have Been Purchased'
		},
		"progressBarText":{
			saving:"保存中…",
			updating:"更新中…",
			deleting:"削除中…",
			importing:"Iインポート中…",
			exporting:"エクスポート中…",
			uploading:"アップロード中…",
			downloading:"ダウンロード中…",
			processing:"処理中…",
			loading:"読み込み中…",
			reloading:"再読込中…",
			validating:"データ確認中…",
			syncing:"syncing.."
		},
		"headerMenu":{
		 	btnLogout:"Logout",
		 	menuUserProfile: 'Profile',

		 	entryPnlMenuItem: '①　Order/Sales Entry',
		 	menuItemOrderEntry: 'Order Entry',
		 	menuItemSalesEntry: 'Sales Entry',
		 	btnCustomer: "②　Customer List",
			//Order Menu
			btnOrderMaster: "■ Order/Sales",
			orderMasterMenuItem: "③　Order List",
			serivceMasterMenuItem : '④　Service List',
			repairMasterPnlMenuItem : '⑤　Repair List',
			salesEntryMenuItem : "③ Sales List",
		 	//Stock Menu
			btnStore: "■ Store and Stock",
			purchaseEntryPnlMenuItem: '⑦　New Purchase Entry',
			productPnlMenuItem: "⑥　Product List",
			batchMasterPnlMenuItem: "⑧　Batch List",
			batchDetailPnlMenuItem: "Batch Detail List",	
			supplierPnlMenuItem: "⑨　Supplier List",
			btnSupport : 'Support',
			//store
			btnStoreTransfer: '■ Product Transfer',
			stockTransferEntryPnlMenuItem : '⑪　Transfer Entry',
			stockTransferMasterPnlMenuItem : '⑫　Transfer List'
		},	
		"csvExport":{
			btnCSVExport:"CSV Export",
			btnCSVExportAllclmAllrec:"CSV Export All",
			btnCSVExportAllclmSelrec:"全項目出力",
			btnCSVExportSleclmSlerec:"表示項目のみ出力",
			btnCSVExportSleclmAllrec:"CSV出力「表示項目・全レコード」"			
		},
		"csvImport":{
			csvImportWin:"CSVアップロード",
			btnFileUpload:"① CSVファイル選択",
			btnCsvCheck: "② データ確認",
			btnImportData: "③ 実行（更新・保存）",
			btnErrorCsvDownload:"ダウンロード",
			btnCancel:"キャンセル",
			lbltotalCsvRecords:"全件数",
			lblcorrectCsvRecords:"成功件数",
			lblincorrectCsvRecords:"エラー件数",
			lblCheckMask: "データ確認中・・・・しばらくお待ちください。",
			"log":{
				log : "Log",
				success: "Success",
				error: "Error",
				csvRowNumber: "CSV Row number",
				csvErrorCode: "Error Code",
				csvErrorMsg: "Error Message"	
			},
			"msgBox" : {
				// deleteFile: 'ファイルを削除します。',
				closeWin: 'CSV close Window',
				invalidCsvData: 'CSVファイルのデータ形式エラー（全件件エラー）<br>ご確認の上、再度試してください。',
				importOnlyCorrectCsv : '成功件数のみ更新します。'
			}
		},
		"buttons":{
			ok:"OK",
			btnBulkUpdate:"Bulkupdate",
			btnView:"View",
			btnEdit:"Edit",
			btnDraft:"Draft",
			btnSave:"Save",
			btnDelete:"Delete",
			btnPrint:"Print",
			btnClose:"Close",
			btnClone:"Clone",
			btnAdditionalClone:"Additional Clone",
			btnSelect:"Select",			
			btnAttachFile:"Attach File",
			btnOk:"OK",
			btnYes: "Yes",
			btnNo: "No",
			btnCancel:"Cancel",
			btnEditSave: "Save Edited",
			btnSearch: "Search",
			btnExcelExp: 'Excel Export',
			btnRefresh: "Refresh",
			btnReset: 'Reset',
			btnCopyRecord : 'Copy Record',
			menuSelectRecord:"Menu Select Record",
			menuAllRecords:"All record",
			btnAdvancedSearch : 'Advanced Search',
			btnAdd:'Add',
			btnPrintReport : 'Print Report',
			cboSettingBtn:'Setting',
			btnCsvImport : 'CSV Import',
			btnNewRegister:"New Register",
			btnPrintCSV : 'Print Csv',
			btnPurchaseEntry: 'Purchase Entry',
			btnInsertRow : 'Insert Row ',
			btnUpdateStock: 'Update Stock',
			btnCreateOrder : 'Create Order',
			btnNewEntry : 'New Entry',
			btnEditPopupEntry: 'Open on Next Tab'
		},
		"subMenuText":{
			saveSearch: 'Save Search',
            saveGridLayout: 'Grid Layout',
            showAllFields: 'Show All Fields',
            resetAllFields: 'Reset All Fields'
		},
		"iconToolTip":{
			searchSaveHistory: "Search History",
			setting: "Setting"
		},
		"buttonToolTip":{
			moveUp:"Move Up",
			moveDown:"Move Down"
		},
		"gridHeader": {
			lblAction: "Action",
			lblColumnSetting: "",
			lblcolumnListMenu : 'Column List Menu'
		},
		"searchCriteria":{
			winTitle:"Search Save",
			lblSearchConditon:"Search Condition",
			emptySearchField:"Search Field",
			isPublic:"Is Public",
        	chkBoxShowTemplate: 'chkBoxShowTemplate',
        	publicSearchChkBoxArr: [50]
		},
		"searchEditCriteria":{
			winTitle:"Search Edit",
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
			loadingText : 'Loading...',
			emptyText : 'Empty Text'
		}
	},
	"BasicBasePanel": {
		btnAdd:"New",
		btnSave:"Save",
		btnDelete : 'Delete',
		btnCsvDwnld:"CSV Download",
		menuSelectedCsv:"Selected Download",
		menuAllCsv:"All Download",
		btnFileAdd:'Add File',
		btnPrint:"Print",
		menuSelectedTemp91Print : 'Print1',
		menuSelectedTemp92Print: 'Print2',
		menuSelectedDataPrint:'Print3',
		menuSelectedTemp93Print: 'Print4',
		menuSelectedTemp95Print: 'Print5',
		rwChkBox: 'Row Check Box',
		btnNewEntry: 'New Entry',
		menuSelectedTemp91Print : 'stock print'
	},
	"BasePanel": {
		leftPanelUpdateBtn:'Panel Update',
		leftPanelAddBtn:'Panel Add',
		middleCntSaveBtn:'Save Panel',
		middleCntDeleteBtn:'Delete',
		middleCntCsvBtn:"CSV出力",
		selectedCsvMenu:"選択レコードのみ",
		allCsvMenu:"該当の全レコード",
		middleCntPrintBtn:'印刷',
		selectedPrintMenu:'選択中',
		allPrintMenu:'すべて'
	},
	"bulkUpdate":{
		bulkUpdateTitle: "Bulk Update",
        getClickItem: "get Click Item",
        clearButton: "Clear",
        copyValued: "Copy Value",
        action: "Action",
        fieldSelectedValue: "Selected Value",
        replaceValueGrid: "Replace Value",
        getButton: "Get",
        setButton: "Set",
        bulkUpdate: "bulk Update",
        getClickedValue: "get Clicked Value",
        bulkUpdateExpand: "Show Bulkupdate",
        bulkUpdateCollapes: "Hide Bulkupdate",
        copyClickedValue: "Click value",
        dontCopyClickedValue: "Dont Clicked Value",
        replaceValue: "Replace Value",
        specifiedFormat: "format",
        percentage: "Per(%)",
        addDays: "Days",
        textText: "Text",
        atFront: "Front",
        btnSearch:"Search"
	},
	"dashboard":{
		breadcrumb:'Bread Crumb',
		lblInformation:"Information",
		lblNewpost:"New Post"	
	},
	"dateFormat" :{
   		defaultDateFormat: "Y-m-d"
	},
	'help_link':{
		reportLink:'http://yofile.xyz/',
	},
	'help_label':{
		help:'Help',
		auto_save:'※Auto Save'
	},
	"datagridTemplate":{
        winTitle: "一覧表示項目（ビュー）管理画面",
        panelNameCombo: "パネル名",
        datagridTemplateCombo: "ビューテンプレート名",
        btnUpdateDatagridTemplate : "更新",
        btnSaveAsDatagridTemplate : "別名で保存",
        leftGridFieldName : "項目",
        displayCol:"順番",
        removeCol:"削除",
        remove:"選択",
        displayOrderColumn:"表示順",
        save:"保存",
        successMsg:"保存しました。",
        transferOneColumnAtleast:"表示項目を選択してください。最低1項目以上が必要です。",
        tempNameExists:"同名のビューテンプレートがあります。",
        isPublic:"一般共有",
        datagridTemplateHelp:"",
        columnHideShow:'表示(ON/OFF)',
        noChange:'変更された情報がありません。',
        characterExceeds:"文字数制限が超えています。",
        columnLock:'固定項目'
    },
    "template":{
        templateSave : "表示項目管理",
        defaultTemplate : "全項目表示"
    },
	"userProfiles":{
		winTitle:'User Profile',
		btnSave : 'Save',
		btnCancel:'Cancel',
		lblUserName:'User Name',
		lblFirstName:'First Name',
		lblPassword:'New Password',
		lblLastName:'Last Name',
		lblPhoneNo:'TEL',
		lblEmail:'Email',
		lblAvaiableLangauge:'Language',
		lblResetPassword:'Reset',
		textPhoneNo:'Phone No.'
	},
	'report': {
		panelTitle:'Report ',
		leftPanelTitle:'Left Panel Title'
	},
	'tplValues': {
		'{today}': Ext.Date.format(new Date(), 'Y-m-d'),
        '{username}' : Ext.CURRENT_USER.username,
        '{user}' : Ext.CURRENT_USER.username,
        '{company}' : Ext.CURRENT_USER.company_name,
        '{department}' : Ext.CURRENT_USER.department_name
	},
	"settingsPanel":{
		settingPnlTitle:'設定画面',
		btnCsvMap :"CSV入出力マッピング",
		btnProductMaster :"Product Master",
		btnClientMaster :"Client Master",
		btnStaff :"Staff",
	},
	"addCsvField": {
		headerTitle:'CSVマッピング　※上級者向け機能'
	},
	"ecSiteExport":{
		operation:"操作",
		fieldLabel:"項目",
		tableId:"テーブルID",
		tableFieldId:"項目ID",
		fieldType:"属性",
		isMapped:"紐付中",
		csvFieldName:"CSV項目名",
		displayOrder:"表示順",
		mappedFields:"紐付け項目",
		mappedTableName:"紐付けテーブル名",
		mappedTableId:"紐付けテーブルID",
		fieldId:"項目ID",
		csvReportFieldId:"csvReportFieldId",
		isSingleMapped:"isSingleMapped",
		csvReportId:"csvReportId",
		mappedFieldType:"mappedFieldType",
		DefaultValue:"Default値",
		optionValue:"Option値",
		idFieldTable:"・項目ID",
		actions:"解除",
		csvImport:"出力形式",
		btnBrowse:"CSVファイル選択",
		comboDoesnotHaveValue:"選択値エラー",
		formatName:"Format Name"
	},
	"importExportCsvWindow": {
		headerTitle: 'CSV項目管理画面　※システム管理者専用画面です。',
		csvName: 'CSVName EN',
		csvNameJp: 'CSVName JP',
		csvBillCode: 'CSV　CD',
		csvReportName: 'レポート名',
		mappedFrom: 'Mapped From',
		csvType: 'CSV Type',
		csvFieldName: 'CSV Field Name',
		displayColCsvImport:'Display Order',
		removeActionCsvImport:'Remove'
	},
	'helpTextWindow':{
		winTitle: "ヘルプ画面",
		btnHelpTextEdit: "編集",
		btnHelpTextSave : "保存",
		btnCancel: "キャンセル",
		btnOk: "OK",
		help_code_col: "CD",
		help_name_col: "ヘルプ名",
		deleteHelpCol: "操作",
		btnHelpTextAdd: "新規登録",
		noChange:'変更された情報がありません。',
		saveSuccessCloseWindow:'保存しました。 </br> ヘルプ画面閉じますか？'
	},
	'multiImageWin': {
        winTitle: 'ファイルアップロード',
        fileUpload: 'アップロード',
        readyToUpload: "アップロード準備完了",
        Start: "アップロード開始",
        removeAll: "すべて削除",
        cancel: "キャンセル",
        removeUploaded: "アップロードを削除",
        upload: "アップロード",
        completed: 'アップロード完了しました。',
        statusFailed:'エラー！',
        statusInvalidSize:'ファイル容量制限エラー！',
        statusInvalidExtension:'ファイル形式制限エラー！',
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
		WinTitle: '項目マスタ管理',
		btnAdd:'追加',
		btnSave:'保存',
		btnCancel:'キャンセル',
		moveColSelected:'：',
		fieldOptionDataCol:'項目',
		displayCol:'表示順',
		removeAction:'削除',
		fieldOptionNameDisplayFld:'■'

	},
	'taskRunner': {
		interval: 0 * 1000
	},
	"entryPanel" : {
		pnlTitle:'①　Order Entry',
		// pnlTitle : '受注入力画面',
		salesTitle: '①　Sales Entry',
		entryCode : 'Code',
		btnAddComment: 'Comment',
		btnNewServiceEntry: 'New Service',
		btnConvertToSales: 'Convert To Sales',
		btnNewSalesEntry: 'New Sales Entry',
		btnNewOrderEntry: 'New order Entry',
		latestComment: '▶ ',
		convertedToOrder : 'convertedToOrder',
		orderCreated : 'orderCreated',
		menuItemPrintJson : 'Print(Json)',
		menuItemPrintCsv : 'Print (CSV)',
		menuItemOrderPrint : 'Print Order',
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
		orderContractPrintMenu : 'Order Contract Reports',
		menuItemServiceInvoice : 'Service Invoice Report'
	},
	"serviceEntryPanel": {
		pnlTitle:'Service Entry Panel',
		isFree : {
			yes : 'Yes',
			no : 'No'
		},
		inValidServiceBalance : "quantity is  Exceeded then balance service",
		invalidQuantity: 'Quantity Exceeds Maximum allowed Balance',
		orderContractPrintMenu : 'Order Contract Report',
		
	},
	"purchaseEntryPanel": {
		pnlTitle:'⑦ Purchase Entry'
	},
	"supplierEntryPanel" : {
		pnlTitle : 'Supplier Entry',
		purchasePnlTitle : '⑦　Purchase Entry',
		supplierOrderStatus : {
			NA                : 'N/A',
		    orderDone         : 'Order Done',
		    partiallyReceived : 'Partially Received',
		    allReceived       : 'All Received'		
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
		pnlTitle : '⑪　Transfer Entry',
		entryDetail : {
			btn_entry_detail : 'Set Entry Detail'
		},
		transferStatus : {
			OnProcess : 'On Process',
			done      : 'Done',
			'return'    : 'Return'
		},
		transferStockFailed : 'Stock Transfer Failed. Invalid Record Found.',
		invalidQuantity: 'Quantity Exceeds Maximum allowed Balance',
		storeNameDuplicate : 'store From and  To Store Dupliate'
	},
	"repairEntryPanel" : {
		pnlTitle : 'Repair Entry Panel'
	},
	"repairList":{
		pnlTitle : '⑤　Repair List'
	},
	"order": {
		panelTitle: '③　Order List',
		// panelTitle: '受注管理',
		monthlySalesPrintMenu : 'sales Report',
		orderContractPrintMenu : 'Order Contract Report',
		detailReportPanelTitle: '伝票明細',
		btnNewEntry: '受注入力',
		btnEditPopupEntry : '【詳細表示画面】立上げ',
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
		pnlTitle: 'Order Details',
		showSummaryGrouping: '詳細行も表示',
		csvPrefix : 'order_details',
		tasks : 'Tasks'
	},
	"estimationDetails" :{
		pnlTitle : 'Estimation Details '
	},
	"orderFileSelection" :{
		fileListPnl : 'ファイル一覧',
		selectedFileListPnl : '登録済みファイル一覧',
		filePreviewPnl : 'プレビュー'
	},
	"orderFileMaster":{
		winTitle:"ファイル",
		txtfieldOrderId:"受注CD"
	},
	"fileMenu":{
		edit:"編集",
		remove:"削除",
		download:"ダウンロード",
		status:"種別",
		view:"表示",
		fileManage:"ファイル管理",
		status1:"受注",
		status2:"回答",
		status3:"確定"

	},
	"CommentPanel": {
		panelTitle:"連絡/コメント",
		commentEmptyText: 'メモ・コメント・伝言など入力してください。',
		commentOnEnter:'Enterキーで投稿保存',
		tabTitle:'連絡/コメント',
		noComment:'投稿されているコメントがありません。',
		commentTabTitle:'連絡/コメント',
		horensoTabTitle:'horenso',
		emailTabTitle:'Email'
	},
	"defaultValues" : {
		b_fld 		: 'B:Filed',
		c_fld 		: 'C:Field',
		i6DateFld 	: 'I6:Date★',
		i9_option_C : 'opt1 [C]',
		i9_option_B : 'opt2 [B]',
		i9_option_From : 'opt3 [From]',
		i12_option_B : 'opt2 [B]',
		i12_option_D : 'opt1 [D]',
		j1_combo : 'J1:●Option',
		txtAreaWithComboLbl : 'Option ',
		product : 'Product',
		others : 'Others',
		tax_included : 'Tax Include',
		tax_excluded : 'Tax Exclude',
		currencyType : {
			usd : 'US($)',
			yen : '¥',
			sgd : 'SG($)'
		},
		taxValue : '7'
		
	},
	"supplierPanel":{
		btnAdd:"New",
		btnSave:"Save",
		btnDelete : 'Delete',
		btnCsvDwnld:"CSV Download",
		btnAddSupplier:"New Supplier",
		menuSelectedCsv:"CSV Download",
		menuAllCsv:"All CSV Download",
		btnPrint:"Print",
		btnEditPopupEntry :'EditPopupEntry',
		menuSelectedCsv:"CSV Download",
		menuAllCsv:"All Download",
		clientPanelTitle:'Client Panel',
		supplierPnlTitle:'Supplier Panel',
		txtAreaWithComboLbl : 'Area ',
		product : 'Product',
		supplierNotSelected:"Supplier Not  Selected",
		btnSupplierOrder:'supplierOrder',
		btnSupplierPurchaseOrder:'purchaseOrder'

	},
	"productPanel":{
		pnlTitle : "⑥　Product List",
		btnNewEntry: 'New',
		productDetailTab : '▶ Product Batch Detail',
		storeTab:'■　Store wise Product stock'
	},
	"transferMasterPanel":{
		pnlTitle : "⑫　Transfer List",
		transferGridTitle : "Transfer Master Grid",
		transferDetailGridTitle : "Transfer Master Detail Grid",
		transferPrintMenu : 'Transfer Report',
		recievedTransferChkBox : '■ Show Transfer Recieved '
		
		// btnNewEntry: '受注入力',
	},
	//
	"customerPanel":{
		pnlTitle : "②　Customer List",
		historyTab : "▶ Order History",
		salesTab : "▶ Sales History",
		serviceTab : "▶ Service History",
		repairTab : "▶ Repair History",
		btnOrderEntryEdit : "▶ New Order",
		btnServiceEntryEdit : "▶ New Service",
		btnRepairEntryEdit : "▶ New Repair",
		btnSale : "New Sales",
		invalidDateOfBirth : " Invalid Date of Birth "
	},
	"batchMasterPanel":{
		pnlTitle : "⑧　Batch List",
		btnNewEntry: 'New',
		stockUpdateStatus : {
			OnProcess : 'On Process',
			done      : 'Done',
			return    : 'Return'
		}
	},
	"batchDetailPanel":{
		pnlTitle : "Batch Detail"
	},
	"supplierPanel":{
		pnlTitle : "⑨　Supplier List"
	},
	//
	"messagePanel": {
		panelTitle: 'message',
		clientTitle:'cleint',
		dblRecCheckboxLbl: 'doubleRec',
		msgUnionCheckboxLbl: 'unionRec',
		orderAppName: 'order',
		horensoAppName: 'horenso',
		emailAppName: 'email',
		statusCombo: 'statusCombo',
		emptyValue: 'emptyTxt',
		editedOn:'editedOn',
		opt1:'Option 1',
		orderCode:'OrderCode',
		customerCode:'customerCode',
		報告:'opt1',
		連絡:'opt2',
		相談:'opt3',
	},
	"tabBar": {
        newTabBar : '▶ Open this panel on New Tab'
    },
    "servicePanel":{
		pnlTitle : "④　Service List",
		btnNewEntry: 'New',
		
	},
	"prinReportPopUp":{
		pnlTitle : "▶ Date salaction window for report",
		btnPrint : "Show Report"
	}
};