<!-- 新建页面的时候一定要把自动添加到pages.json中的path路径删除！ -->
<template>
	<!-- @click自定义了组件事件 -->
	<view class="container" @click="clickme">
		
		<view class="left">
			<view class="ItemName">
				{{ItemName}}
			</view>
		
		</view>

		<view class="right">

			<view class="number">{{num}}</view>
			<view>{{unit}}</view>

		</view>

		





	</view>
</template>

<script>
	export default {
		props: {

			unit: {

				type: String,
				default: ''
			},
			ItemName: {
				type: String,
				default: ''
			},
			num: {
				type: Number,
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
				console.log("this.id=", this.iconid)
				this.$emit("myclick", this.iconid)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
		width: 200rpx;
		height: 100rpx;
		// box-shadow: 0rpx 1px 10px 0 #cfcfcf;
		// border-radius: 60rpx;
		// margin-top:40rpx;
		
		
		// display: flex;
		// justify-content: center;
		padding-top: 1rpx;
		// padding-bottom: 1rpx;
		padding-left: 50rpx;
		// padding-right: 20rpx;

		align-items: center;
		text-align: center;
		// background-color: #eeee;
		

		.left {
			width: 110rpx;
			font-size: 30rpx;
			text-align:center;
			margin-top: 15rpx;
			font-weight: 600;
			letter-spacing: 4rpx;
		}



		.right {
			width: 110rpx;
			height: 110rpx;
			display: flex;
			justify-content: center;
			text-align:center;
			margin-top: 13rpx;
			// margin-left: 10rpx;
			
			// box-shadow: 0rpx 1px 15px 0 #cfcfcf;
			// border-radius: 60rpx;
			
			.number{
				
				color:#249b24 ;
				font-size: 30rpx;
				
				margin-right: 7rpx;
				
			}
			.unit{
				
			}

		}

		



	}
</style>
