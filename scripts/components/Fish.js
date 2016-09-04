import React from 'react';
import helpers from '../helpers';

var Fish = React.createClass({
  addToOrder: function(){
    this.props.addToOrder(this.props.index)
  },
  render: function(){
    var details = this.props.details
    var isAvailable = (details.status === 'available')
    var buttonText = (isAvailable ? "Add to Order" : "Sold Out")
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
  },
  propTypes: {
    addToOrder: React.PropTypes.func.isRequired,
    index: React.PropTypes.string.isRequired,
    details: React.PropTypes.string.isRequired
  }
});

export default Fish;
