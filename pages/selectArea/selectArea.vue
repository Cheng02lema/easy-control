<template>
	<view>

		<view class="content">

			<!-- 顶部标题 -->
			<u-navbar back-icon-color="#ffffff" title="地区选择" title-color="#ffffff" :background="background">
				<view class="slot-wrap">

				</view>
			</u-navbar>


			<view class="main">


				<!-- 地块位置 -->
				<view class="position">

					<view class="btnItem">
						<i class="title">地块位置</i>

					</view>

					<view class="btnItem" v-if="areaInfo.dikuai.length>0">
						<!-- <i class="title">地块位置</i> -->
						<u-icon :label="areaInfo.dikuai" size="42"
							name="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/icon/地点.png">
						</u-icon>


					</view>
					<view class="btnItem2">
						<view style="width: 450rpx;">
							<u-input style="width: 450rpx;" v-model="searchword" type="text" placeholder="查找地块位置"
								maxlength=200 :border="border" :height="height" />
						</view>
						<u-button class="btn" :custom-style="customStyle" @click="queryDropdown">
							<u-icon name="search" size="28"></u-icon>
						</u-button>


					</view>


					<map class="map" @labeltap="markertap" @markertap="markertap" :latitude="areaInfo.latitude"
						:longitude="areaInfo.longitude" :circles="dots" scale="8" show-location="true"
						:markers="markers" :polyline="polyline">
					</map>

				</view>

				<!-- 地块概览 -->
				<view class="overview">

					<view style="display: flex;height: 50rpx;margin-bottom: 10rpx;">
						<image style="width: 40rpx;height:32rpx;margin-top: 4rpx;"
							src="cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/土地.png">
						</image>
						<view>
							<i class="title">地块概览</i>
						</view>
					</view>


					<canvas type="webgl" v-show="!loading" class="stage" id="c" @touchstart="touchStart"
						@touchmove="touchMove" @touchend="touchEnd" @touchcancel="touchCancel" @longtap="longTap"
						@tap="tap" show-location="true" :markers="markers">

					</canvas>

					<canvas type="2d" id="txt" class="txt stage" v-show="false"></canvas>



				</view>






			</view>



			<!-- 底部菜单 -->

			<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
			<!-- 黑字都是 myTabbar.js 中定义的共享属性 -->
			<u-tabbar v-model="current" :list="tabbarList" :mid-button="false" @change="onTabbarChange"
				active-color="#158402" inactive-color="#b9bdc1" icon-size=43>
			</u-tabbar>



		</view>

		<!-- <u-mask :show="loading" :custom-style="{background: 'rgb(255,255,255)'}">
			<view style="display: flex;justify-content: center;align-items: center;height: 100%;">

				<u-loading mode="flower" size="60" />
			</view>

		</u-mask> -->

		<u-action-sheet :list="tipsList" v-model="showtips" @click="confirm" @close="close"></u-action-sheet>
		<!-- <u-select :list="tipsList" v-model="showtips"  </u-select> -->

	</view>
</template>

<script>
	import * as THREE from '@/libs/three.weapp.js'
	import amap from '../../libs/amap-wx.130.js'

	// import renderGltf from './loadgLTF.js'
	// import renderSprite from './sprite.js'
	// import renderObj from './loadObj.js'
	// import render3d from './threeCore.js'
	import TreeBase from './threejsBase.js'
	import mqtt from '@/api/mqtt.min.js' //引入mqtt文

	//引入共享组件
	import {
		shareTabBar
	} from '@/mixins/myTabbar.js'

	import {
		shareNavBar
	} from '@/mixins/shareNavBar' //混入tabbar数据和顶部导航栏背景色配置

	import modAlert from '@/components/mod-alert/mod-alert'

	// 引入api
	import alertService from '@/api/alert.js'
	import historyService from '@/api/history.js'

	export default {

		mixins: [shareTabBar, shareNavBar],
		components: {

		},

		onLoad() {

			if (this.amap == null) {

				this.amap = new amap.AMapWX({
					key: this.key

				})


				//获取当前位置，并在地图标记
				//this.getUseLocation()

				//根据地块所在地名查询经纬度，并自动定位地图到该位置

				this.getLngLatByAddress(this.areaInfo.dikuai)


			}

			// 接收消息
			uni.$on("loadok", () => {
				this.loading = false
			})
			uni.createSelectorQuery()
				.select('#c')
				.node()
				.exec((res) => {

					let canvasId = res[0].node._canvasId
					// console.log("canvasId=", canvasId)
					const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
					this.canvasId = canvasId

					canvas.style.height = 350
					// this.canvasId = canvasId
					// //renderCube(canvas, THREE)
					//renderGltf(canvas, THREE)
					//renderSprite(canvas, THREE)
					//renderObj(canvas, THREE)
					new TreeBase(canvas, 0.3).start()

				})


			// 查数据库获取当前位置
			this.searchArea()



		},

		onUnload() {
			// this.three.THREE().global.unregisterCanvas(this.canvasId)
			THREE.global.unregisterCanvas(this.canvasId)
		},


		data() {
			return {



				amap: null,
				key: 'b53b73b980dbedb523fb3f5fc6b4e5f5',
				key_webjsApi: 'c31c3294f8e73643d6f8dfd1058eedb3', //高德 web服务接口
				amap_query_url: 'http://restapi.amap.com/v3/geocode/geo?key=23fc54788b40697423fb18538c99082af&s=rsv3&city=35&address=',
				//http://restapi.amap.com/v3/geocode/geo?key=2875cbe5f112de8a7875632586e5e93e&s=rsv3&city=35&address=福建省霞浦县水门畲族乡

				// 加载中
				loading: true,
				// showContent: false,
				imgsrc: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/选择地点.png",
				customStyle: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '10rpx',
					backgroundColor: '#66c1ff',
					borderRadius: '15rpx',
					width: '60rpx',
					height: '58rpx',
					color: '#fff',
					fontSize: '24rpx',
					textAlign: 'center',
				},
				inputvalue: '',
				//地块所在地名

				// dikuai: '济南市',
				searchword: '', //搜索框文本
				type: 'select',
				showtips: false,
				border: true,
				height: 55,
				// 提示内容数组
				tipsList: [],


				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				// latitude: 36.614613,
				// longitude: 116.96568,

				// 存入数据库的位置对象
				areaInfo: {
					dikuai: '',
					latitude: -1,
					longitude: -1,
					flag: 1,
				},

				markers: [],
				covers: [{
					id: 1,
					latitude: 36.614613,
					longitude: 116.96568,
					iconPath: ''
				}, ],

			}

		},
		methods: {

			//根据地址名称查询所在经纬度（通过高德web接口）
			getLngLatByAddress(addressName) {

				uni.request({
					url: this.amap_query_url + addressName,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
					},
					success: res => {
						if (res.data && res.data.geocodes && res.data.geocodes.length > 0) {

							console.log("高德返回addressName的经纬度位置信息=", res.data.geocodes[0].location);
							let location = res.data.geocodes[0].location.split(',')

							let marker = {
								longitude: location[0],
								latitude: location[1],

								iconPath: this.iconPath
							}
							this.areaInfo.longitude = location[0]
							this.areaInfo.latitude = location[1]


							this.markers.push(marker)
						}

					},
				})
			},

			//选择结束
			confirm(e) {
				console.log('选择结果=', this.tipsList[e]);
				let sel = this.tipsList[e]

				this.areaInfo.dikuai = this.tipsList[e].text
				this.areaInfo.longitude = this.tipsList[e].lng
				this.areaInfo.latitude = this.tipsList[e].lat

				// 点击确定位置后.更新数据库数据
				this.save()

				// console.log("代码this.tipsList[e].adcode=",this.tipsList[e].adcode)


				this.searchword = '' //清空搜索框文本


				this.tipsList = [] //清空api近似查询结果集
				this.showtips = false
				this.loading = false //显示三维，因为webgl会覆盖sheeet

				//地图中心定位到选定位置
				if (sel.lng && sel.lat) {
					this.areaInfo.longitude = parseFloat(sel.lng)
					this.areaInfo.latitude = parseFloat(sel.lat)
					// console.log("res longitude=", this.longitude)
					// console.log("res latitude=", this.latitude)
				}



			},
			save() {



				alertService.updatePosition(this.areaInfo)
				this.searchArea()



			},
			searchArea() {
				// 更新后查询并赋值
				var flag = 1 // 判断云函数执行哪个
				historyService.searchPosition(flag).then(x => {

					console.log("更新后再查询x=", x)

					// 设置共享属性
					this.areaInfo.dikuai = x.dikuai
					this.areaInfo.longitude = x.longitude
					this.areaInfo.latitude = x.latitude



				})
			},

			//关闭选择框，显示地图
			close() {
				this.tipsList = [] //清空
				this.showtips = false
				this.loading = false //显示三维，因为webgl会覆盖sheeet
			},
			// 地点输入提示
			queryDropdown() {

				let keyword = this.searchword


				console.log("this.dikuai=", this.dikuai)
				console.log("keyword=", keyword)
				//如果有输入的文字，显示sheet
				if (keyword.length > 0) {

					this.showtips = true
					this.loading = true //隐藏三维，因为webgl会覆盖sheeet

					this.queryApi(keyword)




				} else {
					this.showtips = false
					this.loading = false //显示三维，因为webgl会覆盖sheeet
					return
				}




			},

			queryApi(keyword) {
				console.log("queryApi param=", keyword)

				uni.request({
					url: "https://restapi.amap.com/v3/assistant/inputtips?key=" + this.key_webjsApi +
						"&&keywords=" + keyword,

					//url:'https://restapi.amap.com/v3/assistant/inputtips?key=7b23d217e9500208586e37987e2dafe5&&keywords=济南',	
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
					},
					success: res => {

						console.log("高德输入提示返回res=", res.data.tips);

						//先清空原来的
						this.tipsList = []
						//location: "121.429462,31.153127"

						res.data.tips.forEach(obj => {
							console.log('位置obj=', obj)

							//因为有些数据没有经纬度坐标undefined,有时是空数组 [] !!
							if (obj.location && obj.location.indexOf(',') > -1) {

								let pos = obj.location.split(',')

								let item = {
									text: obj.name,
									lng: pos[0],
									lat: pos[1],
									adcode: obj.adcode,
									color: 'blue',

									fontSize: 28
								}
								this.tipsList.push(item)
							}


						})


					},
				})


			},

			touchStart(e) {
				//console.log('canvas', e)
				//uni.$emit("mouseDown",e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
				// this.three.THREE().global.touchEventHandlerFactory('canvas', 'touchstart')(e)


			},
			touchMove(e) {
				//console.log('canvas', e)

				THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
				// this.three.global.touchEventHandlerFactory('canvas', 'touchmove')(e)

			},
			touchEnd(e) {
				//console.log('canvas', e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
				// this.three.global.touchEventHandlerFactory('canvas', 'touchend')(e)

			},
			touchCancel(e) {
				// console.log('canvas', e)
			},
			longTap(e) {
				// console.log('canvas', e)
			},
			tap(e) {
				// console.log('canvas', e)
			},

			getUseLocation() {
				uni.getSetting({
					success: (res) => {
						const vm = this
						if (res.authSetting['scope.userLocation']) {
							console.log('已有授权获取当前位置')
							this.getRegeo()

						} else {
							uni.authorize({
								scope: 'scope.userLocation',
								success: () => {
									console.log("授权位置权限成功")
								},
								fail: () => {
									uni.showModal({
										title: '提示',
										content: '获取微信位置，需要开启scope.userLocation权限',
										success: function(res) {
											if (res.confirm) {
												//跳转去设置
												uni.openSetting();
											} else {
												//不设置
											}
										}
									})
								}
							})
						}

					}
				})

			},

			//获取当前位置
			//SDK 返回 marker 数组，可以直接用来在微信的地图组件上标记，同时，也返回了POI数组用于您的自定义的界面页面展示。
			getRegeo() {
				const vm = this

				uni.showLoading({
					title: '获取信息中'
				})

				this.amap.getRegeo({
					success: (data) => {
						//console.log(data)
						//这个就是当前位置的地名！！！
						this.addressName = data[0].name

						let marker = {
							latitude: data[0].latitude,
							longitude: data[0].longitude,
							iconPath: vm.iconPath
						}

						this.areaInfo.latitude = data[0].latitude
						this.areaInfo.longitude = data[0].longitude
						console.log("data=", data)
						console.log("marker=", marker)
						this.markers.push(marker)
						//	this.getPoiAround()
						uni.hideLoading() //隐藏 


					}
				})
			},

			//获取周边POI
			getPoiAround() {
				var that = this
				this.amap.getPoiAround({

					success: function(data) {
						//成功回调
						that.markers = data.markers;
						that.poisdatas = data.poisData;
						var markers_new = [];
						that.markers.forEach(function(item, index) {
							//console.log(item.iconPath)
							markers_new.push({
								id: item.id, //marker 序号
								width: item.width, //marker 宽度
								height: item.height, //marker 高度
								//iconPath: item.iconPath, //marker 图标路径
								iconPath: that.iconPath, //marker 图标路径
								latitude: item.latitude, //marker  纬度
								longitude: item.longitude, //marker 经度
								//自定义标记点上方的气泡窗口
								callout: {
									padding: 2, //callout 文本边缘留白
									fontSize: 15, //callout  文字大小
									bgColor: 'blue', //callout 背景颜色
									color: '#6B8E23', //callout 文字颜色
									borderRadius: 5, //边框圆角
									display: 'BYCLICK', //callout 'BYCLICK':点击显示; 'ALWAYS':常显
									content: that.poisdatas[index]
										.name //地理位置名称
								}
							})
						})
						that.markers = markers_new;
						//console.log("data", JSON.stringify(that.poisdatas));
					},
					fail: function(info) {
						//失败回调

					}
				})

			},



		},
	}
</script>

<style lang="scss" scoped>
	// 全局
	.content {
		//background-color: #eeeeee;

		background: linear-gradient(#19cb81, #f4f8f8, #f4f8f8, #f4f8f8);
		padding-top: 50rpx;
	}

	.main {
		// display: flex;
		// flex-direction: column;
		// margin: 25rpx;
		// margin-top: 15rpx;
		// justify-content: center;
		margin: 20rpx;
		margin-top: 0;
		border: 3rpx;
		padding: 20rpx;
		padding-top: 40rpx;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
		background-color: #fff;
		// background-color: #007AFF;

	}

	// 公用左上角标题样式
	.title {
		// position: absolute;

		// z-index: 1000;

		// left: 10rpx;
		// top: 10rpx;
		padding-bottom: 15rpx;
		padding-left: 10rpx;
		padding-right: 15rpx;
		margin-left:5rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
		font-size: 30rpx;


		// text-align: center;
		border-radius: 15rpx;
		//color:#ffffff;
		//background-color: rgba(0,115,223,0.5);
	}


	// 地块位置
	.position {

		margin-bottom: 60rpx;

		.map {
			position: relative;
			width: 100%;
			height: 450rpx;

		}

		.btnItem {
			width: 100%;
			height: 70rpx;
			padding: 10rpx;
			padding-right: 15rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15rpx;

			.btn {
				// 	margin-top: 20rpx;
				// 	margin-right: 10rpx;

				image {
					width: 40rpx;
					height: 35rpx;
					margin-right: 5rpx;
				}
			}

		}

		.btnItem2 {
			width: 100%;
			height: 70rpx;
			padding: 10rpx;
			padding-right: 15rpx;
			display: flex;

			align-items: center;
			margin-bottom: 20rpx;

			.btn {
				margin-left: 10rpx;
				height: 50rpx;
				margin-bottom: 11rpx;
			}

		}
	}

	// 地块概览
	.overview {

		.landContainer {
			padding: 0rpx;
			margin-top: 200rpx;


		}

		.stage {
			height: 19.5vh;
			width: 100%;
		}

	}
</style>
