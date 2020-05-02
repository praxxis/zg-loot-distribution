/*
Zulian, Razzashi, and Hakkari Coins: Zulian Coin x1, Razzashi Coin x1, Hakkari Coin x1
Sandfury, Skullsplitter, and Bloodscalp Coins: Sandfury Coin x1, Skullsplitter Coin x1, Bloodscalp Coin x1
Gurubashi, Vilebranch, and Witherbark Coins: Gurubashi Coin x1, Vilebranch Coin x1, Witherbark Coin x1

[['coin1', 'coin2', 'coin3'],
 ['coin1', 'coin2', 'coin3']].forEach((set) => {
     // minBy
 })
 */

import { useReducer, useCallback } from 'react';
import {Items, Character} from './types';
import { distributeItem } from './lib';

const initialItems: {[k in Items]: number} = {
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


const initialCharacters: {[name: string]: Character} = {};

interface State {
  items: typeof initialItems;
  characters: { [name: string]: Character };
}

type Action =
 | {type: 'UPDATE_CHARACTERS', newCharacters: string[]}
 | {type: 'UPDATE_ITEM', itemName: Items, count: number};

const useStore = () => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'UPDATE_CHARACTERS':
        let characters = action.newCharacters.reduce((accu, name) => {
          return {...accu, [name]: {sent: false, items: {...initialItems}}}
        }, {});

        characters = distributeItem(characters, 'bijou', state.items['bijou']);

        return {
          ...state,
          characters
        };
      case 'UPDATE_ITEM':
        return {
          ...state,
          items: { ...state.items, [action.itemName]: action.count },
          characters: distributeItem(state.characters, action.itemName, action.count),
        };
    }
    return state;
  }, {
    items: initialItems,
    characters: initialCharacters,
  });

  const updateCharacters = useCallback((newCharacters: string[]) => dispatch({type: 'UPDATE_CHARACTERS', newCharacters}), []);

  const updateBijou = useCallback((count: number) => dispatch({ type: 'UPDATE_ITEM', itemName: 'bijou', count }), []);

  return [state, { updateCharacters, updateBijou}] as const;
};

export default useStore;
