import React from 'react';
import useStore, { itemNames } from './store';
import ItemInput from './components/ItemInput';
import {CSSReset, ThemeProvider, Flex, Heading, Textarea, SimpleGrid, Box} from '@chakra-ui/core';
import { repSum } from './lib';

function App() {
  const [{ characters, items }, { updateCharacters, updateItem}] = useStore();

  return <>
    <ThemeProvider>
      <CSSReset />
      <Flex direction="column" p={5}>
        <Heading>Zul'Gurub bijou and coin distribution tool</Heading>
        <Flex direction="column">
          <Flex>
            <Box p={5}>
              <Textarea
                height={400}
                placeholder="Enter character names, one per line"
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => updateCharacters(e.target.value.split("\n"))}>
              </Textarea>
            </Box>
            <Box p={5}>
              <ItemInput name={'bijou'} value={items['bijou']} onBlur={(count) => updateItem('bijou', count)} />
              <SimpleGrid columns={3} spacing={2}>
                {itemNames.filter((itemName) => itemName !== 'bijou').map((itemName) => <div key={itemName}><ItemInput name={itemName} value={items[itemName]} onBlur={(count) => updateItem(itemName, count)} /></div>)}
              </SimpleGrid>
            </Box>
          </Flex>

          <SimpleGrid columns={3} spacing={2}>
            {Object.keys(characters).map((name) => (
              <Box key={name} bg="gray.200">
                {name} (total rep: {repSum(characters[name].items)})<br />
                <div key={`${name}bijou`}>bijou: {characters[name].items['bijou']}</div>
                <SimpleGrid columns={3} spacing={2}>
                  {itemNames.filter((itemName) => itemName !== 'bijou').map((itemName) => (
                    <div key={`${name}${itemName}`}>{itemName}: {characters[name].items[itemName]}</div>
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </ThemeProvider>
  </>;
}

export default App;
