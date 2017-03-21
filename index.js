const http = require('http')

const proxy = config => {
	return (req, res, next) => {
		let opt, _req

		opt = {
				hostname: config.hostname,
				path: req.url,
				method: req.method
			}

		_req = http.request(opt, _res => {
			if (_res.statusCode === 200) {
				console.log(`remote: http status code is  ${_res.statusCode} url is ${req.url}`)
				_res.setEncoding('utf-8')
				let content = []
				_res
					.on('data', chunk => {
						content.push(chunk)
					})
					.on('end', () => res.status(_res.statusCode).send(content.join('')))
			}else{
				next()
			}
		})

		_req
			.on('error', err => console.log(err))
			.end()
	}
}

module.exports = proxy
