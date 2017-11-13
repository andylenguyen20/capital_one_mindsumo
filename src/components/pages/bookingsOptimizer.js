import React, { Component } from 'react';
import data from '../../resources/listings.json'

/*
** PURPOSE: This file estimates the optimal booking price given a latitude and longitude input.
** METHODOLOGY: I used an npm implementation of a kd-tree that allows me to perform a nearest neighbors search
**  of k neighbors to the latitude-longitude input. From these k neighbors, I take the average of their costs
**  and return that value.
*/

//the k number of neighbors. I set this to an arbitrary value of 10. Could improve on this by statistically determining best value of k
const numNeighbors = 10;
//creates global kd tree from data
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
  //gets called when we click on Estimate! button. This function performs the estimation (using the kd-tree and lat-long input) and displays it
	handleClick(){
    var latitude = this.state.latValue;
    var longitude = this.state.longValue;
		var nearestCost = getNearest(tree, {lat:latitude,long:longitude}, numNeighbors);
    console.log(nearestCost);
		this.setState({estimation:nearestCost});
	}
  //called every time latitude value changes
  updateLatitudeValue(val){
    this.setState({
      latValue:val
    });
  }
  //called every time longitude value changes
  updateLongitudeValue(val){
    this.setState({
      longValue:val
    });
  }

  render() {
    return (
      <div className = "container-fluid">
      	<h1>
      		Bookings Optimization Tool
      	</h1>
      	<p>
      		Type in a geo-location (latitude and longitude) of your property to find out the ideal price per night that will yield maximum bookings or revenue
      	</p>
      	<label htmlFor="latitudeInput">Latitude</label>
  		  <input type = "text" id = "latitudeInput" onChange={e => this.updateLatitudeValue(e.target.value)}/>
  		  <label htmlFor="longitudeInput">Longitude</label>
  		  <input type = "text" id = "longitudeInput" onChange={e => this.updateLongitudeValue(e.target.value)}/>
  		  <button onClick = {this.handleClick}>Estimate!</button> <br/>
        <label htmlFor="bookingResult">Ideal Price Per Night ($) </label>
  		  <input id = "bookingResult" value = {this.state.estimation}/>
      </div>
    );
  }
}

//calculates the average price of the k(number) nearest airbnb listings
function getNearest(tree, coords, number){
    var nearest = tree.nearest(coords,number);
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
    //array of coordinates that we will initialize in the loop
    var coords = new Array();
    for(var i = 0; i < data.length; i++){
      //determine valid price of each listing
      var avgPrice = data[i]["preproccessed_avg_price"];
      var validAveragePrice;
      if(avgPrice === ""){
        validAveragePrice = data[i]["price"].replace(/[^0-9\.-]+/g,"");
      }else{
        validAveragePrice = avgPrice;
      }
      //initialize coordinates to push onto our coordinates array
      var latitude = data[i]["latitude"];
      var longitude = data[i]["longitude"];
      coords.push(
      { 
        attributes:{lat:latitude,long:longitude, price:validAveragePrice}
      });
    }
    coords = coords.map(function(v){return v.attributes;});
    //return a kd-tree with all the lat-long coordinates. Each node in this tree has a third
    //component called "price", which we use in our estimation
    return kdt.createKdTree(coords,distance,['lat','long']);
}

export default BookingsOptimizer;