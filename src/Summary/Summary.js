import React, { Component } from 'react';
import './Summary.css';
import { Link } from 'react-router-dom';

class Summary extends Component {
  render() {
    return (
      <div className="Summary">
        <Link to="/search">
            <button className="next-btn">Back</button>
        </Link>
        <p>
            Summary!
        </p>
        
        <Link to="/print">
            <button className="next-btn">Print Menu</button>
        </Link>
      </div>
    );
  }
}

export default Summary;
