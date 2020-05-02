import React from 'react';
import './App.css';
import useStore, { itemNames } from './store';
import ItemInput from './components/ItemInput';

function App() {
  const [{ characters }, { updateCharacters, updateItem}] = useStore();

  return (
    <div className="App">
      <header className="App-header">
        Characters: <textarea onBlur={(e) => updateCharacters(e.target.value.split("\n"))}></textarea> <br />
        {itemNames.map((itemName) => <div key={itemName}><ItemInput name={itemName} onBlur={(count) => updateItem(itemName, count)} /></div>)}
        <ul>
          {Object.keys(characters).map((name) => (
            <li key={name}>{name}: {itemNames.map((itemName) => <div key={itemName}>{itemName}: {characters[name].items[itemName]}</div>)}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
