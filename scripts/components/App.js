import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Inventory from './Inventory';
import Order from './Order';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

import Rebase from 're-base';
var base = Rebase.createClass('https://react-ordering-app.firebaseio.com/');

@autobind
class App extends React.Component {

  constructor(){
    super();

    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentDidMount(){
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    });
    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if (localStorageRef) {this.setState({order: JSON.parse(localStorageRef)});}
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  addToOrder(key){
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order: this.state.order});
  }

  removeFromOrder(key){
    delete this.state.order[key];
    this.setState({order: this.state.order});
  }

  addFish(fish){
    var timeStamp = new Date().getTime();
    this.state.fishes[`fish-${timeStamp}`] = fish;
    this.setState({fishes: this.state.fishes});
  }

  removeFish(key){
    this.state.fishes[key] = null;
    this.setState({fishes: this.state.fishes});
  }

  loadSamples(){
    this.setState({
      fishes: require('../sample-fishes')
    });
  }

  renderFish(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul>
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish}/>
      </div>
    );
  }

};

reactMixin.onClass(App, Catalyst.LinkedStateMixin)
export default App;
