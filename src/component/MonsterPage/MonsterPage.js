import React, { useState, useEffect } from 'react';
import { Actions } from '../Actions/Actions';
import './MonsterPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import manipulate from '../../data/manipulate';
import Popup from '../Popup/Popup';

// COMPONENTS
////////////////////////

function MonsterImage(props) {
  function statusCheck(status) {
    if (status === 'edit' || status === 'new') {
      return (
        <div
          className="monsterImg flexCenter edit"
          style={{
            backgroundImage: 'url(' + props.img + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <input
            className="monsterImgInput"
            onChange={props.change}
            placeholder={props.img || 'Image URL'}
          ></input>
        </div>
      );
    } else {
      return (
        <div className="monsterImg">
          <img src={props.img} alt={props.name}></img>
        </div>
      );
    }
  }

  return statusCheck(props.status);
}

function MonsterName(props) {
  function statusCheck(status) {
    if (status === 'edit' || status === 'new') {
      return (
        <input
          className="monsterTitle flexCenter edit"
          placeholder="Monster name"
          value={props.name}
          onChange={props.change}
        ></input>
      );
    } else {
      return <h2 className="monsterTitle flexCenter">{props.name}</h2>;
    }
  }
  return statusCheck(props.status);
}

function MonsterDescription(props) {
  function statusCheck(status) {
    if (status === 'edit' || status === 'new') {
      return (
        <textarea
          className="monsterDescription flexCenter edit"
          placeholder="Description"
          value={props.description}
          onChange={props.change}
        ></textarea>
      );
    } else {
      return <p className="monsterDescription flexCenter">{props.description}</p>;
    }
  }
  return statusCheck(props.status);
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
  const originalMonsterSlug = monster;

  // STATES
  ////////////////////////
  const [monsterName, setMonsterName] = useState('name');
  const [monsterDescription, setMonsterDescription] = useState('description');
  const [monsterImage, setMonsterImage] = useState('');
  const [monsterSpecial] = useState([]);
  const [monsterSpecs] = useState({});
  const [haveLoaded, setHaveLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState(props.status);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [redirectPopup, setRedirectPopup] = useState(false);
  const [textPopup, setTextPopup] = useState('no text');

  const navigate = useNavigate();

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  useEffect(() => {
    console.log(`haveLoaded: ${haveLoaded}`);
    async function getMonster() {
      setIsLoading(true);
      console.log(`fetching ${`monster/${monster}`}`);
      try {
        let response = await fetch(`/monster/${monster}`);
        console.log(response);
        if (response.ok) {
          let responseJSON = await response.json();
          console.log(responseJSON);
          setMonsterName(responseJSON.name);
          setMonsterDescription(responseJSON.description);
          setMonsterImage(responseJSON.image);
          setIsLoading(false);
          setIsError(false);
          setHaveLoaded(true);
        } else {
          console.error('error while fetching a monster data: response is not ok');
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.error(`error while fecthing: ${error}`);
        setIsLoading(false);
        setIsError(true);
      }
    }
    if (haveLoaded === false && status !== 'new') {
      console.log(`getting monster`);
      getMonster();
    } else {
      setIsLoading(false);
    }
  }, [status, monster, haveLoaded]);

  // FUNCTIONS
  ////////////////////////

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

  function statusChange(newStatus) {
    setStatus(newStatus);
  }

  async function saveMonster() {
    const monsterToSave = {
      name: monsterName,
      description: monsterDescription,
      img: monsterImage,
      slug: monsterName.toLowerCase(),
      special: [],
      specs: {},
    };
    // manipulate.saveNewMonster(monsterToSave);
    const newSlug = await manipulate.saveNewMonsterServer(monsterToSave);
    if (newSlug === 'already existing') {
      setDisplayPopup(true);
      setTextPopup('Monster is already existing');
      setRedirectPopup('new');
    } else {
      setDisplayPopup(true);
      setTextPopup('Saved');
      setRedirectPopup(newSlug);
      statusChange('read');
    }
  }

  async function editMonster() {
    const monsterToEdit = {
      name: monsterName,
      description: monsterDescription,
      img: monsterImage,
      slug: monsterName.toLowerCase(),
      special: [],
      specs: {},
    };
    console.log(`original monster slug: ${originalMonsterSlug}`);
    console.log(`actual monster name: ${monsterName}`);
    console.log(`monster content:`);
    console.log(monsterToEdit);
    const newSlug = await manipulate.editMonsterServer(monsterToEdit, originalMonsterSlug);
    navigate(`/${newSlug}`);
    statusChange('read');
  }

  async function deleteMonster() {
    await manipulate.deleteMonsterServer(monster);
    navigate(`/`);
  }

  // RENDER
  ////////////////////////

  return (
    <div className="App">
      {displayPopup ? (
        <Popup closePopup={closePopup} text={textPopup} redirect={redirectPopup} />
      ) : null}
      {isLoading ? (
        <section className="monsterSection">
          <h2 className="loading">LOADING</h2>
        </section>
      ) : !isError ? (
        <section className="monsterSection">
          <MonsterImage img={monsterImage} status={status} change={handleChangeMonsterImage} />
          <MonsterName name={monsterName} status={status} change={handleChangeMonsterName} />
          <MonsterDescription
            description={monsterDescription}
            status={status}
            change={handleChangeMonsterDescription}
          />
          <MonsterSpecial special={monsterSpecial} status={status} />
          <MonsterSpecs specs={monsterSpecs} status={status} />
        </section>
      ) : (
        <section className="monsterSection">
          <h2 className="loading">ERROR</h2>
        </section>
      )}

      <Actions
        status={status}
        statusChange={statusChange}
        save={saveMonster}
        edit={editMonster}
        delete={deleteMonster}
        monsterSlug={monsterName.toLowerCase()}
      />
    </div>
  );
}

export { MonsterPage };
