var email_form_validator = $("#emailform").validate({
    rules: {
        emailto: "required email",
        emailsub: "required"
    },
    messages: {
        emailto: {
            required: LANG.globalLang.itemRequired.required,
            email: LANG.globalLang.emailVaild.emailrequired

        },
        emailsub: LANG.globalLang.itemRequired.required
    }
});

jQuery('body').on('click', '.email', function () {
	project = this.getAttribute('project');
    $("#email_form_div").dialog({
        dialogClass: "no-close "+project+"_email_modal",
        resizable: false,
        draggable: false,
        modal: true
    });
});

$('#email_form_div').on('dialogclose', function (event) {
    email_form_validator.resetForm();
    $("#emailform")[0].reset();
});

jQuery('body').on('submit', '.emailform', function (e) {
    $('.sending_email_div').html('<span class="sending_email">'+LANG.sending+'</span>');
    e.preventDefault();
    var me = $(this),
        baseUrl = $('#adminurl').val(),
        csvFileName = $('#csvFileName').val(),
        projectname = $('#projectname').val(),
        type = $('#type').val(),
        emailto = $('#emailto').val(),
        emailsub = $('#emailsub').val(),
        emailmessage = $('#emailmessage').val();

        if (csvFileName.length ==0) {
            var mthod = 'POST',
            ordermaster_ids = location.search.split('ordermaster_ids=')[1];
        }else{
            var mthod = 'GET',
            ordermaster_ids = '';
        }

    $.ajax({
        url: baseUrl+'/'+ projectname + 'PrintReport/getReport',
        type: mthod,
        data: {
            export_as: 'Pdf',
            projectname: projectname,
            csvFileName: csvFileName,
            type: type,
            emailto: emailto,
            emailsub: emailsub,
            emailmessage: emailmessage,
            email: 'true',
            ordermaster_ids: ordermaster_ids
        },
        dataType: 'JSON',
        context: this,
        success: function (response) {
            $("#email_form_div").dialog('close');
            $('.sending_email_div').html('');
            alertify.alert(LANG.emailLang.successMsg.emailsent);
        },
        error: function (e) {
            $("#email_form_div").dialog('close');
            $('.sending_email_div').html('');
            alertify.alert(LANG.emailLang.failMsg.emailerror);
        }
    });
});