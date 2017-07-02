# ionic-start

This is an ionic app project.

## 实现功能

- 统一配置API路径、新版本APP下载路径，获取是否连接网络、获取APP基本信息等（`config.service.ts`）

- 每个请求统一默认显示加载动画、请求header添加令牌属性URMS_LOGIN_TOKEN、请求错误统一处理等（`request.service.ts`）

- 检测网络是否断开及重连等（`app.component.ts`）

- 检测服务器是否有新版本、可下载APP并打开安装（只支持android）、检测是否已经登录等（`login.ts`）

- 持久化保存token及用户信息（`auth.service.ts`）

- 集成高德地图、highchart，实现简单天气预报（调用高德api）

## setup project（[详细教程](./SETUP.md)）

- Install [Nodejs](https://nodejs.org/zh-cn/) (v6.9.x)

- Install [Java JDK ](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

- Install [Apache Ant](http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip)

- Install [Android SDK]( http://developer.android.com/sdk/index.html)

- `npm install -g ionic cordova` 全局安装ionic(>=3.1.2)及cordova

- `npm install` 安装依赖包

- `npm run add` 添加android平台

## run project

- development: `npm start`
- build: `npm run build`

## main dependency

- [sass](http://sass-lang.com/)
- [karma](https://karma-runner.github.io/1.0/index.html)
- [tslint](https://palantir.github.io/tslint/) & [codelyzer](https://github.com/mgechev/codelyzer)
- [typescript](https://www.typescriptlang.org/) & [@types](https://www.npmjs.com/~types)
- ...

