import { Dice } from "../dice";
import { Player } from "../player";

const names = ["Hacker"]
/**
 * An impossible bot
 * 
 * This bot will cheat by seeing into the future, and rerolling any 1s
 */
export class ImpossibleBot implements Player {
    name: string;
    type: string = "Impossible CPU";
    description: string = "A player that cannot lose."
    constructor() {
        this.name = names[Math.floor(Math.random() * names.length)];
    }
    doTurn(turnScore: number, score: number, dice: Dice): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                while (dice.peek(1,6) == 1) {
                    dice.roll(1,6)
                }
                resolve(turnScore + score < 100); 
            }, 10); 
            
        })
    }
}