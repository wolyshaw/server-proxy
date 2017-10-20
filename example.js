const proxy = require('./index')
const express = require('express')
const prot = 4000
const app = express()
const setProxy = proxy({
	hostname: 'https://www.abc.com'
})
app.use(setProxy)
app.get('*', (req, res) => {
	res.send('server')
})
app.listen(prot, err => {
	err ? console.log(err) : console.log(`server online in ${prot}`)
})
