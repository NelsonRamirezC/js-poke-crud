$(function () {
    //CAPTURAR FORMULARIO DE SEARCH POKÉMON Y ACTIVAR EVENTO SUBMIT
    $("#searchPokemon").on("submit", function (event) {
        event.preventDefault();
        const regexValidacion = /^[a-záéíóúñ0-9\s.]+$/i;

        // let dataForm = new FormData(this);

        // let idOrName = dataForm.get("pokemon");

        let idOrName = $("#pokemon").val();

        if (regexValidacion.test(idOrName)) {
            //SI ID OR NOMBR ES VÁLIDO
            getPokemon(idOrName);
        } else {
            return alert("El formato de nombre o id no es válido!");
        }
    });

    function getPokemon(idOrName) {
        let urlBase = "https://pokeapi.co/api/v2/pokemon/"+idOrName;
        $.ajax({
            method: "GET",
            url: urlBase,
            dataType: "json"
        }).done(function (response) {
            console.log(response);
        });
    }
});
