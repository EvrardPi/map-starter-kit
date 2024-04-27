/// <reference types="@workadventure/iframe-api-typings" />

import { ColorCodes, ColorTiles } from "./colorCodes";
console.log('Script started successfully');

const colorSelector = document.getElementById('optionSelector') as HTMLDivElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Color Selector ready');

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

        colorBox.addEventListener("click", async () => {
            if(WA.player.state.canPlaceTile){
                WA.player.state.tileColor = ColorTiles[color];
                console.log('Tile color selected: ', ColorTiles[color]);
            }
        });        

        // Append the color box to the colorSelector div
        if (WA.player.state.canPlaceTile){
            colorSelector.appendChild(colorBox);
            colorSelector.appendChild(boxLabel);
        } 
    }

}).catch(e => console.error(e));

export {};