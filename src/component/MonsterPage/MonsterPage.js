import React, { useState, useEffect } from 'react';
import Actions from '../Actions/Actions';
import './MonsterPage.css';
import { useParams } from 'react-router-dom';
import manipulate from '../../data/manipulate';

// COMPONENTS
////////////////////////

function MonsterImage(props) {
  function statusCheck(status) {
    if (status === 'edit' || status === 'new') {
      return (
        <div
          className="monsterImg flexCenter"
          style={{
            backgroundImage: 'url(' + props.img + ')',
            backgroundSize: 'cover',
          }}
        >
          <input onChange={props.change} placeholder="Image url"></input>
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
    console.log('I am here');
    if (status === 'edit' || status === 'new') {
      return (
        <input
          className="monsterTitle flexCenter"
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
          className="monsterDescription flexCenter"
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
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(props.status);
  const [urlToFetch] = useState(`monster/${monster}`);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  useEffect(() => {
    async function getMonster() {
      setIsLoading(true);
      let response = await fetch(urlToFetch);
      if (response.ok) {
        let responseJSON = await response.json();
        setMonsterName(responseJSON.name);
        setMonsterDescription(responseJSON.description);
        setMonsterImage(responseJSON.img);
        setIsLoading(false);
      } else {
        console.error('error while fetching a monster data');
      }
    }
    getMonster();
  }, [urlToFetch]);

  // FUNCTIONS
  ////////////////////////

  function handleChangeMonsterName(e) {
    const newName = e.target.value;
    setMonsterName(newName);
  }

  function handleChangeMonsterDescription(e) {
    const newDescription = e.target.value;
    setMonsterDescription(newDescription);
  }

  function handleChangeMonsterImage(e) {
    console.log('setting monster image');
    const newImg = e.target.value;
    setMonsterImage(newImg);
  }

  function statusChange(newStatus) {
    setStatus(newStatus);
  }

  function saveMonster() {
    const monsterToSave = {
      name: monsterName,
      description: monsterDescription,
      img: monsterImage,
      slug: monsterName.toLowerCase(),
      special: [],
      specs: {},
    };
    manipulate.saveNewMonster(monsterToSave);
    statusChange('read');
  }

  function editMonster() {
    const monsterToEdit = {
      name: monsterName,
      description: monsterDescription,
      img: monsterImage,
      slug: monsterName.toLowerCase(),
      special: [],
      specs: {},
    };
    manipulate.editMonster(monsterToEdit, originalMonsterSlug);
    statusChange('read');
  }

  function deleteMonster() {
    manipulate.deleteMonster(monster);
  }

  // RENDER
  ////////////////////////

  return (
    <div className="App">
      {isLoading ? (
        <h2 className="loading">LOADING</h2>
      ) : (
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
