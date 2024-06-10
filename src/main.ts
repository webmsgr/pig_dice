// gaming

import {Dice, test as diceTest} from './dice'
import { Game } from './game';
import { Player } from './player';
import { CheatingBot } from './player_types/cheating_computer';
import { DumbComputerPlayer } from './player_types/dumb_computer';
import { ImpossibleBot } from './player_types/extreme_cheating_computer';
import { Human } from './player_types/human';
import { NormalBot } from './player_types/normal_cpu';
import { RandomBot } from './player_types/random_cpu';
import { alert } from './util';

// do a little self check
diceTest();

const human_name_box = document.getElementById("player_name") as HTMLInputElement;
const win_modal = document.getElementById("win_modal") as HTMLElement;
const cpu_type_box = document.getElementById("cpu_type") as HTMLSelectElement;

const cpu_types = [DumbComputerPlayer, NormalBot, CheatingBot, ImpossibleBot, RandomBot];

const cpu_mapping: {[key: string]: new () => Player} = {};

cpu_types.forEach((type) => {
  cpu_mapping[type.name] = type;
  const option = document.createElement("option");
  option.value = type.name;
  option.textContent = new type().type;
  cpu_type_box.appendChild(option);
})

const game = new Game();

//game.add_player(new ExtremeCheatingBot());
//await game.play();
document.getElementById("add_human")!.onclick = async () => {
  let name = human_name_box.value;
  if (name == "") {
    await alert("Please enter a name");
    return;
  }
  human_name_box.value = "";
  game.add_player(new Human(name));
}

document.getElementById("add_cpu")!.onclick = async () => {
  let type = cpu_type_box.value;
  if (type == "") {
    await alert("Please select a type");
    return;
  }
  game.add_player(new cpu_mapping[type]());
}

document.getElementById("play")!.onclick = async () => {
  try {
    let winner = await game.play();
    document.getElementById("winner")!.textContent = winner;
    win_modal.classList.add('modal-show');
    await new Promise((resolve) => {
      document.getElementById("restart")!.onclick = () => {
        win_modal.classList.remove('modal-show');
        resolve(void 0);
      }
    });

  } catch (e) {
    await alert(`${e}`);
  }
}
/*
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
let roll_counts = [0, 0, 0, 0, 0, 0,];
let total_rolls = 0;
let since_last_roll = [0, 0, 0, 0, 0, 0];
setInterval(() => {
  since_last_roll.forEach((val, i, arr) => arr[i] = val + 1);
  //console.log(since_last_roll);
  let peeked = dice.peek(1, 6);
  let roll = dice.roll(1, 6);
  if (peeked !== roll) {
    console.log('peeked', peeked, 'rolled', roll)
    throw new Error('peeked and rolled are different')
  }
  roll_counts[roll-1]++;
  since_last_roll[roll-1] = 0;
  total_rolls++;
  let roll_averages = roll_counts.map((val) => val / total_rolls);
  document.querySelector("#roll_count")!.textContent = roll_counts.join(", ");
  document.querySelector("#roll_avg")!.textContent = roll_averages.map(val => val.toFixed(2)).join(", ");
  document.querySelector("#since_last")!.textContent = since_last_roll.join(", ") + " MAX: " + Math.max(...since_last_roll);
  dice_ele.textContent = roll.toString();
}, 50)
*/