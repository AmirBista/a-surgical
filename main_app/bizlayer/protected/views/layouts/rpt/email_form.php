<div id="email_form_div" title="<?php echo t('email','Email Form'); ?>" style="display:none">
	<form class="emailform" id="emailform" method="post" action="javascript:void(0)">
	  <fieldset>

	  	<input id="adminurl" type="hidden" value="<?php echo Yii::app()->request->baseUrl;?>">
	  	<input id="projectname" type="hidden" value="<?php echo PROJECT_NAME;?>">
	  	<input id="csvFileName" type="hidden" value="<?php echo isset($_GET['csvFileName'])?$_GET['csvFileName']:null;?>">
	  	<input id="type" type="hidden" value="<?php echo $type;?>">

	    <p>
	      <label for="emailto"><?php echo t('email','To'); ?><span class="required">&nbsp; *</span></label>
	      <input id="emailto" type="email" name="emailto">
	    </p>
	     <p>
	      <label for="emailsub"><?php echo t('email','Subject'); ?><span class="required">&nbsp; *</span></label>
	      <input id="emailsub" type="text" name="emailsub">
	    </p>
	    <p>
	      <label for="emailmessage"><?php echo t('email','Message'); ?></label>
	      <textarea id="emailmessage" name="emailmessage" style="resize:none;"></textarea>
	    </p>
	    <p>
	      <input class="submit" type="submit" value="<?php echo t('general','Submit'); ?>">
	    </p>
	    <div class="sending_email_div"><span></span></div>
	  </fieldset>
	</form>
</div>

<script type="text/javascript">
</script>