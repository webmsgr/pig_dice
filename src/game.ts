import { Dice } from "./dice";
import { Player } from "./player"
import { wait } from "./util";


const player_card_template = document.querySelector('#player-card') as HTMLTemplateElement;
const cards_element = document.getElementById('cards') as HTMLElement;
const dice_element = document.getElementById('dice') as HTMLElement;
const turn_score_element = document.getElementById('turn_score') as HTMLElement;
export class Game {
    #players: Player[]
    #playerScores: number[]
    #current_player: number
    dice_sound: HTMLAudioElement | null = null;
    constructor() {
        this.#players = []
        this.#playerScores = []
        this.#current_player = 0
    }
    #switchActivePlayer(new_active: number) {
        document.querySelector(".card-active")?.classList.remove('card-active');
        document.getElementById(`player-card-${new_active}`)!.firstElementChild!.classList.add('card-active');
        this.#current_player = new_active;
    }
    #rebuildCards() {
        cards_element.innerHTML = "";
        this.#players.forEach((player, i) => {
            const card = this.#createElementForPlayer(player, i);
            cards_element.appendChild(card);
        })
    }
    #createElementForPlayer(player: Player, id: number) {
        const card = player_card_template.content.cloneNode(true) as HTMLElement;
        card.querySelector('.player-name')!.textContent = player.name;
        card.querySelector('.player-type')!.textContent = player.type;
        
        const outer_temp = document.createElement("div");
        outer_temp.id = `player-card-${id}`;
        outer_temp.appendChild(card);
        outer_temp.querySelector('button')!.onclick = () => {
            let index = this.#players.indexOf(player);
            this.#players.splice(index, 1);
            this.#playerScores.splice(index, 1);
            cards_element.removeChild(document.getElementById(`player-card-${id}`)!);
            this.#rebuildCards();
        }
        return outer_temp;
    }
    add_player(player: Player) {
        this.#players.push(player)
        this.#playerScores.push(0)
        this.#rebuildCards();
    }
    async play(): Promise<string> {
        if (this.#players.length < 2) {
            throw new Error("Not enough players to play the game!")
        }
        document.body.classList.add('playing')
        // reset the game
        this.#playerScores = this.#playerScores.map(() => 0)
        this.#current_player = 0
        this.#switchActivePlayer(0);
        const dice = new Dice();
        while (true) {
            const current_player = this.#players[this.#current_player];
            let turn_score = 0;
            do {
                // roll it
                // do a cool animation
                dice_element.classList.add('dice-rolling');
                const diceAnim = setInterval(() => {
                    
                    //console.log(since_last_roll);
                    let last_roll = dice_element.textContent;
                    let roll;
                    do {
                        roll = Math.floor(Math.random() * 6) + 1;
                    } while(roll.toString() == last_roll);
                    dice_element.textContent = roll.toString();
                  }, 50)
                if (this.dice_sound) {
                    this.dice_sound.fastSeek(0);
                    this.dice_sound.play();
                }
                await wait(1000);
                clearInterval(diceAnim);
                dice_element.classList.remove('dice-rolling');
                const roll = dice.roll(1, 6);
                dice_element.textContent = roll.toString();
                if (roll == 1) {
                    turn_score = 0;
                    dice_element.classList.add('dice-one');
                    await wait(3000);
                    dice_element.classList.remove('dice-one');
                    break;
                } else {
                    turn_score += roll;
                }
                // update turn score
                turn_score_element.textContent = turn_score.toString();
                
                await wait(1000); // always wait for a second before the ai/player can do things
                
            } while (await current_player.doTurn(turn_score, this.#playerScores[this.#current_player], dice))
            turn_score_element.textContent = "0";
            // update score
            this.#playerScores[this.#current_player] += turn_score;
            // update score on the card
            cards_element.querySelector(`#player-card-${this.#current_player} .player-score`)!.textContent = this.#playerScores[this.#current_player].toString();
            // check if the player has won
            if (this.#playerScores[this.#current_player] >= 100) {
                document.body.classList.remove('playing')
                document.querySelector(".card-active")?.classList.remove('card-active');
                return this.#players[this.#current_player].name; // wimnner!
            }
            // ensure we cant "peek" the next player
            for (let i = 0; i < dice.roll(10, 100); i++) {
                dice.roll(1, 6);
            }
            // switch to the next player
            this.#switchActivePlayer((this.#current_player + 1) % this.#players.length);
        }
    }
}