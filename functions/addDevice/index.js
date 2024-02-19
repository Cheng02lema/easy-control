// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// const db = uniCloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
	
	const db = cloud.database()
	console.log('event.isok=','ok')
	console.log('event.ItemName=',event.ItemName)
	console.log('event.imgsrc=',event.imgsrc)
	
	db.collection('device').add({
	  // data 字段表示需新增的 JSON 数据
	  
	  data: {
	    
	    ItemName:event.ItemName, 
		imgsrc:event.imgsrc,

	  },
	  success: function(res) {
	    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
	    console.log(res)
	  }
	})


	
}
