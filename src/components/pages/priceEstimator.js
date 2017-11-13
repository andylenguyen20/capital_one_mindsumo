import React, { Component } from 'react';
import data from '../../resources/listings.json'

/*
** NOTE: Very similar implementation to bookingsOptimizer.js. Read comments on that file for more detailed comments.
** PURPOSE: This file estimates the weekly revenue given a latitude and longitude input.
** METHODOLOGY: I used an npm implementation of a kd-tree that allows me to perform a nearest neighbors search
**  of k neighbors to the latitude-longitude input. From these k neighbors, I take the average of their weekly price
**  and return that value.
*/

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
		var nearestCost = getNearest(tree, {lat:latitude,long:longitude}, numNeighbors);
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
    var kdt = require('kd.tree');
    var distance = function(a,b){
    	return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.long-b.long,2));
    }
    var coords = [];
    for(var i = 0; i < data.length; i++){
      //determine valid weekly price of each listing
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
      coords.push(
      { 
        attributes:{lat:latitude,long:longitude,price: validWeeklyPrice}
      });
    }
    coords = coords.map(function(v){return v.attributes;});
    return kdt.createKdTree(coords,distance,['lat','long']);
}

export default PriceEstimator;