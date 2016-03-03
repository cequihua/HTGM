var cau = 0
var volt = 0
var amp = 0

var perc_cau = 0
var perc_volt = 0
var perc_amp = 0

var timer = null

function iniciar() {
    timer = setInterval(get_data, 3000);
}

function terminar(){
	clearInterval(timer);
}

function get_data(){
        $.ajax({
            type: 'POST',
            url: 'dashboard.php',
            contentType: 'application/json; chartset:utf-8',
            dataType: 'json',
            success: function (result) {
                cau = parseInt(result.data['caudal']);
                amp = parseInt(result.data['amperes']);
                volt = parseInt(result.data['voltios']);

                perc_cau = cau * 100 / 200;
                perc_amp = amp * 100 / 20;
                perc_volt = volt * 100 / 60;

                $('#chart-caudal').data('easyPieChart').update(perc_cau);
                $('#chart-amp').data('easyPieChart').update(perc_amp);
                $('#chart-presion').data('easyPieChart').update(perc_volt);

                $('#dat-caudal').text(cau.toString());
                $('#dat-amp').text(amp.toString());
                $('#dat-presion').text(volt.toString());
            },
            failure: function (result) {

            },
            error: function (result) {
                
            }
        });
}