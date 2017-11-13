import React, { Component } from 'react';
import './assets/css/default.min.css'
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//components
import Header from './components/headerComponents/header'
import Footer from './components/footerComponents/footer'
import PriceEstimator from './components/pages/priceEstimator'
import Trends from './components/pages/trends'
import BookingsOptimizer from './components/pages/bookingsOptimizer'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header/>
          <Route exact path = '/' component = {Trends} />
          <Route exact path = '/PriceEstimator' component = {PriceEstimator}/>
          <Route exact path = '/BookingsOptimizer' component = {BookingsOptimizer} />
        <Footer/>
      </div>
      </Router>
    );
  }
}

export default App;
