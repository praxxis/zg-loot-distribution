import {Box, SimpleGrid} from '@chakra-ui/core';
import * as React from 'react';
import {itemNames} from '../const';
import {repSum} from '../lib';
import {Character} from '../types';

interface Props {
  characters: {[name: string]: Character};
}

const Characters: React.FC<Props> = ({characters}) => {
  return (
    <SimpleGrid columns={3} spacing={2}>
      {Object.keys(characters).map((name) => (
        <Box key={name} bg="gray.200">
          {name} (total rep: {repSum(characters[name].items)})<br />
          <div key={`${name}bijou`}>bijou: {characters[name].items['bijou']}</div>
          <SimpleGrid columns={3} spacing={2}>
            {itemNames
              .filter((itemName) => itemName !== 'bijou')
              .map((itemName) => (
                <div key={`${name}${itemName}`}>
                  {itemName}: {characters[name].items[itemName]}
                </div>
              ))}
          </SimpleGrid>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Characters;
