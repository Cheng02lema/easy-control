// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()



// 云函数入口函数
exports.main = async (event, context) => {



	if (event.flag && event.flag == 'login') {
		//用户登录
		//获取类型是type且在日期范围内 的记录
		const db = cloud.database()
		let res = await db.collection('userLogin').where({
			openid: event.openid,

		}).get()

		return res

	}

	if (event.flag && event.flag == 'register') {

		const db = cloud.database()
		//用户注册
		let res = await db.collection('userLogin').add({
			// data 字段表示需新增的 JSON 数据
			data: {
				// 左边是数据库属性名，右边是形参
				openid: event.openid,
				nickName: event.nickName,
				avatarUrl: event.avatarUrl


			}
		})

		return res



	}

	if (event.flag && event.flag == 'wxlogin') {

		//微信登录
		const wxContext = cloud.getWXContext()
		return {

			// 获取用户ID
			openid: wxContext.OPENID
		}
	}
	


}
