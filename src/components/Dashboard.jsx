import React from 'react';
import { SYMBOLS } from '../util/constants';
import Panel from './Panel';

/*
 * @prop: message {array}
 */
export default class Dashboard extends React.Component {

  constructor() {
    super();

    // initialize state
    this.state = {
      xbt: { name: 'Bitcoin (XBT)', curr: 'USD', trades: [] },
      bch: { name: 'Bitcoin Cash (BCH)', curr: 'BTC', trades: [] },
      ada: { name: 'Cardano (ADA)', curr: 'BTC', trades: [] },
      eth: { name: 'Ethereum (ETH)', curr: 'BTC', trades: [] },
      ltc: { name: 'Litecoin (LTC)', curr: 'BTC', trades: [] },
      xrp: { name: 'Ripple (XRP)', curr: 'BTC', trades: [] }
    };

    // bind methods
    this.processMessage = this.processMessage.bind(this);
    this.sortTrades = this.sortTrades.bind(this);
    this.addTrade = this.addTrade.bind(this);
    this.getPanels = this.getPanels.bind(this);
  }

  componentDidMount() {
    // only needed if you start with an initial message
    if (this.props.message) {
      this.processMessage(this.props.message);
    }
  }

  componentDidUpdate(previousProps) {
    // prevent re-render if props haven't changed
    if (previousProps.message !== this.props.message) {
      this.processMessage(this.props.message);
      console.log(this.state)
    }
  }

  processMessage(message) {
    message.forEach(trade => {
      this.sortTrades(trade);
    });
  }

  sortTrades(trade) {
    Object.keys(SYMBOLS).forEach(key => {
      if (SYMBOLS[key].includes(trade.symbol)) {
        this.addTrade(key, trade);
      }
    });
  }

  addTrade(key, trade) {
    const copy = this.state[key];

    if (copy.trades.length > 19) { 
      copy.trades.shift() 
    }

    copy.trades.push(trade);
    this.setState({ [key]: copy });
  }

  getPanels() {
    return Object.keys(this.state).map(key => 
      <Panel key={ key }
        name={ this.state[key].name } 
        currency={ this.state[key].curr }
        trades={ this.state[key].trades } />
    );
  }

  render() {
    return (
      <div className="dashboard">
        { this.getPanels() }
      </div>
    );
  }
  
}