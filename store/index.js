import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
import userService from '@/api/user.js'

// import list from "@/common/tabbar/uTabBar-list.js"

// 通过vuex构造函数创建store对象
const store = new Vuex.Store({
	state: {

		tabbarCurrent: 0, //底部导航栏索引
		// dikuai:'济南市',
		// longitude:'',
		// latitude:'',
		// alertContent:'警告,',
		userInfo: null,
		hasUserInfo: false,
		canIUseGetUserProfile: false,
		
		updateDeviceList:[
			// {
			// 	    _id:'',
			// 		ItemName: "灌溉器",
			// 		imgsrc: "cloud://wcml-6g4klm1x301656c9.7763-wcml-6g4klm1x301656c9-1310783627/icon/开关.png",
			// 	},
			
		],
		

		hasLogin:false, //是否登录
		
		
		mapSearchList: [],
	
        wxinfo: {}, //微信账户信息 openid  微信头像
	    loginInfo: {}, //用户信息{openid,userName}
		

	},
	
	//相当与vuex里的计算属性
	getters: {
			hasLogin: (state) => {
				
				let logininfo=uni.getStorageSync('loginInfo')
			
				state.loginInfo =logininfo
				if(logininfo){
					 return true
				}else{
					 return false
				}
			}
			//是否登录
		},
		
	mutations: {
		async login(state, openid) {
		
		//系统用户登录,根据传入的openid查询user表用户，如果有返回查到的用户，没有返回null
		
		  let param={openid:openid,flag:'login'}
		  const res= await userService.userLogin(param) //flag='login'登录 ，flag='register' 注册
		  console.log('logininfo=',res.result.data[0]) 
		  
          let  logininfo=res.result.data[0]
		 
		 if(logininfo){
			 //如果数据库有保存的openid用户，登录ok
			
			 state.loginInfo=logininfo
		
			 uni.setStorageSync("loginInfo",logininfo)
			 console.log("正在缓存用户信息！！！！")
			 
			 
			uni.navigateTo({
				url: '/pages/index/index'
			})
		 }
			
		

		},
		
		
		
		logout(state) {
			console.log("login out ")
			uni.removeStorageSync('loginInfo')
			
			state.loginInfo =null
			uni.navigateTo({
				url:'/pages/index/index.vue'
			})
			
			
			
			
			
		},
		setWxinfo(state, info) {
			state.wxinfo = info
			
			uni.setStorageSync('wxInfo',info)
			
			//错误写法
			// uni.setStorageSync({
			// 	key: 'wxInfo',
			// 	data: info
			// })
		},

		setloginInfo(state, info) {
			if(info!=null){
				state.loginInfo = info
				
			}else{
				state.loginInfo =null
				
			}
			

		},
		setMapSearchList(state, list) {
			state.mapSearchList = list
		},
		setLineId(state, id) {
			state.lineId = id
		},

		setLineInfo(state, info) {
			state.LineInfo = info
		},
		setSteps(state, step) {
			state.steps = step
		},
		setMileInfo(state, obj) {
			state.mileInfo.segment = obj.segments
			state.mileInfo.total = obj.total
		},

		//设置底部导航栏current 第一个参数是固定写法，第二个参数是传参
		setTabbarCurrent(state, val) {
			state.tabbarCurrent = val
		},
		setCart(state, val){
			state.cart = val
		},
		setUpdateDeviceList(state, val){
			state.updateDeviceList = val
		},
		deleteDeviceListByName(state, val){
			
			for (let i = 0; i < state.updateDeviceList.length; i++) {
				if( val.ItemName&& state.updateDeviceList[i].ItemName==val)
				{
					state.updateDeviceList.splice(i,1)
				}
			}	
		},
		// 语音报警
		setAlertContent(state, val){
			state.alertContent += val
		},
		initAlertContent(state, val){
			state.alertContent = val
		},
		setUserInfo(state, val){
			state.userInfo = val
		},
		setHasUserInfo(state, val){
			state.hasUserInfo = val
		},
		setCanIUseGetUserProfile(state, val){
			state.canIUseGetUserProfile = val
		},
		
		
		
	},
	// actions:{
	// 	getList(context){
			
	// 	}
	// },
	modules: {
		shopcar: {
			state: {
				checkedGoods: [],
				allMoney: ""
			},
			mutations: {
				changeCheckedGoods() {},
				changeAllMoney(state, playload) {
					state.allMoney = playload.arguments.allMoney
				}
			}
		}
	},
	
})
export default store //导出store对象
