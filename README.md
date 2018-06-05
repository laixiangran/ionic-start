# ionic-start

[Ionic](http://ionicframework.com/docs/)起步项目，目前更新到Ionic3.x

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

[![GitHub forks](https://img.shields.io/github/forks/laixiangran/ionic-start.svg?style=social&label=Fork)](https://github.com/laixiangran/ionic-start/fork)
[![GitHub stars](https://img.shields.io/github/stars/laixiangran/ionic-start.svg?style=social&label=Star)](https://github.com/laixiangran/ionic-start)

## 实现功能

- 统一配置API路径、新版本APP下载路径，获取是否连接网络、获取APP基本信息等（`config.service.ts`）

- 每个请求统一默认显示加载动画、请求header添加令牌属性URMS_LOGIN_TOKEN、请求错误统一处理等（`request.service.ts`）

- 检测网络是否断开及重连等（`app.component.ts`）

- 检测服务器是否有新版本、可下载APP并打开安装（只支持android）、检测是否已经登录等（`login.ts`）

- 持久化保存token及用户信息（`auth.service.ts`）

- 集成高德地图、highchart，实现简单天气预报（调用高德api）

- 通过 URL Scheme 可以在外部（如浏览器）通过代码打开 APP（使用 `ionicStart://任意值` 即可）

- ...

## 搭建环境（[详细教程](http://www.cnblogs.com/laixiangran/p/8944435.html)）

- Install [Nodejs](https://nodejs.org/zh-cn/) (>= 6.9.0)

- Install [Java JDK ](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

- Install [Apache Ant](http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip)

- Install [Android SDK]( http://developer.android.com/sdk/index.html)

- `npm install -g ionic cordova@^7.0.0` - 安装全局的ionic和cordova

- `npm install` - 安装依赖包

- `npm run add` - 添加安卓平台（cordova-android 固定为 6.3.0）

## 启动和构建项目

- `npm start` - 启动项目进行开发

- `npm run resources` - 生成图标和启动页（resources下必须有icon.png和splash.png）

- `npm run device` - 构建并启动设备运行（需要配置 `signing` 下的文件，查看 `signing` 目录下的 `README.md`）

- `npm run build` - 构建APP（需要配置 `signing` 下的文件，查看 `signing` 目录下的 `README.md`）

## 其它资料

- [sass](http://sass-lang.com/)
- [karma](https://karma-runner.github.io/1.0/index.html)
- [tslint](https://palantir.github.io/tslint/) & [codelyzer](https://github.com/mgechev/codelyzer)
- [typescript](https://www.typescriptlang.org/) & [@types](https://www.npmjs.com/~types)

