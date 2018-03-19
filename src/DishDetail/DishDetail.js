import React, { Component } from 'react';
import './DishDetail.css';
import {modelInstance} from '../data/DinnerModel';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      status: 'INITIAL'
    }
  }
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this);
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

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update(message) {
    if(message === "change_guests"){
       this.setState({
        numberOfGuests: this.props.model.getNumberOfGuests(),
      })
    }
  }

  getIngredientRow = () => {
    if(!this.state.dish.extendedIngredients){
      return;
    }
    const ingredients = this.state.dish.extendedIngredients.map((ingredient) =>  <tr key={ingredient.id}>
        <th> {ingredient.amount.toFixed(1)*this.state.numberOfGuests + ' ' + ingredient.unit}</th>
         <th className="full-width"> {ingredient.name}</th>
        <th> <img className="image-box-xs" src={ingredient.image} alt={ingredient.name} /> </th>
      </tr>
      )
    return ingredients;
  }

  addDish = () => {
    this.props.model.addDishToMenu(this.state.dish);
  }

  render() {
    let dish = null;
    
    switch (this.state.status) {
      case 'INITIAL':
        dish = <em>Loading...</em>
        break;
      case 'LOADED':
        dish = <div>
                <div className= "intro-box">
                  <h3> {this.state.dish.title} </h3> 
                  <figure className="dish-image" key={this.state.dish.id}>
                    <img className="image-box-md" src={this.state.dish.image} alt={this.state.dish.title} /> 
                    <figcaption>
                      Ready in {this.state.dish.readyInMinutes} minutes
                    </figcaption>      
                  </figure>
                  <h3> PREPARATION </h3>
                  <p>{this.state.dish.instructions}</p>

                  <Link to="/search">
                    <button className="next-btn">Back to search</button>
                  </Link>
                </div>
                <div className= "ingredient-box">
                  <h3> INGREDIENTS FOR {this.state.numberOfGuests} PEOPLE </h3>

                  <table className="full-width">
                    <tbody>
                      {this.getIngredientRow()}
                    </tbody>
                  </table>
                  <Link to="/search">
                    <button onClick={this.addDish} className="next-btn">Add to menu</button>
                  </Link>
                 
                </div>
              </div>
        break;
      case 'ERROR':
      default:
        dish = <b>Failed to load data, please try again</b>
        break;
    }
    return (
        <div className="dish-detail-container" >
          <Sidebar model={this.props.model}/>
          <div className="DishDetail">
              {dish}
          </div>
        </div>
    );
  }
}

export default DishDetail;
