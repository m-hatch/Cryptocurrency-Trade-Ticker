import React from 'react';
import { formatPrice, getTrend } from '../util/utilities';

export default (props) => {

  // get latest price
  let currTrade = { price: '', trend: '' };

  if (props.trades.length > 0) {
    const latest = props.trades[props.trades.length -1];

    currTrade = {
      price: formatPrice(latest.price, props.currency),
      trend: getTrend(latest.tickDirection)
    };
  }
  
  // build trade rows
  const getTrades = () => {
    return props.trades.map(trade => (
      <tr className={ getTrend(trade.tickDirection) }>
        <td>{ trade.symbol }</td>
        <td>{ trade.side }</td>
        <td>{ trade.size }</td>
        <td>{ trade.price }</td>
        <td>{ trade.grossValue ? trade.grossValue : 'no fill' }</td>
      </tr>
    )
  )};

  return (
    <div className="panel">

      <h2 className="panel__name">{ props.name }</h2>
      <span className="panel__currency">{ props.currency }</span>
      <span className={"panel__price " + currTrade.trend }>{ currTrade.price }</span>

      <table className="table">
        <tbody>

          <tr className="table__heading">
            <th>Symbol</th>
            <th>Trade</th>
            <th>Size</th>
            <th>Price</th>
            <th>Gross Value</th>
          </tr>

          { getTrades() }

        </tbody>
      </table>

    </div>
  );
}