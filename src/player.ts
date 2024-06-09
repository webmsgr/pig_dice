import type { Dice } from './dice';

export interface Player {
    /**
     * The name of the player
     */
    name: string;
    /**
     * The type of the player, should be a constant string for all instances of the subclass
     */
    type: string;
    /**
     * Type description of the player, should be a constant string for all instances of the subclass
     */
    description: string;

    /**
     * Do a turn
     * @param turnScore the current turn score
     * @param score the current score
     * @param dice the dice object (no cheating!!!)
     * @returns true if the player wants to keep rolling, false if they want to stop
     */
    doTurn(turnScore: number, score: number, dice: Dice): Promise<boolean>;
}