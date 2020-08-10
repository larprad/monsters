import React from 'react';
import './Actions.css';
import { Link, useParams } from 'react-router-dom';

function Save(props) {
  function handleSaveClick() {
    props.save();
  }
  // const { monster } = useParams();
  return (
    <button className="actionButton" onClick={handleSaveClick}>
      Save
    </button>
  );
}

function Delete(props) {
  function handleDeleteClick() {
    props.delete();
  }
  return (
    <Link to="/">
      <button className="actionButton" onClick={handleDeleteClick}>
        Delete
      </button>
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
      <button className="actionButton" onClick={handleStatusChange}>
        Edit
      </button>
    </Link>
  );
}

function Back() {
  return (
    <Link to="/">
      <button className="actionButton">Home</button>
    </Link>
  );
}

function New() {
  return (
    <Link to={'/new'}>
      <button className="actionButton">New</button>
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
      <button className="actionButton" onClick={handleStatusChange}>
        Cancel
      </button>
    </Link>
  );
}

function Filter(props) {
  return (
    <button className="actionButton" onClick={props.toggleFilerPanel}>
      Filter
    </button>
  );
}

function Actions(props) {
  function actionsAvailable(context) {
    switch (context) {
      case 'read':
        return (
          <div className="containerFull flexCenter spaceEvenly stretch">
            <Back />
            <Edit statusChange={props.statusChange} />
            <Delete delete={props.delete} />
          </div>
        );
      case 'edit':
        return (
          <div className="containerFull flexCenter spaceEvenly stretch">
            <Cancel statusChange={props.statusChange} />
            <Save save={props.edit} monsterSlug={props.monsterSlug} />
          </div>
        );
      case 'new':
        return (
          <div className="containerFull flexCenter spaceEvenly stretch">
            <Back />
            <Save save={props.save} monsterSlug={props.monsterSlug} />
          </div>
        );
      case 'home':
        return (
          <div className="containerFull flexCenter spaceEvenly stretch">
            <Filter toggleFilerPanel={props.toggleFilerPanel} />
            <New />
          </div>
        );
      default:
        return (
          <div className="containerFull flexCenter spaceEvenly stretch">
            <Back />
          </div>
        );
    }
  }
  return <div className="App-actions">{actionsAvailable(props.status)}</div>;
}

export { Actions, Delete, Edit };
