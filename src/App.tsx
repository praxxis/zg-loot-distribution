import React, { useState } from 'react';
import './App.css';
import useStore from './store';

function App() {
  const [{ characters }, { updateCharacters, updateItem}] = useStore();
  const[bijouCount, setBijouCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        Characters: <textarea onBlur={(e) => updateCharacters(e.target.value.split("\n"))}></textarea> <br />
        Bijous: <input type="text" onChange={(e) => setBijouCount(Number(e.target.value))} onBlur={() => updateItem('bijou', bijouCount)} value={bijouCount} /> <br />
        <ul>
          {Object.keys(characters).map((name) => (
            <li key={name}>{name}: {characters[name].items['bijou']}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
