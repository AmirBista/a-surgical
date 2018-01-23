<?php
	// BASE-LEGO [PrintReport] functions
	/**
	 * This is the shortcut to Yii::t() with default category = 'stay'
	*/
	if(!function_exists('jpTextEncode')) {
		function jpTextEncode($value="", $to_encoding = "UTF-8", $from_encoding = FROM_ENCODING ) {
		    if (!empty($value)) {
		    	return mb_convert_encoding($value, $to_encoding, $from_encoding);
		    }else{
		    	return NULL;
		    }
		}
	}

	function getImgUrl($file=true) {
	    return getMainUrl(false).'images/';
	}
	function getFileboxUrl($file=true) {
	    return getMainUrl(false).'filebox/';
	}
	function getAdminUrl(){
	    return getMainUrl(false).'backend/';
	}

	function sendEmail($email_from,$subject,$body,$email_to,$attach_path)
	{
	    $message = new YiiMailMessage;

	    $message->setBody($body, 'text/html');
	    $message->subject = $subject;
	    $message->addTo($email_to);
	    $message->from = $email_from;

	    if (!empty($attach_path) && file_exists($attach_path)) {
		    $swiftAttachment = Swift_Attachment::fromPath($attach_path);
		    $message->attach($swiftAttachment);
	    }
	    return Yii::app()->mail->send($message);
	}
	function changeDateFormat($date=NULL,$format='m/d') {
		if(!empty($date) && $date!='&nbsp;')
			$date =  date($format, strtotime($date));
		return $date;
	}
	function limitTxt($data,$from,$to){
		if(!empty($data))
			return mb_substr($data,$from,$to, "utf-8");
	}

	function checkFileExist($path=NULL) {
		$image_path = dirname(__FILE__).'../../'.$path;		
		$src ="&nbsp;";
			if (!empty($path) && file_exists($image_path)) {
    			$src='<img src="'.$path.'"width="120"/>';
		}
		return $src; 
	}
