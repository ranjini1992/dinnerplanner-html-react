import React, { Component } from 'react';
import './Print.css';
import { Link } from 'react-router-dom';

class Print extends Component {
  render() {
    return (
      <div className="Print">
        <p>
            Print!
        </p>
        
        <Link to="/summary">
            <button className="next-btn">Back</button>
        </Link>
      </div>
    );
  }
}

export default Print;
