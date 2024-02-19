<template>
	<view class="Container-all">

		<!-- 头部 -->
		<view class="header">
			<view class="pic-top"></view>
			<view class="pic-bottom"></view>



		</view>

		<view class="service">


			<view>

				<block v-if="!hasLogin">
					<view class="userProfile">


						<view class="userstouxiang" @click="getWxInfo">

							<image :src="wxInfo.avatarUrl||defalut_avatarUrl" class="avatarUrl"></image>
						</view>



					</view>

					<u-button v-if="!hasRegister" :custom-style="customStyle" @click="toRegister"> 新用户注册 </u-button>
					<u-button v-if="hasRegister" :custom-style="customStyle" @click="userLogin"> 登录 </u-button>




				</block>
				<block v-if="hasLogin">
					<view class="userProfile">
						<view class="userstouxiang2" @click="getWxInfo">
							<image class="avatarUrl" :src="wxInfo.avatarUrl" mode="cover">
							</image>
						</view>
						<view class="userinfo-nickname">欢迎！{{wxInfo.nickName}}</view>
						<u-button :custom-style="customStyle2" @click="loginOut"> 注销退出 </u-button>
					</view>


				</block>



			</view>

			<!-- 轮播图 -->
			<view class="wrap">
				<u-swiper :list="swiperList"></u-swiper>
			</view>


			<!-- 我的服务 -->
			<view class="myservice">

				<view class="topTitle">我的服务</view>
			</view>


			<view class="service-content">

				<view v-for="(item,index) in itemList" :key="index" class="ItemContainer">
					<myItem :imgsrc="item.imgsrc" @myclick="clickItem" :iconid="index" :ItemName="item.ItemName">

					</myItem>
				</view>

			</view>



		</view>


		<view class="item-zong">

			<view class="myservice2">

				<view class="topTitle">小程序服务</view>
			</view>

			<view class="service-content">

				<view class="ItemContainer">
					<myItem :imgsrc="item1" :iconid="7" :ItemName="name1"></myItem>
				</view>
				<view class="ItemContainer">
					<myItem :imgsrc="item2" :iconid="8" :ItemName="name2"></myItem>
				</view>
				<view class="ItemContainer">
					<myItem :imgsrc="item3" :iconid="9" :ItemName="name3"></myItem>
				</view>




			</view>

		</view>



		<u-tabbar v-model="current" :list="tabbarList" :mid-button="false" @change="onTabbarChange"
			active-color="#158402" inactive-color="#b9bdc1" icon-size='43'>
		</u-tabbar>

		<!-- 用户注册 -->

		<u-popup v-model="showRegister" mode="bottom" @close="this.showRegister==false" safe-area-inset-bottom="true"
			closeable>
			<view>
				<u-form :model="registerform" ref="uForm" label-width="240rpx" label-align='right'>

					<u-form-item label="昵称: " label-width="240rpx">
						<u-input v-model="registerform.nickName" />
					</u-form-item>
					<u-form-item label="openid: " label-width="240rpx">
						<u-input v-model="registerform.openid" />
					</u-form-item>
					<u-form-item label="头像: " label-width="240rpx">
						<u-input v-model="registerform.avatarUrl" />
					</u-form-item>




					<u-button @click="onSubmitRegister" type="success">注册</u-button>
				</u-form>
			</view>
		</u-popup>

		<!-- 提示框:请登录 -->
		<u-popup v-model="show" mode="center" width="450rpx" height="200rpx" border-radius="14">
			<view class="loginAlert">
				<view class="tips">
					请先登录！
				</view>
				<view class="alertbtn">
					<u-button @click="show=false" size="mini">我知道了</u-button>
				</view>
			</view>
		</u-popup>

	</view>


</template>

<script>
	// pages/manage/manage.js
	// import baseUrl from '@/request/api.js'//公共接口地址
	// import {
	// 	mapMutations
	// }from 'vuex'
	//引入共享组件
	import {
		shareTabBar
	} from '@/mixins/myTabbar.js'

	import myItem from '@/components/my-item/my-item.vue'

	import userService from '@/api/user.js'
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		mixins: [shareTabBar],

		components: {
			myItem,

		},
		onShow() {
			console.log("onShow!!!!")


			//微信登录获取openid
			this.wxlogin().then(() => {

				//检查用户是否已注册
				this.checkIfRegister()
			})

			let logininfo = uni.getStorageSync('loginInfo')

			if (logininfo) {
				// this.hasWxInfo = true
				// this.hasWxLogin=true
				this.wxInfo = logininfo

			}

			//微信登录获取openid
			// 	this.wxlogin()

			// 	//查看缓存中是否有用户登录信息，有则跳转到主页面


			// 	let logininfo = uni.getStorageSync('loginInfo')

			// 	if (logininfo) {
			// 		// this.hasWxInfo = true
			// 		// this.hasWxLogin=true
			// 		this.wxInfo = logininfo

			// 	} 

			// if (!logininfo) {
			// 	console.log("缓存存用户登录信息222=")
			// 	this.userLogin()
			// }



		},
		computed: {

			// ...mapGetters(['hasLogin']), //注意逗号

			hasLogin: () => {

				let logininfo = uni.getStorageSync('loginInfo')


				if (logininfo) {

					return true
				} else {

					return false
				}
			},

			avatarUrl2() {
				return () => {
					// if(this.wxinfo){
					// 	this.wxinfo.avatarUrl
					// }else{
					// 	return 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/user.png'

					// }

					return 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/user.png'

				}
			},

			// 拼接字符串的计算属性,e是数据库传进来的字符串,比如 光照.jpg
			thumSrc() {
				return (e) => {

					return this.$baseUrl + "/upload/" + e
				}


			},

		},

		data() {
			return {

				openid: '',
				show: false,


				hasRegister: false, //用户是否已注册
				hasWxLogin: false, //是否已经微信登录

				hasWxInfo: false, //是否获取了微信头像等信息

				wxInfo: {
					//微信基本信息： openid, 头像,性别
					// nickName: this.$store.state.wxinfo.nickName,
					// avatarUrl: this.$store.state.wxinfo.avatarUrl ||
					// 	'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/user.png',
					// iconid: 0,
				},

				defalut_avatarUrl: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/user.png',




				showRegister: false, //是否显示注册弹窗

				registerform: {
					//nickname:this.wxInfo.nickName,
					//openid:this.wxInfo.openid

				},


				// 登录按钮样式
				customStyle: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginTop: '10rpx',
					backgroundColor: '#10c578',
					borderRadius: '65rpx',
					width: '150rpx',
					height: '62rpx',
					color: '#fff',
					fontSize: '26rpx',
					textAlign: 'center',
					letterSpacing: '3rpx',
				},
				customStyle2: {
					// 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginTop: '10rpx',
					backgroundColor: '#f46753',
					borderRadius: '65rpx',
					width: '150rpx',
					height: '62rpx',
					color: '#fff',
					fontSize: '26rpx',
					textAlign: 'center',
					letterSpacing: '3rpx',
				},
				

				isgetuserInfo: true,
				item1: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/产品介绍.png",
				item2: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/意见反馈.png",
				item3: "cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/版本更新.png",
				name1: '产品介绍',
				name2: '意见反馈',
				name3: '版本更新',


				itemList: [{
						iconid: 0,
						ItemName: '地块概览',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/土地.png',
					},
					{
						iconid: 1,
						ItemName: '数据分析',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/数据.png',
					},
					{
						iconid: 2,
						ItemName: '实时监控',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/实时监控2.png',
					},
					{
						iconid: 3,
						ItemName: '设备管理',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/greenhouse.png',
					},

					{
						iconid: 4,
						ItemName: '信息采集',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/信息采集.png',
					},
					
					
					{
						iconid: 5,
						ItemName: '通知预警',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/inform.png',
					},
					{
						iconid: 6,
						ItemName: '实时天气',
						imgsrc: 'cloud://yexi-2gmdp1fadb6db2c2.7965-yexi-2gmdp1fadb6db2c2-1310783627/image/天气预报.png',
					},

				],
				swiperList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],


				// navData:"asd"

			};
		},




		methods: {
			//微信登录：目的是获取openid
			wxlogin() {

				return new Promise((resove, reject) => {

					userService.wxLogin().then(e => {

						this.openid = e.result.openid
						this.hasWxLogin = true //微信是否登录
						resove()
					})

				})


			},

			//用户登录：注意与微信登录的区别,--》微信登录只是获取微信权限与openid不是传统意义的登录
			userLogin() {
				//如果已经执行过微信登录,说明已经得到openid了
				if (this.hasWxLogin) {
					this.$store.commit('login', this.openid)
				}

			},





			//获取用户微信基本信息： openid，头像等微信相关
			getWxInfo() {


				//判断缓存中是否有用户数据，没有则获取
				let _wxInfo = uni.getStorageSync('wxInfo')


				if (_wxInfo) {
					this.hasWxInfo = true
					this.wxInfo = _wxInfo

				} else {
					this.hasWxInfo = false

					//微信官方规定：wx.getUserProfile 只能通过按钮点击触发
					wx.getUserProfile({
						desc: '获取用户头像、性别',
						success: (res) => {
							console.log('fram:res=', res)
							if (res && res.userInfo) {
								console.log('fram:res.userInfo=', res.userInfo)
								this.$store.commit("setWxinfo", res.userInfo) //{nickName ，avatarUrl}
								this.wxInfo = res.userInfo
								this.hasWxInfo = true

							}

						},
						fail: (err) => {
							console.log('fram:errs=', err)
						}
					})

				}




			},

			//跳转用户注册页面
			toRegister() {

				//如果还没有执行过微信登录获取openid就先微信登录
				if (!this.hasWxLogin) {

					this.wxlogin().then(() => {
						this._fillRegForm()
					})

				} else {

					this._fillRegForm()
				}

			},

			//自动把微信信息填充到注册表单
			_fillRegForm() {

				wx.getUserProfile({
					desc: '获取用户头像、性别',
					success: (res) => {

						if (res && res.userInfo) {

							let info = res.userInfo // {nickName ，avatarUrl}
							info.openid = this.openid //再把openid也存进去

							this.$store.commit("setWxinfo", loginInfo) //{nickName ，avatarUrl}

							this.wxInfo = info
							this.hasWxInfo = true


							this.registerform.nickName = info.nickName
							this.registerform.openid = info.openid
							this.registerform.avatarUrl = info.avatarUrl
							this.showRegister = true

						}

					},
					fail: (err) => {
						console.log('fram:errs=', err)
					}
				})
			},

			//判断用户是否已注册用户
			async checkIfRegister() {


				let param = {
					openid: this.openid,
					flag: 'login'
				}

				const res = await userService.userLogin(param)

				let logininfo = res.result.data[0]

				if (logininfo) {
					this.hasRegister = true
				}

			},


			//调用云函数保存注册用户 openid ,nickName
			onSubmitRegister() {

				var param = {}
				param.openid = this.registerform.openid
				param.nickName = this.registerform.nickName
				param.avatarUrl = this.registerform.avatarUrl
				param.flag = 'register' //多个方法共用一个云函数的区别标记，##登录和注册使用的是同一个云函数 user.js

				//注册完成接着登录
				userService.userRegister(param).then(res => {


					this.$store.commit('login', param.openid)
					this.hasRegister = true

				})
				this.showRegister = false

			},




			// 退出登录
			loginOut() {

				this.$store.commit("logout")
				this.wxInfo = null
				uni.redirectTo({
					url: '/pages/index/index'
				})


			},

			clickItem(id) {
				console.log("id=", id)
				let logininfo = uni.getStorageSync('loginInfo')
				if (logininfo) {

					if (id == 5 || id == 6) {

						uni.redirectTo({
							url: '/pages/index/index'
						})

					} else if (id == 3 || id == 4) {
						uni.redirectTo({
							url: '/pages/manage/manage'
						})
					} else if (id == 0) {
						uni.navigateTo({
							url: '/pages/selectArea/selectArea'
						})
					} else if (id == 1) {
						uni.navigateTo({
							url: '/pages/DataAnalysis/DataAnalysis'
						})
					}else if (id == 2){
						uni.navigateTo({
							url: `/pages/monitor/monitor`
						})
					}

				} else {
					this.show = true
				}
			},


			myInform() {
				let that = this
				if (that.isgetuserInfo == false) {
					uni.showToast({
						icon: "none",
						title: '登录以获取此服务'
					})
				} else {
					uni.navigateTo({
						// url: "../warning/warning"
					})
				}

			},
			huadongdelete() {
				uni.navigateTo({
					// url: "../delete/delete"
				})
			},


			update() {
				uni.showToast({
					icon: "none",
					title: '已经是最新版本'
				})
			}


		}


	}
</script>


<style lang="scss" scoped>
	/* 页面背景颜色设置 */
	page {
		background-color: #f0f0f0;
	}

	/* 总体容器 */
	.Container-all {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-family: 'Microsoft YaHei';
		position: relative;
	}

	// 轮播图
	.wrap {
		padding: 30rpx;
		margin-top: 15rpx;
	}
	
	.loginAlert{
		// display: flex;
		text-align: center;
		// height: 150rpx;
		padding: 40rpx;
		
		.tips{
			font-size: 30rpx;
			letter-spacing: 1rpx;
			// margin-top: 20rpx;
			margin-bottom: 30rpx;
			
		}
		// .alertbtn{
		// 	margin-top: 10rpx;
		// 	width: 100rpx;
		// 	margin-left: 180rpx;
		// }
	}


	.myservice {
		display: flex;
		margin: 20rpx;
		margin-top: 30rpx;
		margin-bottom: 10rpx;


		.topTitle {

			font-weight: 600;
			font-size: 30rpx;
			color: #515151;
			letter-spacing: 2rpx;
			border-radius: 15rpx;
			margin-top: 22rpx;
			margin-left: 5rpx;



		}
	}

	.myservice2 {
		display: flex;
		margin-left: 20rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		// padding-bottom: 10rpx;



		.topTitle {
			font-weight: 600;
			font-size: 30rpx;
			color: #515151;
			letter-spacing: 2rpx;
			border-radius: 15rpx;
			margin-top: 22rpx;
			margin-left: 5rpx;



		}
	}

	.header {

		width: 100%;

		/* background-color: #18BC37; */
		/* position: relative; */
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.pic-top {
		width: 100%;
		height: 250rpx;
		background: -webkit-linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63));
		z-index: 997;
	}

	.pic-bottom {
		position: relative;
		padding-top: -10rpx;
		width: 100%;
		height: 119rpx;
		background: -webkit-linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63));
		border-radius: 50%;
		transform: translateY(-50%);
		z-index: -1;
	}

	.userProfile {
		width: 30%;
		background-color: white;
		border-radius: 100%;
		margin-left: 35%;
		height: 30%;
		/* line-height:280px; */
		position: relative;

		margin-top: -100rpx;
		display: flex;
		flex-direction: column;



		.image {
			width: 100px;
			height: 100px;
			margin: 0 auto;
			display: block;
			padding-top: 20px;
		}

		.name {
			text-align: center;
			padding-top: 10px;
		}

		button {
			margin-top: 50rpx;
			background: #ea5149;
			width: 60%;
			margin-top: 100px;
			color: #ffffff;
		}

		.userinfo-nickname {
			text-align: center;
			font-size: 25rpx;
			letter-spacing: 1rpx;
			color: #5f5f5f;

			margin-top: 15rpx;
		}

	}

	.userstouxiang {
		margin-top: 30rpx;
		margin-left: 30rpx;
		align-items: center;
		width: 150rpx;
		height: 150rpx;


	}

	.userstouxiang2 {
		margin-top: 15rpx;
		margin-left: 29rpx;
		align-items: center;
		width: 150rpx;
		height: 150rpx;


	}

	.avatarUrl {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;

	}

	.username {
		margin-top: -10rpx;
		align-items: center;
	}


	.service {
		// box-shadow:0px 2px 6px rgba(34, 25, 25, 0.2);
		padding-left: 10rpx;
		padding-right: 10rpx;
		position: relative;
		background-color: white;
		width: 94%;
		/* height: 700rpx; */
		margin-left: 3%;
		// margin-top: -180rpx;
		// z-index: 998;
		display: flex;
		flex-direction: column;

	}

	.username {
		text-align: center;
		font-size: 25rpx;
		letter-spacing: 1rpx;
		color: #5f5f5f;

		margin-top: 15rpx;
	}



	.mytext {
		margin: 3%;
		align-items: center;
		font-weight: 600;
		/* font-family: Serif; */

	}

	// 循环组件样式
	.service-content {

		display: flex;
		padding-bottom: 25rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;

		flex-wrap: wrap;
		margin: 15rpx;
		// border: 1rpx solid;
		// border-top: 1rpx  solid #f2f2f2;
		// border-bottom: 1rpx  solid #f2f2f2;


		.ItemContainer {
			width: 25%;
			margin-top: 35rpx;

		}
	}

	.service-content-bottom {
		width: 100%;
		display: flex;
		// padding-left: 20rpx;
		// padding-right: 20rpx;

		/* background-color: #007AFF; */
	}

	.pic-1 {
		display: flex;
		flex-direction: column;
		/* padding-top: 10rpx; */
		margin: 40rpx;
		font-size: 10px;
		text-align: center;
	}

	.item-zong {
		// box-shadow:0px 2px 6px rgba(34, 25, 25, 0.2);

		// margin-top: 40rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: 94%;
		/* height: 300rpx; */
		margin-left: 3%;
		background-color: white;


	}


	.right-arrow {
		display: inline-block;
		float: right;
		border-right: 1px solid;
		border-bottom: 1px solid;
		width: 18rpx;
		height: 18rpx;
		transform: rotate(-45deg);
	}

	.item1 {
		display: flex;
		align-items: center;
		// border-top: 1rpx  solid #f2f2f2;
		// border-bottom: 1rpx  solid #f2f2f2;
		/* margin: 20px; */
		padding: 20rpx;
		// color: #000000;

		font-size: 15px;
		// border-radius: 5px;

	}

	.feedback {
		display: flex;
		align-items: center;

		padding: 20rpx;
		font-size: 15px;


	}

	.feedback::after {
		border: none;
	}

	button {
		-webkit-tap-highlight-color: transparent;

		font-size: 18px;

	}

	.item-pic {
		margin-left: 1%;
		float: left;
		height: 24px;
		width: 24px;
	}

	.item-text {
		margin-left: 7rpx;
		font-size: 28rpx;
		letter-spacing: 1rpx;
		font-family: 'Microsoft YaHei';
		color: #444444;
	}
</style>
