import React from 'react';

/*
 * @prop: handleClick {function}
 */
export default (props) => {

  return (
    <div className="connection">

      <button type="button" id="open" className="connection__btn"
        onClick={ props.handleClick }>
        Open Connection
      </button>

      <button type="button" id="close" className="connection__btn"
        onClick={ props.handleClick }>
        Close Connection
      </button>

    </div>
  );
}