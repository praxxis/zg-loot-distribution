import {Box, Flex, Heading, SimpleGrid, Text} from '@chakra-ui/core';
import styled from '@emotion/styled';
import * as React from 'react';
import {itemNames} from '../const';
import {repSum} from '../lib';
import {Character} from '../types';
import IconName from './IconName';

interface Props {
  name: string;
  character: Character;
}

const Item = styled(IconName)`
  text-transform: capitalize;
`;

const CharacterItems: React.FC<Props> = ({name, character}) => {
  return (
    <Box bg="gray.200">
      <Heading>{name}</Heading>
      <Text>(total rep: {repSum(character.items)})</Text>
      <SimpleGrid columns={3} spacing={2}>
        <Flex key={`${name}bijou`} justifyContent="space-between">
          <Item name={'bijou'} /> {character.items['bijou']}
        </Flex>
        <div></div>
        <div></div>
        {itemNames
          .filter((itemName) => itemName !== 'bijou')
          .map((itemName) => (
            <Flex key={`${name}${itemName}`} justifyContent="space-between">
              <Item name={itemName} /> {character.items[itemName]}
            </Flex>
          ))}
      </SimpleGrid>
    </Box>
  );
};

(CharacterItems as any).whyDidYouRender = true;

export default CharacterItems;
