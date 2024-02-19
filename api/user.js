export default {

	/**
	 * 用户注册
	 * @param {Object} param {openid ,nikName,avatarUrl ,flag='register'} 
	 *  
	 */
	// 查询用户信息
	userRegister(param) {


		return new Promise((resovle, reject) => {


			wx.cloud.callFunction({


				// 云函数名称
				name: 'login',
				data: param,

				success: function(e) {

					resovle(e)

				},
				fail: err => {
					reject(err)
				}
			})





		})


	},

	/**
	 * 用户登录
	 * @param {Object} param { openid,flag='login'}
	 */
	userLogin(param) {


		return new Promise((resovle, reject) => {

			wx.cloud.callFunction({


				// 云函数名称
				name: 'login',
				data: param,

				success: function(e) {

					resovle(e)

				},
				fail: err => {
					reject(err)
				}
			})





		})


	},

	//微信登录，获取openid
	wxLogin() {

		return new Promise((resovle, reject) => {

			wx.cloud.callFunction({


				// 云函数名称
				name: 'login',
				data: {
					flag: 'wxlogin'
				},

				success: function(e) {
					console.log(e)
					resovle(e)

				},
				fail: err => {
					reject(err)
				}
			})





		})

	},
	

}
