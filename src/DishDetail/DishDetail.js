import React, { Component } from 'react';
import './DishDetail.css';
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getDish(this.props.id).then(dish => {
      this.setState({
        status: 'LOADED',
        dish: dish
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    let dish = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dish = <em>Loading...</em>
        break;
      case 'LOADED':
        dish = <div>
                <h3> {this.state.dish.title} </h3> 
                <Link to="/search">
                  <button className="next-btn">Back</button>
                </Link>
                <Link to="/search">
                  <button onClick className="next-btn">Add</button>
                </Link> 
              </div>
        break;
      default:
        dish = <b>Failed to load data, please try again</b>
        break;
    }
    return (
        <div className="DishDetail">
          <h3>DishDetail</h3>
            {dish}
        </div>
    );
  }
}

export default DishDetail;
