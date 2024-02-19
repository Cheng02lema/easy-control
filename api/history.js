// import { stringToDate } from '@/utils/datetime.js'

export default {
	


	funAdd(form) {
		
		return new Promise((resovle,reject)=>{
			console.log("time=",form.createTime)
			
			wx.cloud.callFunction({
			
				// 云函数名称
				name: 'funcAdd',
			
				// 传给云函数的参数
				data: {
					// maxValue: form.maxValue,
					// minValue: form.minValue,
					createTime: form.createTime,
					nValue: form.nValue,
					placeName: form.placeName,
					type: form.type,
					
				},
				success: function(e) {
					console.log("funcAdd结果=", e) // 3
					resovle(e)
			
				},
				fail:err=>{
					reject(err)
				}
			})
		})
					
		
		
	},
	
	searchData(sdate,edate){
		
		return new Promise((resovle, reject) => {
		
			
		
			wx.cloud.callFunction({
				
				// 云函数名称
				name: 'searchData',
				data: {
					
					sdate:sdate,
					edate:edate,
				}, 
		
				success: function(e) {
					console.log("searchData结果=", e)
					// resovle(e.result.data)  //这里是数组
					resovle(e)
		
				},
				fail: err => {
					console.log("searchData error=", err)
					reject(err)
				}
			})
		
		
		
		})
	
	},
	
	searchConfig(sdate,edate,type){
		console.log("wx type=",type)
		
		return new Promise((resovle, reject) => {
		
			 
		
			wx.cloud.callFunction({
				
				// 云函数名称
				name: 'searchConfig',
				data: {
					
					sdate:sdate,
					edate:edate,
					type:type
				}, 
		
				success: function(e) {
					console.log("searchData结果=", e)
					resovle(e.result.data)  //这里是数组
		
				},
				fail: err => {
					console.log("searchData error=", err)
					reject(err)
				}
			})
		
		
		
		})
	
	},
	
	searchPosition(flag){
		
		
		return new Promise((resovle, reject) => {
		
			 
		
			wx.cloud.callFunction({
				
				// 云函数名称
				name: 'searchConfig',
				data: {
					flag:flag
				}, 
		
				success: function(e) {
					console.log("searchPosition结果=", e)
					resovle(e.result.data[0])  //这里是数组
		
				},
				fail: err => {
					console.log("searchPosition error=", err)
					reject(err)
				}
			})
		
		
		
		})
	
	},
	

}
