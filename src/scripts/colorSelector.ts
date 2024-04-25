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

        // Add click event listener to emit the selected color
        colorBox.addEventListener("click", async () => {
            // ici rajouter sur la map l'objet tileColor pour stocker 
            WA.player.state.isTilePlaced = false;
            WA.player.state.tileColor = ColorTiles[color];
            console.log(WA.player.state.tileColor);
            const allIframes = await WA.ui.website.getAll();
            const colorsMenuIframe = allIframes.find(iframe => iframe.url === './src/html/colors.html')
            if(colorsMenuIframe){
                colorsMenuIframe.close();
            }
        });

        // Append the color box to the colorSelector div
        colorSelector.appendChild(colorBox);
        colorSelector.appendChild(boxLabel);
    }

    
}).catch(e => console.error(e));

export {};