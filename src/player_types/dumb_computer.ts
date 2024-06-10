import { Dice } from "../dice";
import { Player } from "../player";

const names = ["StupidBot 9000"]
/**
 * Dumb stupid computer who is easy to beat
 */
export class DumbComputerPlayer implements Player {
    name: string;
    type: string = "Easy CPU";
    description: string = "A simple minded computer player."
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(turnScore: number, _score: number, _dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(turnScore < 10); // very stupid
            }, Math.floor(Math.random() * 1000));
            
        })
    }
}