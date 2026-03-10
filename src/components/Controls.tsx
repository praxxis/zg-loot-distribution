import * as React from 'react';
import {memo} from 'react';
import {itemNames} from '../const';
import {ItemNames, Items} from '../types';
import {Textarea} from './ui/textarea';
import ItemInput from './ItemInput';

interface Props {
  items: Items;
  updateItem: (item: ItemNames, count: number) => void;
  updateCharacters: (characters: string[]) => void;
}

const Controls: React.FC<Props> = ({items, updateItem, updateCharacters}) => {
  return (
    <div className="flex">
      <div className="p-5">
        <Textarea
          className="h-[400px]"
          placeholder="Enter character names, one per line"
          onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const characters = e.target.value.split('\n').filter((c) => !!c);
            updateCharacters(characters);
          }}
        />
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <ItemInput
              name={'bijou'}
              value={items['bijou']}
              onCountChange={(count) => updateItem('bijou', count)}
            />
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          {itemNames
            .filter((itemName) => itemName !== 'bijou')
            .map((itemName) => (
              <div key={itemName}>
                <ItemInput
                  name={itemName}
                  value={items[itemName]}
                  onCountChange={(count) => updateItem(itemName, count)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

(Controls as any).whyDidYouRender = true;

export default memo(Controls);
