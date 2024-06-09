// todo

import { Dice } from "../dice";
import { Player } from "../player";

export class Human implements Player {
    name: string;
    type: string = "Human";
    description: string = "A human player";
    constructor(name: string) {
        this.name = name;
    }
    doTurn(_turnScore: number, _score: number, _dice: Dice): Promise<boolean> {
        return new Promise((_, reject) => {
            reject("todo lol");
        });
    }
}