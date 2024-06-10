import { Dice } from "../dice";
import { Player } from "../player";

const names = ["Jeff", "Bob", "Gary"]
/**
 * A normal bot
 * 
 * 
 */
export class NormalBot implements Player {
    name: string;
    type: string = "Normal CPU";
    description: string = "A normal cpu employing an actual strategy."
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(turnScore: number, score: number, _dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (turnScore + score >= 100) {
                    resolve(false);
                }  else {
                    resolve(turnScore < 20); // 20 is the break even point
                }
            }, Math.floor(Math.random() * 1000));
            
        })
    }
}