<template>
	<view class="box">


		<!-- 高温 -->
		<view class="mypanel2" v-if="test1==true">
			<view class="hight_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/土壤温度.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="hight_middle">
				土壤温度高于预警值 {{(wendu - wendu_maxValue).toFixed(1)}} ℃
			</view>

			<view class="warnIcon">
				<image :src="alertHigh"></image>
			</view>


		</view>

		<!-- 低温 -->
		<view class="mypanel2" v-if="test2==true">
			<view class="low_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/土壤温度.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="low_middle">
				土壤温度低于预警值 {{(wendu_minValue - wendu).toFixed(1)}} ℃
			</view>

			<view class="warnIcon">
				<image :src="alertLow"></image>
			</view>


		</view>

		<!-- 高湿度 -->
		<view class="mypanel2" v-if="test3==true">
			<view class="hight_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/土壤湿度.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="hight_middle">
				土壤湿度高于预警值 {{ (shidu - shidu_maxValue).toFixed(1)}} %
			</view>

			<view class="warnIcon">
				<image :src="alertHigh"></image>
			</view>


		</view>

		<!-- 低湿度 -->
		<view class="mypanel2" v-if="test4==true">
			<view class="low_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/土壤湿度.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="low_middle">
				土壤湿度低于预警值 {{ (shidu_minValue - shidu).toFixed(1)}} %
			</view>

			<view class="warnIcon">
				<image :src="alertLow"></image>
			</view>


		</view>

		<!-- 高光照强度 -->
		<view class="mypanel2" v-if="test5==true">
			<view class="hight_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/光照.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="hight_middle">
				光照强度高于预警值 {{ (guangzhao - guangzhao_maxValue) /100 }} %
			</view>

			<view class="warnIcon">
				<image :src="alertHigh"></image>
			</view>


		</view>

		<!-- 低光照强度 -->
		<view class="mypanel2" v-if="test6==true">
			<view class="low_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/光照.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="low_middle">
				光照强度低于预警值 {{ (guangzhao_minValue - guangzhao) /100 }} %
			</view>

			<view class="warnIcon">
				<image :src="alertLow"></image>
			</view>


		</view>

		<!-- 高酸碱度 -->
		<view class="mypanel2" v-if="test7==true">
			<view class="hight_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/酸碱度2.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="hight_middle">
				酸碱度高于预警值 {{(suanjiandu - suanjiandu_maxValue).toFixed(1)}} PH
			</view>

			<view class="warnIcon">
				<image :src="alertHigh"></image>
			</view>


		</view>

		<!-- 低酸碱度 -->
		<view class="mypanel2" v-if="test8==true">
			<view class="low_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/酸碱度2.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="low_middle">
				酸碱度低于预警值 {{(suanjiandu_minValue - suanjiandu).toFixed(1)}} PH
			</view>

			<view class="warnIcon">
				<image :src="alertLow"></image>
			</view>


		</view>
		<!-- 高CO₂浓度 -->
		<view class="mypanel2" v-if="test9==true">
			<view class="hight_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/二氧化碳.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="hight_middle">
				CO₂浓度高于预警值 {{(co2 - co2_maxValue).toFixed(1)}} ppm
			</view>

			<view class="warnIcon">
				<image :src="alertHigh"></image>
			</view>


		</view>

		<!-- 低CO₂浓度 -->
		<view class="mypanel2" v-if="test10==true">
			<view class="low_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/二氧化碳.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="low_middle">
				CO₂浓度低于预警值 {{(co2_minValue - co2).toFixed(1)}} ppm
			</view>

			<view class="warnIcon">
				<image :src="alertLow"></image>
			</view>


		</view>
		<!-- 高PM2.5 -->
		<view class="mypanel2" v-if="test11==true">
			<view class="hight_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/PM2.5.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="hight_middle">
				PM2.5高于预警值 {{(pm - pm_maxValue).toFixed(1)}} μg/m³
			</view>

			<view class="warnIcon">
				<image :src="alertHigh"></image>
			</view>


		</view>

		<!-- 低PM2.5 -->
		<view class="mypanel2" v-if="test12==true">
			<view class="low_front">
				<image src="cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/PM2.5.png"></image>
			</view>

			<view class="blank">

			</view>

			<view class="low_middle">
				PM2.5低于预警值 {{(pm_minValue - pm).toFixed(1)}} μg/m³
			</view>

			<view class="warnIcon">
				<image :src="alertLow"></image>
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



		computed: {

			// 高温
			test1: function() {

				var res = false
				
				
				 
				


				if ((this.wendu - this.wendu_maxValue) > 0) {
					res = true
					if(this.wenduTesting == true){
						
				       var info={}
						info.msg = '棚内温度过高,'
						info.name=this.placeName
						
						uni.$emit('event_alert',info)
						
						this.wenduTesting = false
					}
					
				}

				return res
			},

			// 低温
			test2: function() {

				var res = false
			
				if ((this.wendu - this.wendu_minValue) < 0) {
					res = true
					if(this.wenduTesting == true){
						
						this.wenduTesting = false
						var info={}
						info.msg = '棚内温度过低,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
						
					}
					// this.$store.commit("setAlertContent",info)
				}

				return res
			},

			// 高湿度
			test3: function() {


				var res = false
				

				if ((this.shidu - this.shidu_maxValue) > 0) {
					res = true
					if(this.wenduTesting == true){
					
						this.wenduTesting = false
						var info={}
						info.msg = '棚内湿度过高,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					// this.$store.commit("setAlertContent",info)
				}

				return res
			},

			// 低湿度
			test4: function() {

				var res = false
				

				if ((this.shidu - this.shidu_minValue) < 0) {
					res = true
					if(this.shiduTesting == true){
						
						this.shiduTesting = false
						
						var info={}
						info.msg = '棚内湿度过低,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					// this.$store.commit("setAlertContent",info)
				}

				return res
			},

			// 高光照强度
			test5: function() {


				var res = false
			

				if ((this.guangzhao - this.guangzhao_maxValue) > 0) {
					res = true
					
					
					if(this.guangzhaoqiangduTesting == true){
						
						this.guangzhaoqiangduTesting = false
						
						var info={}
						info.msg = '棚内光照强度过高,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					// this.$store.commit("setAlertContent",info)
				}

				return res
			},

			// 低光照强度
			test6: function() {

				var res = false
				

				if ((this.guangzhao - this.guangzhao_minValue) < 0) {
					res = true
					if(this.guangzhaoqiangduTesting == true){
						
						this.guangzhaoqiangduTesting = false
						
						var info={}
						info.msg = '棚内光照强度过低,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					
				}

				return res
			},
			// 高酸碱度
			test7: function() {


				var res = false
			

				if ((this.suanjiandu - this.suanjiandu_maxValue) > 0) {
					res = true
					if(this.suanjianduTesting == true){
						this.suanjianduTesting = false
						
						
						var info={}
						info.msg = '棚内酸碱度过高,'
						info.name=this.placeName
						// this.info+=info.name+this.msg+" "
						uni.$emit('event_alert',info)
						
					}
					// this.$store.commit("setAlertContent",info)
				}

				return res
			},

			// 低酸碱度
			test8: function() {

				var res = false
				var info = '棚内酸碱度异常,'

				if ((this.suanjiandu - this.suanjiandu_minValue) < 0) {
					res = true
					if(this.suanjianduTesting == true){
						
						this.suanjianduTesting = false
						var info={}
						info.msg = '棚内酸碱度过低,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					
				}

				return res
			},
			// 高CO₂浓度
			test9: function() {


				var res = false
				var info = '棚内二氧化碳浓度异常,'

				if ((this.CO2 - this.CO2_maxValue) > 0) {
					res = true
					if(this.coTesting == true){
						
						this.coTesting = false
						
						var info={}
						info.msg = '棚内二氧化碳浓度过高,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
						
					}
					
				}

				return res
			},

			// 低CO₂浓度
			test10: function() {

				var res = false
				var info = '棚内二氧化碳浓度异常,'

				if ((this.CO2 - this.CO2_minValue) < 0) {
					res = true
					if(this.coTesting == true){
						
						this.coTesting = false
						
						var info={}
						info.msg = '棚内二氧化碳浓度过低,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					
				}

				return res
			},
			// 高PM2.5
			test11: function() {


				var res = false
				

				if ((this.pm - this.pm_maxValue) > 0) {
					res = true
					if(this.pmTesting == true){
						
						this.pmTesting = false
						
						var info={}
						info.msg = '棚内pm2.5过高,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}
					
				}

				return res
			},

			// 低PM2.5
			test12: function() {

				var res = false
				

				if ((this.pm - this.pm_minValue) < 0) {
					res = true
					if(this.pmTesting == true){

						this.pmTesting = false
						
						var info={}
						info.msg = '棚内pm2.5过低,'
						info.name=this.placeName
						uni.$emit('event_alert',info)
					}

				}

				return res
			},



		},

		data() {
			return {
				alertHigh: 'cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/高温叹号.png',
				alertLow: 'cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/低温叹号.png',
				wenduTesting:true,
				shiduTesting:true,
				guangzhaoqiangduTesting:true,
				suanjianduTesting:true,
				coTesting:true,
				pmTesting:true,
				
				
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box {

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: #747474;

	}

	.mypanel2 {
		
		margin-bottom: 20rpx;
		// box-shadow: 0rpx 0rpx 4rpx 2rpx #eeeeee;

		border-top: 1rpx #eeeeee solid;
		// border-top: 1rpx solid;
		border-radius: 20rpx;
		background-color: #f5fafa;
		width: 100% !important;
		display: flex;
		justify-content: center;
		height: 70rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;

		.hight_front {
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
				opacity: 0.5;
			}
		}

		.low_front {
			position: absolute;
			left: 70rpx;
			height: 70rpx;
			width: 15%;
			background-color: #55b7ff;
			border-radius: 60rpx;

			image {
				margin-top: 13rpx;
				margin-left: 20rpx;
				width: 48rpx;
				height: 48rpx;
				opacity: 0.5;
			}
		}

		.blank {

			position: absolute;
			left: 160rpx;
			width: 23rpx;
			height: 70rpx;
			// background-color: #b7e2ff;
			background-color: #FFFFFF;

		}

		.hight_middle {
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

		.low_middle {
			// padding:20rpx;
			line-height: 70rpx;
			height: 70rpx;
			padding-left: 126rpx;
			width: 88%;
			background-color: #c8e7ff;
			border-radius: 60rpx;
			font-size: 29rpx;
			// font-weight: bold;
		}


		.warnIcon {
			padding: 0;
			position: absolute;
			// bottom: 50rpx;
			right: 65rpx;



			image {

				width: 70rpx;
				height: 70rpx;
			}
		}

	}
</style>
