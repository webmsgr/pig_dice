import { Dice } from "../dice";
import { Player } from "../player";

const names = ["Bob"]
/**
 * A bot that cant win.
 * 
 * The opposite of the very cheating bot, this bot will always roll a one.
 */
export class ExtremeLosingBot implements Player {
    name: string;
    type: string = "Very Easy CPU";
    description: string = "A computer that will always lose, no matter what."
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(_turnScore: number, _score: number, dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            // wait for a random amount of time between 1-5 seconds
            setTimeout(() => {
                while (dice.peek(1,6) != 1) {
                    dice.roll(1, 6);
                }
                resolve(true); 
            }, Math.floor(Math.random() * 4000) + 1000); // he needs to think very hard
            
        })
    }
}