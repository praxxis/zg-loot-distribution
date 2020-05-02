import { useCallback } from 'react';
import {Items, Character} from './types';
import { distributeItem, distributeItems } from './lib';
import {useImmerReducer} from 'use-immer';
import { setAutoFreeze } from 'immer';

// todo: investigate this error
setAutoFreeze(false);

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

const itemNames = [
  'bijou',
  'zulian',
  'razzashi',
  'hakkari',
  'sandfury',
  'skullsplitter',
  'bloodscalp',
  'gurubashi',
  'vilebranch',
  'witherbark',
] as const;

export {itemNames};

const initialCharacters: {[name: string]: Character} = {};

interface State {
  items: typeof initialItems;
  characters: { [name: string]: Character };
}

type Action =
 | {type: 'UPDATE_CHARACTERS', newCharacters: string[]}
 | {type: 'UPDATE_ITEM', itemName: Items, count: number};

const useStore = () => {
  const [state, dispatch] = useImmerReducer((draft: State, action: Action) => {
    switch (action.type) {
      case 'UPDATE_CHARACTERS':
        let characters = action.newCharacters.reduce((accu, name) => {
          return {...accu, [name]: {sent: false, items: {...initialItems}}}
        }, {});

        draft.characters = distributeItems(characters, draft.items);
        break;
      case 'UPDATE_ITEM':
        draft.items[action.itemName] = action.count;
        draft.characters = distributeItems(draft.characters, draft.items);
        break;
    }
  }, {
    items: initialItems,
    characters: initialCharacters,
  });

  const updateCharacters = useCallback((newCharacters: string[]) => dispatch({type: 'UPDATE_CHARACTERS', newCharacters}), [dispatch]);

  const updateItem = useCallback((itemName: Items, count: number) => dispatch({ type: 'UPDATE_ITEM', itemName, count }), [dispatch]);

  return [state, { updateCharacters, updateItem}] as const;
};

export default useStore;
