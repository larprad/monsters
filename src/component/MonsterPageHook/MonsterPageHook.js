import React, { useState } from 'react';
import Actions from '../Actions/Actions';
import '../MonsterPage/MonsterPage.css';
import './MonsterPageHook.css';
import manipulate from '../../data/manipulate';
import Popup from '../Popup/Popup';

function MonsterPageHook() {
  const [monsterName, setMonsterName] = useState('');
  const [monsterDescription, setMonsterDescription] = useState('');
  const [monsterImage, setMonsterImage] = useState('');
  const [displayPopup, setDisplayPopup] = useState(false);
  const [redirectPopup, setRedirectPopup] = useState(false);
  const [textPopup, setTextPopup] = useState('no text');

  function closePopup() {
    setDisplayPopup(false);
    setTextPopup('no text');
  }

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

  function saveMonster() {
    let newMonster = {
      name: monsterName,
      description: monsterDescription,
      slug: monsterName.toLowerCase(),
      special: [],
      specs: {},
      img: monsterImage,
    };
    const saveResult = manipulate.saveNewMonster(newMonster);

    setDisplayPopup(true);
    setTextPopup(saveResult.message);
    setRedirectPopup(saveResult.status ? newMonster.slug : false);
  }
  return (
    <div className="App">
      {displayPopup ? (
        <Popup closePopup={closePopup} text={textPopup} redirect={redirectPopup} />
      ) : null}
      <section className="monsterSection">
        <div
          className="monsterImg flexCenter"
          style={{
            backgroundImage: 'url(' + monsterImage + ')',
            backgroundSize: 'cover',
          }}
        >
          <input onChange={handleChangeMonsterImage} placeholder="Image url"></input>
        </div>
        <input
          className="monsterTitle flexCenter"
          placeholder="Monster Name"
          onChange={handleChangeMonsterName}
        ></input>
        <textarea
          className="monsterDescription flexCenter"
          placeholder="Description"
          onChange={handleChangeMonsterDescription}
        ></textarea>
        <div className="monsterSpecial flexCenter column"></div>
        <div className="monsterSpecs flexCenter column"></div>
      </section>
      <Actions context="monsterPageNew" save={saveMonster} />
    </div>
  );
}

export default MonsterPageHook;
