$.ajax({
    method: "GET",
    url: "https://mindicador.cl/api",
    dataType: "json"
}).done(function (response) {

    console.log(response);

    let { euro, dolar, bitcoin } = response;

    console.log(bitcoin);



}).fail(function() {
    alert("Error en consulta.");
})
