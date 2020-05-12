import {Box, Flex, Heading, SimpleGrid, Text} from '@chakra-ui/core';
import styled from '@emotion/styled';
import * as React from 'react';
import {itemNames} from '../const';
import {repSum} from '../lib';
import {Character} from '../types';
import IconName from './IconName';

interface Props {
  characters: {[name: string]: Character};
}

const Item = styled(IconName)`
  text-transform: capitalize;
`;

const Characters: React.FC<Props> = ({characters}) => {
  return (
    <SimpleGrid columns={3} spacing={2}>
      {Object.keys(characters).map((name) => (
        <Box key={name} bg="gray.200">
          <Heading>{name}</Heading>
          <Text>(total rep: {repSum(characters[name].items)})</Text>
          <SimpleGrid columns={3} spacing={2}>
            <Flex key={`${name}bijou`} justifyContent="space-between">
              <Item name={'bijou'} /> {characters[name].items['bijou']}
            </Flex>
            <div></div>
            <div></div>
            {itemNames
              .filter((itemName) => itemName !== 'bijou')
              .map((itemName) => (
                <Flex key={`${name}${itemName}`} justifyContent="space-between">
                  <Item name={itemName} /> {characters[name].items[itemName]}
                </Flex>
              ))}
          </SimpleGrid>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Characters;
