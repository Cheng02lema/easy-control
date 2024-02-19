// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {


	const collection = db.collection('historys')



	var res = []
	if (event.type == -1) { // 查询mqtt生成的数据

		res = await db.collection('historys').get() //查询所有记录

	} else if (event.flag == 1) { // 位置信息查询

		res = await db.collection('position').get()

	} else {
		//获取类型是type且在日期范围内 的记录
		res = await db.collection('historys').where({
			type: event.type,
			createTime: _.gte(new Date(event.sdate)).and(_.lte(new Date(event.edate))),
		}).get()

	}
	return res


}
