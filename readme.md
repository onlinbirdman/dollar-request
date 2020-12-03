### Example

```javascript

// http
import DollarRequest from '@birdman_jp/dollar-request/lib/miniprogram'

const http = new DollarRequest({
    urls: {
      getHomeData: 'https://www.domain.cn/userIndex',
      postDraw: 'https://www.domain.cn/draw',
    }, // 接口url
    options: {
        whiteList: [],
        NODE_ENV: process.env.NODE_ENV
    }, // axios实例初始化选项
    exceptionHandler: (error, next) => {},
    showLoading: () => {},
    hideLoading: () => {},
})

// use-case
const res = await http.postDraw({
  userId: "uid"
})

// use-case: 不带loading
const res = await http.postDraw({
  userId: "uid",
  $showLoading: false
})
// use-case: 需要做一些请求配置（同axios官方请求config选项）
const res = await http.postDraw({
  userId: "uid",
  _headers: {'X-Requested-With': 'XMLHttpRequest'}
})
// use-case: 需要把参数转化为formData传输
const res = await http.postDraw({
  userId: "uid",
  $isFormData: true
})
```
### initial options
+ urls
+ options
  + whiteList - production api origin generally
  + NODE_ENV - `process.env.NODE_ENV` generally
  + ... - other axios surpport config
+ exceptionHandler
+ showLoading
+ hideLoading
### custom options
+ $showLoading
  + default: true
  + options: true / false

+ $isFormData
  + default: false
  + options: true / false
