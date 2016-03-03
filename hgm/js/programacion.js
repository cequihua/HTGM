var cau = 0;
var volt = 0;
var amp = 0;
var ene = 0;

var perc_cau = 0;
var perc_volt = 0;
var perc_amp = 0;
var perc_ene = 0;

var timer = null;
var on = false;

$(document).on("ready", inicio);

//Función que carga al iniciar
function inicio() {
	//Login fake
    $('#username').focus();
    $('#submit').click(function clic() {
        event.preventDefault(); // prevent PageReLoad
        login($('#username').val(), $('#password').val());
    });

    //Easy pie chart
    $(function dona() {
        $('.chart').easyPieChart({
            scaleColor: false,
            lineWidth: 30,
            lineCap: 'butt',
            barColor: '#23ADE4',
            trackColor: '#4050a1',
            size: 230,
            animate: 1000
        });
    });
	
	//Año en curso
	var fecha = new Date();
	var ano = fecha.getFullYear();
	document.getElementById("currentYear").innerHTML = ano;
}



//Chart.js Globals
Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 14,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#ffffff",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(35,44,84,0.9)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for single tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function () {},

    // Function - Will fire on animation completion.
    onAnimationComplete: function () {}
}

//Chart.js Caudal
var caudalInfo = {
    labels: ["dom", "lun", "mar", "mie", "jue", "vie", "sab"],
    datasets: [
        {
            label: "Caudal",
            fillColor: "rgba(64,80,161,0.3)",
            strokeColor: "#ffffff",
            pointColor: "#2463a6",
            pointStrokeColor: "#ffffff",
            pointHighlightFill: "#ffffff",
            data: [23, 56, 99, 51, 35, 47, 45]
  }
 ]
}
var caudal = document.getElementById('caudal-graf').getContext('2d');
new Chart(caudal).Line(caudalInfo, {
    bezierCurve: false,
    tooltipTemplate: "<%= value %>  m³"
});

//Presión
var energiaInfo = {
    labels: ["dom", "lun", "mar", "mie", "jue", "vie", "sab"],
    datasets: [
        {
            label: "Presión",
            fillColor: "rgba(64,80,161,0.3)",
            strokeColor: "#ffffff",
            pointColor: "#2463a6",
            pointStrokeColor: "#ffffff",
            pointHighlightFill: "#ffffff",
            data: [2300, 3600, 4900, 5100, 6500, 7700, 8500]
  }
 ]
}

//Energía
var energia = document.getElementById('energia-graf').getContext('2d');
new Chart(energia).Line(energiaInfo, {
    bezierCurve: false,
    scaleFontSize: 12,
    tooltipTemplate: "<%= value %>  kWh"
});

$( "#energia-select" ).click(function() {
  $( "#energia-op" ).toggle( "slow" );
});

//Toggle
$('.toggle').click(function(e) {
  var toggle = this;
  e.preventDefault();
  
  $(toggle).toggleClass('toggle--on')
         .toggleClass('toggle--off')
         .addClass('toggle--moving');
  
  setTimeout(function() {
    $(toggle).removeClass('toggle--moving');
  }, 200);

  if(on == false){
    on = true;
    iniciar();
    on_off();
  }else{
    on = false;
    terminar();
    on_off();
  }
  
});

function iniciar() {
    timer = setInterval(get_data, 3000);
}

function terminar(){
    clearInterval(timer);

    $('#dat-caudal').text('0');
    $('#dat-amp').text('0');
    $('#dat-presion').text('0');
    $('#dat-energia').text('0');
    $('#dat-voltaje').text('0');

    $('#chart-caudal').data('easyPieChart').update(0);
    $('#chart-amp').data('easyPieChart').update(0);
    $('#chart-presion').data('easyPieChart').update(0);
    $('#chart-energia').data('easyPieChart').update(0);
    $('#chart-voltaje').data('easyPieChart').update(0);
}

function get_data(){
        $.ajax({
            type: 'POST',
            url: 'dashboard.php',
            contentType: 'application/json; chartset:utf-8',
            dataType: 'json',
            success: function (result) {
                cau = parseFloat(result.data['caudal']);
                amp = parseFloat(result.data['amperes']);
                volt = parseFloat(result.data['voltios']);
                ene = parseFloat(result.data['energia']);

                perc_cau = cau * 100 / 200;
                perc_amp = amp * 100 / 20;
                perc_volt = volt * 100 / 60;
                perc_ene = ene * 100 / 2500;

                $('#chart-caudal').data('easyPieChart').update(perc_cau);
                $('#chart-amp').data('easyPieChart').update(perc_amp);
                $('#chart-presion').data('easyPieChart').update(perc_volt);
                $('#chart-energia').data('easyPieChart').update(perc_ene);
                $('#chart-voltaje').data('easyPieChart').update(120);

                $('#dat-caudal').text(cau.toString());
                $('#dat-amp').text(amp.toString());
                $('#dat-presion').text(volt.toString());
                $('#dat-energia').text(ene.toString());
                $('#dat-voltaje').text('120');
            },
            failure: function (result) {

            },
            error: function (result) {
                
            }
        });
}

function on_off(){
    $.ajax({
            type: 'POST',
            url: 'on_off.php',
            contentType: 'application/json; chartset:utf-8',
            dataType: 'json',
            success: function (result) {

            },
            failure: function (result) {

            },
            error: function (result) {
                
            }
        });
}

function login(username, password){
    $.ajax({
            type: 'POST',
            url: 'login.php',
            data: "username="+username+"&password="+password,
            //contentType: 'application/json; chartset:utf-8',
            cache: false,
            success: function (result) {
                if(result == 1)
                {
                    $('.error').css('display', 'none');
                    $('.valid').css('display', 'block');
                    window.location = "dashboard.html";
                }
                else
                {
                    $('.error').css('display', 'block'); // show error msg
                    $(".form").removeClass("flipInX").addClass("shake");
                    $("input").addClass("error");
                }
            }
    });
    return valido;
}

function mostrar_reporte(){
    window.open('report.html','','width=850,height=600,left=50,top=50,toolbar=no');
}