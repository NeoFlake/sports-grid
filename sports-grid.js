let sportsDisponible = ["Football", "Basketball", "Rugby", "Hockey", "Volley", "Cyclisme", 'Judo', "Boxe", "Tennis", "Natation"];
let sportsPreferes = [];

const disponibleSelection = document.getElementById("disponible");
const preferesSelection = document.getElementById("preferes");

const oneLeftButton = document.getElementById("deplacer-solo-left");
const oneRightButton = document.getElementById("deplacer-solo-right");
const multiLeftButton = document.getElementById("deplacer-multi-left");
const multiRightButton = document.getElementById("deplacer-multi-right");
const allLeftButton = document.getElementById("deplacer-all-left");
const allRightButton = document.getElementById("deplacer-all-right");

const listeBoutons = [oneLeftButton, oneRightButton, multiLeftButton, multiRightButton, allLeftButton, allRightButton];

const listesSelection = [disponibleSelection, preferesSelection];

createListeOfOptions(sportsDisponible, disponibleSelection);
createListeOfOptions(sportsPreferes, preferesSelection);
toggleButtons(true, true, true, true, true, false);

listesSelection.forEach(liste => {
    liste.addEventListener("change", () => {
        let disponibleSelectionnee = disponibleSelection.selectedOptions.length;
        let prefereeSelectionnee = preferesSelection.selectedOptions.length;
        // Si aucun choix n'est sélectionné
        if (disponibleSelectionnee === 0 && prefereeSelectionnee === 0) {
            if (sportsDisponible.length === 0) {
                toggleButtons(true, true, true, true, false, true);
            } else if (sportsPreferes.length === 0) {
                toggleButtons(true, true, true, true, true, false);
            } else {
                toggleButtons(true, true, true, true, false, false);
            }
        }
        // Si un choix est sélectionné
        if (disponibleSelectionnee === 1 && prefereeSelectionnee === 0) {
            toggleButtons(true, false, true, true, true, true);
        }

        if (disponibleSelectionnee === 0 && prefereeSelectionnee === 1) {
            toggleButtons(false, true, true, true, true, true);
        }

        // Si plusieurs choix sont sélectionnés

        if (disponibleSelectionnee > 1 && prefereeSelectionnee === 0) {
            toggleButtons(true, true, true, false, true, true);
        }

        if (disponibleSelectionnee === 0 && prefereeSelectionnee > 1) {
            toggleButtons(true, true, false, true, true, true);
        }

        // Si les deux listes sont préselectionnées, alors on ne peut pas effectuer d'opération
        if (disponibleSelectionnee > 0 && prefereeSelectionnee > 0) {
            toggleButtons(true, true, true, true, true, true);
        }
    });
});



function createOption(value) {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    return option;
}

function toggleDisabledButton(button, statut) {
    button.disabled = statut;
}

function createListeOfOptions(options, select) {
    if (options.length > 0) {
        options.forEach(option => {
            select.appendChild(createOption(option));
        });
    }
}

function clearOptions(select) {
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
}

function deplacerTout(direction) {
    if (direction === "left") {
        fullfillListe(sportsPreferes, sportsDisponible);
        toggleButtons(true, true, true, true, true, false);
    } else {
        fullfillListe(sportsDisponible, sportsPreferes);
        toggleButtons(true, true, true, true, false, true);
    }
    refreshListes();
}

function fullfillListe(sourceListe, destinationList) {
    destinationList.push(...sourceListe);
    sourceListe.splice(0, sourceListe.length);
}

function deplacerElement(direction) {
    toggleButtons(true, true, true, true, false, false);
    if (direction === "left") {
        modifyListe(preferesSelection, sportsPreferes, sportsDisponible);
        if (sportsPreferes.length === 0) {
            toggleButtons(true, true, true, true, false, true);
        }
    } else {
        modifyListe(disponibleSelection, sportsDisponible, sportsPreferes);
        if (sportsDisponible === 0) {
            toggleButtons(true, true, true, true, true, false);
        }
    }
    refreshListes();
}

function modifyListe(select, sourceListe, destinationList) {
    for (const option of select.options) {
        if (option.selected) {
            sourceListe.splice(sourceListe.findIndex(element => element === option.value), 1);
            destinationList.push(option.value);
        }
    }
}

function refreshListes() {
    clearOptions(disponibleSelection);
    clearOptions(preferesSelection);
    createListeOfOptions(sportsDisponible, disponibleSelection);
    createListeOfOptions(sportsPreferes, preferesSelection);
}

function toggleButtons(...activated) {
    for (let i = 0; i < activated.length; ++i) {
        toggleDisabledButton(listeBoutons[i], activated[i]);
    }
}