import React, { useState, useEffect } from 'react';
import Actions from '../Actions/Actions';
import './MonsterPage.css';
import { useParams } from 'react-router-dom';
import monsters from '../../data/monsters';
// import manipulate from '../../data/manipulate';

function MonsterImage(props) {
  return (
    <div className="monsterImg">
      <img src={props.img} alt={props.name}></img>
    </div>
  );
}

function MonsterName(props) {
  return <h2 className="monsterTitle flexCenter">{props.name}</h2>;
}

function MonsterDescription(props) {
  return <p className="monsterDescription flexCenter">{props.description}</p>;
}

function MonsterSpecial(props) {
  return (
    <div className="monsterSpecial flexCenter column">
      <ul>
        {props.special.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function MonsterSpecs(props) {
  return (
    <div className="monsterSpecs flexCenter column">
      <ul>
        {Object.entries(props.specs).map(([id, num]) => (
          <li key={id}>{id + ': ' + num}</li>
        ))}
      </ul>
    </div>
  );
}

function MonsterPage(props) {
  const { monster } = useParams();
  const { name, description, img, special, specs } = monsters[monster]
    ? monsters[monster]
    : { name: '', description: '', img: '', special: [], specs: {} };

  // STATES
  ////////////////////////
  const [monsterName, setMonsterName] = useState(name);
  const [monsterDescription, setMonsterDescription] = useState(description);
  const [monsterImage, setMonsterImage] = useState(img);
  const [status, setStatus] = useState(props.status);

  // const [displayPopup, setDisplayPopup] = useState(false);
  // const [redirectPopup, setRedirectPopup] = useState(false);
  // const [textPopup, setTextPopup] = useState('no text');

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  // FUNCTIONS
  ////////////////////////

  // function closePopup() {
  //   setDisplayPopup(false);
  //   setTextPopup('no text');
  // }

  function handleChangeMonsterName(e) {
    const newName = e.target.value;
    setMonsterName(newName);
  }

  function handleChangeMonsterDescription(e) {
    const newDescription = e.target.value;
    setMonsterDescription(newDescription);
  }

  function handleChangeMonsterImage(e) {
    const newImg = e.target.value;
    setMonsterImage(newImg);
  }

  function statusChange(newStatus) {
    setStatus(newStatus);
  }

  function saveMonster() {
    let newMonster = {
      name: monsterName,
      description: monsterDescription,
      slug: monsterName.toLowerCase(),
      special: [],
      specs: {},
      img: monsterImage,
    };
    console.log(newMonster);
    //   const saveResult = manipulate.saveNewMonster(newMonster);
    // setDisplayPopup(true);
    // setTextPopup(saveResult.message);
    // setRedirectPopup(saveResult.status ? newMonster.slug : false);
  }

  // RENDER
  ////////////////////////

  return (
    <div className="App">
      <section className="monsterSection">
        <MonsterImage img={monsterImage} status={status} change={handleChangeMonsterImage} />
        <MonsterName name={monsterName} status={status} change={handleChangeMonsterName} />
        <MonsterDescription
          description={monsterDescription}
          status={status}
          change={handleChangeMonsterDescription}
        />
        <MonsterSpecial special={special} status={status} />
        <MonsterSpecs specs={specs} status={status} />
      </section>
      <Actions status={status} statusChange={statusChange} save={saveMonster} />
    </div>
  );
}

export { MonsterPage };
