// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// const db = uniCloud.database()


// 云函数入口函数
exports.main = async (event, context) => {

	const db = cloud.database()
	

	if (event.flag && event.flag == 1) {
		// console.log("event=", event)

		return await db.collection('position').where({

			flag: event.flag
		}).update({
			data: {
				'dikuai': event.dikuai,
				latitude: event.latitude, //转字符串
				longitude: event.longitude,

			},
			success: function(res) {
				console.log("res.data=",res.data)
				
			}

		})

	} else {

		return await db.collection('alertConfig').where({
			type: event.type
		}).update({
			data: {
				'min': event.min,
				'max': event.max,
			},
			success: function(res) {
				console.log(res.data)
			}

		})

	}



}
