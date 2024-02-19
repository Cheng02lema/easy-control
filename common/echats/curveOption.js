import * as echarts from '@/components/echarts/echarts.simple.min.js'

let curveOption = {

	animation: true, // 是否动画
	color: ['#02ad81', '#bbe2e8', '#6cacde'],


	// 图标的网格线位置
	grid: {
		top: 25, // 距离顶部15px
		bottom: '20%', // 距离底部15%
		left: '1%',
		right: "1%"
	},
	calculable: false,

	// 图例
	legend: {
		type: 'scroll',
		orient: 'vertical',
		right: 10,
		top: 20,
		bottom: 20,
		data: ['图例一']
		// ...
	},


	xAxis: [{
		type: 'category',

		// x轴数据
		// data: ['1', '2', '3', '4', '5', '6', '7']
		data: [],

	}],
	yAxis: {
		type: 'value',
		axisLine: {
			show: false // 是否显示纵向网格线
		},
		axisTick: {
			show: false // 是否显示标尺间隔短竖线
		},
		axisLabel: {
			show: false // 是否显示标记文本
		}
	},


	series: [{
		type: 'line', // 折线图
		smooth: true,
		// y轴数据
		data: [120, 200, 150, 80, 70, 110, 130],
		areaStyle: {
			color:'#bbe2e8'
		},

		itemStyle: {
			normal: {
				label: {
					show: true, //开启显示		
					position: 'top', //在上方显示		
					textStyle: { //数值样式			
						color: 'black',
						fontSize: 10,
					}
				}
			},
			color: '#02ad81',




		},
	}]
};

export default curveOption
