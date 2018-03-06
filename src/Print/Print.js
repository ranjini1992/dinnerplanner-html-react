import React, { Component } from 'react';
import './Print.css';
import { Link } from 'react-router-dom';

class Print extends Component {
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

   getRecipeRow = () => {
    if(!this.state.menu){
      return;
    }
    const recipeList = this.state.menu.map((dish) =>
      <tr key={dish.id}>
        <th className="third-width"> 
          <figure className="print-gallery" key={dish.id}>
            <img className="image-box-xl" src={dish.image} alt={dish.title}/> 
            <figcaption>
              $ {(this.state.numberOfGuests * dish.pricePerServing).toFixed(1)}
            </figcaption>      
          </figure>
          </th>
        <th className="third-width">{dish.title}</th>
        <th className="third-width">{dish.instructions}</th>
      </tr>
    )    
    return recipeList;    
  }

  render() {
    return (
      <div className="Print">
        <h3>My Dinner: {this.state.numberOfGuests} people </h3>
        <Link to="/summary">
            <button className="next-btn">Back</button>
        </Link> 
        <table>
          <tbody>
            {this.getRecipeRow()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Print;
