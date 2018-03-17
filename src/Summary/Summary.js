import React, { Component } from 'react';
import './Summary.css';
import { Link } from 'react-router-dom';

class Summary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu()
    }
  }

  componentDidMount() {
    this.props.model.addObserver(this)
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
    if(message === "add_dish"){
       this.setState({
        menu: this.props.model.getFullMenu()
      })
    }
  }

  getRecipeRow = () => {
    if(!this.state.menu){
      return;
    }
    const recipeList = this.state.menu.map((dish) =>
      <figure className="dish-gallery" key={dish.id}>
        <img className="image-box-lg" src={dish.image} alt={dish.title}/> 
        <figcaption>
          $ {(this.state.numberOfGuests * dish.pricePerServing).toFixed(1)}
        </figcaption>      
      </figure>
    )    
    return recipeList;    
  }

  render() {
    return (
      <div className="Summary">
        <h3>My Dinner: {this.state.numberOfGuests} people </h3>
        <Link to="/search">
            <button className="next-btn">Back</button>
        </Link> 
        <div className="summary-row">
          {this.getRecipeRow()}
        </div>
        <h3>TOTAL : $ {this.props.model.getTotalMenuPrice().toFixed(1)}  </h3>
        <Link to="/print">
            <button className="next-btn">Print</button>
        </Link>
      </div>
    );
  }
}

export default Summary;
