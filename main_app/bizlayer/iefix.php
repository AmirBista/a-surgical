<!--[if lt IE 8]>
 <script defer type="text/javascript" src="<?php echo $back1?>resources/json3.min.js"></script>
    
<script src="<?php echo $back1?>resources/DD_belatedPNG.js"></script>
<script defer type="text/javascript">
	DD_belatedPNG.fix('span');
  DD_belatedPNG.fix('img');
</script>
<![endif]-->
<!--To use indexOf for IE<9-->
<script type="text/javascript">if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
//supports trim for ie < 8
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

</script>