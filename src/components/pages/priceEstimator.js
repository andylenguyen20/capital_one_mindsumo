import React, { Component } from 'react';
import data from '../../resources/listings.json'

const numNeighbors = 10;
var tree = initializeTree();

class PriceEstimator extends React.Component {
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
		var longitude = this.state.longValue;
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
      		Price Estimation Tool
      	</h1>
      	<p>
      		On this page I'm going to have a tool that calls a function. Here is what it will do:
      		Given the geo-location (latitude and longitude) of a new property, estimate the weekly average income the homeowner can make with Airbnb.
      	</p>
      	<label htmlFor="latitudeInput">Latitude</label>
      	<input type = "text" id = "latitudeInput" onChange={e => this.updateLatitudeValue(e.target.value)}/>
  		<label htmlFor="longitudeInput">Longitude</label>
  		<input type = "text" id = "longitudeInput" onChange={e => this.updateLongitudeValue(e.target.value)}/>
  		<button onClick = {this.handleClick}>Estimate!</button>
  		<label htmlFor="priceEstimationResult">Estimated Weekly Revenue ($) </label>
  		<input id = "priceEstimationResult" value = {this.state.estimation}/>
      </div>
    );
  }
}

function getNearest(tree, coords, number){
    var nearest = tree.nearest(coords,number);
    var totalCost = 0;
    for(var i = 0; i < nearest.length; i++){
      totalCost += parseFloat(nearest[i][0]["price"]);
    }
    var avgCost = totalCost/nearest.length;
    return avgCost;
}

function initializeTree(){
    //kd.tree library taken from npm
    var kdt = require('kd.tree');
    //function that our kdtree uses to determine distances
    var distance = function(a,b){
    	console.log(a);
    	//console.log(Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.long-b.long,2)));
    	return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.long-b.long,2));
    }
    var coords = [];
    for(var i = 0; i < data.length; i++){
      //determine weekly price of each listing
      var weeklyPrice = data[i]["weekly_price"].replace(/[^0-9\.-]+/g,"");
      var dailyPrice = data[i]["price"].replace(/[^0-9\.-]+/g,"");
      var validWeeklyPrice;
      if(weeklyPrice == ""){
        validWeeklyPrice = dailyPrice * 7;
      }else{
        validWeeklyPrice = weeklyPrice;
      }
      var latitude = data[i]["latitude"];
      var longitude = data[i]["longitude"];
      //push all this information onto our coords array
      coords.push(
      { price: validWeeklyPrice,
        loc:{lat:latitude,long:longitude}
      });
    }
    coords = coords.map(function(v){return v.loc;});
    console.log(coords);
    return kdt.createKdTree(coords,distance,['lat','long']);
}

export default PriceEstimator;