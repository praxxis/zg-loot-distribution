import {CSSReset, Flex, Heading, ThemeProvider} from '@chakra-ui/core';
import React from 'react';
import Characters from './components/Characters';
import Controls from './components/Controls';
import useStore from './store';

function App() {
  const [{characters, items}, {updateCharacters, updateItem}] = useStore();

  return (
    <>
      <ThemeProvider>
        <CSSReset />
        <Flex direction="column" p={5}>
          <Heading>Zul'Gurub bijou and coin distribution tool</Heading>
          <Flex direction="column">
            <Controls items={items} updateCharacters={updateCharacters} updateItem={updateItem} />
            <Characters characters={characters} />
          </Flex>
        </Flex>
      </ThemeProvider>
    </>
  );
}

(App as any).whyDidYouRender = true;

export default App;
