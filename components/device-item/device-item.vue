<!-- 新建页面的时候一定要把自动添加到pages.json中的path路径删除！ -->
<template>
	<!-- @click自定义了组件事件 -->
	<view class="container" >

		<view class="top" @click="clickme">

			<image :src="imgsrc"></image>

		</view>

		<view class="bottom">
			<view class="ItemName">
				{{ItemName}}
			</view>
			<view class="switch">
				<!-- <u-button :hair-line="false" class="btn" :custom-style="customStyle" @click="threeScene" :ripple="true"
					ripple-bg-color="#909399">
					<image
					    style="height:30rpx ;"
						src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/更多.png">
					</image>
					<view :class="[{'open':indexNum==1},{'close':indexNum==0}]">
						{{state}}
					</view>
				</u-button> -->
				
				<u-switch size="40" @change="changeSwitch" style="display: block"
					v-model="switch_value" active-color="#cfcfcf" inactive-color="#13ce66" active-value="1"
					inactive-value="0">
				</u-switch>
				
			</view>

		</view>





	</view>
</template>

<script>
	export default {
		props: {
			iconid:{
				type:Number,
				default:-1,
			},
			// imgsrc: {

			// 	type: String,
			// 	default: ''
			// },
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
				state:'开启中',
				indexNum:1,
				switch_value:false,
				
				imgsrc:'cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/开启2.png',
				opensrc:'cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/开启2.png',
				closesrc:'cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/关闭.png',
				
				customStyle: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '10rpx',
					marginTop: '25rpx',
					backgroundColor: '#e2e2e2',
					borderRadius: '30rpx',
					width: '100rpx',
					height: '50rpx',
					// color: '#fff',
					fontSize: '24rpx',
					textAlign: 'center',
				},
				// customStyle2: {
				// 	// 注意驼峰命名，并且值必须用引号包括，因为这是对象
				// 	marginBottom: '10rpx',
				// 	backgroundColor: '#0099ff',
				// 	borderRadius: '65rpx',
				// 	width: '160rpx',
				// 	height: '62rpx',
				// 	color: '#fff',
				// 	fontSize: '24rpx',
				// 	textAlign: 'center',
				// },
			}
		},
		methods: {

			clickme() {
				//"myclick"是外头定义的事件名 
				//this.iconid是外头事件接收的参数
				console.log("this.ItemName=", this.ItemName)
				this.$emit("myclick", this.ItemName)
			},
			changeSwitch(value){
				console.log("value=",value)
				if(value==false){
					this.imgsrc = this.opensrc
				}else{
					this.imgsrc = this.closesrc
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.open{
		color:#3ea8f7;
		font-size: 26rpx;
		letter-spacing: 1rpx;
	}
	.close{
		color: #f7532b;
		font-size: 25rpx;
		letter-spacing: 2rpx;
	}
	.container {
		
		width: 150rpx;
		height: 150rpx;
		
		display: flex;
		flex-direction: column;
		

		display: flex;
		// flex-direction: column;

		align-items: center;
		justify-content: center;
		text-align: center;

		



		.top {
			width: 110rpx;
			height: 110rpx;
			background-color: #eeee;
			box-shadow: 0rpx 1px 15px 0 #cfcfcf;
			border-radius: 60rpx;
			
			image {
				width: 70rpx;
				height: 70rpx;
				margin-top: 25rpx;

			}

		}

		.bottom {
			width: 111rpx;
			
			text-align:center;
			margin-top: 15rpx;
			
			
			.ItemName{
				font-size: 27rpx;
				letter-spacing: 3rpx;
				font-weight: 600;
			}
			
			.switch{
				margin-top: 20rpx;
			}
		}



	}
</style>
