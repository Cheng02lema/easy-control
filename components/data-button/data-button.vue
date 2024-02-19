<!-- 新建页面的时候一定要把自动添加到pages.json中的path路径删除！ -->
<template>
	<!-- @click自定义了组件事件 -->
	<view class="container" @click="clickme">

		<view class="top">

			<image :src="imgsrc"></image>

		</view>

		<view class="bottom">
			<view class="ItemName">
				{{ItemName}}
			</view>

		</view>





	</view>
</template>

<script>
	export default {
		props: {
			
			btnId:{
				type:Number,
				default:0
			},
			imgsrc: {

				type: String,
				default: ''
			},
			ItemName: {
				type: String,
				default: ''
			},
			num: {
				type: String,
				default: '',
			}


		},

		data() {
			return {
				
			}
		},
		methods: {

			clickme() {
				//"myclick"是外头定义的事件名 
				//this.iconid是外头事件接收的参数
				console.log("this.id=", this.btnId)
				this.$emit("myclick", this.btnId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
		width: 135rpx;
		height: 135rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;

		background-color: #eeee;
		box-shadow: 0rpx 1rpx 12rpx 0 #cfcfcf;
		border-radius: 30rpx;
		margin: 25rpx;
		margin-bottom:8rpx;
		



		.top {
			width: 60rpx;
			height: 60rpx;
			
			
			image {
				width: 60rpx;
				height: 60rpx;
				margin-top: 5rpx;
				margin-bottom: 20rpx;

			}

		}

		.bottom {
			width: 110rpx;
			font-size: 26rpx;
			// color: #1f871f;
			// color:#87d181;
			color: #848484;
			text-align:center;
			margin-top: 15rpx;
			// margin-bottom: 5rpx;
			// font-weight: bold;
			
		}



	}
</style>
