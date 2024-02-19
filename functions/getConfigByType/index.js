// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {


    console.log("xxxxx event=",event)

	// return await db.collection('alertRange').doc('5464a294625fb837017b9bdb436fd38b').get()

	const collection = db.collection('alertConfig')
	
	// const res = await collection.doc('5464a294625fb837017b9bdb436fd38b').get()
	// console.log(JSON.stringify(res))
	
	//如果外部传type=-1，就查询所有记录，这样就能做到一个方法多个用途
	var res=[]
	if(event.type==-1){
		
		 res = await db.collection('alertConfig').get()  //查询所有记录
	}else{
		res = await db.collection('alertConfig').where({
		  
		type:event.type  //获取类型是type的记录
		}).get()
		
	}

	
	return res


}
