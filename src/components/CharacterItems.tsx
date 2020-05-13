import {Box, Checkbox, Flex, Heading, SimpleGrid, Text} from '@chakra-ui/core';
import styled from '@emotion/styled';
import * as React from 'react';
import {memo} from 'react';
import {itemNames} from '../const';
import {repSum} from '../lib';
import {Character} from '../types';
import IconName from './IconName';

interface Props {
  name: string;
  character: Character;
  toggleSentItems: (character: string) => void;
}

const Item = styled(IconName)`
  text-transform: capitalize;
`;

const Container = styled(Box)`
  cursor: pointer;
`;

const CharacterItems: React.FC<Props> = ({name, character, toggleSentItems}) => {
  return (
    <Container bg="gray.300" onClick={() => toggleSentItems(name)}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>{name}</Heading>
        <Text>Total rep: {repSum(character.items)}</Text>
        <Box>
          <Checkbox
            size="lg"
            variantColor="green"
            isChecked={character.sent}
            isReadOnly={true}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => e.preventDefault()}
          >
            Sent
          </Checkbox>
        </Box>
      </Flex>
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
    </Container>
  );
};

(CharacterItems as any).whyDidYouRender = true;

export default memo(CharacterItems);
