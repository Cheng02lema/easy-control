export default {

	//配置保存于更新，就这一个函数就足够了
	//创建通用保存配置文件函数
	//param 对象 {type ,typeName,lowMax,lowMin,hightMax,higthMin } 
	delDevice(ItemName){
		
		return new Promise((resovle, reject) => {
		
				
				wx.cloud.callFunction({
		
		
					// 云函数名称
					name: 'delDevice',
					data: {
						
						ItemName:ItemName,
					}, 
					
		
					success: function(e) {
						console.log("delDevice API删除成功=", e)
						resovle(e)
		
					},
					fail: err => {
						reject(err)
					}
				})
		
			
		
		
		
		})
		
	},
	
	
	
	addDevice(ItemName,imgsrc){
		
		return new Promise((resovle, reject) => {
			
				wx.cloud.callFunction({
		
		
					// 云函数名称
					name: 'addDevice',
					data: {
						ItemName:ItemName,
						imgsrc:imgsrc,
					},
		
					success: function(e) {
						console.log("e=",e)
						resovle(e)
		
					},
					fail: err => {
						reject(err)
					}
				})
		
		
		
		
		
		})
	},


	getDevice() {

		return new Promise((resovle, reject) => {

			wx.cloud.callFunction({


				// 云函数名称
				name: 'searchDevice',
				data: {
					
				}, 

				success: function(e) {
					console.log("searchDevice结果=", e)
					resovle(e.result.data)  //这里是数组

				},
				fail: err => {
					console.log("searchDevice error=", err)
					reject(err)
				}
			})



		})

	},

	
}




