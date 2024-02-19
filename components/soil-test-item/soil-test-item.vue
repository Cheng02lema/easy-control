<!-- 新建页面的时候一定要把自动添加到pages.json中的path路径删除！ -->
<template>
	<view class="Container">
		<!-- 土壤温度 -->
		<view class="container2" @click="clickme">

			<view class="top">
				<view class="ItemName">
					{{placeName}}-土壤温度
				</view>
			</view>

			<view class="bottom">
				<view class="number">
					<view class="num">{{wendu.toFixed(1)}} ℃</view>
					<view v-if="wendu>wendu_maxValue">
						<span class="hight">↑ {{(wendu - wendu_maxValue).toFixed(1)}} ℃</span>
					</view>
					<view v-if="wendu<wendu_minValue" class="low">
						<span class="hight">↓ {{(wendu_minValue - wendu).toFixed(1)}} ℃</span>
					</view>
					<view v-if="wendu <= wendu_maxValue && wendu >= wendu_minValue">
						<span class="normal">在正常范围</span>
					</view>
				</view>
				<view class="pic">
					<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/土壤温度.png">
					</image>
				</view>
			</view>



		</view>

		<!-- 土壤湿度 -->
		<view class="container2" @click="clickme">
			<view class="top">
				<view class="ItemName">
					{{placeName}}-土壤湿度
				</view>

			</view>

			<view class="bottom">
				<view class="number">
					<view class="num">{{shidu}} %</view>
					<view v-if="shidu>shidu_maxValue">
						<span class="hight">↑ {{(shidu - shidu_maxValue).toFixed(1)}} %</span>
					</view>
					<view v-if="shidu<shidu_minValue" class="low">
						<span class="hight">↓ {{(shidu_minValue - shidu).toFixed(1)}} %</span>
					</view>
					<view v-if="shidu <= shidu_maxValue && shidu >= shidu_minValue">
						<span class="normal">在正常范围</span>
					</view>
				</view>
				<view class="pic">
					<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/土壤湿度.png">
					</image>
				</view>
			</view>



		</view>
		
		<!-- 光照强度 -->
		<view class="container2" @click="clickme">

			<view class="top">
				<view class="ItemName">
					{{placeName}}-光照强度
				</view>

			</view>

			<view class="bottom">
				<view class="number">
					<view class="num">{{guangzhao}} Lux</view>
					<view v-if="guangzhao>guangzhao_maxValue">
						<span class="hight">↑ {{ (guangzhao - guangzhao_maxValue) /100 }} %</span>
					</view>
					<view v-if="guangzhao<guangzhao_minValue" class="low">
						<span class="hight">↓ {{ (guangzhao_minValue - guangzhao) /100 }} %</span>
					</view>
					<view v-if="guangzhao <= guangzhao_maxValue && guangzhao >= guangzhao_minValue">
						<span class="normal">在正常范围</span>
					</view>
				</view>
				<view class="pic">
					<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/光照.png">
					</image>
				</view>
			</view>



		</view>

		<!-- 酸碱度 -->
		<view class="container2" @click="clickme">

			<view class="top">
				<view class="ItemName">
					{{placeName}}-酸碱度
				</view>

			</view>

			<view class="bottom">
				<view class="number">
					<view class="num">{{suanjiandu}} PH</view>
					<view v-if="suanjiandu>suanjiandu_maxValue">
						<span class="hight">↑ {{(suanjiandu - suanjiandu_maxValue).toFixed(1)}} PH</span>
					</view>
					<view v-if="suanjiandu<suanjiandu_minValue" class="low">
						<span class="hight">↓ {{(suanjiandu_minValue - suanjiandu).toFixed(1)}} PH</span>
					</view>
					<view v-if="suanjiandu <= suanjiandu_maxValue && suanjiandu >= suanjiandu_minValue">
						<span class="normal">在正常范围</span>
					</view>
				</view>
				<view class="pic">
					<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/酸碱度2.png">
					</image>
				</view>
			</view>



		</view>

		<!-- 二氧化碳浓度 -->
		<view class="container2" @click="clickme">

			<view class="top">
				<view class="ItemName">
					{{placeName}}-CO₂浓度
				</view>

			</view>

			<view class="bottom">
				<view class="number">
					<view class="num">{{co2}} ppm</view>
					<view v-if="co2 >= co2_maxValue">
						<span class="hight">↑ {{(co2 - co2_maxValue).toFixed(1)}} ppm</span>
					</view>
					<view v-if="co2 <= co2_minValue" class="low">
						<span class="hight">↓ {{(co2_minValue - co2).toFixed(1)}} ppm</span>
					</view>
					<view v-if="co2 < co2_maxValue && co2 > co2_minValue">
						<span class="normal">在正常范围</span>
					</view>
				</view>
				<view class="pic">
					<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/二氧化碳.png">
					</image>
				</view>
			</view>



		</view>

		<!-- PM2.5 -->
		<view class="container2" @click="clickme">

			<view class="top">
				<view class="ItemName">
					{{placeName}}-PM2.5
				</view>

			</view>

			<view class="bottom">
				<view class="number">
					<view class="num">{{pm}} μg/m³</view>
					<view v-if="pm >= pm_maxValue">
						<span class="hight">↑ {{(pm - pm_maxValue).toFixed(1)}} μg/m³</span>
					</view>
					<view v-if="pm <= pm_minValue" class="low">
						<span class="hight">↓ {{(pm_minValue - pm).toFixed(1)}} μg/m³</span>
					</view>
					<view v-if="pm < pm_maxValue && pm > pm_minValue">
						<span class="normal">在正常范围</span>
					</view>
				</view>
				<view class="pic">
					<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/PM2.5_面.png">
					</image>
				</view>
			</view>



		</view>

	</view>
</template>

<script>
	export default {
		props: {

			placeName: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 1,
			},
			strValue: {
				type: String,
				default: ''
			},
			nValue: {
				type: Number,
				default: 0,
			},
			iconName: {
				type: String,
				default: ''
			},
			minValue: {
				type: Number,
				default: 1,
			},
			maxValue: {
				type: Number,
				default: 1,
			},



			wendu: {
				type: Number,
				default: 1,
			},
			wendu_minValue: {
				type: Number,
				default: 1,
			},
			wendu_maxValue: {
				type: Number,
				default: 1,
			},

			shidu: {
				type: Number,
				default: 1,
			},
			shidu_minValue: {
				type: Number,
				default: 1,
			},
			shidu_maxValue: {
				type: Number,
				default: 1,
			},

			guangzhao: {
				type: Number,
				default: 1,
			},
			guangzhao_minValue: {
				type: Number,
				default: 1,
			},
			guangzhao_maxValue: {
				type: Number,
				default: 1,
			},

			suanjiandu: {
				type: Number,
				default: 1,
			},
			suanjiandu_minValue: {
				type: Number,
				default: 1,
			},
			suanjiandu_maxValue: {
				type: Number,
				default: 1,
			},

			co2: {
				type: Number,
				default: 1,
			},
			co2_minValue: {
				type: Number,
				default: 1,
			},
			co2_maxValue: {
				type: Number,
				default: 1,
			},

			pm: {
				type: Number,
				default: 1,
			},
			pm_minValue: {
				type: Number,
				default: 1,
			},
			pm_maxValue: {
				type: Number,
				default: 1,
			},





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
	// 最外层
	.Container {

		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 25rpx;

		.container {
			width: 48%;
			// margin: 10rpx;
		}




	}

	.container2 {

		// background-color: #e6ffe6;
		box-shadow: 0rpx 1px 20px 0 #cfcfcf;
		border-radius: 20rpx;
		width: 300rpx;
		height: 230rpx;
		margin-bottom: 25rpx;
		margin-top: 25rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;

		display: flex;
		// flex-direction: column;

		// align-items: center;
		// justify-content: center;
		// text-align: center;

		border-radius: 20rpx;

		image {
			width: 60rpx;
			height: 60rpx;
			margin-top: 50rpx;


		}

		.top {
			font-size: 29rpx;
			margin-bottom: 20rpx;
			font-weight: 600;

		}

		.bottom {
			display: flex;
			justify-content: space-between;
			font-size: 29rpx;
			letter-spacing: 4rpx;
			margin-top: 20rpx;

			.number {
				// margin-left: 8rpx;

				.num {
					margin-bottom: 11rpx;

				}

				.hight {
					color: #e65154;
				}

				.low {
					color: #0086df;
				}

				.normal {

					color: #008442;
				}
			}

		}



	}

	.container {

		// background-color: #e6ffe6;
		box-shadow: 0rpx 1px 20px 0 #cfcfcf;
		border-radius: 20rpx;
		width: 300rpx;
		height: 250rpx;
		margin-bottom: 25rpx;
		margin-top: 25rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;

		display: flex;
		// flex-direction: column;

		// align-items: center;
		// justify-content: center;
		// text-align: center;

		border-radius: 20rpx;

		image {
			width: 60rpx;
			height: 60rpx;
			margin-top: 60rpx;


		}

		.top {
			font-size: 29rpx;
			margin-bottom: 30rpx;
			font-weight: bold;

		}

		.bottom {
			display: flex;
			justify-content: space-between;
			font-size: 31rpx;

			.number {
				// margin-left: 8rpx;

				.num {
					margin-bottom: 8rpx;

				}

				.hight {
					color: #e65154;
				}

				.low {
					color: #0086df;
				}

				.normal {

					color: #008442;
				}
			}

		}


	}

	.goodname {
		font-size: 35rpx;
		font-weight: bold;
	}
</style>
