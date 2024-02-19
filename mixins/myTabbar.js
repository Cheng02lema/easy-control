export const shareTabBar = {
	data() {
		return {
			

			//tabbarCurrent是store文件夹里定义的共享属性
			current: this.$store.state.tabbarCurrent,

			tabbarList: [{
					iconPath: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/智能农场.png",
					selectedIconPath: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/智能农场激活.png",
					text: '农场',
					customIcon: false,
					url: '/pages/index/index',
				},
				{
					iconPath: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/基础管理.png",
					selectedIconPath: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/基础管理激活.png",
					text: '管理',
					customIcon: false,
					url: '/pages/manage/manage',
				},
				{
					iconPath: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/我的.png",
					selectedIconPath: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/我的激活.png",
					text: '我的',
					customIcon: false,
					url: '/pages/farm/farm',
				},
			],

		}
	},
	methods: {
		//这个在这定义了，页面就不要在定义，会覆盖
		

		onTabbarChange(index) {

			const self = this
			//固定写法,"setTabbarCurrent"是方法名，定义在store文件夹里,index是传的参数
			self.$store.commit("setTabbarCurrent", index)

			let url = this.tabbarList[index].url
			console.log("url=", url)
			uni.redirectTo({
				url: url
			})



		},
	},


}
