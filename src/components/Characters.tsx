import {SimpleGrid} from '@chakra-ui/core';
import * as React from 'react';
import {Character} from '../types';
import CharacterItems from './CharacterItems';

interface Props {
  characters: {[name: string]: Character};
  toggleSentItems: (character: string) => void;
}

const Characters: React.FC<Props> = ({characters, toggleSentItems}) => {
  return (
    <SimpleGrid columns={3} spacing={2}>
      {Object.keys(characters).map((name) => (
        <CharacterItems
          key={name}
          name={name}
          character={characters[name]}
          toggleSentItems={toggleSentItems}
        />
      ))}
    </SimpleGrid>
  );
};

(Characters as any).whyDidYouRender = true;

export default Characters;
