function num2str(n, text_forms) {
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function up(callback) {

    var ads_success = 0;
    var ads_error = 0;
    var ads = [];

    $("li").each(function(index, element) {
        if ($(element).attr('rel')) {
            ads.push($(element).attr('rel'));
        }
    });

    ads.forEach(function(ads_id) {
        $.ajax({
            url: 'https://bobr.by/_connector/?__modname=ad',
            type: 'post',
            data: {
                'profile_ad_up___record_id': '___json___' + ads_id,
                '_context___params': '___json___' + ads_id,
                '__methods_list': 'profile_ad_up,_context',
            },
            dataType: 'json',
            success: function (data) {
                if (data.error == 0) {
                    ads_success++;
                } else {
                    ads_error++;
                }
                if (ads_success + ads_error == ads.length && typeof callback === 'function') {
                    callback(ads_success, ads_error, ads.length);
                }
            },
            error: function (xhr, status, thrownError) {
                ads_error++;
                if (ads_success + ads_error == ads.length && typeof callback === 'function') {
                    callback(ads_success, ads_error, ads.length);
                }
            },
        });
    });
}

function run() {
    up(function (cb_success, cb_error, cb_length) {
        var date = new Date().toLocaleString();
        console.log(
            date +
            ' Попытка поднять ' +
            cb_length +
            ' ' +
            num2str(cb_length, ['объявление', 'объявления', 'объявлений']) +
            ', успешно поднято ' +
            cb_success +
            ' ' +
            num2str(cb_success, ['объявление', 'объявления', 'объявлений']) +
            ', ждем 18 часов до следующего поднятия'
        );
    });
}

run();
setInterval(run(), 64860000); //18 часов и 1 минута