Ext.define('YBase.controller.CommentPanelController', {
    extend: 'Ext.app.Controller',
    id: 'CommentPanelController',
    refs:[
        {
            ref: 'commentPanel',
            selector: 'commentPanel'
        }
    ],
    table_id:1,
    absCmp:null,
    languageImplementation: function(absCmp){
        var me                      = this,
            lang                    = Ext.LANG,
            commentLang             = lang.CommentPanel,
            commentEmptyText        = commentLang.commentEmptyText,
            commentOnEnter          = commentLang.commentOnEnter,
            emptyText               = commentEmptyText+'\n'+commentOnEnter;
            commentTextarea         = absCmp.query('textareafield[itemId=commentTextarea]')[0];            
        commentTextarea.emptyText   = emptyText;
        // absCmp.setTitle(commentLang.panelTitle);
        
        me.setFieldValue(me.table_id,absCmp.params.entry_code);
    },
    onCommentPanelBeforeRender: function(absCmp, component, eOpts ) {
        var me = this,
            winOpener = window.opener,
            commentCnt = absCmp.query('container[itemId=commentCnt]')[0];
        absCmp['parentPanel'] = winOpener.Ext.bodyTab.getActiveTab();
        me.absCmp = absCmp;
        var commentTpl = me.createCommentTpl();
        commentCnt.removeAll();
        commentCnt.add(commentTpl);
        me.languageImplementation(me.absCmp);
        var tplStore = me.absCmp.query('dataview[itemId=commentDataView]')[0].getStore();
        // tplStore.on('beforeload',me.onTplStoreBeforeLoad,me);
        if(!Ext.isEmpty(me.absCmp.parentPanel.entry_code)) {
            tplStore.load({
                params: {
                    'table_id':me.table_id,
                    'ref_record_id':me.absCmp.parentPanel.entry_code
                }
            });
        }
        tplStore.on('load',me.onTplStoreLoad,me);
        me.setFieldValue(me.table_id,me.absCmp.parentPanel.entry_code);
        // Ext.EventManager.on(window, "unload",me.onCommentPanelUnload, me);
        Ext.ComponentQuery.query('displayfield[itemId=entryCodeDisplayFld]')[0].setValue(me.absCmp.parentPanel.entry_code);
        /*var parentGrid = absCmp.parentPanel.query('grid[itemId=orderMasterGrid]');
        if(!Ext.isEmpty(parentGrid)) {
            parentGrid[0].on('selectionchange',me.onParentGridSelectionChange,me);
        }*/
    },
    onTplStoreLoad: function(store, records, success) {
        var me = this;
        if(Ext.msk)
            Ext.msk.hide();
        me.setScrollToEnd();
    },
    createCommentTpl: function() {
        var commentTpl = new Ext.XTemplate(
            '<tpl>',
            '    {[this.setDataLoadFlg()]}',
            '</tpl>',
            '<tpl for=".">',
            '    {[this.changeDataLoadFlg()]}',
            '    <div class="comment-item" style="padding:5px">',
            '        <div class="user"><b>{firstlastname}</b>&nbsp<b class="user-name">{username}</b><p class="comment-allign-right">{[this.formatDateTime(values)]}</p></div>',
            '        <div class="comment" style="clear:both">{comment}</div>',
            '    </div>',
            '    <hr />',
            '</tpl>',
            '<tpl if="this.dataloaded == false">',
            '   <div class="no-comment-div">',
            '       <p>{[Ext.LANG.CommentPanel.noComment]}</p>',
            '   </div>',
            '</tpl>',
            {
                // dataStore: store,
                formatDateTime: function(values) {
                    var commentDate = values.comment_date,
                        formattedDateTime = null;
                    if(!Ext.isEmpty(commentDate)) {
                        var dt = new Date(commentDate);
                        formattedDateTime = Ext.Date.format(dt,'Y-m-d H:i');
                    }
                    return formattedDateTime;
                },
                setDataLoadFlg: function() {
                    this.dataloaded=false;
                },
                changeDataLoadFlg: function() {
                    this.dataloaded=true;
                }
            }
        );
        var commentDataView =  {
            xtype: 'dataview',
            itemId: 'commentDataView',
            componentCls:'comment-display',
            tpl: commentTpl,
            itemSelector: 'comment-item',
            store: 'CommentDataStore',
            autoScroll: true
        };   
        return commentDataView;     
    },
    onStatusCommentTextAreaBlur: function(textarea,e,eOpts) {
        if(textarea.isValid() == false)
            textarea.markInvalid();
    }, 
    saveComment: function() {
        var me= this,
            absCmp = me.getCommentPanel(),
            hiddenTblIdField  = absCmp.query('hiddenfield[itemId=table_id]')[0],
            hiddenRefIdField  = absCmp.query('hiddenfield[itemId=ref_record_id]')[0],
            // table_id = hiddenTblIdField.getValue(),
            table_id = me.table_id,
            ref_record_id = hiddenRefIdField.getValue(),
            commentData=absCmp.query('textareafield[itemId=commentTextarea]')[0].getValue(),
            //for multiline comment
            comment = commentData.replace(/\n/g,"<br>");
        if(Ext.isEmpty(comment)) {
            return;
        }
        if((!Ext.isEmpty(table_id)) || (!Ext.isEmpty(ref_record_id))){
            var form = absCmp.query('form[itemId=commentFormPanel]')[0];
            if(form.isValid()){
                //form.submit({
                Ext.Ajax.request({
                    url: 'bizlayer/comment/saveComment',
                    method: 'POST',
                    params:{
                        'comment'       : comment,
                        'ref_record_id' : ref_record_id,
                        'table_id'      : me.table_id/*table_id*/
                    },
                    scope:me,
                    success: function(response) {
                        var me = this,
                            absCmp = me.absCmp;
                        absCmp.query('textareafield[itemId=commentTextarea]')[0].setValue();
                        absCmp.query('textareafield[itemId=commentTextarea]')[0].markInvalid();
                        var table_id = absCmp.query('hiddenfield[itemId=table_id]')[0].getValue(),
                            ref_record_id = absCmp.query('hiddenfield[itemId=ref_record_id]')[0].getValue(),
                            resp = Ext.decode(response.responseText),
                            commentListStore = absCmp.query('dataview[itemId=commentDataView]')[0].getStore();
                        commentListStore.load({
                            params:{
                                'table_id':table_id,
                                'ref_record_id': ref_record_id
                            },
                            callback: function(records,action,success) {
                                this.updatepParentPanel();
                            },
                            scope:me
                        });
                    }
                });
            }
        }else{
            Ext.Msg.alert(Ext.LANG.app.appTitle,Ext.LANG.taskPreview.selectTreeFolder);
        }
    },
    updatepParentPanel: function() {
        var me = this,
            commentWin = me.absCmp,
            tplStore = commentWin.query('dataview')[0].getStore(),
            commentLastItem = tplStore.last(),
            commentCount = tplStore.count(),
            parentPanel = window.opener.Ext.bodyTab.getActiveTab(),
            comment = null;
        if(!Ext.isEmpty(commentLastItem)) {
            comment = commentLastItem.data.comment;
        }
        YBase.app.getController('EntryPanelController').updateCommentCmp(parentPanel,comment,commentCount);
    },
    setScrollToEnd:  function(){
        var me = this,
            dView  = me.absCmp.query('dataview[itemId=commentDataView]')[0];
        dView.scrollBy(0,5000,false);
    },
    reRoute: function(route,parentPanel) {
        var me = this,
            absCmp = me.absCmp;
        absCmp.parentPanel = parentPanel;
        Ext.Router.redirect(route);
        // this.applyRerouteChange(parentPanel);
    },
    /*applyRerouteChange : function(parentPanel) {
        var me = this,
            absCmp = me.absCmp;
        if(!Ext.isEmpty(absCmp)) {
            var dView = absCmp.query('dataview[itemId=commentDataView]')[0],
                dViewStore = dView.getStore();
            dViewStore.load({
                params: {
                    'table_id':me.table_id,
                    'ref_record_id':parentPanel.entry_code
                }
            });
            me.setFieldValue(me.table_id,parentPanel.entry_code);
            Ext.ComponentQuery.query('displayfield[itemId=entryCodeDisplayFld]')[0].setValue(parentPanel.entry_code);
        }
    },*/
    setFieldValue: function(table_id,entry_code) {
        var me                  = this,
            absCmp              = me.absCmp,
            hiddenTblIdField    = absCmp.query('hiddenfield[itemId=table_id]')[0],
            hiddenRefIdField    = absCmp.query('hiddenfield[itemId=ref_record_id]')[0];
        hiddenTblIdField.setValue(table_id);
        hiddenRefIdField.setValue(entry_code);
    },
    onCommentKeyPress: function(key, e, eOpts) {
        var me = this;
        if(e.ENTER == 13){
            if(e.shiftKey) {
                e.preventDefault();
                me.saveComment();
            }else {
                //do nth
            }
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "commentPanel" : {
                beforerender:me.onCommentPanelBeforeRender
            },
            "commentPanel textareafield[itemId=commentTextarea]": {
                keypress: me.onCommentKeyPress,
                blur: me.onStatusCommentTextAreaBlur
            },
        });
    }
});
