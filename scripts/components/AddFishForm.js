import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddFishForm extends React.Component{

  createFish(event){
    event.preventDefault();
    var allRefs = this.refs
    var fish = {
      name: allRefs.name.value,
      price: allRefs.price.value,
      status: allRefs.status.value,
      description: allRefs.desc.value,
      image: allRefs.image.value
    }
    this.props.addFish(fish);
    allRefs.fishForm.reset();
  }

  render(){
    return(
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price"/>
        <select ref="status">
          <option>Fresh!</option>
          <option>Sold Out</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image"/>
        <button type="submit">+ Add Item </button>
      </form>
    )
  }

};

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;
