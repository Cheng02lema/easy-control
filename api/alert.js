export default {

	//配置保存于更新，就这一个函数就足够了
	//创建通用保存配置文件函数
	//param 对象 {type ,typeName,lowMax,lowMin,hightMax,higthMin } 
	
	//这个param 再加个标记就行了
	updateConfig(param) {
      
	      
			return new Promise((resovle, reject) => {

		
					wx.cloud.callFunction({


						// 云函数名称
						name: 'updateConfig',
						data: param,

						success: function(e) {
							console.log("updateConfig API结果=", e)
							resovle(e)

						},
						fail: err => {
							reject(err)
						}
					})

				



			})


	},
	
	updatePosition(param) {
	  
	      console.log('param1=',param)
			return new Promise((resovle, reject) => {
	            console.log('param2=',param)
				
				// let param2=JSON.parse(JSON.stringify(param))
		
					wx.cloud.callFunction({
	
	
						// 云函数名称
						name: 'updateConfig',
						data: param,
	
						success: function(e) {
							console.log("updateConfig API结果=", e)
							resovle(e)
	
						},
						fail: err => {
							reject(err)
						}
					})
	
				
	
	
	
			})
	
	
	},
	
	addConfig(param){
		
		return new Promise((resovle, reject) => {
			
				wx.cloud.callFunction({
		
		
					// 云函数名称
					name: 'addConfig',
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


	//获取配置记录 //type -1  查询所有   1 温度   2湿度
	getConfig(type) {



		return new Promise((resovle, reject) => {

			//根据param.type 查询数据库，如果没有记录就新增 否则根据type修改数据库配置值

			//1.查询数据库是否有param.type的记录

			wx.cloud.callFunction({


				// 云函数名称
				name: 'getConfigByType',
				data: {
					type:type
				}, //type 可能是-1 所有  1 温度  2湿度

				success: function(e) {
					console.log("getConfigByType结果=", e)
					resovle(e.result.data)  //这里是数组

				},
				fail: err => {
					console.log("getConfigByType error=", err)
					reject(err)
				}
			})



		})

	},

	
}




