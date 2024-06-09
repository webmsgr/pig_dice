

function next(input: number): number {
    return Math.floor(Math.random() * 1024*1024) ^ input;
}

/**
 * Dice
 * Purely exists to allow the cheating CPU to cheat.
 */
export class Dice {
    #value: number
    constructor(seed: number | undefined = undefined) {
        if (seed === undefined) {
            seed = next(Math.floor(Math.random() * 1024*1024))
        }
        this.#value = seed
    }
    /**
     * Rolls a random number between min and max
     * @param min minimum value
     * @param max maximum value
     * @returns a random number between min and max 
     */
    roll(min: number, max: number) {
        let out = (this.#value % (max - min + 1)) + min
        let new_value = 0;
        let tries = 0;
        do {
            new_value = next(this.#value) + next(tries);
            tries++;
        } while((this.#value % (max - min + 1)) + min == (new_value % (max - min + 1)) + min) // make sure if you roll the max-min again you get a different value
        this.#value = new_value;
        return out;
    }
    /**
     * Peeks ahead at the next value that will be rolled
     * (Cheating CPU only)
     * @param min Minimum value
     * @param max Maximum value
     * @returns The next value that will be rolled, (but doesn't actually roll it)
     */
    peek(min: number, max: number) {
        let val = this.#value
        let out = this.roll(min, max);
        this.#value = val; // restore the value so if you call roll you get the same value
        return out;
    }
}


export function test() {
    const dice = new Dice();
    for (let i = 0; i < 1000; i++) {
        let peeked = dice.peek(1, 6);
        let rolled = dice.roll(1, 6);
        if (peeked !== rolled) {
            console.log('peeked', peeked, 'rolled', rolled)
            throw new Error('peeked and rolled are different')
        }
        else if (rolled < 1 || rolled > 6) {
            console.log('rolled', rolled)
            throw new Error('rolled is out of bounds')
        }
    }
    console.log('Dice test passed')
}