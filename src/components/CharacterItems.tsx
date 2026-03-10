import * as React from 'react';
import {memo} from 'react';
import {itemNames} from '../const';
import {repSum} from '../lib';
import {Character} from '../types';
import {Checkbox} from './ui/checkbox';
import IconName from './IconName';

interface Props {
  name: string;
  character: Character;
  toggleSentItems: (character: string) => void;
}

const CharacterItems: React.FC<Props> = ({name, character, toggleSentItems}) => {
  return (
    <div className="cursor-pointer" onClick={() => toggleSentItems(name)}>
      <div className="flex bg-gray-300 items-center justify-between p-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <span>Total rep: {repSum(character.items)}</span>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={character.sent}
            onCheckedChange={() => {}}
            onClick={(e: React.MouseEvent) => e.preventDefault()}
          />
          <span className="text-sm">Sent</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2">
        <div className="flex justify-between">
          <IconName name={'bijou'} className="capitalize" /> {character.items['bijou']}
        </div>
        <div></div>
        <div></div>
        {itemNames
          .filter((itemName) => itemName !== 'bijou')
          .map((itemName) => (
            <div key={`${name}${itemName}`} className="flex justify-between">
              <IconName name={itemName} className="capitalize" /> {character.items[itemName]}
            </div>
          ))}
      </div>
    </div>
  );
};

(CharacterItems as any).whyDidYouRender = true;

export default memo(CharacterItems);
