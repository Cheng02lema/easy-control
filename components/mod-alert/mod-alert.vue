<template>
	<view class="Container">
		<view class="title">
			<view class="top">
				<view class="number">
					<i>{{number+'.'}}</i>
				</view>

				<view class="name">
					{{name}}
				</view>
			</view>

			<view class="right">

				<view>隐藏</view>
				<u-switch size="40" @change="changeSwitch" :step="step" class="swtich" style="display: block"
					v-model="switch_value" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
					inactive-value="0">
				</u-switch>
				<view>显示</view>
			</view>
		</view>
		<view class="counter">
			<view class="tips">
				<i>最高预警值</i>

			</view>
			<view class="inputNumber">
				<u-button @click="clear1" :disabled="disabled" size="mini" style="margin-right: 10rpx;">清除</u-button>

				<u-number-box @change="valChange1" :step="step" :positive-integer="false" v-model="maxValue" size="30"
					:disabled="disabled" :min="min" :max="max">
				</u-number-box>
			</view>
		</view>
		<view class="counter">
			<view class="tips">
				<i>最低预警值</i>

			</view>
			<view class="inputNumber">
				<u-button @click="clear2" :disabled="disabled" size="mini" style="margin-right: 10rpx;">清除</u-button>
				<u-number-box @change="valChange2" :step="step" :positive-integer="false" v-model="minValue" size="30"
					:disabled="disabled" :min="min" :max="max">
				</u-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: Number,
				default: 0
			},

			name: {
				type: String,
				default: '',
			},

			//数字框上下限
			max: {
				type: Number,
				default: 100
			},
			min: {
				type: Number,
				default: -100
			},

			number: {
				type: String,
				default: 0
			},
			step: {
				type: Number,
				default: 1,
			},
			//已经设置过的高值，数据库获取的max
			maxValue_in: {
				type: Number,

			},
			//已经设置过的低值，数据库获取的min
			minValue_in: {
				type: Number
			}



		},


		data() {
			return {
				maxValue: 0,
				minValue: 0,
				switch_value: true,

				disabled: false,
			}
		},
		//组件内部不用onload 要用mounted 挂载
		//组件加载设置值
		mounted() {
			console.log("mounted:maxValue_in=", this.maxValue_in)
			if (this.maxValue_in != null && this.maxValue_in != undefined) {
				this.maxValue = this.maxValue_in
			}
			if (this.minValue_in != null && this.minValue_in != undefined) {
				this.minValue = this.minValue_in
			}


		},

		methods: {


			// 开关切换事件
			changeSwitch() {
				this.disabled = !(this.disabled)
			},

			// 最高预警值计数器
			valChange1(e) {

				this.$emit("myChange1", {
					value: e.value,
					type: this.type
				})

			},
			// 最低预警值计数器
			valChange2(e) {
				this.$emit("myChange2", {
					value: e.value,
					type: this.type
				})
			},
			clear1() {
				this.maxValue = 0
				this.$emit("myChange1", 0)

			},
			clear2() {

				this.minValue = 0
				this.$emit("myChange2", 0)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.Container {
		// border: 1rpx solid;
		background-color: #eeee;
		box-shadow: 0rpx 1px 15px 0 #cfcfcf;
		border-radius: 40rpx;
		margin: 20rpx;
		padding: 20rpx;
		padding-right: 25rpx;
		padding-left: 25rpx;

		font-size: 28rpx;

		.title {
			display: flex;
			justify-content: space-between;
			height: 42rpx;
			line-height: 42rpx;
			margin-bottom: 30rpx;

			.top {
				display: flex;
				justify-content: center;

				.number {
					margin-right: 20rpx;
					font-weight: bold;
				}

				.name {
					width: 150rpx;
					height: 40rpx;
					// border: 1rpx solid #eee;
					text-align: left;
					font-weight: bold;
				}
			}


			.right {
				margin-right: 20rpx;
				display: flex;
				justify-content: center;
				text-align: center;



				.swtich {
					margin-left: 20rpx;
					margin-right: 20rpx;

				}
			}
		}

		.counter {
			padding: 15rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
		}

	}
</style>
