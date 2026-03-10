import * as React from 'react';
import {Character} from '../types';
import CharacterItems from './CharacterItems';

interface Props {
  characters: {[name: string]: Character};
  toggleSentItems: (character: string) => void;
}

const Characters: React.FC<Props> = ({characters, toggleSentItems}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.keys(characters).map((name) => (
        <CharacterItems
          key={name}
          name={name}
          character={characters[name]}
          toggleSentItems={toggleSentItems}
        />
      ))}
    </div>
  );
};

(Characters as any).whyDidYouRender = true;

export default Characters;
