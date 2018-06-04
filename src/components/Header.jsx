import React from 'react';

/*
 * @prop: status {string}
 * @prop: connected {boolean}
 */
export default (props) => {

  let style;
  if (props.connected === null) {
    style = '';
  } else {
    style = "header__status--" + (props.connected ? "open" : "closed");
  }
  
  return (
    <div className="header">

      <h1 className="header__title">Realtime Cryptocurrency Trade Ticker</h1>
      <span className={ style }>{ props.status }</span>

    </div>
  );
}