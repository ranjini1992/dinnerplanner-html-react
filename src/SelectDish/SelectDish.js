import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import Searchbar from "../Searchbar/Searchbar";

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">
        
        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
        <div className="row-style">
	        <Searchbar model={this.props.model}/>
	        <Dishes query={this.props.query} type={this.props.type}/>
	    </div>
      </div>
    );
  }
}

export default SelectDish;
