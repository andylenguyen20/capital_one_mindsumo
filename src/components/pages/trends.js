import React, { Component } from 'react';
import Chart from '../../components/graphComponents/Chart';

/*
** PURPOSE: This file graphs three trends that I found interesting from the airbnb data
** METHODOLOGY: I used multiple vba scripts to gather review scores, daily costs, and total number of reviews for each listing id.
**  I then cross-referenced these listing ids to their respective neighborhoods (using vba scripts). From this, I generated three data sets
**  which will appear on the three graphs. I graphed these datasets using a Chart library from an npm package.
*/

class Trends extends Component {
	constructor(props){
    super(props);
    this.state = {
      chartData:{}
    }
  }
  componentWillMount(){
    this.getChartData();
  }
  getChartData(){
    this.setState({
      averageReviewScoreData:{
        labels: ['Bayview', 'Bernal Heights', 'Castro/Upper Market', 'Chinatown', 'Crocker Amazon',
        'Diamond Heights', 'Downtown/Civic Center','Excelsior','Financial District','Glen Park', 'Golden Gate Park',
        'Haight Ashbury', 'Inner Richmond', 'Inner Sunset', 'Lakeshore', 'Marina', 'Mission', 'Nob Hill', 'Noe Valley', 
        'North Beach', 'Ocean View', 'Outer Mission', 'Outer Richmond', 'Outer Sunset', 'Pacific Heights','Parkside',
        'Potrero Hill', 'Presidio', 'Presidio Heights', 'Russian Hill', 'Seacliff', 'South of Market', 'Treasure Island/YBI',
        'Twin Peaks', 'Visitacion Valley', 'West of Twin Peaks','Western Addition'],
        datasets:[
          {
            data:[
              91.0106382978723,96.1515151515152,96.1553884711779,93.16,91.2173913043478,97,89.656836461126,92.3023255813954,
              93.47,96.0144927536232,87.75,94.0441640378549,94.3532110091743,94.9354838709677,92.4117647058823,95.1702127659574,
              95.2992874109264,93.4852320675106,95.8165137614679,94.2536231884058,92.010989010989,95.3812949640288,94.6778523489933,
              94.3317535545024,94.7575757575758,93.7083333333333,96.0896860986547,97.6666666666667,96.3548387096774,94.9873417721519,
              95.2777777777778,93.8274231678487,91.6470588235294,96.2179487179487,94.21875,96.0531914893617,95.3120689655172
            ],
            backgroundColor: 'rgba(255,99,132,0.6)'
          },
        ]
      },
      averageDailyCostData:{
        labels: ['Bayview', 'Bernal Heights', 'Castro/Upper Market', 'Chinatown', 'Crocker Amazon',
        'Diamond Heights', 'Downtown/Civic Center','Excelsior','Financial District','Glen Park', 'Golden Gate Park',
        'Haight Ashbury', 'Inner Richmond', 'Inner Sunset', 'Lakeshore', 'Marina', 'Mission', 'Nob Hill', 'Noe Valley', 
        'North Beach', 'Ocean View', 'Outer Mission', 'Outer Richmond', 'Outer Sunset', 'Pacific Heights','Parkside',
        'Potrero Hill', 'Presidio', 'Presidio Heights', 'Russian Hill', 'Seacliff', 'South of Market', 'Treasure Island/YBI',
        'Twin Peaks', 'Visitacion Valley', 'West of Twin Peaks','Western Addition'],
        datasets:[
          {
            data:[
              106.329787234043,182.396694214876,230.5664160401,181.06,116.347826086957,191.529411764706,164.699731903485,112.248062015504,
              227.14,209.942028985507,235.875,215.570977917981,198.697247706422,200.064516129032,116.617647058824,284.434042553191,192.648456057007,
              204.919831223629,225.960244648318,225.376811594203,128.340659340659,157.517985611511,172.906040268456,152.725118483412,259.054545454545,
              226.8125,243.452914798206,618.333333333333,238.838709677419,272.892405063291,183.666666666667,210.10401891253,77.8235294117647,
              186.102564102564,117.5625,165.212765957447,212.981034482759
            ],
            backgroundColor: 'rgba(230,50,50,0.6)'
          },
        ]
      },
      totalReviewsData:{
        labels: ['Bayview', 'Bernal Heights', 'Castro/Upper Market', 'Chinatown', 'Crocker Amazon',
        'Diamond Heights', 'Downtown/Civic Center','Excelsior','Financial District','Glen Park', 'Golden Gate Park',
        'Haight Ashbury', 'Inner Richmond', 'Inner Sunset', 'Lakeshore', 'Marina', 'Mission', 'Nob Hill', 'Noe Valley', 
        'North Beach', 'Ocean View', 'Outer Mission', 'Outer Richmond', 'Outer Sunset', 'Pacific Heights','Parkside',
        'Potrero Hill', 'Presidio', 'Presidio Heights', 'Russian Hill', 'Seacliff', 'South of Market', 'Treasure Island/YBI',
        'Twin Peaks', 'Visitacion Valley', 'West of Twin Peaks','Western Addition'],
        datasets:[
          {
            data:[
              4074, 12428, 16812, 575, 1103, 452, 8742, 3991, 2891, 2379, 292, 12154, 7230, 4471, 592,
              6178, 28392, 5303, 11359, 4132, 3073, 5083, 6422, 8495, 4782, 3072, 9370, 158, 1323,
              3778, 886, 9815, 149, 2399, 1444, 3785, 18619
            ],
            backgroundColor: 'rgba(23,240,50,0.6)'
          },
        ]
      }

	});
  }
  render() {
    return (
      <div className = "container-fluid">
      	<h1>
      		Trends Page Contents
      	</h1>
      	<p>
      		On this page, I've graphed three interesting trends that I've personally preprocessed from the given Airbnb data. These trends include:
      		1) Average review score of the listings in each neighborhood (pie chart)
      		2) Average cost of listings in each neighborhood (bar graph)
      		3) Total number of reviews of listings in each neighborhood (bar graph)
      	</p>
      	<Chart chartData = {this.state.averageReviewScoreData} purpose = 'Average review score'/>
      	<Chart chartData = {this.state.averageDailyCostData} purpose = 'Average daily cost ($)'/>
      	<Chart chartData = {this.state.totalReviewsData} purpose = 'Total reviews'/>
      </div>
    );
  }
}

export default Trends;