// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// const db = uniCloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
	
	const db = cloud.database()
	db.collection('alertConfig').add({
	  // data 字段表示需新增的 JSON 数据
	  data: {
	    
	    type :event.type, //1 温度 2 湿度  其他你自己定
	    typeName:event.typeName,  //大棚温度传感器所需的参数就这几个 不需要这几个
		min:event.min,    //最低预警值
		
		max:event.max, //最高预警值
	
		
	  
	  },
	  success: function(res) {
	    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
	    console.log(res)
	  }
	})

	// const collection = db.collection('alertRange') // 获取云数据库的集合
/* 	const db = cloud.database()
	
	db.collection('alertRange').doc('5464a294625fb837017b9bdb436fd38b').update({
	  // data 字段表示需新增的 JSON 数据
	  data: {
	    // 表示将 done 字段置为 true
	    wendu_maxValue: event.wendu_maxValue,
	    wendu_minValue: event.wendu_minValue,
	    
	    shidu_maxValue: event.shidu_maxValue,
	    shidu_minValue: event.shidu_minValue,
	    
	    suanjiandu_maxValue: event.suanjiandu_maxValue,
	    suanjiandu_minValue: event.suanjiandu_minValue,
	    
	    guangzhao_maxValue: event.guangzhao_maxValue,
	    guangzhao_minValue: event.guangzhao_minValue,
	    
	    co2_maxValue: event.co2_maxValue,
	    co2_minValue: event.co2_minValue,
	    
	    pm_maxValue: event.pm_maxValue,
	    pm_minValue: event.pm_minValue,
	  },
	  
	})
	.then(res => {
	  console.log("update返回结果=",res)
	})
	 */
	
}
