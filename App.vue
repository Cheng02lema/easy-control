<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			if (!wx.cloud) {
			      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			    } else {
					console.log('wx.cloud 初始化ok')
			      wx.cloud.init({
			        // env 参数说明：
			        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
			        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
			        //   如不填则使用默认环境（第一个创建的环境）    
			        //env: '你的环境ID',
			        env: 'yexi-2gmdp1fadb6db2c2',
			        traceUser: true,
			      })
		}
			
			
		},
		onShow: function() {
			console.log('App Show')
			 
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	 @import "uview-ui/index.scss";
</style>
