import React from 'react';
import helpers from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Fish extends React.Component{

  addToOrder(){
    this.props.addToOrder(this.props.index);
  }

  render(){
    var details = this.props.details;
    var isAvailable = (details.status === 'available');
    var buttonText = (isAvailable ? "Add to Order" : "Sold Out");

    return (
      <li className="menu-fish">
       <img src={details.image} alt={details.name}/>
       <h3 className="fish-name">
         {details.name}
         <span className="price">{helpers.formatPrice(details.price)}</span>
       </h3>
       <p>{details.desc}</p>
       <button disabled={!isAvailable} onClick={this.addToOrder}>{buttonText}</button>
      </li>
    )
  }

};

Fish.propTypes = {
  addToOrder: React.PropTypes.func.isRequired,
  index: React.PropTypes.string.isRequired,
  details: React.PropTypes.string.isRequired
}

export default Fish;
