let sportsDisponible = ["Football", "Basketball", "Rugby", "Hockey", "Volley", "Cyclisme", 'Judo', "Boxe", "Tennis", "Natation"];
let sportsPreferes = [];

const disponibleSelection = document.getElementById("disponible");
const preferesSelection = document.getElementById("preferes");

createListeOfOptions(sportsDisponible, disponibleSelection);
createListeOfOptions(sportsPreferes, preferesSelection);

function createOption(value){
    const option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    return option;
}

function createListeOfOptions(options, select){
    options.forEach(option => {
        select.appendChild(createOption(option));
    });
}