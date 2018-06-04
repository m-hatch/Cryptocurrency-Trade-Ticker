import React from 'react';
import { SYMBOLS } from '../util/constants';

/*
 * @prop: message {array}
 */
export default class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      xbt: null,
      bch: null,
      ada: null,
      eth: null,
      ltc: null,
      xrp: null
    };
    this.sortMessage = this.sortMessage.bind(this);
    this.sortTrades = this.sortTrades.bind(this);
  }

  componentDidMount() {
    // only needed if you start with an initial message
    if (this.props.message) {
      this.sortMessage(this.props.message);
    }
  }

  componentDidUpdate(previousProps) {
    // prevent re-render if props haven't changed
    if (previousProps.message !== this.props.message) {
      this.sortMessage(this.props.message);
      console.log(this.state)
    }
  }

  sortMessage(message) {
    message.forEach(trade => {
      this.sortTrades(trade);
    });
  }

  sortTrades(trade) {
    Object.keys(SYMBOLS).forEach(key => {

      if (SYMBOLS[key].includes(trade.symbol)) {
        this.setState({
          [key]: trade
        });
      }

    });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </div>
    );
  }
  
}