import React from 'react';
import './Popup.css';
import { Link } from 'react-router-dom';

function Popup(props) {
  function redirect() {
    if (props.redirect) {
      return (
        <Link to={'/' + props.redirect}>
          <button onClick={props.closePopup}>OK</button>
        </Link>
      );
    } else {
      return <button onClick={props.closePopup}>OK</button>;
    }
  }

  return (
    <div className="popup flexCenter">
      <div className="inner flexCenter column">
        <h2>{props.text}</h2>
        {redirect()}
      </div>
    </div>
  );
}

export default Popup;
