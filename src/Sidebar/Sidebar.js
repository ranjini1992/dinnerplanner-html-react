import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu()
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update(message) {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  addGuest = () => {
    this.props.model.setNumberOfGuests(this.state.numberOfGuests + 1);
  }

  removeGuest = () => {
    this.props.model.setNumberOfGuests(this.state.numberOfGuests - 1);
  }

  getDishRow = () => {
    if(!this.state.menu){
      return;
    }
    const rows = this.state.menu.map((dish) =>  <tr key={dish.id}>
         <th className="full-width"> {dish.title}</th>
         <th className="full-width"> {(this.state.numberOfGuests * dish.pricePerServing).toFixed(1)}</th>
      </tr>
      )
    return rows;
  }

  render() {
    return (
      <div className="Sidebar">
        <h3>My Dinner</h3>
        <p>
          People :{" "}
          <button onClick={this.removeGuest}><span> - </span></button>
          <input className="guest-text" value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged} />
          <button onClick={this.addGuest}><span> + </span></button>
        <br/>
        </p>

        <table className="full-width">
          <tbody>
            <tr>
              <th className="full-width">Recipe Name</th>
              <th className="full-width">Cost</th>
            </tr>
            {this.getDishRow()}
             <tr>
              <th className="full-width">Total</th>
              <th className="full-width">{this.props.model.getTotalMenuPrice().toFixed(1)}</th>
            </tr>
            </tbody>
           </table> 
                  
         <Link to="/summary">
          <button className="next-btn" disabled={this.state.menu.length === 0}>Confirm Dinner</button>
        </Link>
      </div>
    );
  }
}

export default Sidebar;
