/// <reference types="@workadventure/iframe-api-typings" />

import { ColorCodes } from "./colorCodes";
console.log('Script started successfully');

const colorSelector = document.getElementById('optionSelector') as HTMLDivElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    for (const colorKey in ColorCodes) {
        const color = colorKey as keyof typeof ColorCodes;

        const colorBox = document.createElement("input");
        const boxLabel = document.createElement("label");

        colorBox.setAttribute("type", "radio");
        colorBox.setAttribute("name", "color");
        colorBox.setAttribute("id", color);
        colorBox.classList.add("checkbox-input");
        
        boxLabel.setAttribute("for", color);
        boxLabel.classList.add("checkbox-label");
        boxLabel.style.backgroundColor = '#' + ColorCodes[color];

        // Add click event listener to emit the selected color
        colorBox.addEventListener("click", () => {
            // ici rajouter sur la map l'objet tileColor pour stocker 
            WA.state.tileColor = ColorCodes[color];
            console.log(WA.state.tileColor);
        });

        // Append the color box to the colorSelector div
        colorSelector.appendChild(colorBox);
        colorSelector.appendChild(boxLabel);

    }
}).catch(e => console.error(e));

export {};