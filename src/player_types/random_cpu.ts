import { Dice } from "../dice";
import { Player } from "../player";

const names = ["Randy Random"]
/**
 * A random bot
 * 
 * This bot will randomly decide to roll or hold
 */
export class RandomBot implements Player {
    name: string;
    type: string = "Random CPU";
    description: string = "A completely random player"
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(_turnScore: number, _score: number, dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dice.roll(1,2) == 1); 
            }, Math.floor(Math.random() * 1000));
            
        })
    }
}