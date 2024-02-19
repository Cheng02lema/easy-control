let barOption = {
		animation: true,
		color: ['#02ad81', '#bbe2e8', '#6cacde'],
		//backgroundColor: '#ffffff', // '#12cf96'
		grid: {
			top: 25, //距离顶部15px
			bottom: '20%', //距离底部15%
			left: '15%',
			right: "4%"
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['张三', '王武生', '刘德华', '小蜜蜂', '木鱼', '光头强', '葫芦娃']
			
		}],
		yAxis: {
			type: 'category',
			
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel:{
				show: false
			}
		},
		series: [{
			type: 'bar', 
			data: [22, 21, 20, 19, 18, 17, 16],
			
			itemStyle: {
				normal: {
					label: {
						show: true, //开启显示		
						position: 'top', //在上方显示		
						textStyle: { //数值样式			
							color: 'black',
							fontSize: 11
						}
					}
				}
			},
		}]
	};
	
	export default barOption