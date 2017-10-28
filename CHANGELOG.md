# 2.0.0 (2017-10-28)

- 统一配置API路径、新版本APP下载路径，获取是否连接网络、获取APP基本信息等（`config.service.ts`）

- 每个请求统一默认显示加载动画、请求header添加令牌属性URMS_LOGIN_TOKEN、请求错误统一处理等（`request.service.ts`）

- 检测网络是否断开及重连等（`app.component.ts`）

- 检测服务器是否有新版本、可下载APP并打开安装（只支持android）、检测是否已经登录等（`login.ts`）

- 持久化保存token及用户信息（`auth.service.ts`）

- 集成高德地图、highchart，实现简单天气预报（调用高德api）

# 1.0.0 (2017-05-02)

- 发布初始版本
