import React, { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishtypes: this.props.model.getDishTypeList(),
      queryString: '',
      selectedDishType: 'All'
  	}
  }

  updateQueryString = (e) => {
    this.setState({
      queryString: e.target.value
    });
  }

  updateType = (e) => {
    this.setState({
      selectedDishType: e.target.value
    });
  }

  returnSearchLink= () => {
    let query = "/search";
    if(this.state.queryString){
      query= query + "/" + this.state.queryString;
    }
    if(this.state.selectedDishType) {
      query= query + "/" + this.state.selectedDishType;
    }
    return query;
  }
  render() {
    return (
      <div className="Searchbar">
        <h3>Find a dish</h3>
        <input value = {this.state.queryString} onChange = {this.updateQueryString} className="query-field" placeholder="Enter key words"/> {" "}
        <select value = {this.state.selectedDishType} onChange = {this.updateType} className="query-field">
         <option value="All">All</option>
          {  this.state.dishtypes.map((dishtype, index) => 
              <option value= {dishtype} key={index}>{dishtype}</option>
            )
          }
         
    		</select> {" "}
        <button onClick={() => this.props.model.changeProps(this.state.queryString, this.state.selectedDishType)} className="next-btn">Search</button>
        
      </div>
    );
  }
}

export default Searchbar;
