<template>
	
	<view>
		<u-mask :show="show"  :custom-style="{background: 'rgb(137,239,186)'}">
		   <view style="display: flex;justify-content: center;align-items: center;height: 100%;">
		       <!-- <text style="color:#646464;">加载中</text> -->
		       <u-loading mode="flower" size="60" />
		   </view>
			
		</u-mask>
	</view>
	
</template>

<script>
	export default {
		// name: 'loading',
		props: {
			show: {
				type: Boolean,
				default: true,
			},
			number:{
				type:Number,
				default:1,
			}

		
		
		},
		
		data() {
			return {
				// loading: false
			}
		},
		
	}
</script>
<style lang="scss" scoped>

</style>
