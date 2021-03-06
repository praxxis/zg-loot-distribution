import {setAutoFreeze} from 'immer';
import {useCallback} from 'react';
import {useImmerReducer} from 'use-immer';
import {emptyItems} from './const';
import {distributeItems} from './lib/distribution';
import {Character, ItemNames, Items} from './types';

// todo: investigate this error
setAutoFreeze(false);

const initialCharacters: {[name: string]: Character} = {};

interface State {
  items: Items;
  characters: {[name: string]: Character};
}

type Action =
  | {type: 'UPDATE_CHARACTERS'; newCharacters: string[]}
  | {type: 'UPDATE_ITEM'; itemName: ItemNames; count: number}
  | {type: 'TOGGLE_SENT_ITEMS'; character: string};

const reducer = (draft: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CHARACTERS':
      let characters = action.newCharacters.reduce((accu, name) => {
        return {...accu, [name]: {sent: false, items: {...emptyItems}}};
      }, {});

      draft.characters = distributeItems(characters, draft.items);
      break;
    case 'UPDATE_ITEM':
      draft.items[action.itemName] = action.count;
      draft.characters = distributeItems(draft.characters, draft.items);
      break;
    case 'TOGGLE_SENT_ITEMS':
      draft.characters[action.character].sent = !draft.characters[action.character].sent;
      break;
  }
};

const useStore = () => {
  const [state, dispatch] = useImmerReducer(reducer, {
    items: emptyItems,
    characters: initialCharacters,
  });

  const updateCharacters = useCallback(
    (newCharacters: string[]) => dispatch({type: 'UPDATE_CHARACTERS', newCharacters}),
    [dispatch]
  );

  const updateItem = useCallback(
    (itemName: ItemNames, count: number) => dispatch({type: 'UPDATE_ITEM', itemName, count}),
    [dispatch]
  );

  const toggleSentItems = useCallback(
    (character: string) => dispatch({type: 'TOGGLE_SENT_ITEMS', character}),
    [dispatch]
  );

  return [state, {updateCharacters, updateItem, toggleSentItems}] as const;
};

export default useStore;
