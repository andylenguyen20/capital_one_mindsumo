import React, { Component } from 'react';
import{
  Link
} from 'react-router-dom';
import logo from "../../assets/capital_one_logo.jpg"

class Header extends Component {
  render() {
    return (
      <header>
      	<div className = "logo">
      		<img src = {logo} alt = "LOGO"/>
      	</div>

      	<nav>
      		<ul>
      			<li className = "first">
      				<Link to = "/">Trends</Link>
      			</li>
      			<li>
      				<Link to = "/PriceEstimator">Price estimation</Link>
      			</li>
      			<li className = "last">
      				<Link to = "/BookingsOptimizer">Bookings optimization</Link>
      			</li>
      		</ul>
      	</nav>
      </header>
    );
  }
}

export default Header;