import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
	constructor(props){
		super(props);
		this.state = {
			chartData:props.chartData
		}
	}
	static defaultProps = {
		displayTitle:true,
		displayLegend:false,
		purpose: 'Average review score'
	}
	render(){
		return(
			<div className = "chart">
				<Bar
				data = {this.state.chartData}
				options={{
					title:{
						display:this.props.displayTitle,
						text:this.props.purpose + ' in each neighborhood',
						fontsize:25
					},
					legend:{
						display:this.props.displayLegend,
					},
				}}
				/>
			</div>
		)
	}
}
export default Chart;