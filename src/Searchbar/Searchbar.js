import React, { Component } from 'react';
import './Searchbar.css';
import { Link } from 'react-router-dom';

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
        <Link to={this.returnSearchLink()}>
            <button className="next-btn">Search</button>
        </Link>
        
      </div>
    );
  }
}

export default Searchbar;
