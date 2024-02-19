
export default {
	config: {
		// baseUrl: "http://192.168.8.127:9003",
		// baseUrl: "http://1.15.131.41:9003",
		// baseUrl: "https://www.vision0546.com",
		// baseUrl:"http://127.0.0.1:8003",
		baseUrl:"http://192.168.8.121:8003",
		
		
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			// 'Content-Type':'application/x-www-form-urlencoded'
			//"Content-Type": "multipart/form-data"
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		//TODO 加密数据
		
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   
		return new Promise((resolve, reject) => {
			let _config = null
			
			options.fail=()=>{
				uni.showToast({
					title:"服务器错误连接失败！",
					icon:"error",
					duration:10000
				})
			}
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						console.log(" 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				//_reslog(response)
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					
					
					console.log(response)
				
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			//_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			//_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				console.log(" 地址：" + _config.url)
				if (_config.data) {
					console.log(" 参数：" + JSON.stringify(_config.data))
				}
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


/**
 * 请求接口日志记录
 */
// function _reqlog(req) {
// 	if (process.env.NODE_ENV === 'development') {
// 		console.log("【" + req.requestId + "】 地址：" + req.url)
// 		if (req.data) {
// 			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
// 		}
// 	}
// 	//TODO 调接口异步写入日志数据库
// }

/**
 * 响应接口日志记录
 */
// function _reslog(res) {
// 	let _statusCode = res.statusCode;
// 	if (process.env.NODE_ENV === 'development') {
// 		console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
// 		if (res.config.data) {
// 			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
// 		}
// 		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
// 	}
// 	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
// 	switch(_statusCode){
// 		case 200:
// 			break;
// 		case 401:
// 			break;
// 		case 404:
// 			break;
// 		default:
// 			break;
// 	}
// }

