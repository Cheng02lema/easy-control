<template>
	<view>
		<view class="content">

			<!-- 顶部标题 -->
			<u-navbar back-icon-color="#ffffff" title="数据分析" title-color="#ffffff" :background="background">
				<view class="slot-wrap">

				</view>
			</u-navbar>

			<view class="main">



				<view style="padding-top:5rpx;background-color: #FFFFFF;border-radius: 20rpx;">
					<view style="display: flex;margin-left: 30rpx;margin-top: 30rpx;margin-bottom: 20rpx;">
						<image style="width: 40rpx;height:40rpx;margin-right: 8rpx;" src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/数据.png"></image>
						<view class="topTitle">数据分析</view>
					</view>
					
					<view class="chartContent">
						<view class="btnGroup">
							<view class="selectTime">

								<view :class="[changeIndex==1?'timeButtonCilck':'timeButton']" @click="changeHour">小时
								</view>
								<view :class="[changeIndex==2?'timeButtonCilck':'timeButton']" @click="changeDay">天
								</view>
								<view :class="[changeIndex==3?'timeButtonCilck':'timeButton']" @click="changeMonth">月
								</view>

							</view>
							<view class="selectHome">
								<view :class="[choice==1?'homeButtonCilck':'homeButton']" @click="changeHome1">大棚1
								</view>
								<view :class="[choice==2?'homeButtonCilck':'homeButton']" @click="changeHome2">大棚2
								</view>
								<!-- <u-button :custom-style="customStyle2" @click="changeHome1">大棚1</u-button>
								<u-button :custom-style="customStyle2" @click="changeHome2">大棚2</u-button> -->
							</view>
						</view>
						<view class="chartTop">
							<view class="chartTitle">{{ItemName}}</view>
							<view class="unit">{{unit_y}} / {{time}}</view>
						</view>

						<cover-view class="curve">
							<mpvue-echarts @onInit="lineInit" @onclick="reload" canvasId="line" ref="lineChart" />
						</cover-view>

					</view>
					<view class="data">

						<chartDataItem :num="min" :unit="unit_y" :ItemName="itemInfo.min"></chartDataItem>
						<chartDataItem style="border-left: 1rpx  solid #d9d9d9;" :num="max" :unit="unit_y"
							:ItemName="itemInfo.max"></chartDataItem>
						<chartDataItem style="border-left: 1rpx  solid #d9d9d9;" :num="average" :unit="unit_y"
							:ItemName="itemInfo.average"></chartDataItem>

					</view>
					<view class="device">
						<view class="btn" v-for="(item,index) in btnList" :key="index">

							<dataButton @myclick="onMyclick" :imgsrc="item.imgsrc" :ItemName="item.ItemName"
								:btnId="index+1">
							</dataButton>

						</view>
					</view>
				</view>





			</view>






			<!-- 底部菜单 -->
			<view class="u-page">
				<!-- 所有内容的容器 -->

			</view>
			<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
			<!-- 黑字都是 myTabbar.js 中定义的共享属性 -->
			<u-tabbar v-model="current" :list="tabbarList" :mid-button="false" @change="onTabbarChange"
				active-color="#158402" inactive-color="#b9bdc1" icon-size=43>
			</u-tabbar>

		</view>
		<!-- 加载中 -->
		
		<u-mask :show="loading"  :custom-style="{background: 'rgb(255,255,255)'}">
		   <view style="display: flex;justify-content: center;align-items: center;height: 100%;">
		       <!-- <text style="color:#646464;">加载中</text> -->
		       <u-loading mode="flower" size="60" />
		   </view>
			
		</u-mask>
	</view>

</template>

<script>
	import historyService from '@/api/history.js'
	// import echarts from '@/components/echarts/echarts.js'

	import mqtt from '@/api/mqtt.min.js' //引入mqtt文
	import {
		uuid
	} from '@/utils/random.js'
	import {
		dateFormat,
		dateFormat2,
		stringToDate,
		GetDateByTimeSpan,
	} from '@/utils/datetime.js'


	//引入共享组件
	import {
		shareTabBar
	} from '@/mixins/myTabbar.js'

	import {
		shareNavBar
	} from '@/mixins/shareNavBar' //混入tabbar数据和顶部导航栏背景色配置

	import dataButton from '@/components/data-button/data-button.vue'
	import chartDataItem from '@/components/chart-data-item/chart-data-item.vue'

	import * as echarts from '@/components/echarts/echarts.simple.min.js'
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue'

	import lineOption from '@/common/echats/lineOption.js'
	import barOption from '@/common/echats/barOption.js'
	import nxOption from '@/common/echats/nxOption.js'
	import curveOption from '@/common/echats/curveOption.js'

	export default {

		mixins: [shareTabBar, shareNavBar],

		components: {
			dataButton,
			chartDataItem,
			mpvueEcharts,
			

		},

		onLoad() {
			
			// 页面加载链接mqtt服务
			this.connect_mqtt()
			
			


		},

		// onHide() {
		// 	if (this.client && this.client.isConnected) {
		// 		this.client.disconnect()

		// 	}
		// 	this.client = null
		// },
		mounted() {
			
			this.onMyclick(1)
			this.loading = false
			

		},

		data() {
			return {

				// 加载中
				loading: true,
				showContent: false,

				// 大棚选择
				choice: 1,

				// 温室大棚1数据
				dataList1: [],

				//温室大棚2数据
				dataList2: [],


				// list: [],
				// list1: [],
				// list2: [],
				// list3: [],
				// list4: [],
				// list5: [],
				// list6: [],

				sdate: new Date(),
				edate: new Date(),

				// 动态更换日期按钮样式
				changeIndex: 1,

				// 按钮索引
				currentType: 1,

				// 日期按钮索引
				changeTimeIndex: 1,


				// 单位
				ItemName: '-',
				unit_y: '-',
				time: '-',

				// 数值提取
				min: 0,
				max: 0,
				average: 0,


				btnList: [{
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/光照3.png',
						ItemName: '光照强度',
						unit_y: 'Lux',
						type: 1,
					},
					{
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/土壤湿度3.png',
						ItemName: '土壤湿度',
						unit_y: '%',
						type: 2,

					},
					{
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/土壤温度6.png',
						ItemName: '土壤温度',
						unit_y: '℃',
						type: 3,
					},

					{
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/酸碱度3.png',
						ItemName: '酸碱度',
						unit_y: 'PH',
						type: 4,
					},
					{
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/二氧化碳3.png',
						ItemName: 'CO₂浓度',
						unit_y: 'ppm',
						type: 5,
					},
					{
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/pm4.png',
						ItemName: 'PM2.5',
						unit_y: '(μg/m³)',
						type: 6,
					},
				],

				itemInfo: {
					min: '最低值',
					max: '最高值',
					average: '平均值'
				},



				dayInfo: {
					guangzhao_y: [],
					wendu_y: [],
					shidu_y: [],
					suanjiandu_y: [],
					co2_y: [],
					pm_y: [],

				},
				hourInfo: [],
				dayInfo: [],
				monthInfo: [],




			}
		},
		methods: {

			lineInit(e) {
				let {
					width,
					height
				} = e;
				let canvas = this.$refs.lineChart.canvas;
				echarts.setCanvasCreator(() => canvas);
				this.lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(this.lineChart);


				//  设置x,y数据
				this.lineChart.setOption(curveOption);


				this.$refs.lineChart.setChart(this.lineChart);
			},
			setCharts(choice) {


				if (choice == 1) {
					let y_data = []

					console.log("this.changeTimeIndex=", this.changeTimeIndex)
					// 日期按钮索引
					if (this.changeTimeIndex == 1) {

						this.hourInfo.find(x => {
							// console.log("x=",x)
							if (x[1] == "温室大棚1") {

								if (y_data.length <= 25) {
									y_data.push(x[0])
								}
								if (y_data.length > 25) {
									y_data.shift(x[0])
								}

							}
						})
						curveOption.series[0]['data'] = y_data

					} else if (this.changeTimeIndex == 2) {

						this.dayInfo.find(x => {
							// console.log("x=",x)
							if (x[1] == "温室大棚1") {

								if (y_data.length <= 7) {
									y_data.push(x[0])
								}
								if (y_data.length > 7) {
									y_data.shift(x[0])
								}

							}
						})
						curveOption.series[0]['data'] = y_data
						console.log("大棚1 Day_data=", y_data)


					} else if (this.changeTimeIndex == 3) {

						this.monthInfo.find(x => {
							// console.log("x=",x)
							if (x[1] == "温室大棚1") {

								if (y_data.length <= 12) {
									y_data.push(x[0])
								}
								if (y_data.length > 12) {
									y_data.shift(x[0])
								}

							}
						})
						curveOption.series[0]['data'] = y_data


					}




				} else if (choice == 2) {
					let y_data = []


					if (this.changeTimeIndex == 1) {


						this.hourInfo.find(x => {
							// console.log("x=",x)
							if (x[1] == "温室大棚2") {

								if (y_data.length <= 25) {
									y_data.push(x[0])
								}
								if (y_data.length > 25) {
									y_data.shift(x[0])
								}

							}
						})

						curveOption.series[0]['data'] = y_data


					} else if (this.changeTimeIndex == 2) {

						this.hourInfo.find(x => {
							// console.log("x=",x)
							if (x[1] == "温室大棚2") {

								if (y_data.length <= 7) {
									y_data.push(x[0])
								}
								if (y_data.length > 7) {
									y_data.shift(x[0])
								}

							}
						})
						curveOption.series[0]['data'] = y_data



					} else if (this.changeTimeIndex == 3) {

						this.hourInfo.find(x => {
							// console.log("x=",x)
							if (x[1] == "温室大棚2") {

								if (y_data.length <= 12) {
									y_data.push(x[0])
								}
								if (y_data.length > 12) {
									y_data.shift(x[0])
								}

							}
						})
						curveOption.series[0]['data'] = y_data

					}


				}

				this.getData()
				this.lineChart.setOption(curveOption)
				this.$refs.lineChart.setChart(this.lineChart)


			},



			// 组件按钮点击事件
			onMyclick(btnId) {

				// 按钮索引
				this.currentType = btnId

				// 图表标题单位赋值
				this.unit_y = this.btnList[btnId - 1].unit_y
				this.ItemName = this.btnList[btnId - 1].ItemName


				if (this.changeTimeIndex == 1) {

					this.changeHour().then((res) => {

						this.hourInfo = res
						// console.log("hourInfo=",this.hourInfo)
						this.setCharts(this.choice)

					})

				} else if (this.changeTimeIndex == 2) {

					this.changeDay().then((res) => {

						this.dayInfo = res
						// console.log("this.dayInfo=",this.dayInfo)
						this.setCharts(this.choice)

					})

				} else if (this.changeTimeIndex == 3) {

					this.changeMonth().then((res) => {

						this.monthInfo = res
						this.setCharts(this.choice)


					})

				}



			},

			getData() {
				// var min = 0
				// var max = 0
				// var average = 0
				var sum = 0
				let list = curveOption.series[0]['data']
				this.min = Math.min.apply(null, list)
				this.max = Math.max.apply(null, list)

				for (var i = 1; i < list.length; i++) {

					sum += parseFloat(list[i]);

				}
				this.average = parseFloat(sum / list.length).toFixed(1)
			},

			connect_mqtt() {
				let that = this
				const options = {
					connectTimeout: 4000, //超时时间
					clientId: uuid(30, 16), //随机生成30位数值
					username: 'admin', //用户名
					password: 'sa123456', //密码
				}


				this.client = mqtt.connect('wxs://www.vision0546.com:443/mqtt', options)

				this.client.on('connect', (e) => {
					console.log('成功连接服务器2!')
					console.log("client", this.client)

				})

				this.client.subscribe('mytopic', {
					qos: 0
				}, function(err) {
					if (!err) {
						console.log("订阅成功:mytopic")
					}
				})
				//接受订阅的消息
				this.client.on('message', function(mytopic, message, packet) {


					//获取收到的消息字符串转json对象
					var obj = JSON.parse(packet.payload.toString())
					// var name = obj.placeName
					// var type = obj.type
					// console.log("name=", name)


					// that.$set(that.mqttData1,"type",obj.type)
					// that.mqttData1.type = type
					console.log('obj=', obj)
					let data = {}
					// let data2 = {}


					// data.createTime = new Date(date.replace(/-/g, '/'));
					// data.createTime = dateFormat2(new Date())
					data.createTime = new Date()
					// data.createTime = new Date()
					data.nValue = obj.nValue
					data.placeName = obj.placeName
					data.type = obj.type


					// 添加 mqtt数据 到 数据库
					historyService.funAdd(data).then(x => {
						console.log("peomise返回=", x)
					}).catch(e => {
						console.log("reject 返回=", e)
					})



				})



			},

			//发布mqtt消息
			mqtt_sendMessage() {


				var topic = "mqtt/demo" //消息主题
				var msg = "这是微信端【按钮】发送的消息！！"
				//消息到主题 SN69143809293670state 消息为 setr=xxxxxxx1xx
				/* this.client.publish(topic, msg, {
					qos: 0,
					retain: true
				}); */

				if (this.client) {
					console.log("client", this.client)
					this.client.publish(topic, msg);
				} else {
					this.connect_mqtt()
				}






			},

			// 日期按小时查询 按钮点击事件
			changeHour() {


				const that = this
				// 控制按钮激活样式
				this.changeIndex = 1
				// 日期选择按钮索引
				this.changeTimeIndex = 1

				// 设置表头单位
				this.time = '小时'


				var time1 = GetDateByTimeSpan(0) + " 00:00:00"
				this.sdate = stringToDate(time1)
				console.log("sdate=", this.sdate)

				var time2 = GetDateByTimeSpan(1) + " 23:59:59"
				this.edate = stringToDate(time2)
				console.log("edate=", this.edate)

				curveOption.xAxis[0]['data'] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
					'14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
				]

				return new Promise((resove, reject) => {

					historyService.searchConfig(this.sdate, this.edate, this.currentType).then(e => {


						let list = []
						// let list1 = []

						e.find(x => {

							list.push([x.nValue, x.placeName])

						})

						//that.hourInfo = list
						resove(list)

					})





				})





			},

			// 日期按天查询 按钮点击事件
			changeDay() {


				const that = this
				// 控制按钮激活样式
				this.changeIndex = 2
				// 日期选择按钮索引
				this.changeTimeIndex = 2


				// 设置表头单位
				this.time = '天'


				var time1 = GetDateByTimeSpan(-5) + " 00:00:00"
				this.sdate = stringToDate(time1)
				console.log("sdate=", this.sdate)

				var time2 = GetDateByTimeSpan(1) + " 23:59:59"
				this.edate = stringToDate(time2)
				console.log("edate=", this.edate)

				curveOption.xAxis[0]['data'] = ['1', '2', '3', '4', '5', '6', '7']

				return new Promise((resove, reject) => {

					historyService.searchConfig(this.sdate, this.edate, this.currentType).then(e => {


						let list = []
						// let list1 = []

						e.find(x => {

							list.push([x.nValue, x.placeName])
							// console.log("dayList=",list)

						})

						//that.hourInfo = list
						resove(list)

					})



				})



			},

			// 日期按月查询 按钮点击事件
			changeMonth() {

				const that = this
				// 控制按钮激活样式
				this.changeIndex = 3
				// 日期选择按钮索引
				this.changeTimeIndex = 3

				// 设置表头单位
				this.time = '月'


				var time1 = GetDateByTimeSpan(-180) + " 00:00:00"
				this.sdate = stringToDate(time1)
				console.log("sdate=", this.sdate)

				var time2 = GetDateByTimeSpan(0) + " 23:59:59"
				this.edate = stringToDate(time2)
				console.log("edate=", this.edate)

				curveOption.xAxis[0]['data'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

				return new Promise((resove, reject) => {

					historyService.searchConfig(this.sdate, this.edate, this.currentType).then(e => {


						let list = []

						e.find(x => {

							list.push([x.nValue, x.placeName])

						})

						//that.hourInfo = list
						resove(list)

					})



				})

			},

			changeHome1() {
				this.choice = 1
				this.onMyclick(this.currentType)
			},
			changeHome2() {
				this.choice = 2
				this.onMyclick(this.currentType)

			}




		}
	}
</script>

<style lang="scss" scoped>
	// 全局
	.content {
		//background-color: #eeeeee;

		background: linear-gradient(#19cb81, #f4f8f8, #f4f8f8, #f4f8f8);
		// background-color: #19BE6B;
		// padding-top: 20rpx;
	}





	.main {

		// background-color: #18B566;
		margin: 30rpx;
		border: 3rpx;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
		
		.topTitle {
			// left: 10rpx;
			// top: 10rpx;
			// padding: 10rpx;
			// padding-left: 15rpx;
			// padding-right: 15rpx;
			font-weight: bold;
			font-size: 30rpx;
			letter-spacing: 2rpx;
			// margin-top: 35rpx;
			// letter-spacing: 2rpx;
			// border-radius: 15rpx;
			// margin-left: 30rpx;
			

		}

		.chartContent {

			// border-radius: 20rpx;
			// box-shadow: 0rpx 0rpx 8rpx 0 #cfcfcf;
			padding: 25rpx;
			padding-bottom: 0rpx;
			// background-color: #007AFF;

			.btnGroup {

				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.selectTime {
					display: flex;
					margin-bottom: 15rpx;
					border-radius: 60rpx;
					// border: 1rpx solid;
					padding-top: 3rpx;
					padding-left: 8rpx;
					padding-right: 8rpx;
					height: 65rpx;
					width: 250rpx;
					display: flex;
					justify-content: center;
					background-color: #a8d3ff;

					.timeButton {
						height: 50rpx;
						width: 90rpx;
						text-align: center;
						margin-top: 5rpx;
						line-height: 50rpx;
						color: #000;

						border-radius: 40rpx;

						backgroundColor: '#a8d3ff';


					}

					.timeButtonCilck {
						height: 50rpx;
						width: 90rpx;
						text-align: center;
						margin-top: 5rpx;
						line-height: 50rpx;
						color: #000;

						border-radius: 40rpx;

						background-color: #FFFFFF;


					}

					// .btn{
					// 	height: 60rpx;
					// 	color: #000;
					// 	padding: 0;
					// 	backgroundColor: '#a8d3ff';
					// 	fontSize: '24rpx';
					// }

				}

				.selectHome {
					display: flex;
					margin-bottom: 15rpx;
					border-radius: 80rpx;
					padding-top: 3rpx;
					padding-left: -8rpx;
					padding-right: -8rpx;
					height: 65rpx;
					width: 200rpx;
					display: flex;
					justify-content: center;
					background-color: #8dd6be;

					.homeButton {
						height: 50rpx;
						width: 90rpx;
						text-align: center;
						margin-top: 5rpx;
						line-height: 50rpx;
						color: #000;
						border-radius: 40rpx;

						font-size: 27rpx;
					}

					.homeButtonCilck {
						height: 50rpx;
						width: 90rpx;
						text-align: center;
						margin-top: 5rpx;
						line-height: 50rpx;
						color: #000;
						border-radius: 40rpx;
						background-color: #FFFFFF;
						font-size: 27rpx;
					}
				}
			}


			.chartTop {
				display: flex;
				justify-content: center;

				.chartTitle {
					font-size: 32rpx;
					// font-weight: bold;
					font-family: 'Microsoft YaHei';
					margin-right: 30rpx;
					
				}
			}




			.curve {
				// width: 600rpx;
				height: 450rpx;
				// margin-left: 20rpx;
				margin-top: 20rpx;


			}


		}

		.data {
			display: flex;
			justify-content: space-between;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 8rpx 0 #cfcfcf;
			margin: 30rpx;
			margin-top: 0;
			margin-bottom: 25rpx;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			// padding-top: -20rpx;

		}

		.device {
			// background-color: #19BE6B;
			width: 640rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			// margin-top: 30rpx;
			padding: 25rpx;
			padding-left: 110rpx;
			margin-bottom: 200rpx;

			.btn {
				width: 33%;
			}

		}




	}
</style>
