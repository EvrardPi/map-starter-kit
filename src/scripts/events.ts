import {ObjectWaitingRoom} from "./objectWaitingRoom";
import {Popup} from "@workadventure/iframe-api-typings";

export function onPlayerSpawn(player: any) {
    console.log("Player spawn1 detected:", player.uuid);
    welcome(player.name)
    console.log("Player spawn2 detected:", player.uuid);
}

function welcome(playerName: String) {
    let welcomePopUp = WA.ui.openPopup(ObjectWaitingRoom.WELCOME_POP_UP, `Welcome : ${playerName} `, []);
    setTimeout(() => closePopup(welcomePopUp), 2000)
}

export function closePopup(popUp: Popup) {
    if (popUp !== undefined) {
        popUp.close();
    }
}