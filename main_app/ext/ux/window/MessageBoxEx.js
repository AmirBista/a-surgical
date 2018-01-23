/*
* This is a modified version of Ext source file MessageBox.js
* @example
    //variable decleration                        
    var me = this,
        msgBoxEx,
        msg = 'message',//message to show 
        title = 'window title',
        width = 435,
        modal = true,
        icon = Ext.MsgEx.INFO,
        buttons = 5,// number of buttons in window, max is 5
        //button configuration contains button text and window close on button click
        buttonCfg = {  
            buttonText :{
                btn1  : 'btn1',
                btn2  : 'btn2',
                btn3  : 'btn3',
                btn4  : 'btn4',
                btn5  : 'btn5'
            },
            dontCloseOnClick:['btn1','btn2']
        };
    //message box show
    Ext.MessageBoxEx.show({
        title: title,
        width: width,
        msg: msg,
        modal: modal,
        icon: icon,
        buttons:buttons,
        buttonText: buttonCfg.buttonText,
        dontCloseOnClick: buttonCfg.dontCloseOnClick,
        //call back function of the window
        fn : function(btn){
            if(btn=='btn1'){
                //do smth
            }
            if(btn=='btn2'){
                //do smth
            }
            if(btn=='btn3'){
                //do smth
            }
            if(btn=='btn4'){
                //do smth
            }
            if(btn=='btn5'){
               //do smth
            }
        }
    });
*/
Ext.define('Ext.ux.window.MessageBoxEx', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox',
        'Ext.ProgressBar'
    ],

    alias: 'widget.messagebox',

    /**
     * @property
     * Button config that displays a single OK button
     */
    OK : 1,
    /**
     * @property
     * Button config that displays a single Yes button
     */
    YES : 2,
    /**
     * @property
     * Button config that displays a single No button
     */
    NO : 4,
    /**
     * @property
     * Button config that displays a single Cancel button
     */
    CANCEL : 8,
    /**
     * @property
     * Button config that displays OK and Cancel buttons
     */
    OKCANCEL : 9,
    /**
     * @property
     * Button config that displays Yes and No buttons
     */
    YESNO : 6,
    /**
     * @property
     * Button config that displays Yes, No and Cancel buttons
     */
    YESNOCANCEL : 14,
    /**
     * @property
     * The CSS class that provides the INFO icon image
     */
    INFO : Ext.baseCSSPrefix + 'message-box-info',
    /**
     * @property
     * The CSS class that provides the WARNING icon image
     */
    WARNING : Ext.baseCSSPrefix + 'message-box-warning',
    /**
     * @property
     * The CSS class that provides the QUESTION icon image
     */
    QUESTION : Ext.baseCSSPrefix + 'message-box-question',
    /**
     * @property
     * The CSS class that provides the ERROR icon image
     */
    ERROR : Ext.baseCSSPrefix + 'message-box-error',

    // hide it by offsets. Windows are hidden on render by default.
    hideMode: 'offsets',
    closeAction: 'hide',
    resizable: false,
    title: '&#160;',

    defaultMinWidth: 250,
    defaultMaxWidth: 600,
    defaultMinHeight: 110,
    defaultMaxHeight: 500,
    
    // Forcibly set these to null on the prototype to override anything set higher in
    // the hierarchy
    minWidth: null,
    maxWidth: null,
    minHeight: null,
    maxHeight: null,
    constrain: true,

    cls: [Ext.baseCSSPrefix + 'message-box', Ext.baseCSSPrefix + 'hide-offsets'],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    // We want to shrinkWrap around all docked items
    shrinkWrapDock: true,

    /**
     * @property
     * The default height in pixels of the message box's multiline textarea if displayed.
     */
    defaultTextHeight : 75,
    /**
     * @property
     * The minimum width in pixels of the message box if it is a progress-style dialog.  This is useful
     * for setting a different minimum width than text-only dialogs may need.
     */
    minProgressWidth : 250,
    /**
     * @property
     * The minimum width in pixels of the message box if it is a prompt dialog.  This is useful
     * for setting a different minimum width than text-only dialogs may need.
     */
    minPromptWidth: 250,
    //<locale type="object">
    /**
     * @property
     * An object containing the default button text strings that can be overriden for localized language support.
     * Supported properties are: ok, cancel, yes and no.  Generally you should include a locale-specific
     * resource file for handling language support across the framework.
     * Customize the default text like so:
     *
     *     Ext.window.MessageBoxEx.buttonText.yes = "oui"; //french
     */
    buttonText: {
        // ok: 'OK',
        // yes: 'Yes',
        // no: 'No',
        // cancel: 'Cancel'
        btn1: 'OK',
        btn2: 'Yes',
        btn3: 'No',
        btn4: 'Cancel',
        btn5: 'Cancel1'
    },
    dontCloseOnClick: {
        btn1: true,
        btn2: true,
        btn3: true,
        btn4: true,
        btn5: true
    },
    //</locale>

    buttonIds: [
        // 'ok', 'yes', 'no', 'cancel'
        'btn1','btn2','btn3','btn4','btn5'
    ],

    //<locale type="object">
    titleText: {
        confirm: 'Confirm',
        prompt: 'Prompt',
        wait: 'Loading...',
        alert: 'Attention'
    },
    //</locale>

    iconHeight: 35,
    iconWidth: 50,

    makeButton: function(btnIdx) {
        var btnId = this.buttonIds[btnIdx],
            dontCloseOnClick = this.dontCloseOnClick[btnId];
        return new Ext.button.Button({
            handler: this.btnCallback,
            itemId: btnId,
            scope: this,
            text: this.buttonText[btnId],
            dontCloseOnClick:dontCloseOnClick,
            minWidth: 75
        });
    },

    btnCallback: function(btn) {
        var me = this,
            value,
            field;

        if (me.cfg.prompt || me.cfg.multiline) {
            if (me.cfg.multiline) {
                field = me.textArea;
            } else {
                field = me.textField;
            }
            value = field.getValue();
            field.reset();
        }

        if(btn.dontCloseOnClick) {
            // Component.onHide blurs the active element if the Component contains the active element
            me.hide();
        }
       
        me.userCallback(btn.itemId, value, me.cfg);
    },

    hide: function() {
        var me = this,
            cls = me.cfg.cls;

        me.dd.endDrag();
        me.progressBar.reset();
        if (cls) {
            me.removeCls(cls);
        }
        me.callParent(arguments);
    },

    constructor: function(cfg) {
        var me = this;

        me.callParent(arguments);

        // set the default min/max/Width/Height to the initially configured min/max/Width/Height
        // so that it will be used as the default when reconfiguring.
        me.minWidth = me.defaultMinWidth = (me.minWidth || me.defaultMinWidth);
        me.maxWidth = me.defaultMaxWidth = (me.maxWidth || me.defaultMaxWidth);
        me.minHeight = me.defaultMinHeight = (me.minHeight || me.defaultMinHeight);
        me.maxHeight = me.defaultMaxHeight = (me.maxHeight || me.defaultMaxHeight);
    },

    initComponent: function(cfg) {
        var me = this,
            baseId = me.id,
            i, button;

        me.title = '&#160;';

        me.topContainer = new Ext.container.Container({
            layout: 'hbox',
            padding: 10,
            style: {
                overflow: 'hidden'
            },
            items: [
                me.iconComponent = new Ext.Component({
                    width: me.iconWidth,
                    height: me.iconHeight
                }),
                me.promptContainer = new Ext.container.Container({
                    flex: 1,
                    layout: 'anchor',
                    items: [
                        me.msg = new Ext.form.field.Display({
                            id: baseId + '-displayfield',
                            cls: me.baseCls + '-text'
                        }),
                        me.textField = new Ext.form.field.Text({
                            id: baseId + '-textfield',
                            anchor: '100%',
                            enableKeyEvents: true,
                            listeners: {
                                keydown: me.onPromptKey,
                                scope: me
                            }
                        }),
                        me.textArea = new Ext.form.field.TextArea({
                            id: baseId + '-textarea',
                            anchor: '100%',
                            height: 75
                        })
                    ]
                })
            ]
        });
        me.progressBar = new Ext.ProgressBar({
            id: baseId + '-progressbar',
            margins: '0 10 10 10'
        });

        me.items = [me.topContainer, me.progressBar];

        // Create the buttons based upon passed bitwise config
        me.msgButtons = [];
        for (i = 0; i < 5; i++) {
            button = me.makeButton(i);
            me.msgButtons[button.itemId] = button;
            me.msgButtons.push(button);
        }
        me.bottomTb = new Ext.toolbar.Toolbar({
            id: baseId + '-toolbar',
            ui: 'footer',
            dock: 'bottom',
            layout: {
                pack: 'center'
            },
            items: [
                me.msgButtons[0],
                me.msgButtons[1],
                me.msgButtons[2],
                me.msgButtons[3],
                me.msgButtons[4]
            ]
        });
        me.dockedItems = [me.bottomTb];
        me.on('close', me.onClose, me);
        me.callParent();
    },

    onClose: function(){
        var btn = this.header.child('[type=close]');
        // Give a temporary itemId so it can act like the cancel button
        btn.itemId = 'cancel';
        this.btnCallback(btn);
        delete btn.itemId;
    },

    onPromptKey: function(textField, e) {
        var me = this;

        if (e.keyCode === e.RETURN || e.keyCode === 10) {
            if (me.msgButtons.ok.isVisible()) {
                me.msgButtons.ok.handler.call(me, me.msgButtons.ok);
            } else if (me.msgButtons.yes.isVisible()) {
                me.msgButtons.yes.handler.call(me, me.msgButtons.yes);
            }
        }
    },

    reconfigure: function(cfg) {
        var me = this,
            buttons = 0,
            hideToolbar = true,
            oldButtonText = me.buttonText,
            resizer = me.resizer,
            resizeTracker, width, height, i, textArea, textField,
            msg, progressBar, msgButtons;

        // Restore default buttonText before reconfiguring.
        me.updateButtonText();

        cfg = cfg || {};
        me.cfg = cfg;
        if (cfg.width) {
            width = cfg.width;
        }

        if (cfg.height) {
            height = cfg.height;
        }

        me.minWidth = cfg.minWidth || me.defaultMinWidth;
        me.maxWidth = cfg.maxWidth || me.defaultMaxWidth;
        me.minHeight = cfg.minHeight || me.defaultMinHeight;
        me.maxHeight = cfg.maxHeight || me.defaultMaxHeight;

        if (resizer) {
            resizeTracker = resizer.resizeTracker;
            resizer.minWidth = resizeTracker.minWidth = me.minWidth;
            resizer.maxWidth = resizeTracker.maxWidth = me.maxWidth;
            resizer.minHeight = resizeTracker.minHeight = me.minHeight;
            resizer.maxHeight = resizeTracker.maxHeight = me.maxHeight;
        }

        // Default to allowing the Window to take focus.
        delete me.defaultFocus;
        if (cfg.defaultFocus) {
            me.defaultFocus = cfg.defaultFocus;
        }

        // clear any old animateTarget
        me.animateTarget = cfg.animateTarget || undefined;

        // Defaults to modal
        me.modal = cfg.modal !== false;

        // Show the title/icon
        me.setTitle(cfg.title || '');
        me.setIconCls(cfg.iconCls || '');

        // Extract button configs
        if (Ext.isObject(cfg.buttons)) {
            me.buttonText = cfg.buttons;
            buttons = 0;
        } else {
            me.buttonText = cfg.buttonText || me.buttonText;
            buttons = Ext.isNumber(cfg.buttons) ? cfg.buttons : 0;
        }

        if(!Ext.isEmpty(cfg.dontCloseOnClick)) {
            me.dontCloseOnClick = cfg.dontCloseOnClick;
        }

        // Apply custom-configured buttonText
        // Infer additional buttons from the specified property names in the buttonText object
        buttons = buttons | me.updateButtonText();
        me.updateBtnCfg();
        
        // Restore buttonText. Next run of reconfigure will restore to prototype's buttonText
        me.buttonText = oldButtonText;

        // During the on render, or size resetting layouts, and in subsequent hiding and showing, we need to
        // suspend layouts, and flush at the end when the Window's children are at their final visibility.
        Ext.suspendLayouts();
        delete me.width;
        delete me.height;
        if (width || height) {
            if (width) {
                me.setWidth(width);
            }

            if (height) {
                me.setHeight(height);
            }
        }
        me.hidden = false;
        if (!me.rendered) {
            me.render(Ext.getBody());
        }

        // Hide or show the close tool
        me.closable = cfg.closable !== false && !cfg.wait;
        me.header.child('[type=close]').setVisible(me.closable);

        // Hide or show the header
        if (!cfg.title && !me.closable && !cfg.iconCls) {
            me.header.hide();
        } else {
            me.header.show();
        }

        // Default to dynamic drag: drag the window, not a ghost
        me.liveDrag = !cfg.proxyDrag;

        // wrap the user callback
        me.userCallback = Ext.Function.bind(cfg.callback ||cfg.fn || Ext.emptyFn, cfg.scope || Ext.global);

        // Hide or show the icon Component
        me.setIcon(cfg.icon, cfg.iconWidth, cfg.iconHeight);

        // Hide or show the message area
        msg = me.msg;
        if (cfg.msg) {
            msg.setValue(cfg.msg);
            msg.show();
        } else {
            msg.hide();
        }

        // Hide or show the input field
        textArea = me.textArea;
        textField = me.textField;
        if (cfg.prompt || cfg.multiline) {
            me.multiline = cfg.multiline;
            if (cfg.multiline) {
                textArea.setValue(cfg.value);
                textArea.setHeight(cfg.defaultTextHeight || me.defaultTextHeight);
                textArea.show();
                textField.hide();
                me.defaultFocus = textArea;
            } else {
                textField.setValue(cfg.value);
                textArea.hide();
                textField.show();
                me.defaultFocus = textField;
            }
        } else {
            textArea.hide();
            textField.hide();
        }

        // Hide or show the progress bar
        progressBar = me.progressBar;
        if (cfg.progress || cfg.wait) {
            progressBar.show();
            me.updateProgress(0, cfg.progressText);
            if(cfg.wait === true){
                progressBar.wait(cfg.waitConfig);
            }
        } else {
            progressBar.hide();
        }

        // Hide or show buttons depending on flag value sent.
        msgButtons = me.msgButtons;
        for (i = 0; i < 5; i++) {
            // if (buttons & Math.pow(2, i)) {
            if (buttons>i) {

                // Default to focus on the first visible button if focus not already set
                if (!me.defaultFocus) {
                    me.defaultFocus = msgButtons[i];
                }
                msgButtons[i].show();
                hideToolbar = false;
            } 
            else {
                msgButtons[i].hide();
            }
        }

        // Hide toolbar if no buttons to show
        if (hideToolbar) {
            me.bottomTb.hide();
        } else {
            me.bottomTb.show();
        }
        Ext.resumeLayouts(true);
    },

    /**
     * @private
     * Set button text according to current buttonText property object
     * @return {Number} The buttons bitwise flag based upon the button IDs specified in the buttonText property.
     */
    updateButtonText: function() {
        var me = this,
            buttonText = me.buttonText,
            buttons = 0,
            btnId,
            btn;

        for (btnId in buttonText) {
            if (buttonText.hasOwnProperty(btnId)) {
                btn = me.msgButtons[btnId];
                if (btn) {
                    // if (me.cfg && me.cfg.buttonText) {
                    //     buttons = buttons | Math.pow(2, Ext.Array.indexOf(me.buttonIds, btnId));
                    // }
                    if (btn.text != buttonText[btnId]) {
                        btn.setText(buttonText[btnId]);
                    }
                }
            }
        }
        return buttons;
    },

    updateBtnCfg: function() {
        var me = this,
            dontCloseOnClick = me.dontCloseOnClick,
            buttons = 0,
            btnId,
            btn;
        if(!Ext.isEmpty(dontCloseOnClick)) {
            for (var j=0;j<dontCloseOnClick.length;j++) {
                btn = me.msgButtons[dontCloseOnClick[j]];
                btn.dontCloseOnClick = false;
            }
        }
    },

    /**
     * Displays a new message box, or reinitializes an existing message box, based on the config options passed in. All
     * display functions (e.g. prompt, alert, etc.) on MessageBoxEx call this function internally, although those calls
     * are basic shortcuts and do not support all of the config options allowed here.
     *
     * Example usage:
     *
     *     Ext.MsgEx.show({
     *         title: 'Address',
     *         msg: 'Please enter your address:',
     *         width: 300,
     *         buttons: Ext.MsgEx.OKCANCEL,
     *         multiline: true,
     *         fn: saveAddress,
     *         animateTarget: 'addAddressBtn',
     *         icon: Ext.window.MessageBoxEx.INFO
     *     });
     *
     * @param {Object} config The following config options are supported:
     *
     * @param {String/Ext.dom.Element} config.animateTarget
     * An id or Element from which the message box should animate as it opens and closes.
     *
     * @param {Number} [config.buttons=false]
     * A bitwise button specifier consisting of the sum of any of the following constants:
     *
     *  - Ext.MessageBoxEx.OK
     *  - Ext.MessageBoxEx.YES
     *  - Ext.MessageBoxEx.NO
     *  - Ext.MessageBoxEx.CANCEL
     *
     * Some common combinations have already been predefined:
     *
     *  - Ext.MessageBoxEx.OKCANCEL
     *  - Ext.MessageBoxEx.YESNO
     *  - Ext.MessageBoxEx.YESNOCANCEL
     *
     * Or false to not show any buttons.
     *
     * This may also be specified as an object hash containing custom button text in the same format as the
     * {@link #buttonText} config. Button IDs present as property names will be made visible.
     *
     * @param {Boolean} config.closable
     * False to hide the top-right close button (defaults to true). Note that progress and wait dialogs will ignore this
     * property and always hide the close button as they can only be closed programmatically.
     *
     * @param {String} config.cls
     * A custom CSS class to apply to the message box's container element
     *
     * @param {Number} [config.defaultTextHeight=75]
     * The default height in pixels of the message box's multiline textarea if displayed.
     *
     * @param {Function} config.fn
     * A callback function which is called when the dialog is dismissed either by clicking on the configured buttons, or
     * on the dialog close button, or by pressing the return button to enter input.
     *
     * Progress and wait dialogs will ignore this option since they do not respond to user actions and can only be
     * closed programmatically, so any required function should be called by the same code after it closes the dialog.
     * Parameters passed:
     *
     *  @param {String} config.fn.buttonId The ID of the button pressed, one of:
     *
     * - ok
     * - yes
     * - no
     * - cancel
     *
     *  @param {String} config.fn.text Value of the input field if either `prompt` or `multiline` is true
     *  @param {Object} config.fn.opt The config object passed to show.
     *
     * @param {Object} config.buttonText
     * An object containing string properties which override the system-supplied button text values just for this
     * invocation. The property names are:
     *
     * - ok
     * - yes
     * - no
     * - cancel
     *
     * @param {Object} config.scope
     * The scope (`this` reference) in which the function will be executed.
     *
     * @param {String} config.icon
     * A CSS class that provides a background image to be used as the body icon for the dialog.
     * One can use a predefined icon class:
     *
     *  - Ext.MessageBoxEx.INFO
     *  - Ext.MessageBoxEx.WARNING
     *  - Ext.MessageBoxEx.QUESTION
     *  - Ext.MessageBoxEx.ERROR
     *
     * or use just any `'custom-class'`. Defaults to empty string.
     *
     * @param {String} config.iconCls
     * The standard {@link Ext.window.Window#iconCls} to add an optional header icon (defaults to '')
     * 
     * @param {String} config.defaultFocus
     * The button to focus when showing the dialog. If not specified, defaults to
     * the first visible button.
     *
     * @param {Number} config.maxWidth
     * The maximum width in pixels of the message box (defaults to 600)
     *
     * @param {Number} config.minWidth
     * The minimum width in pixels of the message box (defaults to 100)
     *
     * @param {Boolean} config.modal
     * False to allow user interaction with the page while the message box is displayed (defaults to true)
     *
     * @param {String} config.msg
     * A string that will replace the existing message box body text (defaults to the XHTML-compliant non-breaking space
     * character '&#160;')
     *
     * @param {Boolean} config.multiline
     * True to prompt the user to enter multi-line text (defaults to false)
     *
     * @param {Boolean} config.progress
     * True to display a progress bar (defaults to false)
     *
     * @param {String} config.progressText
     * The text to display inside the progress bar if progress = true (defaults to '')
     *
     * @param {Boolean} config.prompt
     * True to prompt the user to enter single-line text (defaults to false)
     *
     * @param {Boolean} config.proxyDrag
     * True to display a lightweight proxy while dragging (defaults to false)
     *
     * @param {String} config.title
     * The title text
     *
     * @param {String} config.value
     * The string value to set into the active textbox element if displayed
     *
     * @param {Boolean} config.wait
     * True to display a progress bar (defaults to false)
     *
     * @param {Object} config.waitConfig
     * A {@link Ext.ProgressBar#wait} config object (applies only if wait = true)
     *
     * @param {Number} config.width
     * The width of the dialog in pixels
     *
     * @return {Ext.window.MessageBoxEx} this
     */
    show: function(cfg) {
        var me = this,
            visibleFocusables;

        // If called during global layout suspension, make the call after layout resumption
        if (Ext.AbstractComponent.layoutSuspendCount) {
            Ext.on({
                resumelayouts: function() {
                    me.show(cfg);
                },
                single: true
            });
            return me;
        }

        me.reconfigure(cfg);
        if (cfg.cls) {
            me.addCls(cfg.cls);
        }

        // Do not steal focus from anything that may be focused if the MessageBoxEx has no visible focusable
        // items. For example, a "wait" message box should not get focus.
        visibleFocusables = me.query('textfield:not([hidden]),textarea:not([hidden]),button:not([hidden])');
        me.preventFocusOnActivate = !visibleFocusables.length;

        // Set the flag, so that the parent show method performs the show procedure that we need.
        // ie: animation from animTarget, onShow processing and focusing.
        me.hidden = true;
        me.callParent();
        return me;
    },

    onShow: function() {
        this.callParent(arguments);
        this.center();
    },

    updateText: function(text) {
        this.msg.setValue(text);
    },

    /**
     * Adds the specified icon to the dialog.  By default, the class 'x-messagebox-icon' is applied for default
     * styling, and the class passed in is expected to supply the background image url. Pass in empty string ('')
     * to clear any existing icon. This method must be called before the MessageBoxEx is shown.
     * The following built-in icon classes are supported, but you can also pass in a custom class name:
     *
     *     Ext.window.MessageBoxEx.INFO
     *     Ext.window.MessageBoxEx.WARNING
     *     Ext.window.MessageBoxEx.QUESTION
     *     Ext.window.MessageBoxEx.ERROR
     *
     * @param {String} icon A CSS classname specifying the icon's background image url, or empty string to clear the icon
     * @param {Number} [width] The width of the icon. If not specified, the default is used
     * @param {Number} [height] The height of the icon. If not specified, the default is used
     * @return {Ext.window.MessageBoxEx} this
     */
    setIcon : function(icon, width, height) {
        var me = this,
            iconCmp = me.iconComponent,
            cls = me.messageIconCls;

        if (cls) {
            iconCmp.removeCls(cls);
        }

        if (icon) {
            iconCmp.show();
            iconCmp.setSize(width || me.iconWidth, height || me.iconHeight);
            iconCmp.addCls(Ext.baseCSSPrefix + 'dlg-icon');
            iconCmp.addCls(me.messageIconCls = icon);
        } else {
            iconCmp.removeCls(Ext.baseCSSPrefix + 'dlg-icon');
            iconCmp.hide();
        }
        return me;
    },

    /**
     * Updates a progress-style message box's text and progress bar. Only relevant on message boxes
     * initiated via {@link Ext.window.MessageBoxEx#progress} or {@link Ext.window.MessageBoxEx#wait},
     * or by calling {@link Ext.window.MessageBoxEx#method-show} with progress: true.
     *
     * @param {Number} [value=0] Any number between 0 and 1 (e.g., .5)
     * @param {String} [progressText=''] The progress text to display inside the progress bar.
     * @param {String} [msg] The message box's body text is replaced with the specified string (defaults to undefined
     * so that any existing body text will not get overwritten by default unless a new value is passed in)
     * @return {Ext.window.MessageBoxEx} this
     */
    updateProgress : function(value, progressText, msg){
        this.progressBar.updateProgress(value, progressText);
        if (msg){
            this.updateText(msg);
        }
        return this;
    },

    onEsc: function() {
        if (this.closable !== false) {
            this.callParent(arguments);
        }
    },

    /**
     * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's confirm).
     * If a callback function is passed it will be called after the user clicks either button,
     * and the id of the button that was clicked will be passed as the only parameter to the callback
     * (could also be the top-right close button, which will always report as "cancel").
     *
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} [fn] The callback function invoked after the message box is closed.
     * See {@link #method-show} method for details.
     * @param {Object} [scope=window] The scope (`this` reference) in which the callback is executed.
     * @return {Ext.window.MessageBoxEx} this
     */
    confirm: function(cfg, msg, fn, scope) {
        if (Ext.isString(cfg)) {
            cfg = {
                title: cfg,
                icon: this.QUESTION,
                msg: msg,
                buttons: this.YESNO,
                callback: fn,
                scope: scope
            };
        }
        return this.show(cfg);
    },

    /**
     * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to JavaScript's prompt).
     * The prompt can be a single-line or multi-line textbox.  If a callback function is passed it will be called after the user
     * clicks either button, and the id of the button that was clicked (could also be the top-right
     * close button, which will always report as "cancel") and the text that was entered will be passed as the two parameters to the callback.
     *
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} [fn] The callback function invoked after the message box is closed.
     * See {@link #method-show} method for details.
     * @param {Object} [scope=window] The scope (`this` reference) in which the callback is executed.
     * @param {Boolean/Number} [multiline=false] True to create a multiline textbox using the defaultTextHeight
     * property, or the height in pixels to create the textbox/
     * @param {String} [value=''] Default value of the text input element
     * @return {Ext.window.MessageBoxEx} this
     */
    prompt : function(cfg, msg, fn, scope, multiline, value){
        if (Ext.isString(cfg)) {
            cfg = {
                prompt: true,
                title: cfg,
                minWidth: this.minPromptWidth,
                msg: msg,
                buttons: this.OKCANCEL,
                callback: fn,
                scope: scope,
                multiline: multiline,
                value: value
            };
        }
        return this.show(cfg);
    },

    /**
     * Displays a message box with an infinitely auto-updating progress bar.  This can be used to block user
     * interaction while waiting for a long-running process to complete that does not have defined intervals.
     * You are responsible for closing the message box when the process is complete.
     *
     * @param {String} msg The message box body text
     * @param {String} [title] The title bar text
     * @param {Object} [config] A {@link Ext.ProgressBar#wait} config object
     * @return {Ext.window.MessageBoxEx} this
     */
    wait : function(cfg, title, config){
        if (Ext.isString(cfg)) {
            cfg = {
                title : title,
                msg : cfg,
                closable: false,
                wait: true,
                modal: true,
                minWidth: this.minProgressWidth,
                waitConfig: config
            };
        }
        return this.show(cfg);
    },

    /**
     * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript alert prompt).
     * If a callback function is passed it will be called after the user clicks the button, and the
     * id of the button that was clicked will be passed as the only parameter to the callback
     * (could also be the top-right close button, which will always report as "cancel").
     *
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} [fn] The callback function invoked after the message box is closed.
     * See {@link #method-show} method for details.
     * @param {Object} [scope=window] The scope (<code>this</code> reference) in which the callback is executed.
     * @return {Ext.window.MessageBoxEx} this
     */
    alert: function(cfg, msg, fn, scope) {
        if (Ext.isString(cfg)) {
            cfg = {
                title : cfg,
                msg : msg,
                buttons: this.OK,
                fn: fn,
                scope : scope,
                minWidth: this.minWidth
            };
        }
        return this.show(cfg);
    },

    /**
     * Displays a message box with a progress bar.
     *
     * You are responsible for updating the progress bar as needed via {@link Ext.window.MessageBoxEx#updateProgress}
     * and closing the message box when the process is complete.
     *
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {String} [progressText=''] The text to display inside the progress bar
     * @return {Ext.window.MessageBoxEx} this
     */
    progress : function(cfg, msg, progressText){
        if (Ext.isString(cfg)) {
            cfg = {
                title: cfg,
                msg: msg,
                progress: true,
                progressText: progressText
            };
        }
        return this.show(cfg);
    }
}, function() {
    /**
     * @class Ext.MessageBoxEx
     * @alternateClassName Ext.MsgEx
     * @extends Ext.window.MessageBoxEx
     * @singleton
     * Singleton instance of {@link Ext.window.MessageBoxEx}.
     */
    Ext.MessageBoxEx = Ext.MsgEx = new this();
});