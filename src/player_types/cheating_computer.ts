import { Dice } from "../dice";
import { Player } from "../player";

const names = ["xX_haxor_Xx", "Psychic", "Stockfish"]
/**
 * A cheating bot
 * 
 * This bot will cheat by seeing into the future, and only rolling if it will not get a 1
 */
export class CheatingBot implements Player {
    name: string;
    type: string = "Cheating CPU";
    description: string = "A completely legit player that does not cheat at all /s"
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(_turnScore: number, _score: number, dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            // wait for a random amount of time between 1-5 seconds
            setTimeout(() => {
                resolve(dice.peek(1,6) != 1); // he is literally cheating
            }, Math.floor(Math.random() * 1000));
            
        })
    }
}