function print_preview() {
    window.print();
}

jQuery('body').on('click', '.htmldownload, .pdfdownload', function () {
    $('.loading_div').html('<span class="loading">Downloading..</span>');
    var me = $(this),
        baseUrl = me.attr('adminUrl'),
        projectname = me.attr('project'),
        csvFileName = me.attr('csvFileName'),
        type = me.attr('type'),
        export_as = me.attr('title');
    if (export_as == 'Email') {
        export_as = 'Pdf';
    }
    if (csvFileName.length ==0) {
        var mthod = 'POST',
        ordermaster_ids = location.search.split('ordermaster_ids=')[1];
    }else{
        var mthod = 'GET',
        ordermaster_ids = '';
    }
    $.ajax({
        url: baseUrl + projectname + 'PrintReport/getReport',
        type: mthod,
        data: {
            export_as: export_as,
            projectname: projectname,
            csvFileName: csvFileName,
            type: type,
            ordermaster_ids: ordermaster_ids
        },
        dataType: 'JSON',
        context: this,
        success: function (response) {
            $('.loading_div').html('');
            title = this.title;
            if (title == 'Html') {
                extension = '.html';
            } else {
                extension = '.pdf';
            }
            project = this.getAttribute('project');
            filename = response.file_name + extension;
            url_pathname = window.location.pathname;
            url_param = window.location.search;
            href = response.baseUrl +'/'+ project + 'PrintReport/getDownloadedFile' + url_param + '&downloadfile=' + filename;

            alertify.alert(LANG.globalLang.successMsg.downloadcompleted, function (e, filename, str) {
                window.open(href, '_blank');
            });
        },
        error: function (e) {
            $('.loading_div').html('');
            alertify.alert(LANG.globalLang.errorMsg.downloaderror);
        }
    });
});