
export interface IHttp {
	get: (url: string, loading?: boolean) => Promise<any>
	post: (url: string, data: AnyObject, loading?: boolean) => Promise<any>
}


/** 普通模式请求 */
export class Http implements IHttp {
	
	get(url: string, loading?: boolean) {
		return this.init({url, method: 'GET'}, loading)
	}

	post(url: string, data: AnyObject, loading?: boolean) {
		return this.init({url, data, method: 'POST'}, loading)
	}

	init(options: wx.RequestOption, loading?: boolean) {
		if(loading !== false) {
			wx.showLoading({title: ''})
		}
		return new Promise((resolve, reject) => {
			const {url, data, method} = options
			wx.request({
				url,
				data,
				method,
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				},
				complete: () => {
					wx.hideLoading()
				}
			})
		})
	}
}
