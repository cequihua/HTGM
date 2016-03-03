    $.ajax({
        type: 'POST',
        url: 'reporte.php',
        contentType: 'application/json; chartset:utf-8',
        dataType: 'json',
        success: function (result) {
            caua = parseFloat(result.data['caudala']);
            caub = parseFloat(result.data['caudalb']);
            cauc = parseFloat(result.data['caudalc']);
            caud = parseFloat(result.data['caudald']);
            caue = parseFloat(result.data['caudale']);

            preca = parseFloat(result.data['preciona']);
            precb = parseFloat(result.data['precionb']);
            precc = parseFloat(result.data['precionc']);
            precd = parseFloat(result.data['preciond']);
            prece = parseFloat(result.data['precione']);

            $('#caua').text(caua);
            $('#caub').text(caub);
            $('#cauc').text(cauc);
            $('#caud').text(caud);
            $('#caue').text(caue);

            $('#preca').text(preca);
            $('#precb').text(precb);
            $('#precc').text(precc);
            $('#precd').text(precb);
            $('#prece').text(prece);
        },
        failure: function (result) {

        },
        error: function (result) {

        }
    });