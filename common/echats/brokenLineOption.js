let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;
let data = [[base, Math.random() * 300]];
for (let i = 1; i < 20000; i++) {
  let now = new Date((base += oneDay));
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
}
option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  // title: {
  //   left: 'center',
  //   text: 'Large Ara Chart'
  // },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
	data: [],
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  // series: [
  //   {
  //     name: 'Fake Data',
  //     type: 'line',
  //     smooth: true,
  //     symbol: 'none',
  //     areaStyle: {},
  //     data: data
  //   }
  // ],
  series: [{
  	type: 'line', // 折线图
  	smooth: true,
  	// y轴数据
  	data: [120, 200, 150, 80, 70, 110, 130],
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
  }],
  
};