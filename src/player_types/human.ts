// todo

import { Dice } from "../dice";
import { Player } from "../player";

const roll_btn = document.getElementById("roll")! as HTMLButtonElement;
const hold_btn = document.getElementById("hold")! as HTMLButtonElement;

export class Human implements Player {
    name: string;
    type: string = "Human";
    description: string = "A human player";
    constructor(name: string) {
        this.name = name;
    }
    doTurn(_turnScore: number, _score: number, _dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            roll_btn.disabled = false;
            hold_btn.disabled = false;
            roll_btn.onclick = () => {
                roll_btn.disabled = true;
                hold_btn.disabled = true;
                resolve(true);
            }
            hold_btn.onclick = () => {
                roll_btn.disabled = true;
                hold_btn.disabled = true;
                resolve(false);
            }
        });
    }
}