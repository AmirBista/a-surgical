function waitingDialog(e){var t=jrlang.login10;$("#loadingScreen").html(e.message&&""!=e.message?e.message:t["lblWaiting"]);$("#loadingScreen").dialog("open")}function closeWaitingDialog(){$("#loadingScreen").dialog("close")}function languageImplimentation(){var e=jrlang.login10,t=e["lblUsername"],n=e["lblPassword"],r=e["lblRememberMe"],i=e["btnLogin"],s=jrlang.globalLang.app;if($("#username").val()==""){$("#username").val(t)}$("#username").attr("placeholder",t);$("#pass_hidden").val(n);$("#pass_hidden").attr("placeholder",n);$("#password").attr("placeholder",n);$("#lblRememberMe").text(r);$("#btnLogin").text(i);$("#headerLoginFail").attr("title",s["appTitle"+jrbranch]);$("#loginHeader").text(e["lblLoginScreen"]);$("#headerLoginFail .message").text(e["lblLoginFail"])}jQuery(function(){var e=jrlang.login10,t=e["lblUsername"],n=e["lblPassword"];languageImplimentation();jQuery.fn.center=function(){this.css("position","absolute");this.css("top",($(window).height()-this.height())/2+$(window).scrollTop()+"px");this.css("left",($(window).width()-this.width())/2+$(window).scrollLeft()+"px");return this};$(".hideme").show();$(window).resize(function(){$(".loginbox").center()});$(".loginbox").center();var r=$("#pass_hidden"),i=$("#password");r.show();i.hide();r.focus(function(){$(this).hide();i.show();i.focus()});i.blur(function(){if($(this).val().length==0){$(this).hide();r.show()}});$("input[type=text]").on({click:function(){if($(this).val()==$(this).attr("placeholder")){$(this).val("")}},blur:function(){if($(this).val()==""){$(this).val($(this).attr("placeholder"))}}});$(document).tooltip({position:{my:"center bottom-3",at:"center top",using:function(e,t){$(this).css(e);$("<div>").addClass(t.vertical).addClass(t.horizontal).appendTo(this)}}});jQuery("#client_login").on("click",function(){var r={},i=$("#username"),s=$("#password"),o=$("#pass_hidden"),u=i.val(),a=s.val(),f=o.val();if(u==""||u==t){i.addClass("redbg");i.attr("title",e["lblLoginFail"])}else{i.removeClass("redbg");i.attr("title","")}if(a==""||a==n){s.addClass("redbg");o.addClass("redbg");s.attr("title",e["lblLoginFail"])}else{s.removeClass("redbg");o.removeClass("redbg");s.attr("title","")}if(u==""||a==""||a==n||u==t)return;r["_b"]=jrbranch;r["username"]=u;r["password"]=a;r["remember_me"]=$("#remember_me").is(":checked")?1:0;waitingDialog({});jQuery.ajax({type:"POST",url:"bizlayer/auth/login",data:r,success:function(e){var t=jQuery.parseJSON(e);if(t["success"]){window.location.reload()}else{closeWaitingDialog();$(".dialog-message").dialog({modal:true,width:315,dialogClass:"custom_dialog",buttons:{Ok:function(){$(this).dialog("close")}}})}},error:function(e,t,n){closeWaitingDialog()}})});$("input").keyup(function(e){if(e.keyCode==13){$("#client_login").trigger("click")}});$("#loadingScreen").dialog({autoOpen:false,dialogClass:"loadingScreenWindow",closeOnEscape:false,draggable:false,width:280,minHeight:120,modal:true,buttons:{},resizable:false,open:function(){$("body").css("overflow","hidden")},close:function(){$("body").css("overflow","auto")},dialogClass:"noclose"})})