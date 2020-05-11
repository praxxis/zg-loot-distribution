import produce from 'immer';
import {coinSets, emptyItems} from '../const';
import {Character, ItemNames} from '../types';
import {lowestRepSort, times} from './index';

function distributeItem(
  characters: {[name: string]: Character},
  items: {[k in ItemNames]: number},
  item: ItemNames
) {
  const names = lowestRepSort(characters);

  if (names.length === 0) {
    return [characters, items] as const;
  }

  const distributed: {[name: string]: Character} = produce(characters, (draft) => {
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

function distributeCoinSets(
  characters: {[name: string]: Character},
  items: {[k in ItemNames]: number}
) {
  const remainingItems = {...items};

  let names = lowestRepSort(characters);

  if (names.length === 0) {
    return [characters, items] as const;
  }

  const distributed: {[name: string]: Character} = produce(characters, (draft) => {
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

function zeroItems(characters: {[name: string]: Character}) {
  return produce(characters, (draft) => {
    Object.keys(characters).forEach((name) => (draft[name].items = {...emptyItems}));
  });
}

function distributeItems(
  characters: {[name: string]: Character},
  items: {[k in ItemNames]: number}
) {
  // distribute items so that rep is evenly spread across the raid, even if some characters get more individual items
  // remember: bijou = 75 rep, coin set = 25 rep

  let distributed = zeroItems(characters);
  let remainingItems = {...items};

  // first, distribute bijous (75 rep) to as many people as possible
  [distributed, remainingItems] = distributeItem(distributed, items, 'bijou');

  // second, distribute coins in their quest triplets (25 rep) while keeping total rep per person as balanced as posible
  [distributed, remainingItems] = distributeCoinSets(distributed, remainingItems);

  // finally, distribute leftover coins, favoring people who have the least rep
  [distributed] = Object.keys(remainingItems)
    .filter((item) => remainingItems[item as ItemNames] > 0)
    .reduce(
      (accu, item) => {
        const [distributed, remainingItems] = distributeItem(accu[0], accu[1], item as ItemNames);
        return [distributed, remainingItems] as const;
      },
      [distributed, remainingItems] as const
    );

  return distributed;
}

export {distributeItem, distributeItems, distributeCoinSets};
