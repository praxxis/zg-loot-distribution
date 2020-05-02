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

function distributeCoinSets(characters: { [name: string]: Character }, items: { [k in Exclude<Items, 'bijou'>]: number }) {
  const remainingCoins = {...items};

  const names = Object.keys(characters);

  let currentChar = 0;

  const distributed: { [name: string]: Character } = produce(characters, (draft) => {
    [
      ['zulian', 'razzashi', 'hakkari'] as const,
      ['sandfury', 'skullsplitter', 'bloodscalp'] as const,
      ['gurubashi', 'vilebranch', 'witherbark'] as const,
    ].forEach((coins) => {
      const min = Math.min(items[coins[0]], items[coins[1]], items[coins[2]]);

      names.forEach((name) => {
        draft[name].items[coins[0]] = 0;
        draft[name].items[coins[1]] = 0;
        draft[name].items[coins[2]] = 0;
      });

      times(min).forEach(() => {
        if (currentChar >= names.length) {
          return;
        }

        const name = names[currentChar];
        draft[name].items[coins[0]] += 1;
        draft[name].items[coins[1]] += 1;
        draft[name].items[coins[2]] += 1;

        currentChar++;
      });

      remainingCoins[coins[0]] -= min;
      remainingCoins[coins[1]] -= min;
      remainingCoins[coins[2]] -= min;
    });
  });

  return [distributed, remainingCoins] as const;
}

function distributeItems(characters: { [name: string]: Character }, items: { [k in Items]: number }) {

  // first, distribute coins in their quest triplets, at most one triplet per character, so as many people as possible can complete a turnin
  let [distributed, remainingCoins] = distributeCoinSets(characters, items);

  // second, distribute bijous as evenly as possible
  distributed = distributeItem(distributed, 'bijou', items['bijou']);

  // finally, distribute leftover coins, beginning with the people who have the lowest count of items

  return distributed;
}

export { distributeItem, distributeItems, distributeCoinSets};
