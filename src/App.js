import React, { useState, useEffect } from 'react';
import './style/App.css';
// import monsters from './data/monsters';
import Actions from './component/Actions/Actions';
import { MonsterPage } from './component/MonsterPage/MonsterPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="App-header flexCenter">
      <h1>Mage Knight Monsters</h1>
    </header>
  );
}

///////////////////////////////

//https://www.robinwieruch.de/react-fetching-data
//https://www.robinwieruch.de/react-hooks-fetch-data

//////////////////////////////

function MonsterStore(props) {
  const monsterData = props.monsters;
  return (
    <div className="App-monsters">
      {monsterData
        ? Object.entries(monsterData).map(([monsterName, monsterData]) => (
            <MonsterTuile key={monsterData.slug} monster={monsterData} />
          ))
        : null}
    </div>
  );
}

function MonsterTuile(props) {
  if (props.monster) {
    const { img, name, description, slug } = props.monster;
    return (
      <Link to={slug}>
        <div className="monsterTuile flexCenter spaceStart">
          <img src={img} alt={name} />
          <div>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div className="monsterTuile flexCenter spaceStart">
        <h2>Not Found</h2>
      </div>
    );
  }
}

function Home() {
  const [monsterData, setMonsterData] = useState({});

  useEffect(() => {
    async function getAllMonsters() {
      let response = await fetch('/allMonsters');
      if (response.ok) {
        let responseJSON = await response.json();
        console.log('treatin responseJSON');
        console.log(responseJSON);
        setMonsterData(responseJSON);
      } else {
        console.error('error fetching monster data');
      }
    }
    getAllMonsters();
  }, []);

  return (
    <div className="App">
      <Header />
      <MonsterStore monsters={monsterData} />
      <Actions status="home" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="App flexCenter">
      <h1>Not Found</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home status="home" />}></Route>
        <Route exact path=":monster" element={<MonsterPage status="read" />}></Route>
        <Route path=":monster/edit" element={<MonsterPage status="edit" />} />
        {/* <Route path=":monster/hook" element={<MonsterPageHook />} /> */}
        <Route path="/new" element={<MonsterPage status="new" />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
