import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import Summary from "./Summary/Summary";
import Print from "./Print/Print";
import DishDetail from "./DishDetail/DishDetail";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
          
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          <Route path="/summary" render={() => <Summary model={modelInstance}/>}/>
          <Route path="/print" render={() => <Print model={modelInstance}/>}/>
          <Route path="/dish/:id" render={(props) => <DishDetail model={modelInstance} id={props.match.params.id}/>}/>
        </header>
      </div>
    );
  }
}

export default App;
