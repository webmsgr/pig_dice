import { Dice } from "../dice";
import { Player } from "../player";

const names = ["Stockfish"]
/**
 * A very cheating bot
 * 
 * This bot will LITERALLY never lose, it will win on the first turn.
 * 
 * He is very unsportsmanlike
 */
export class ExtremeCheatingBot implements Player {
    name: string;
    type: string = "Very Cheating CPU";
    description: string = "A computer that will always win, no matter what."
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(_turnScore: number, _score: number, dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            // wait for a random amount of time between 1-5 seconds
            setTimeout(() => {
                while (dice.peek(1,6) == 1) {
                    dice.roll(1, 6);
                }
                resolve(true); 
            }, Math.floor(Math.random() * 4000) + 1000); // he needs to think very hard
            
        })
    }
}