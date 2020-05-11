import { Character, Items } from './types';
import {produce} from 'immer';

const emptyItems: { [k in Items]: number } = {
  bijou: 0,
  zulian: 0,
  razzashi: 0,
  hakkari: 0,
  sandfury: 0,
  skullsplitter: 0,
  bloodscalp: 0,
  gurubashi: 0,
  vilebranch: 0,
  witherbark: 0,
};

const coinSets = [
  ['zulian', 'razzashi', 'hakkari'] as const,
  ['sandfury', 'skullsplitter', 'bloodscalp'] as const,
  ['gurubashi', 'vilebranch', 'witherbark'] as const,
];

const times = (count: number, cb: (i: number) => void) => [...Array(count)].forEach((_, i) => cb(i));

export const repSum = (items: { [k in Items]: number}) => (
  (items.bijou * 75)
  + coinSets.reduce((rep, coins) => rep + Math.min(items[coins[0]], items[coins[1]], items[coins[2]]) * 25, 0)
);

export const nonRepSum = (items: { [k in Items]: number }) => {
  const counts = {...items};

  coinSets.forEach((coins) => {
    const min = Math.min(items[coins[0]], items[coins[1]], items[coins[2]]);

    counts[coins[0]] -= min;
    counts[coins[1]] -= min;
    counts[coins[2]] -= min;
  });

  return Object.keys(counts)
    .filter((name) => name !== 'bijou')
    .reduce((accu, name) => accu + counts[name as Items], 0);
}

export const lowestRepSort = (characters: {[name: string]: Character}) => {
  return Object.keys(characters).sort((a, b) => {
    const aRep = repSum(characters[a].items);
    const bRep = repSum(characters[b].items);

    // tie break based on number of *non rep producing items*
    if (aRep === bRep) {
      const aNum = nonRepSum(characters[a].items);
      const bNum = nonRepSum(characters[b].items);

      if (aNum === bNum) {
        return 0;
      }

      return aNum < bNum ? -1 : 1;
    }

    // this is a reverse sort: we want people with rep to go to the end of the list
    return aRep < bRep ? -1 : 1;
  });
}

function distributeItem(characters: { [name: string]: Character }, items: { [k in Items]: number }, item: Items) {
  const names = lowestRepSort(characters);

  if (names.length === 0) {
    return [characters, items] as const;
  }

  const distributed: { [name: string]: Character } = produce(characters, (draft) => {
    // zero out this item for everyone
    // names.forEach((name) => draft[name].items[item] = 0);

    // as long as we have items to distribute, loop through the character list handing them out
    times(items[item], (i) => {
      const name = names[i % names.length];
      draft[name].items[item] += 1;
    });
  });

  return [distributed, {...items, [item]: 0}] as const;
}

function distributeCoinSets(characters: { [name: string]: Character }, items: { [k in Items]: number }) {
  const remainingItems = {...items};

  let names = lowestRepSort(characters);

  if (names.length === 0) {
    return [characters, items] as const;
  }

  const distributed: { [name: string]: Character } = produce(characters, (draft) => {
    coinSets.forEach((coins) => {
      const min = Math.min(items[coins[0]], items[coins[1]], items[coins[2]]);

      times(min, () => {
        const name = names[0];

        draft[name].items[coins[0]] += 1;
        draft[name].items[coins[1]] += 1;
        draft[name].items[coins[2]] += 1;

        names = lowestRepSort(draft);
      });

      remainingItems[coins[0]] -= min;
      remainingItems[coins[1]] -= min;
      remainingItems[coins[2]] -= min;
    });
  });

  return [distributed, remainingItems] as const;
}

function zeroItems(characters: { [name: string]: Character }) {
  return produce(characters, (draft) => {
    Object.keys(characters).forEach((name) => draft[name].items = { ...emptyItems});
  });
}

function distributeItems(characters: { [name: string]: Character }, items: { [k in Items]: number }) {
  // distribute items so that rep is evenly spread across the raid, even if some characters get more individual items
  // remember: bijou = 75 rep, coin set = 25 rep

  let distributed = zeroItems(characters);
  let remainingItems = {...items};

  // first, distribute bijous (75 rep) to as many people as possible
  [distributed, remainingItems] = distributeItem(distributed, items, 'bijou');

  // second, distribute coins in their quest triplets (25 rep) while keeping total rep per person as balanced as posible
  [distributed, remainingItems] = distributeCoinSets(distributed, remainingItems);

  // finally, distribute leftover coins, favoring people who have the least rep
  [distributed] = Object.keys(remainingItems).filter((item) => remainingItems[item as Items] > 0).reduce((accu, item) => {
    const [distributed, remainingItems] = distributeItem(accu[0], accu[1], item as Items)
    return [distributed, remainingItems] as const;
  }, [distributed, remainingItems] as const)

  return distributed;
}

export { distributeItem, distributeItems, distributeCoinSets};
