import React from 'react';
import Characters from './components/Characters';
import Controls from './components/Controls';
import useStore from './store';

function App() {
  const [{characters, items}, {updateCharacters, updateItem, toggleSentItems}] = useStore();

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-4">Zul'Gurub bijou and coin distribution tool</h1>
      <div className="flex flex-col">
        <Controls items={items} updateCharacters={updateCharacters} updateItem={updateItem} />
        <Characters characters={characters} toggleSentItems={toggleSentItems} />
      </div>
    </div>
  );
}

(App as any).whyDidYouRender = true;

export default App;
