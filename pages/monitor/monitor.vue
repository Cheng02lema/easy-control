<template>
	<view>

		<view class="content">

			<!-- 顶部标题 -->
			<u-navbar back-icon-color="#ffffff" title="实时监控" title-color="#ffffff" :background="background">
				<view class="slot-wrap">

				</view>
			</u-navbar>


			<view class="main">


				<!-- 地块位置 -->
				<view class="position">

					

					
					<view class="controlDisplay">
						<view class="title">
							监控点1
						</view>
						<view class="box">
							<video class="video" id="myVideo1" :src="src1" enable-danmu danmu-btn controls>
							</video>
						</view>
						<view class="title">
							监控点2
						</view>
						<view class="box">
							<video class="video" id="myVideo2" :src="src2" enable-danmu danmu-btn controls>
							</video>
						</view>
						<view class="title">
							监控点3
						</view>
						<view class="box">
							<video class="video" id="myVideo2" :src="src3" enable-danmu danmu-btn controls>
							</video>
						</view>
						<view class="title">
							监控点4
						</view>
						<view class="box">
							<video class="video" id="myVideo2" :src="src4" enable-danmu danmu-btn controls>
							</video>
						</view>
						<view class="title">
							监控点5
						</view>
						<view class="box">
							<video class="video" id="myVideo2" :src="src5" enable-danmu danmu-btn controls>
							</video>
						</view>
						<view class="title">
							监控点6
						</view>
						<view class="box">
							<video class="video" id="myVideo2" :src="src6" enable-danmu danmu-btn controls>
							</video>
						</view>
						
					</view>

				</view>

				<!-- 地块概览 -->
				






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


	//引入共享组件
	import {
		shareTabBar
	} from '@/mixins/myTabbar.js'

	import {
		shareNavBar
	} from '@/mixins/shareNavBar' //混入tabbar数据和顶部导航栏背景色配置

	import modAlert from '@/components/mod-alert/mod-alert'



	export default {

		mixins: [shareTabBar, shareNavBar],
		components: {

		},

		onLoad() {


		},


		data() {
			return {
				// 监控视频地址
				src1: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video5.mp4',
				src2: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video7.mp4',
				src3: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video1.mp4',
				src4: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video8.mp4',
				src5: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video3.mp4',
				src6: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/vedio/video4.mp4',
				
				

			}
		},
		methods: {
	
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
		margin: 30rpx;
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
	.controlDisplay {
	
		// display: flex;
		
		align-items: center;
		// height: 400rpx;
		width: 100%;
		padding: 20rpx;
	
		.box {
			margin-bottom: 30rpx;
			.video {
				margin: 10rpx;
				width: 590rpx;
				height: 400rpx;
				border-radius: 20rpx;
			}
		}
	
	
	
	
	}



		


	
</style>
