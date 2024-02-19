// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {


	const collection = db.collection('device')
	

	
	var res = []
	res = await db.collection('device').get() //查询所有记录
	
	return res


}
