// Make every button and input inside class "Disabler" disabled

// Find all elements with class Disabler
let disabler = document.getElementsByClassName("Disabler");

// Loop through all elements with class Disabler and for each find all buttons and inputs inside it
for (let i = 0; i < disabler.length; i++) {
    let buttons = disabler[i].getElementsByTagName("button");
    let inputs = disabler[i].getElementsByTagName("input");

    // Loop through all buttons and set disabled attribute to true
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].disabled = true;
    }

    // Loop through all inputs and set disabled attribute to true
    for (let j = 0; j < inputs.length; j++) {
        inputs[j].disabled = true;
    }
}

