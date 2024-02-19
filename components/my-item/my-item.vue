<!-- 新建页面的时候一定要把自动添加到pages.json中的path路径删除！ -->
<template>
	<!-- @click自定义了组件事件 -->
	<view class="container"  @click="clickme">

		<image :src="imgsrc" style="width: 80rpx;height: 80rpx;"></image>
		<view>{{ItemName}}</view>


	</view>
</template>

<script>
	export default {
		props: {
			iconid:{
				type:Number,
				default:-1,
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
				
				this.$emit("myclick", this.iconid)
				console.log("this.this.iconid=", this.iconid)
			},
			
		}
	}
</script>

<style lang="scss" scoped>

	
	.container {
		
		// width: 110rpx;
		height: 120rpx;
		display: flex;
		flex-direction: column;
		
		align-items: center;
		justify-content: center;
		text-align: center;
		
		image{
			margin-bottom: 8rpx;
			
		}

	}
</style>
