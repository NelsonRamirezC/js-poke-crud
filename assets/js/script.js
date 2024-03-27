$(function () {

    let currentPokemon;

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

            // console.log(response.stats);

            let pokemon = {
                id: response.id,
                name: response.name,
                image: response.sprites.front_default,
                expBase: response.base_experience ?? 0,
                types: response.types.map(element => {
                    return element.type.name;
                }),
                stats: response.stats.map(element => {
                    let stat = {
                        name: element.stat.name,
                        value: element.base_stat
                    }
                    return stat;
                })
            };

            // console.log(pokemon);

            currentPokemon = pokemon;
            loadCardPokemon(pokemon);

        }).fail(function() {
            alert("Error al procesar el pokémon, verifique el índice de pokémones de la guía oficial.");
        })
    };


    function loadCardPokemon(pokemon){

        $("#cardPokemon-id").text(pokemon.id);
        $("#cardPokemon-name").text(pokemon.name);
        $("#cardPokemon-image").attr("src", pokemon.image);
        $("#cardPokemon-expBase").text(pokemon.expBase);

        //recorrer types
        let listItemTypes = "";
        for (const type of pokemon.types) {
            listItemTypes += `<li>${type}</li>`
        };

        $("#cardPokemon-typesList").html(listItemTypes);
        

    
        //recorrer stats
        // let listStats = "";
        // for (const stat of pokemon.stats) {
        //     listStats  += `<li>${stat.name}: ${stat.value}</li>`
        // };
        //$("#cardPokemon-statsList").html(listStats);

        let hp = pokemon.stats[0].value;
        $("#cardPokemon-stats-hp").text(`hp ${hp}`);

        let attack = pokemon.stats[1].value;
        $("#cardPokemon-stats-attack").text(`Attack ${attack}`);

        let defense = pokemon.stats[2].value;
        $("#cardPokemon-stats-defense").text(`Defense ${defense}`);

        let spAttack= pokemon.stats[3].value;
        $("#cardPokemon-stats-special-attack").text(`Sp Attack ${spAttack}`);



        $("#btnGrafico").attr("disabled", false);
    };


    //CAPTURAR EVENTO CLICK DEL BOTÓN PARA VER GRÁFICO

    $("#btnGrafico").on("click", function(event){
        
        loadPokeGraph(currentPokemon);
    });

    function loadPokeGraph(pokemon) {

        let totalStats = 0;
        for (const stat of pokemon.stats) {
            totalStats+= stat.value
        };

        console.log(totalStats);

        let dataPointsPokemon = pokemon.stats.map(stat => {
            return {
                label: `${stat.name} (${stat.value})`, 
                y: ((stat.value/totalStats)*100).toFixed(3)
            } 
        });

        console.log(dataPointsPokemon);

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Stats del pokémon: " + pokemon.name
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPointsPokemon
            }]
        });
        
        $('#graphModal').on('shown.bs.modal', function () {
            chart.render();
        });
        
    }

});






