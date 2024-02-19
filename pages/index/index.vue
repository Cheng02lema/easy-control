<template>


	<view>
		<view>

			<view class="content">
				<!-- 顶部标题 -->
				<u-navbar :is-back="false" title="智慧农场" title-color="#ffffff" :background="background" back-text="返回">
					<view class="slot-wrap">


					</view>

				</u-navbar>




				<view class="main">




					<!-- 天气系统 -->
					<view class="title-bar">
						<view class="position">
							<view style="margin-left: 5rpx;">农场位置</view>
							<view class="name">
								<image :src="weatherIcon.position"></image><i>{{dikuai}}</i>
							</view>
						</view>

						<u-button class="btn" :custom-style="customStyle" @click="selectArea" :ripple="true"
							ripple-bg-color="#909399">
							<image style="height:30rpx ;"
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/地区选择2.png">
							</image>地区选择
						</u-button>

					</view>
					<view class="weather mypanel ">
						<view class="wleft">
							<view class="logo">
								<image :src="weatherIcon.logo"></image>
							</view>
							<view class="feelsLike">
								<view class="box">
									<i class="subtitle">实时气温</i>
									<!-- <image :src="weatherIcon.feelsLike"> -->
								</view>

								<i>{{weather.temp}} ℃</i>
							</view>

						</view>

						<view class="wcontent">
							<view class="wtop">

								<view class="temp">
									<i class="subtitle">天气：{{weather.text}}</i>
									<!-- <i>{{weather.vis}} ~ {{weather.temp}} ℃</i> -->
								</view>
								<view class="wind">
									<i class="subtitle">风向：{{weather.windDir}}
										<!-- <image :src="weatherIcon.wind"> -->
									</i>
									<!-- <i>{{weather.windScale}} 级</i> -->
								</view>

							</view>
							<view class="wbottom">
								<view class="humidity">
									<!-- <i>空气湿度<image :src="weatherIcon.humidity"></image></i>
											<i>{{weather.humidity}} %</i> -->
									<i class="subtitle">体感：{{weather.feelsLike}} ℃</i>
								</view>
								<view class="pressure">
									<!-- <i>气压<image :src="weatherIcon.pressure"></i>
											<i>{{weather.pressure}} 百帕</i> -->
									<i class="subtitle">{{weather.windScale}} 级</i>
								</view>

							</view>
						</view>
					</view>


					<!-- 实时监控菜单栏 -->
					<view class="title-bar">
						<view style="display: flex;">
							<image style="width: 40rpx;height:40rpx;margin-right: 8rpx;" src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/实时监控2.png"></image>
							<view class="title">
								
								实时监控
							</view>
						</view>
						
						<u-button class="btn" :custom-style="customStyle2" @click="moreMonitor" :ripple="true"
							ripple-bg-color="#909399">
							<image style="height:30rpx ;"
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/更多.png">
							</image>更多
						</u-button>

					</view>

					<!-- 实时监控视频 -->
					<view class="mypanel">

						<view class="controlDisplay">
							<view class="box">
								<video class="video" id="myVideo1" :src="src1" enable-danmu danmu-btn controls>
								</video>
							</view>
							<view class="box">
								<video class="video" id="myVideo2" :src="src2" enable-danmu danmu-btn controls>
								</video>
							</view>
						</view>


					</view>

					<view class="title-bar">
						<view style="display: flex;">
							<image style="width: 40rpx;height:40rpx;margin-right: 8rpx;" src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/inform.png"></image>
							<view class="title">
								
								通知预警
							</view>
						</view>

						

					</view>
					<view class="title-bar2">
						<view class="voice">
							<view class="secondTitle">语音播报</view>
												
							<u-switch size="40" @change="changeSwitch(switch_value)" 
								v-model="switch_value" active-color="#cfcfcf" inactive-color="#13ce66" active-value="1"
								inactive-value="0">
							</u-switch>
						</view>
						<u-button class="btn" :custom-style="customStyle2" @click="setAlert" :ripple="true"
							ripple-bg-color="#909399">
							<image
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/设置.png">
							</image>设置
						</u-button>
					
					</view>
				

					<!--大棚预警子组件-->
					<view class="homeAlert">


						<view class="wenshi_info">
							<view class="wenshi_title">温室大棚1</view>

							<leftAlert  :placeName="mqttData1.placeName" :wendu_minValue="mqttData1.wendu_minValue"
								:wendu_maxValue="mqttData1.wendu_maxValue" :wendu="mqttData1.wendu"
								:shidu_minValue="mqttData1.shidu_minValue" :shidu_maxValue="mqttData1.shidu_maxValue"
								:shidu="mqttData1.shidu" :guangzhao="mqttData1.guangzhao"
								:guangzhao_minValue="mqttData1.guangzhao_minValue"
								:guangzhao_maxValue="mqttData1.guangzhao_maxValue" :suanjiandu="mqttData1.suanjiandu"
								:suanjiandu_minValue="mqttData1.suanjiandu_minValue"
								:suanjiandu_maxValue="mqttData1.suanjiandu_maxValue" :co2="mqttData1.co2"
								:co2_minValue="mqttData1.co2_minValue.toFixed(1)"
								:co2_maxValue="mqttData1.co2_maxValue.toFixed(1)" :pm="mqttData1.pm"
								:pm_minValue="mqttData1.pm_minValue" :pm_maxValue="mqttData1.pm_maxValue">
							</leftAlert>
						</view>


						<view class="wenshi_info">
							<view class="wenshi_title">温室大棚2</view>
							<leftAlert :placeName="mqttData2.placeName" :wendu_minValue="mqttData2.wendu_minValue"
								:wendu_maxValue="mqttData2.wendu_maxValue" :wendu="mqttData2.wendu"
								:shidu_minValue="mqttData2.shidu_minValue" :shidu_maxValue="mqttData2.shidu_maxValue"
								:shidu="mqttData2.shidu" :guangzhao="mqttData2.guangzhao"
								:guangzhao_minValue="mqttData2.guangzhao_minValue"
								:guangzhao_maxValue="mqttData2.guangzhao_maxValue" :suanjiandu="mqttData2.suanjiandu"
								:suanjiandu_minValue="mqttData2.suanjiandu_minValue"
								:suanjiandu_maxValue="mqttData2.suanjiandu_maxValue" :co2="mqttData2.co2"
								:co2_minValue="mqttData2.co2_minValue.toFixed(1)"
								:co2_maxValue="mqttData2.co2_maxValue.toFixed(1)" :pm="mqttData2.pm"
								:pm_minValue="mqttData2.pm_minValue" :pm_maxValue="mqttData2.pm_maxValue">
							</leftAlert>
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

			</view>

		</view>
		<u-mask :show="loading" :custom-style="{background: 'rgb(255,255,255)'}">
			<view style="display: flex;justify-content: center;align-items: center;height: 100%;">
				<!-- <text style="color:#646464;">加载中</text> -->
				<u-loading mode="flower" size="60" />
			</view>

		</u-mask>
	</view>
</template>

<script>
	var plugin = requirePlugin("WechatSI")
	let manager = plugin.getRecordRecognitionManager();

	import mqtt from '@/api/mqtt.min.js' //引入mqtt文
	import {
		uuid
	} from '@/utils/random.js'
	import {
		shareNavBar
	} from '@/mixins/shareNavBar' //混入tabbar数据和顶部导航栏背景色配置
	//引入共享组件
	import {
		shareTabBar
	} from '@/mixins/myTabbar.js'
	
	import historyService from '@/api/history.js'

	// 报警组件
	import leftAlert from '@/components/left-alert/left-alert'

	import * as echarts from '@/components/echarts/echarts.simple.min.js'
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue'
	import lineOption from '@/common/echats/lineOption.js'

	export default {

		mixins: [shareNavBar, shareTabBar],

		components: {
			leftAlert,
			mpvueEcharts,

		},
		onLoad() {
			
			//监听全局事件
			uni.$on('event_alert',(e)=>{
				this.onAlert(e)
			})
			
			
		},
		mounted() {
			this.loading = false
			

		},
		
		data() {
			return {

				canvasId: '',
				// 加载中
				loading: true,
				
				info:'',
				// 控制语音播放
				flag:false,
				
				switch_value:false,

				show: false,
				show2: false,
				dikuai: 'aa',
				longitude: '116.41',
				latitude: '39.92',

				alert_total_wd: 0, //温度报警总数
				alert_total_sd: 0, //湿度度报警总数
				mqttData1: {
					placeName: '温室大棚1',
					type: 0,

					wendu: 0,
					wendu_minValue: 0,
					wendu_maxValue: 0,

					shidu_minValue: 0,
					shidu_maxValue: 0,
					shidu: 0,

					guangzhao: 0,
					guangzhao_minValue: 0,
					guangzhao_maxValue: 0,

					suanjiandu: 0,
					suanjiandu_minValue: 0,
					suanjiandu_maxValue: 0,

					co2: 0,
					co2_minValue: 0,
					co2_maxValue: 0,
				},
				mqttData2: {
					placeName: '温室大棚2',
					type: 0,

					wendu: 0,
					wendu_minValue: 0,
					wendu_maxValue: 0,

					shidu_minValue: 0,
					shidu_maxValue: 0,
					shidu: 0,

					guangzhao: 0,
					guangzhao_minValue: 0,
					guangzhao_maxValue: 0,

					suanjiandu: 0,
					suanjiandu_minValue: 0,
					suanjiandu_maxValue: 0,

					co2: 0,
					co2_minValue: 0,
					co2_maxValue: 0,
				}, //大棚2

				hight: '高',
				low: '低',
				wendu: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/温度.png',
				shidu: '湿度',
				greenhouse1: '温室大棚1',
				greenhouse2: '温室大棚2',

				alertHigh: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/高温叹号.png',
				alertLow: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/低温叹号.png',


				weather: {
					temp: null,
					text: null,
					feelsLike: null,
				},
				weatherIcon: {

					// logo: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/实时气温.png",
					logo: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/天气预报.png",
					
					pressure: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/大气压.png",
					wind: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/风速.png",
					feelsLike: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/温度.png",
					humidity: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/湿度.png",
					position: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/地点.png",

				},

				// 监控视频地址
				src1: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video5.mp4',
				src2: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video7.mp4',
				


				location: '101120101',


				customStyle: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '10rpx',
					backgroundColor: '#10c578',
					borderRadius: '65rpx',
					width: '200rpx',
					height: '62rpx',
					color: '#fff',
					fontSize: '23rpx',
					textAlign: 'center',
				},
				customStyle2: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '10rpx',
					backgroundColor: '#0099ff',
					borderRadius: '65rpx',
					width: '160rpx',
					height: '62rpx',
					color: '#fff',
					fontSize: '24rpx',
					textAlign: 'center',
				},



			}
		},
		onShow() {
			this.searchArea() // 查数据库获取位置信息
			console.log("this.dikuai=",this.dikuai)
			
		
			this.connect_mqtt() //页面加载链接mqtt服务
		},
		onHide() {
			if (this.client && this.client.isConnected) {
				this.client.disconnect()

			}
			this.client = null
		},

		methods: {




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
					
					
					var name = obj.placeName
					var type = obj.type

					
					that.mqttData1.type = type
					console.log(obj)
					if (name === '温室大棚1') {

						if (type == 3) {

							// that.$set(that.mqttData1,"wendu",obj.nValue)
							// that.$set(that.mqttData1,"wendu_minValue",obj.minValue)
							// that.$set(that.mqttData1,"wendu_maxValue",obj.maxValue)

							that.mqttData1.wendu = obj.nValue
							that.mqttData1.wendu_minValue = obj.minValue
							that.mqttData1.wendu_maxValue = obj.maxValue
							 
							 


						} else if (type == 2) {

							that.mqttData1.shidu = obj.nValue
							that.mqttData1.shidu_minValue = obj.minValue
							that.mqttData1.shidu_maxValue = obj.maxValue


						} else if (type == 1) {
							that.mqttData1.guangzhao = obj.nValue
							that.mqttData1.guangzhao_minValue = obj.minValue
							that.mqttData1.guangzhao_maxValue = obj.maxValue

						} else if (type == 4) {
							that.mqttData1.suanjiandu = obj.nValue
							that.mqttData1.suanjiandu_minValue = obj.minValue

						} else if (type == 5) {
							that.mqttData1.co2 = obj.nValue
							that.mqttData1.co2_minValue = obj.minValue
							that.mqttData1.co2_maxValue = obj.maxValue

						} else if (type == 6) {
							that.mqttData1.pm = obj.nValue
							that.mqttData1.pm_minValue = obj.minValue
							that.mqttData1.pm_maxValue = obj.maxValue

						}



					} else if (name === '温室大棚2') {

						if (type == 3) {

							that.mqttData2.wendu = obj.nValue
							that.mqttData2.wendu_minValue = obj.minValue
							that.mqttData2.wendu_maxValue = obj.maxValue


						} else if (type == 2) {

							that.mqttData2.shidu = obj.nValue
							that.mqttData2.shidu_minValue = obj.minValue
							that.mqttData2.shidu_maxValue = obj.maxValue


						} else if (type == 1) {
							that.mqttData2.guangzhao = obj.nValue
							that.mqttData2.guangzhao_minValue = obj.minValue
							that.mqttData2.guangzhao_maxValue = obj.maxValue

						} else if (type == 4) {
							that.mqttData2.suanjiandu = obj.nValue
							that.mqttData2.suanjiandu_minValue = obj.minValue
							that.mqttData2.suanjiandu_maxValue = obj.maxValue

						} else if (type == 5) {
							that.mqttData2.co2 = obj.nValue
							that.mqttData2.co2_minValue = obj.minValue
							that.mqttData2.co2_maxValue = obj.maxValue

						} else if (type == 6) {
							that.mqttData2.pm = obj.nValue
							that.mqttData2.pm_minValue = obj.minValue
							that.mqttData2.pm_maxValue = obj.maxValue

						}


					}



				})
				
				// console.log("调用了一遍connect_mqtt。。。。")
				// that.skvido()
				// console.log("that.$store.state.alertContent。。=",that.$store.state.alertContent)



			},
			
			
			onAlert(info){
				
				
				console.log("判断前this.flag=",this.flag)
				if(this.flag == false){
					
					this.flag = true
					console.log("判断后this.flag=",this.flag)
					console.log('语音报警info=',info)
					
					
					//调用语音
					var message=info.name+ info.msg
					
					plugin.textToSpeech({
						lang: "zh_CN",
						tts: true,
						content: message,
						success: (res) =>{   //这里要用箭头函数
							 
							let music = null;
							music = uni.createInnerAudioContext(); //创建播放器对象
							music.src = res.filename;
							music.play(); //执行播放
							music.onEnded(() => {
								
								
								//播放结束
								music = null;
								this.flag = false
								console.log("播放结束this.flag=",this.flag)
								
								
							});
							
							
						
						},
						fail: function(res) {
							// console.log("fail tts", res)
							this.flag = false
						}
					})
					
					
				}
							
				
				
			},
			// 数据库获取位置
			searchArea(){
				// 更新后查询并赋值
				var flag = 1 // 判断云函数执行哪个
				historyService.searchPosition(flag).then(x => {
					
					
				
						console.log("更新后再查询x=", x)
						
						// 设置共享属性
						
						this.dikuai = x.dikuai
						this.longitude = x.longitude
						this.latitude = x.latitude
						
						this.$store.commit("setLongitude",x.longitude)
						this.$store.commit("setLatitude",x.latitude)
						
						this.getWeather()
						
						
						
						
				
				
					
				
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

			// 实时天气
			getWeather() {
				var that = this
				// this.longitude = this.$store.state.longitude
				// this.latitude = this.$store.state.latitude
				
			


				var longitude = this.longitude.toString()
				var latitude = this.latitude.toString()
				console.log("天气longitude=",longitude)
				console.log("天气latitude=",latitude)
				


				var loactionid = longitude + ',' + latitude // 济南
				console.log("loactionid=", loactionid)

				// var loactionid = this.location 
				// console.log("loactionid=",loactionid)

				var key = 'eeef2840346948d4b0ebd0d43f531d69'
				var appID = 'wx51d6bc44dd7b5948'
				var appSecret = '79a19b73dda4cf1dceb6d17af3b94706'
				var id = 'HE2309090958021408'
				//  + '&cityid=' + loactionid

				uni.request({
					// url: 'https://www.yiketianqi.com/free/day?appid=' + key + '&appsecret=' + appSecret,
					// url:'https://devapi.qweather.com/v7/weather/now?location=济南&key='+ key,
					// url:'https://www.yiketianqi.com/free/day?appid=wx51d6bc44dd7b5948appsecret=79a19b73dda4cf1dceb6d17af3b94706unescape=1',

					url: 'https://devapi.qweather.com/v7/weather/now?location=' + loactionid + '&key=' + key,


					success: function(res) {
						/* that.setData({
							weather: res.data.HeWeather6[0].now.cond_txt
						}) */
						//that.weather=res.data.HeWeather6[0].now.cond_txt
						console.log(res.data.now)

						that.weather = res.data.now
						/* that.weather.text = res.data.now.text // 天气
						that.weather.windDir = res.data.now.windDir // 风向
						that.weather.windScale = res.data.now.windScale // 风级
						that.weather.feelsLike = res.data.now.feelsLike // 实时温度
						that.weather.temp = res.data.now.temp // 最高温度
						that.weather.vis = res.data.now.vis // 最低温度
						that.weather.humidity = res.data.now.humidity // 湿度
						that.weather.pressure = res.data.now.pressure // 气压 单位（百帕） */





					}
				})
			},


			addUser() {
				userService.funAdd(this.form).then(x => {
					console.log("peomise返回=", x)
				}).catch(e => {
					console.log("reject 返回=", e)
				})

			},
			// switch开关
			changeSwitch(value){
				
				if(value!=false){
					this.flag = true
				}else if(value == false){
					this.flag = false
				}
			},


			change() {
				uni.navigateTo({

					url: `/pages/modAlert/modAlert`

				})

			},

			selectArea() {
				uni.navigateTo({
					url: `/pages/selectArea/selectArea`
				})
			},

			setAlert() {
				uni.navigateTo({

					url: `/pages/modAlert/modAlert`

				})
			},
			moreMonitor(){
				uni.navigateTo({
					url: `/pages/monitor/monitor`
				})
			}

		




		},





	}
</script>

<style lang="scss" scoped>
	.stage {
		width: 100%;
		height: 30vh;

	}

	.voicebtn {
		height: 130upx;
		display: block;
		width: 130upx;
		line-height: 130upx;
		border-radius: 65upx;
		font-size: 50upx;
		position: absolute;
		top: 1060upx;
		left: 310upx;
	}

	.voicepad {
		height: 250upx;
		width: 680upx;
		background: #fff;
		margin: 30upx auto;
		border-radius: 8upx;
		color: #CCCCCC;
		padding: 20upx;
		font-size: 35upx;
	}



	// 全局
	.content {
		//background-color: #eeeeee;

		background: linear-gradient(#19cb81, #f4f8f8, #f4f8f8, #f4f8f8, );
		padding-top: 20rpx;
	}

	.mypanel {
		box-shadow: 0rpx 0rpx 4rpx 2rpx #eeeeee;
		border-radius: 20rpx;
		background-color: #ffffff;
		width: 100% !important;
		display: flex;
		justify-content: center;

	}

	.position {
		font-size: 30rpx;
		letter-spacing: 1rpx;
		font-family: 'Microsoft YaHei';
		margin-left: 10rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 5rpx;


		}

		i {
			font-size: 27rpx;
		}

		.name {
			display: flex;
			margin-top: 8rpx;
		}
	}


	.main {
		// display: flex;
		// flex-direction: column;
		// margin: 25rpx;
		// margin-top: 15rpx;
		// justify-content: center;
		margin: 20rpx;
		// margin-top: 0;
		border: 3rpx;
		padding: 20rpx;
		padding-top: 5rpx;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
		background-color: #fff;

	}

	.title-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// background-color: #007AFF;
		padding-top: 20rpx;
		padding-left: 15rpx;
		padding-right: 0rpx;
		padding-bottom: 20rpx;


		margin-top: 25rpx;

		.title {
			font-weight: bold;
			font-size: 35rpx;
			font-family: 'Microsoft YaHei';
			letter-spacing: 2rpx;



			.num {
				padding: 10rpx;
			}
		}
		

		

	}
	.btn {
		margin-top: 10rpx;
		margin-right: 10rpx;
	
		image {
			width: 36rpx;
			height: 35rpx;
			margin-right: 2rpx;
		}
	}
	.title-bar2{
		display: flex;
		padding-left: 25rpx;
		margin-top: 20rpx;
		
		justify-content: space-between;
		// margin-left: 30rpx;
		.voice{
			display: flex;
			
			.secondTitle{
				font-weight: bold;
				font-size: 29rpx;
				font-family: 'Microsoft YaHei';
				letter-spacing: 2rpx;
				margin-right: 10rpx;
				margin-top: 22rpx;
			}
		}
		
		
	}


	.navbar {
		width: 750rpx;
		height: 180rpx;
		margin: 0;


		//background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63));
	}






	.weather {
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 250rpx;


		margin-bottom: 30rpx;
		margin-top: 25rpx;

		image {
			width: 35rpx;
			height: 35rpx;
			margin-left: 3rpx;

		}

		i {
			font-size: 30rpx;
		}

		.wleft {
			// display: flex;
			text-align: center;

			.logo {
				text-align: center;
				margin-left: -40rpx;
				margin-top: 25rpx;

				image {

					width: 70rpx;
					height: 70rpx;
				}
			}

			.feelsLike {
				margin-right: 30rpx;
				margin-top: 15rpx;

				.box {
					display: flex;
					justify-content: center;
					align-items: center;
					padding-bottom: 5rpx;

					image {
						padding-left: 10rpx;
						padding-top: 5rpx;
					}
				}

				i {
					font-size: 33rpx;
				}

				i.subtitle {
					font-weight: bold;
				}
			}
		}


		.wcontent {
			text-align: center;



			.wtop {
				display: flex;
				justify-content: space-between;
				margin-top: 35rpx;
				margin-bottom: 10rpx;
				padding: 20rpx;
				text-align: center;
				color: #007AFF;
				// padding-top: 10rpx;



				.temp {

					margin-top: 5rpx;
					margin-right: 20rpx;
				}

				.wind {
					margin-left: 60rpx;
					margin-top: 5rpx;

					// background-color: #fd6c02;
					image {}

				}

			}

			.wbottom {
				// background-color:#ff0000;
				display: flex;
				justify-content: space-between;
				// padding-bottom: 40rpx;
				margin-top: 30rpx;
				text-align: center;

				.humidity {
					margin-left: 20rpx;
					//background-color: #a0cefc;

				}

				.pressure {
					margin-right: 70rpx;
				}
			}
		}


	}


	// 实时监控
	.controlDisplay {

		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 250rpx;
		width: 100%;
		padding: 20rpx;

		.box {
			.video {
				margin: 10rpx;
				width: 300rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
		}




	}



	/* 土壤湿度过低 */
	.shidu {

		display: flex;
		width: 100%;



		.alert-left {
			//min-height: 250rpx;
			padding: 20rpx;
			//background-color: #DD524D;
			width: 50%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.txt {
				margin-left: 10rpx;

				.txt-title {
					font-size: 30rpx;
					font-weight: bold;
				}

				.txt-subtitle {
					font-size: 22rpx;

					color: #1f94fe;
				}


			}
		}

		.alert-right {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;


			.btn-bg {

				display: flex;

				align-items: center;
				background-color: #eeeeee;
				border-radius: 30rpx;
				padding-left: 10rpx;
				padding-right: 10rpx;

			}
		}

	}


	.mypanel {
		margin-top: 20rpx;
		box-shadow: 2rpx 2rpx 4rpx 4rpx #eeeeee;
		// background-color: #ffffff;
		border-radius: 20rpx;

		background-color: #edfbed;
		// box-shadow: 3rpx 3rpx 3rpx 10rpx rgba(0, 0, 0, .4); 
		width: 100% !important;
		display: flex;
		justify-content: center;

	}

	.mypanel2 {
		margin-top: 20rpx;

		// box-shadow: 0rpx 0rpx 4rpx 2rpx #eeeeee;
		// border-top: 1rpx #eeeeee solid;
		border-top: 1rpx #eeeeee solid;
		border-radius: 20rpx;
		background-color: #f5fafa;
		width: 100% !important;
		display: flex;
		justify-content: center;
		height: 80rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;

		.front {
			position: absolute;
			left: 70rpx;
			height: 70rpx;
			width: 15%;
			background-color: #fd8556;
			border-radius: 60rpx;

			image {
				margin-top: 13rpx;
				margin-left: 20rpx;
				width: 48rpx;
				height: 48rpx;
			}
		}

		.blank {

			position: absolute;
			left: 160rpx;
			width: 26rpx;
			height: 70rpx;
			// background-color: #b7e2ff;
			background-color: #FFFFFF;

		}

		.middle {
			// padding:20rpx;
			line-height: 70rpx;
			height: 70rpx;
			padding-left: 126rpx;
			width: 88%;
			background-color: #f5e0e0;
			border-radius: 60rpx;
			font-size: 29rpx;
			// font-weight: bold;
		}


		// .warnIcon {
		// 	padding: 0;
		// 	position: absolute;
		// 	// bottom: 50rpx;
		// 	right: 65rpx;



		// 	image {
		// 		// margin-left: 5rpx;
		// 		width: 70rpx;
		// 		height: 70rpx;
		// 	}
		// }

	}

	.wenshi_info {
		padding: 3rpx;
		margin-top: 20rpx;
		border: 2rpx #eeeeee solid;
		box-shadow: 0rpx 0rpx 4rpx 2rpx #eeeeee;
		border-radius: 20rpx;

		.wenshi_title {
			margin: 25rpx;
			// margin-top: 30rpx;
			font-weight: bold;
			font-size: 30rpx;
			font-family: 'Microsoft YaHei';
		}
	}
</style>
