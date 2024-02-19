// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {


	const db = cloud.database()
	console.log("time2=",event.createTime)

	//云函数操作数据库
	db.collection('historys').add({
			// data 字段表示需新增的 JSON 数据
			data: {
				// 左边是数据库属性名，右边是形参
				// maxValue:event.maxValue,
				// minValue: event.minValue,
				createTime: new Date(),
				nValue: event.nValue,
				placeName: event.placeName,
				type: event.type

			}
		})
		.then(res => {
			console.log("add返回结果=", res)
		})

}
