### server-proxy
###### express 中间件, 优先读取远程接口数据，如果状态码不为200则不执行,否则直接返回内容不执行后面代码。

#### 示例：

```
const express = require('express')
const serverProxy = require('server-proxy')
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
```
