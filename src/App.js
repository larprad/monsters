import React, { useState, useEffect } from 'react';
import './style/App.css';
// import monsters from './data/monsters';
import { Actions } from './component/Actions/Actions';
import manipulate from './data/manipulate';
import { MonsterPage } from './component/MonsterPage/MonsterPage';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Header() {
  return (
    <header className="App-header flexCenter">
      <h1>Monsters</h1>
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
            <MonsterTuile
              key={monsterData.slug}
              monster={monsterData}
              setHaveUpdated={props.setHaveUpdated}
            />
          ))
        : null}
    </div>
  );
}

function MonsterTuile(props) {
  const navigate = useNavigate();
  const placeholder =
    'data:image/jpeg;base64,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';
  if (props.monster) {
    const { image, name, description, slug } = props.monster;
    // async function deleteMonster() {
    //   await manipulate.deleteMonsterServer(slug);
    //   props.setHaveUpdated(true);
    // }
    function redirect() {
      navigate(`/${slug}`);
    }
    function editMonster() {
      navigate(`/${slug}/edit`);
    }
    return (
      <div className="monsterTuile flexCenter spaceStart">
        <div className="imgTileContainer">
          <img onClick={redirect} src={image || placeholder} alt={name} />
        </div>
        <div className="tuileText">
          <h3 onClick={redirect}>{name}</h3>
          <p onClick={redirect}>{description}</p>
          <div className="tuileSideContainer flexCenter spaceBetween">
            {/* <img src='/icons/delete.svg' onClick={deleteMonster} alt='delete' /> */}
            <img src="/icons/create.svg" onClick={editMonster} alt="edit" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="monsterTuile flexCenter spaceStart">
        <h2>Not Found</h2>
      </div>
    );
  }
}

function FilterPanel(props) {
  function handleSliderChange(e) {
    props.setMonsterNumber(e.target.value);
  }

  function handleRadioChange(e) {
    props.setMonsterOrder(e.target.value);
  }

  function handleCrossClick() {
    props.setFilterPanelDisplay(false);
  }

  return (
    <div className="filterPanel flexCenter column spaceEvenly">
      <svg
        className="closeCross"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        onClick={handleCrossClick}
      >
        <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"></path>
      </svg>
      <h2>filter & Order</h2>
      <div>
        <h3>
          Monsters displayed: <span className="filterNumber">{props.monsterNumber}</span> /{' '}
          {props.monsterCount}
        </h3>
      </div>
      <div className="slidecontainer flexCenter spaceEvenly">
        <input
          type="range"
          min="1"
          max={props.monsterCount}
          defaultValue={props.monsterNumber}
          className="slider"
          id="myRange"
          onMouseUp={handleSliderChange}
          onTouchEnd={handleSliderChange}
        />
      </div>
      <div>
        <label htmlFor="order">Order by last created</label>
        <input
          type="radio"
          id="order"
          name="order"
          value="lastcreated"
          onChange={handleRadioChange}
          checked={props.monsterOrder === 'lastcreated' ? true : false}
        />
      </div>
      <div>
        <label htmlFor="order">Order by first created</label>
        <input
          type="radio"
          id="order"
          name="order"
          value="firstcreated"
          onChange={handleRadioChange}
          checked={props.monsterOrder === 'firstcreated' ? true : false}
        />
      </div>
    </div>
  );
}

function Home() {
  const [monsterData, setMonsterData] = useState({});
  const [haveUpdated, setHaveUpdated] = useState(false);
  const [filterPanelDisplay, setFilterPanelDisplay] = useState(false);
  const [monsterNumber, setMonsterNumber] = useState(5);

  const [monsterOrder, setMonsterOrder] = useState('firstcreated');
  const [monsterCount, setMonsterCount] = useState(0);

  function toggleFilerPanel() {
    setFilterPanelDisplay(!filterPanelDisplay);
  }

  useEffect(() => {
    console.log(`have updated: ${haveUpdated}`);
    async function request() {
      const allMonsters = await manipulate.getAllMonsters(monsterNumber, monsterOrder);
      setMonsterData(allMonsters);
    }
    request();
    setHaveUpdated(false);
  }, [haveUpdated, monsterNumber, monsterOrder]);

  useEffect(() => {
    async function getMonsterCount() {
      const count = await fetch('/monstersCount');
      const countResponse = await count.json();
      console.log(countResponse);
      setMonsterCount(countResponse['count (*)']);
    }
    getMonsterCount();
  }, []);

  return (
    <div className="App">
      <Header />
      <MonsterStore monsters={monsterData} setHaveUpdated={setHaveUpdated} />
      {filterPanelDisplay ? (
        <FilterPanel
          setMonsterNumber={setMonsterNumber}
          setMonsterOrder={setMonsterOrder}
          monsterNumber={monsterNumber}
          monsterOrder={monsterOrder}
          monsterCount={monsterCount}
          setFilterPanelDisplay={setFilterPanelDisplay}
        />
      ) : null}
      <Actions status="home" toggleFilerPanel={toggleFilerPanel} />
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
        <Route path="/new" element={<MonsterPage status="new" />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
