/*
 * File: app/utility/mask.js
 *
 * Shows loading mask at desired time.
 * Example:
 *      var msk = Ext.create('YBase.utility.Mask',{
 *          hideOnErrorInterval:1000 * 60 * 2 //2 minutes
 *      });
 *      msk.on('afterrender', function(){
 *           //do some task here
 *           //after finishing task hide the loading mask
 *           this.hide();
 *       });
 *      msk.show('Loading...', Ext.getBody());
 *
 */
Ext.define('YBase.utility.Mask', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    constructor: function (config) {
        // The Observable constructor copies all of the properties of `config` on
        // to `this` using Ext.apply. Further, the `listeners` property is
        // processed to add listeners.
        //
        this.mixins.observable.constructor.call(this, config);

        // this.addEvents(
        //     'afterrender'
        // );
    },

    //For internal use only
    globalMask:null,

    //For internal use only
    shown:false,

    //After defined amount of time 'afterrender' event will be fired.
    //default is 1000 i.e. 1 second
    waitInterval:0,
    /**
     * Automatically unhides the mask after [hideOnErrorInterval]
     * default = true,
     */
    enableAutoUnmaskInterval: true,
    //After defined amount of time mask will be automatically hidden
    //if the mask is still shown default is (1000*60*2) 2 minutes
    hideOnErrorInterval:0,


    /**
     * The function that will be executed in the background which the mask is being shown.
     */
    backgroundProcess:null,
    /**
     * The component on which the loading mask is to be shown.
     */
    maskComponent:null,


    //msg: message to display in loading mask for e.g. 'Loading...'
    //cmp: which component need to be masked for e.g. Ext.getBody()
    show: function(msg, cmp) {
        var me= this;
        me.on("afterrender", me.onAfterRender);
        if (!cmp || Ext.isEmpty(cmp))
            cmp = Ext.getBody();

        if (!me.globalMask){
            if (!msg || Ext.isEmpty(msg))
                msg = 'Loading...';

            me.globalMask = new Ext.LoadMask(cmp, {
                //id:'globalMask',
                alwaysOnTop: true,
                msg:msg
            });

            me.globalMask.on('show', function(cmp, eOpts){
                me.shown= true;
                //afterrender event fired
                //if not fired here it will be fired only after the defined component is fired.
                me.fireEvent('afterrender');

            }, me, { buffer: 500 });
        // }, me);

            me.globalMask.on('hide', function(cmp, eOpts){
                me.shown= false;
            }, me);
        }

        me.globalMask.show();


        // //Default wait interval 1000 millisecond
        // if (me.waitInterval <= 0)
        //     me.waitInterval = 1000;

        if(!Ext.isEmpty(me.backgroundProcess))
            me.backgroundProcess;

    },

    //call this method to hide the loading mask
    //after finishing task.
    hide: function(msg) {
        if (!Ext.isEmpty(this.shown) && this.shown === true){
            this.globalMask.hide();
        }
    },

    onAfterRender:function(){
        // console.log('mask onAfterRender');
        if(!Ext.isEmpty(this.backgroundProcess))
            this.backgroundProcess;
    }
});

