import {coinSets} from '../const';
import {Character, Items} from '../types';

export const times = (count: number, cb: (i: number) => void) =>
  [...Array(count)].forEach((_, i) => cb(i));

export const repSum = (items: {[k in Items]: number}) =>
  items.bijou * 75 +
  coinSets.reduce(
    (rep, coins) => rep + Math.min(items[coins[0]], items[coins[1]], items[coins[2]]) * 25,
    0
  );

export const nonRepSum = (items: {[k in Items]: number}) => {
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
};

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
};
