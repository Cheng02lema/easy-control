<template>
	<view>
		<view class="content">

			<!-- 顶部标题 -->
			<u-navbar back-icon-color="#ffffff" title="设置预警值" title-color="#ffffff" :background="background">
				<view class="slot-wrap">

				</view>
			</u-navbar>

			<view class="main">

				<view v-for="(item,index) in alertList" :key="index" class="alertItem" v-if="isShow">

					<view v-if="item.type==3">
						<!-- 这里演示直接赋值上下限数字 -->
						<modAlert :type="item.type" :number="index+1" :name="item.typeName" max="35" min="-10"
							@myChange1="myChange1" @myChange2="myChange2" :maxValue_in="item.max"
							:minValue_in="item.min">
						</modAlert>
					</view>

					<view v-if="item.type==2">

						<modAlert :type="item.type" :step="5" :number="index+1" :name="item.typeName" max="100" min="0"
							@myChange1="myChange1" @myChange2="myChange2" :maxValue_in="item.max"
							:minValue_in="item.min">
						</modAlert>
					</view>

					<view v-if="item.type==1">

						<modAlert :type="item.type" :step="10" :number="index+1" :name="item.typeName" max="800" min="0"
							@myChange1="myChange1" @myChange2="myChange2" :maxValue_in="item.max"
							:minValue_in="item.min">
						</modAlert>
					</view>

					<view v-if="item.type==4">

						<modAlert :type="item.type" :step="0.1" :number="index+1" :name="item.typeName" max="8" min="6"
							@myChange1="myChange1" @myChange2="myChange2" :maxValue_in="item.max"
							:minValue_in="item.min">
						</modAlert>
					</view>

					<view v-if="item.type==5">

						<modAlert :type="item.type" :step="100" :number="index+1" :name="item.typeName" max="2500"
							min="100" @myChange1="myChange1" @myChange2="myChange2" :maxValue_in="item.max"
							:minValue_in="item.min">
						</modAlert>
					</view>

					<view v-if="item.type==6">

						<modAlert :type="item.type" :step="5" :number="index+1" :name="item.typeName" max="200" min="0"
							@myChange1="myChange1" @myChange2="myChange2" :maxValue_in="item.max"
							:minValue_in="item.min">
						</modAlert>
					</view>



				</view>
				<view class="btn">
					<u-button :custom-style="customStyle" @click="save"> 保存配置</u-button>
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

	export default {

		mixins: [shareTabBar, shareNavBar],
		components: {
			modAlert,
			
		},


		onShow() {
			const vm = this

			//页面显示时需要做什么？
			//1.获取数据库群补配置，是个数组或空数组
			//2.如果数组为空，及数据库没有记录，那就使用页面的默认值
			//3.否则，直接将查到的配置覆盖页面的data里的list
			alertService.getConfig(-1).then(e => {
				console.log("获取配置=", e)
				if (e.length > 0) {
					vm.alertList = e
				}
				this.isShow = true

			})


		},
		mounted() {
			
			setTimeout(() => {
				this.loading = false
			}, 400)

		},

		data() {
			return {
				// 加载中
				loading: true,
				// showContent: false,

				// 页面中组件 默认隐藏绑定个 isShow=false ,当数据查询完毕 isShow=true，这样就确保数据库查询完毕显示组件（挂载amount）
				isShow: false,

				// limit_max: 100,
				// limit_min: -100,
				customStyle: {
					marginTop: '20rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					backgroundColor: '#10c578',
					borderRadius: '90rpx',
					width: '350rpx',
					color: '#fff',
					fontSize: '34rpx',
				},


				alertList: [{
						type: 3,
						typeName: '土壤温度',
						
						//数字框上下限数字

						max: 0, //最终设置的最高值(不是计数器阈值)
						min: 0, //最终设置的最低值


					},
					{
						type: 2,
						typeName: '土壤湿度',
						//数字框上下限数字

						max: 0, //最终设置的最高值
						min: 0, //最终设置的最低值


					},
					{
						type: 1,
						typeName: '光照强度',
						//数字框上下限数字

						max: 0, //最终设置的最高值
						min: 0, //最终设置的最低值


					},
					{
						type: 4,
						typeName: '酸碱度',
						step: 0.1,
						//数字框上下限数字

						max: 0, //最终设置的最高值
						min: 0, //最终设置的最低值


					},
					{
						type: 5,
						typeName: 'CO₂浓度',
						//数字框上下限数字

						max: 0, //最终设置的最高值
						min: 0, //最终设置的最低值


					},
					{
						type: 6,
						typeName: 'PM2.5',
						//数字框上下限数字

						max: 0, //最终设置的最高值
						min: 0, //最终设置的最低值


					},
				],

			}
		},
		methods: {



			myChange1(e) {
				//查看数据类型

				let list = this.alertList

				//在数据库查询得到的配置对象数组查找类型=e.type的对象
				list.find(x => {
					if (x.type == e.type) {
						//把组件当前值赋给数组内对象对应属性
						// x.max = e.value
						this.$set(x, "max", e.value)
						this.alertList = list //重要：把修改过内容的数组再次覆盖data里的alertList
					}
				})



			},

			myChange2(e) {
				// 在数据库查询得到的配置对象数组查找类型=e.type的对象

				let list = this.alertList

				list.find(x => {
					if (x.type == e.type) {
						//把组件当前值赋给数组内对象对应属性
						// x.min = e.value
						this.$set(x, "min", e.value)
						this.alertList = list // 重要：把修改过内容的数组再次覆盖data里的alertList
					}
				})



			},



			//这是所有配置一起保存，也可以每个传感器弄一个按钮，单独保存  
			save() {

				this.alertList.forEach(x => {

					alertService.getConfig(x.type).then(e => {
						if (e.length > 0) {
							//数据库已经有此类型的配置记录，修改
							alertService.updateConfig(x)

						} else {
							//新增
							alertService.addConfig(x)
						}

					})

				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	// 全局
	.content {
		//background-color: #eeeeee;

		background: linear-gradient(#19cb81, #f4f8f8, #f4f8f8, #f4f8f8);
		padding-top: 50rpx;
	}

	.btn {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
		font-size: 40rpx;

	}
</style>
