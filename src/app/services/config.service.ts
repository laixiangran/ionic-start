/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 配置服务
 */

import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { IsDebug } from '@ionic-native/is-debug';

@Injectable()
export class ConfigService {

	/**
	 * app是否运行在浏览器上
	 * @type {boolean}
	 */
	isDev: boolean = !window.hasOwnProperty('cordova');

	/**
	 * app运行在设备上的版本是否是debug版
	 * @type {boolean}
	 */
	isTest: boolean = true;

	/**
	 * 模拟的api域名
	 * @type {string}
	 */
	mockDomain: string = '/mockjsdata/3';

	/**
	 * 浏览器开发的api域名
	 * @type {string}
	 */
	devDomain: string = '/drainage';

	/**
	 * 真实设备上测试的api域名
	 * @type {string}
	 */
	testDomain: string = 'http://192.168.0.8/drainage';

	/**
	 * 真实设备上生产的api域名
	 * @type {string}
	 */
	prodDomain: string = 'http://101.200.104.224';

	/**
	 * 根据环境确定的api域名
	 */
	domain: string = this.devDomain;

	/**
	 * 当前网络是否连接
	 * @type {boolean}
	 */
	network: boolean = true;

	/**
	 * 检测服务器最新的APP版本号路径
	 * @type {string}
	 */
	checkNewAppUrl: string = '/appVersionAction/getLatestVersion';

	/**
	 * 新版APP下载路径
	 * @type {string}
	 */
	newAppUrl: string = `${this.domain}/appVersionAction/disposeScanCode`;

	/**
	 * APP启动时是否通过服务器检查了更新
	 * @type {boolean}
	 */
	isCheckNewVersion: boolean = false;

	/**
	 * APP名称
	 * @type {any}
	 */
	appName: any = 'ionic start';

	/**
	 * APP包名称
	 * @type {any}
	 */
	packageName: any = 'io.ionic.essence';

	/**
	 * APP版本编码
	 * @type {any}
	 */
	versionCode: any = 10000;

	/**
	 * APP版本号
	 * @type {any}
	 */
	versionNumber: any = '99.99.99';

	/**
	 * 登录页面的状态栏颜色
	 * @type {string}
	 */
	loginStatusBarColor: string = '#50C6F4';

	/**
	 * 主页的状态栏颜色
	 * @type {string}
	 */
	mainStatusBarColor: string = '#1D89DA';

	/**
	 * 高德地图api key
	 * @type {string}
	 */
	amapApiKey: string =  '92876784ab731cccce8ebd5a8030290f';

	/**
	 * 高德地图web key
	 * @type {string}
	 */
	amapWebApiKey: string = '0df36377c23e75585d4ed4fcb4baf807';

	constructor(public appVersion: AppVersion, public isDebug: IsDebug) {
	}

	/**
	 * 获取APP基本信息
	 * @memberof ConfigService
	 */
	initAppInfo(): Promise<any> {

		// 在虚拟机器或者真机上有效
		if (!this.isDev) {
			return Promise.all([
				this.appVersion.getAppName().then((appName: any) => {
					this.appName = appName;
				}),
				this.appVersion.getPackageName().then((packageName: any) => {
					this.packageName = packageName;
				}),
				this.appVersion.getVersionCode().then((versionCode: any) => {
					this.versionCode = versionCode;
				}),
				this.appVersion.getVersionNumber().then((versionNumber: any) => {
					this.versionNumber = versionNumber;
				}),
				// 监测是否在debug环境
				this.isDebug.getIsDebug().then((isDebug: boolean) => {
					this.isTest = isDebug;
					if (this.isTest) {
						this.domain = this.testDomain;
					} else {
						this.domain = this.prodDomain;
					}
					this.newAppUrl = `${this.domain}/appVersionAction/disposeScanCode`;
				})
			]);
		} else {
			return Promise.resolve();
		}
	}
}
