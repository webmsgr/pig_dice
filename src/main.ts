// gaming

import {Dice, test as diceTest} from './dice'
import { Player } from './player';
import { ExtremeLosingBot } from './player_types/always_lose';
import { CheatingBot } from './player_types/cheating_computer';
import { DumbComputerPlayer } from './player_types/dumb_computer';
import { Human } from './player_types/human';
import { ExtremeCheatingBot } from './player_types/very_cheating_computer';


// do a little self check
diceTest();


const players: Player[] = [
  new Human("Test player"),
  new DumbComputerPlayer(),
  new CheatingBot(),
  new ExtremeCheatingBot(),
  new ExtremeLosingBot(),
]

const player_card_template = document.querySelector('#player-card') as HTMLTemplateElement;

const card_holder = document.querySelector('.cards') as HTMLElement;

const cards = players.map((player, i) => {
  const card = player_card_template.content.cloneNode(true) as HTMLElement;
  card.querySelector('.player-name')!.textContent = player.name;
  card.querySelector('.player-type')!.textContent = player.type;
  if (i == 0) {
    card.firstElementChild!.classList.add('card-active');
  }
  const outer_temp = document.createElement("div");
  outer_temp.id = `player-card-${i}`;
  outer_temp.appendChild(card);
  return outer_temp;
});
cards.forEach(card => card_holder.appendChild(card));
let actual_card_elements = cards.map(card => card.firstElementChild! as HTMLElement);
let active_card = 0;
setInterval(() => {
    actual_card_elements[active_card].classList.remove('card-active');
    active_card++;
    if (active_card >= cards.length) active_card = 0;
    actual_card_elements[active_card].classList.add('card-active');
}, 1000)

const dice_ele = document.querySelector('.dice') as HTMLElement;
const dice = new Dice();
setInterval(() => {
  dice_ele.textContent = dice.roll(1, 6).toString();
}, 50)