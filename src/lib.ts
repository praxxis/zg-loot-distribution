import { Character, Items } from './types';

function distributeItem(characters: {[name: string]: Character}, item: Items, count: number) {

  const names = Object.keys(characters);

  // create a copy of the character list with this item zeroed out
  const zeroedCharacters: { [name: string]: Character } = names.reduce((accu, name) => {
    return {...accu, [name]: {...characters[name], items: { ...characters[name].items, [item]: 0 }}}
  }, {})

  const distributed: { [name: string]: Character } = [...Array(count)].reduce((accu, _, i) => {
    const name = names[i % names.length];
    // if we've already distributed an item to this character, increment the current item count, not the initial count
    const c = accu[name] ? accu[name] : zeroedCharacters[name];

    return { ...accu, [name]: { ...c, items: { ...c.items, [item]:  c.items[item] + 1} } };
  }, {});

  // the number of items to distribute may be less than the character count, so make sure we add back anyone who missed out
  return { ...zeroedCharacters, ...distributed};
}

export {distributeItem};
