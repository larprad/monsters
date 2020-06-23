import React from 'react';
import './Actions.css';
import { Link, useParams } from 'react-router-dom';

function Save(props) {
  function handleSaveClick() {
    props.save();
  }
  // const { monster } = useParams();
  return (
    <Link to={`/${props.monsterSlug}`}>
      <button onClick={handleSaveClick}>Save</button>
    </Link>
  );
}

function Delete(props) {
  function handleDeleteClick() {
    props.delete();
  }
  return (
    <Link to="/">
      <button onClick={handleDeleteClick}>Delete</button>
    </Link>
  );
}

function Edit(props) {
  function handleStatusChange() {
    props.statusChange('edit');
  }
  const { monster } = useParams();
  return (
    <Link to={`/${monster}/edit`}>
      <button onClick={handleStatusChange}>Edit</button>
    </Link>
  );
}

function Back() {
  return (
    <Link to="/">
      <button>back</button>
    </Link>
  );
}

function New() {
  return (
    <Link to="/new">
      <button>New</button>
    </Link>
  );
}

function Cancel(props) {
  function handleStatusChange() {
    props.statusChange('edit');
  }
  const { monster } = useParams();
  return (
    <Link to={`/${monster}`}>
      <button onClick={handleStatusChange}>Cancel</button>
    </Link>
  );
}

function Filter() {
  return <button>Filter</button>;
}

function Actions(props) {
  function actionsAvailable(context) {
    switch (context) {
      case 'read':
        return (
          <div className="containerFull flexCenter spaceEvenly">
            <Back />
            <Edit statusChange={props.statusChange} />
            <Delete delete={props.delete} />
          </div>
        );
      case 'edit':
        return (
          <div className="containerFull flexCenter spaceEvenly">
            <Cancel statusChange={props.statusChange} />
            <Save save={props.edit} monsterSlug={props.monsterSlug} />
          </div>
        );
      case 'new':
        return (
          <div className="containerFull flexCenter spaceEvenly">
            <Back />
            <Save save={props.save} monsterSlug={props.monsterSlug} />
          </div>
        );
      case 'home':
        return (
          <div className="containerFull flexCenter spaceEvenly">
            <Filter />
            <New />
          </div>
        );
      default:
        return (
          <div className="containerFull flexCenter spaceEvenly">
            <Back />
          </div>
        );
    }
  }
  return <div className="App-actions">{actionsAvailable(props.status)}</div>;
}

export default Actions;
