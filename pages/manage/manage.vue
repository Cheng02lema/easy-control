<template>
	<view>

		<view class="content">
			<!-- 顶部标题 -->
			<u-navbar :is-back="false" title="地块管理" title-color="#ffffff" :background="background" back-text="返回">
				<view class="slot-wrap">

				</view>
			</u-navbar>



			<view class="main">

				<view>
					<view class="topTitle">
						<view style="display: flex;margin-top: 10rpx;margin-left: 30rpx;">
							<image style="width: 40rpx;height:40rpx;margin-right: 8rpx;"
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/信息采集.png">
							</image>
							<view class="title">信息采集</view>
						</view>
						<!-- <u-icon size="30" name="arrow-right-double" style="margin-left: 8rpx;"></u-icon> -->
						<u-button class="btn" :custom-style="customStyle" @click="navAnalysis" :ripple="true"
							ripple-bg-color="#909399">
							<image
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/数据分析.png">
							</image>数据分析
						</u-button>
					</view>

					<soilTestItem :type="mqttData1.type" :placeName="mqttData1.placeName"
						:wendu_minValue="mqttData1.wendu_minValue" :wendu_maxValue="mqttData1.wendu_maxValue"
						:wendu="mqttData1.wendu" :shidu_minValue="mqttData1.shidu_minValue"
						:shidu_maxValue="mqttData1.shidu_maxValue" :shidu="mqttData1.shidu"
						:guangzhao="mqttData1.guangzhao" :guangzhao_minValue="mqttData1.guangzhao_minValue"
						:guangzhao_maxValue="mqttData1.guangzhao_maxValue" :suanjiandu="mqttData1.suanjiandu"
						:suanjiandu_minValue="mqttData1.suanjiandu_minValue"
						:suanjiandu_maxValue="mqttData1.suanjiandu_maxValue" :co2="mqttData1.co2"
						:co2_minValue="mqttData1.co2_minValue.toFixed(1)"
						:co2_maxValue="mqttData1.co2_maxValue.toFixed(1)" :pm="mqttData1.pm"
						:pm_minValue="mqttData1.pm_minValue" :pm_maxValue="mqttData1.pm_maxValue">
					</soilTestItem>
				</view>


				<view class="btnGroup">
					<view class="topTitle">

						<view style="display: flex;">
							<image style="width: 40rpx;height:40rpx;margin-right: 8rpx;"
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/greenhouse.png">
							</image>
							<view class="title">设备管理</view>
						</view>


						<!-- 消息提示 -->
						<u-toast ref="uToast" />

						<u-popup v-model="show" mode="center" width="500rpx" height="280rpx" border-radius="14">
							<view class="input">

								<u-input v-model="ItemName" placeholder="请输入设备名称" :type="type" :border="true"
									:height="height" :auto-height="autoHeight" />

								<view class="popupBtnGroup">

									<u-button class="popupBtn" @click="cancel" :hair-line="false" :ripple="true"
										:custom-style="customStyle2" ripple-bg-color="#909399">
										<image style="margin-right: 5rpx;"
											src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/取消.png">
										</image>取消
									</u-button>


									<u-button class="popupBtn" @click="save" :hair-line="false" :ripple="true"
										:custom-style="customStyle2" ripple-bg-color="#909399">
										<image style="margin-right: 5rpx;"
											src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/确定.png">
										</image>确定

									</u-button>

								</view>
							</view>
						</u-popup>




						<u-popup v-model="show2" mode="center" width="500rpx" height="280rpx" border-radius="14">
							<view class="input">

								<view class="delBtn">
									是否删除此设备？
								</view>

								<view class="popupBtnGroup">

									<u-button class="popupBtn" @click="cancel2" :hair-line="false" :ripple="true"
										:custom-style="customStyle2" ripple-bg-color="#909399">
										<image style="margin-right: 5rpx;"
											src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/取消.png">
										</image>取消
									</u-button>


									<u-button class="popupBtn" @click="deleteDevice" :hair-line="false" :ripple="true"
										:custom-style="customStyle2" ripple-bg-color="#909399">
										<image style="margin-right: 5rpx;"
											src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/确定.png">
										</image>确定

									</u-button>

								</view>
							</view>
						</u-popup>

						<u-button class="btn" :custom-style="customStyle" @click="deviceManage" :ripple="true"
							ripple-bg-color="#909399">
							<image
								src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/添加2.png">
							</image>添加设备
						</u-button>



					</view>



					<view class="device">

						<view v-for="item in deviceList" :key="index" class="deviceItem">
							<deviceItem :ItemName="item.ItemName" @myclick="deleteSelf" :iconid="index"></deviceItem>
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


		<u-mask :show="loading" :custom-style="{background: 'rgb(255,255,255)'}">
			<view style="display: flex;justify-content: center;align-items: center;height: 100%;">
				<!-- <text style="color:#646464;">加载中</text> -->
				<u-loading mode="flower" size="60" />
			</view>

		</u-mask>

	</view>
</template>

<script>
	import mqtt from '@/api/mqtt.min.js' //引入mqtt文
	import {
		uuid
	} from '@/utils/random.js'
	//引入共享组件
	import {
		shareTabBar
	} from '@/mixins/myTabbar.js'

	import {
		shareNavBar
	} from '@/mixins/shareNavBar' //混入tabbar数据和顶部导航栏背景色配置

	import soilTestItem from '@/components/soil-test-item/soil-test-item'
	import deviceItem from '@/components/device-item/device-item'
	import deviceService from '@/api/device.js'

	export default {
		mixins: [shareTabBar, shareNavBar],
		components: {
			soilTestItem,
			deviceItem,
		},

		onLoad() {

		},
		mounted() {

			deviceService.getDevice().then(x => {

				this.$store.commit("setUpdateDeviceList", x)
				this.deviceList = x
				console.log("一启动updateDeviceList=", this.$store.state.updateDeviceList)
				console.log("一启动this.deviceList=", this.deviceList)

			})
			this.loading = false



		},

		data() {
			return {
				// 加载中
				loading: true,

				// 控制弹出框
				show: false,
				show2: false,

				clickItemName: '',

				inputInfo: {
					ItemName: '',
					imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/开关.png",
				},
				ItemName: '',
				imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/开关.png",


				mqttData1: {
					placeName: '大棚1',
					type: 0,

					wendu: 25.6,
					wendu_minValue: -10,
					wendu_maxValue: 30,

					shidu_minValue: 0,
					shidu_maxValue: 100,
					shidu: 30.8,

					guangzhao: 537,
					guangzhao_minValue: 0,
					guangzhao_maxValue: 600,

					suanjiandu: 7.1,
					suanjiandu_minValue: 6,
					suanjiandu_maxValue: 8,

					co2: 873,
					co2_minValue: 500,
					co2_maxValue: 2000,

					pm: 36,
					pm_minValue: 0,
					pm_maxValue: 100,
				},
				mqttData2: {},
				itemList: [{
						ItemName: "土壤温度",
						num: "27℃",
						imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/土壤温度3.png",
					},
					{
						ItemName: "土壤湿度",
						num: "25.5%",
						imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/土壤湿度3.png",
					},
					{
						ItemName: "光照强度",
						num: "446Lux",
						imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/光照3.png",
					},
					{
						ItemName: "酸碱度",
						num: "7.1PH",
						imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/酸碱度3.png",
					},
					{
						ItemName: "二氧化碳浓度",
						num: "494ppm",
						imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/二氧化碳3.png",
					},
					{
						ItemName: "PM2.5",
						num: "45μg/m³",
						imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/pm3.png",
					},

				],
				deviceList: [
					// {
					// 	ItemName: "添加设备",
					// 	imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/添加.png",
					// },
				],
				customStyle: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					// marginTop: '20rpx',
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
					// marginTop: '20rpx',
					backgroundColor: '#f4f4f4',
					borderRadius: '14rpx',
					width: '160rpx',
					height: '62rpx',
					color: '#646464',
					fontSize: '23rpx',
					textAlign: 'center',
				},

			}

		},
		onShow() {
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


				this.client = mqtt.connect('wxs://www.vision0546.com:443/mqtt', options) //你自己的域名


				this.client.on('connect', (e) => {
					console.log('成功连接服务器!')
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
					//that.globalData.mqttData = packet.payload.toString()

					//获取收到的消息字符串转json对象
					var obj = JSON.parse(packet.payload.toString())
					var name = obj.placeName
					var type = obj.type
					that.mqttData1.type = type
					console.log(obj)
					if (name === '温室大棚1') {

						if (type == 3) {
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
							that.mqttData1.suanjiandu_maxValue = obj.maxValue

						} else if (type == 5) {
							that.mqttData1.co2 = obj.nValue
							that.mqttData1.co2_minValue = obj.minValue
							that.mqttData1.co2_maxValue = obj.maxValue

						} else if (type == 6) {
							that.mqttData1.pm = obj.nValue
							that.mqttData1.pm_minValue = obj.minValue
							that.mqttData1.pm_maxValue = obj.maxValue

						}


						// that.mqttData1 = obj
						// console.log("obj=",obj)

					}
					// if (name === '温室大棚2') {
					// 	that.mqttData2 = obj
					// 	console.log("mqttData2(大棚2)=", that.mqttData2)
					// }
					// if (name === '气象站') {
					// 	that.mqttData3 = obj
					// }

					//console.log("收到服务器消息：", this.mqttData)
					//this.client.end()

					// var topic = "mqtt/demo" //消息主题
					// var msg = "这是微信端发送的消息！！，所用订阅了testtopic主题的客户端都能接收到啊"
					// that.client.publish(topic, msg);

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

			// 数据分析按钮事件
			navAnalysis() {
				console.log("方法调用")
				uni.navigateTo({
					// 复制来的路径pages前要加 /
					url: "/pages/DataAnalysis/DataAnalysis"
				})
			},

			// 弹出框事件
			deviceManage() {
				this.show = true
			},
			cancel() {
				this.show = false
			},
			// 消息提示
			showToast() {
				this.$refs.uToast.show({
					title: '修改成功',
					type: 'primary',
					position: 'top',

				})
			},
			save() {

				deviceService.addDevice(this.ItemName, this.imgsrc).then(x => {

					//需要重新查询
					deviceService.getDevice().then(x => {

						this.$store.commit("setUpdateDeviceList", x)
						this.deviceList = x


					})


				}).catch(e => {
					console.log("add_reject 返回=", e)
				})

				this.show = false
				this.showToast()
			},

			// 点击设备 进行删除
			deleteSelf(ItemName) {
				this.clickItemName = ItemName

				this.show2 = true
			},
			cancel2() {
				this.show2 = false
			},
			deleteDevice() {

				var ItemName = this.clickItemName

				deviceService.delDevice(ItemName).then(x => {

					console.log("删除返回res=", x)
					// 删除后重新查询 并赋值
					deviceService.getDevice().then(x => {

						this.deviceList = x

					})


				}).catch(e => {
					console.log("del_reject 返回=", e)
				})




				this.show2 = false
				this.$refs.uToast.show({
					title: '删除成功',
					type: 'primary',
					position: 'top',

				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		position: fixed;
		left: 50%-12;
		top: 50%;
	}


	// 全局
	.content {
		//background-color: #eeeeee;

		background: linear-gradient(#19cb81, #f4f8f8, #f4f8f8, #f4f8f8);
		padding-top: 20rpx;
	}

	// 公用标题
	.topTitle {
		// margin-top: 15rpx;
		display: flex;
		justify-content: space-between;
		padding-top: 35rpx;
		padding-bottom: 20rpx;
		// margin-top: 20rpx;
		// background-color: #007AFF;
		// margin-bottom: -30rpx;

		.input {
			padding: 35rpx;
			padding-left: 45rpx;
			padding-right: 45rpx;


			.delBtn {
				text-align: center;
				font-size: 32rpx;
				margin-top: 10rpx;
			}


			.popupBtnGroup {
				display: flex;
				justify-content: space-between;
				margin-left: 20rpx;
				margin-top: 50rpx;



				.popupBtn {
					margin-top: 20rpx;
					margin-right: 70rpx;
					margin-left: 10rpx;
					width: 120rpx;

					image {
						width: 36rpx;
						height: 35rpx;
						margin-right: 2rpx;
					}
				}
			}


		}

		.btn {
			// margin-top: 5rpx;
			margin-right: 23rpx;

			image {
				width: 36rpx;
				height: 35rpx;
				margin-right: 2rpx;
			}
		}


	}

	.main {
		background-color: #fff;
		margin: 30rpx;
		border: 3rpx;
		border-radius: 20rpx;
		padding-bottom: 20rpx;



		.btnGroup {
			// box-shadow: 0rpx 0rpx 4rpx 2rpx #e3e3e3;
			border-radius: 20rpx;
			box-shadow: 0rpx 1px 2rpx 0 #cfcfcf;
			margin-left: 30rpx;
			margin-right: 20rpx;
			// margin-top: 25rpx;

			.device {

				// width: 666rpx;
				// height: 234rpx;
				// white-space: nowrap;
				display: flex;
				justify-content: space-between;

				height: 270rpx;
				padding: 20rpx;
				padding-left: 0rpx;
				overflow-x: scroll;

				.deviceItem {
					// background-color: #007AFF;
					width: 25%;
					margin-top: 35rpx;
					display: inline-block;
				}

			}
		}


	}

	// 公用左上角标题样式
	.title {

		font-weight: bold;
		font-size: 30rpx;
		letter-spacing: 2rpx;

	}
</style>



















	