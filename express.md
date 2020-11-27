# express 功能概要
- 路由中间件 `app.get('/',fn1,fn2,fn3)` ✅
- application转发请求,application转发注册中间件✅
- router路由处理请求,router注册中间件✅
- router由layer和route组成✅
- 错误处理✅
- 动态参数处理✅
- 多级路由✅
- 静态路由中间件
- 上传文件

# express 源码功能历史
- express增加routes使其可以注册路由中间件
- 将application和router分层,使其职责单一
- 添加剂layer层和route层,使一个路径下可以存放多个中间件
- 添加app.use和路由懒加载