import {Box, Flex, SimpleGrid, Textarea} from '@chakra-ui/core';
import * as React from 'react';
import {itemNames} from '../const';
import {ItemNames, Items} from '../types';
import ItemInput from './ItemInput';

interface Props {
  items: Items;
  updateItem: (item: ItemNames, count: number) => void;
  updateCharacters: (characters: string[]) => void;
}

const Controls: React.FC<Props> = ({items, updateItem, updateCharacters}) => {
  return (
    <Flex>
      <Box p={5}>
        <Textarea
          height={400}
          placeholder="Enter character names, one per line"
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateCharacters(e.target.value.split('\n'))
          }
        ></Textarea>
      </Box>
      <Box p={5}>
        <SimpleGrid columns={3} spacing={2}>
          <div>
            <ItemInput
              name={'bijou'}
              value={items['bijou']}
              onBlur={(count) => updateItem('bijou', count)}
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
                  onBlur={(count) => updateItem(itemName, count)}
                />
              </div>
            ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default Controls;
