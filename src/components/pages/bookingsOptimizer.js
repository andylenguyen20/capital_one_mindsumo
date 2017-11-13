import React, { Component } from 'react';
import data from '../../resources/listings.json'
const numNeighbors = 10;
var tree = initializeTree();
class BookingsOptimizer extends Component {
	constructor(props){
		super(props);
		this.state = {
			estimation: 0,
      latValue: '',
      longValue: ''
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
    var latitude = this.state.latValue;
    console.log(latitude);
    var longitude = this.state.longValue;
    console.log(tree);
		var nearestCost = getNearest(tree, {lat:{latitude},long:{longitude}}, numNeighbors);
    console.log(nearestCost);
		this.setState({estimation:nearestCost});
	}
  updateLatitudeValue(val){
    this.setState({
      latValue:val
    });
  }
  updateLongitudeValue(val){
    this.setState({
      longValue:val
    });
  }
  render() {
    return (
      <div className = "container-fluid">
      	<h1>
      		Bookings Optimization Page Contents
      	</h1>
      	<p>
      		On this page I'm going to have a tool that calls a function. Here is what it will do:
      		Given the geo-location (latitude and longitude) of a property, what is the ideal price per night that will yield maximum bookings or revenue.
      	</p>
      	<label htmlFor="latitudeInput">Latitude</label>
  		<input type = "text" id = "latitudeInput" onChange={e => this.updateLatitudeValue(e.target.value)}/>
  		<label htmlFor="longitudeInput">Longitude</label>
  		<input type = "text" id = "longitudeInput" onChange={e => this.updateLongitudeValue(e.target.value)}/>
  		<button onClick = {this.handleClick}>Estimate!</button>
      <label htmlFor="bookingResult">Ideal Price Per Night ($) </label>
  		<input id = "bookingResult" value = {this.state.estimation}/>
      </div>
    );
  }
}

function getNearest(tree, coords, number){
    var nearest = tree.nearest(coords,number);
    console.log(nearest);
    var totalPrice = 0;
    for(var i = 0; i < nearest.length; i++){
      totalPrice += parseFloat(nearest[i][0]["price"]);
    }
    var avgPrice = totalPrice/nearest.length;
    return avgPrice;
}

function initializeTree(){
    //kd.tree library taken from npm
    var kdt = require('kd.tree');
    //function that our kdtree uses to determine distances
    var distance = function(a,b){
    	return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.long-b.long,2));
    }
    var coords = [].map(function(v){return v.loc;});
    for(var i = 0; i < data.length; i++){
      //determine weekly price of each listing
      var avgPrice = data[i]["preproccessed_avg_price"];
      var validAveragePrice;
      if(avgPrice == ""){
        validAveragePrice = data[i]["price"].replace(/[^0-9\.-]+/g,"");
      }else{
        validAveragePrice = avgPrice;
      }
      //push all this information onto our coords array
      coords.push(
      { id: data[i]["id"],
      	price: validAveragePrice,
        loc:{lat:data[i]["latitude"],long:data[i]["longitude"]}
      });
    }
    return kdt.createKdTree(coords,distance,['lat','long']);
}

export default BookingsOptimizer;