const url = require('url')
const http = require('http')
const https = require('https')

const proxy = config => {
	let urlParse = url.parse(config.hostname),
		isHttp = urlParse.protocol === 'http:'

	return (req, res, next) => {
		let option, server

		option = {
			host: urlParse.hostname,
			port: (isHttp ? 80 : 443),
			path: req.url,
			method: req.method,
			params: req.params,
			body: req.text
		}

		server = (isHttp ? http : https).request(option, response => {
			if (response.statusCode === 200) {
				const cookie = response.headers['set-cookie']
				if (cookie instanceof Array) {
					cookie.map((item, index) => cookie[index] = item.replace(/; domain=[^;]+/, ''))
				}
				delete response.headers['access-control-allow-origin']
				console.log(`[remote] statusCode: ${response.statusCode} url: ${req.url}`)
				response.pipe(res, 'utf-8')
			}else{
				console.log(`[local] statusCode: ${response.statusCode} url: ${req.url}`)
				next()
			}
		})

		server
			.on('error', err => {
				console.log(err)
				server.end()
			})

		req.pipe(server)
	}
}

module.exports = proxy
