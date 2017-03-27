const http = require('http')

const proxy = config => {
	return (req, res, next) => {
		let opt, _req

		opt = {
				host: config.hostname,
				path: req.url,
				method: req.method
			}

		_req = http.request(opt, _res => {
			if (_res.statusCode === 200) {
				console.log(`remote: http status code is  ${_res.statusCode} url is ${req.url}`)
				_res.pipe(res, 'utf-8')
			}else{
				console.log(`local: http status code is  ${_res.statusCode} url is ${req.url}`)
				next()
			}
		})

		_req
			.on('error', err => console.log(err))
			.end()
	}
}

module.exports = proxy
