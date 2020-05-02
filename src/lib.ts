import { Character, Items } from './types';
import {produce} from 'immer';

const times = (count: number) => [...Array(count)];

function distributeItem(characters: {[name: string]: Character}, item: Items, count: number) {

  const names = Object.keys(characters);

  const distributed: { [name: string]: Character } = produce(characters, (draft) => {
    // create a copy of the character list with this item zeroed out
    names.forEach((name) => draft[name].items[item] = 0);

    times(count).forEach((_, i) => {
      const name = names[i % names.length];
      draft[name].items[item] += 1;
    })
  });

  return distributed;
}

export {distributeItem};
