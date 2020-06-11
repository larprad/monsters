import React from 'react';
import './style/App.css';
import monsters from './data/monsters';
// import monsters from './data/monsters';

function Header() {
  return (
    <header className="App-header flexCenter">
      <h1>Mage Knight Monsters</h1>
    </header>
  );
}

function MonsterStore() {
  return (
    <div className="App-monsters">
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
      <MonsterTuile />
    </div>
  );
}

function MonsterTuile() {
  const { img, name, description } = monsters.skeleton;
  return (
    <div className="monsterTuile flexCenter spaceStart">
      <img src={img} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="App-actions flexCenter spaceEvenly">
      <button>Filter</button>
      <button>New</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <MonsterStore />
      <Actions />
    </div>
  );
}

export default App;
