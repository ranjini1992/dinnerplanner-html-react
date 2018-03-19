import React, {Component} from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)
    this.updateDishSearchView(this.props.query, this.props.type);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  update(message) {
    if(message === "change_props"){
      this.setState({
        status: 'INITIAL',
      })
      let type = modelInstance.getType();
      let query = modelInstance.getQuery();
      this.updateDishSearchView(query, type);
    }
  }

  updateDishSearchView(query, type){
    modelInstance.getAllDishes(query, type).then(dishes => {
      if(dishes.results.length !== 0){
        this.setState({
          status: 'LOADED',
          dishes: dishes.results
        })
      }else{
        this.setState({
          status: 'ERROR'
        })
      }
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  returnImageLink = (imageFileName) => {
    return "https://spoonacular.com/recipeImages/" + imageFileName;
  }

  render() {
    let dishesList = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>
        <Link to={"/dish/" + dish.id} key={dish.id}>
            <figure className="dish-gallery">
              <img className="image-box-sm" src={this.returnImageLink(dish.image)} alt={dish.title}/> 
              <figcaption>
                {dish.title}
              </figcaption>      
            </figure>
        </Link>
        )
        break;
      case 'ERROR':
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>
          {dishesList}
      </div>
    );
  }
}

export default Dishes;
