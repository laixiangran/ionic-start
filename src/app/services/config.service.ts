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
	 * 是否存在cordova，即是否在设备上
	 * @type {boolean}
	 * @memberof ConfigService
	 */
	hasCordova: boolean = window.hasOwnProperty('cordova');

	/**
	 * 浏览器开发的api路径
	 * @type {string}
	 */
	devHost: string = 'http://192.168.0.8/sjqfx/';

	/**
	 * 真实设备上测试的api路径
	 * @type {string}
	 */
	testHost: string = 'http://192.168.0.8/sjqfx/';

	/**
	 * 真实设备上生产的api路径
	 * @type {string}
	 */
	prodHost: string = 'http://192.168.0.8/sjqfx/';

	/**
	 * api主路径
	 */
	hostURL: string = this.devHost;

	/**
	 * 当前网络是否连接
	 * @type {boolean}
	 * @memberof ConfigService
	 */
	network: boolean = true;

	/**
	 * 新版APP下载路径
	 * @type {string}
	 * @memberof ConfigService
	 */
	newAppUrl: string = `${this.hostURL}appVersionAction/disposeScanCode`;

	/**
	 * APP启动时是否通过服务器检查了更新
	 * @type {boolean}
	 * @memberof ConfigService
	 */
	isCheckNewVersion: boolean = false;

	/**
	 * APP名称
	 * @type {any}
	 * @memberof ConfigService
	 */
	appName: any = 'ionic start';

	/**
	 * APP包名称
	 * @type {any}
	 * @memberof ConfigService
	 */
	packageName: any = 'io.ionic.essence';

	/**
	 * APP版本编码
	 * @type {any}
	 * @memberof ConfigService
	 */
	versionCode: any = 10000;

	/**
	 * APP版本号
	 * @type {any}
	 * @memberof ConfigService
	 */
	versionNumber: any = '99.99.99';

	/**
	 * 登录页面的状态栏颜色
	 * @type {string}
	 * @memberof ConfigService
	 */
	loginStatusBarColor: string = '#50C6F4';

	/**
	 * 主页的状态栏颜色
	 * @type {string}
	 * @memberof ConfigService
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
		if (this.hasCordova) {
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
				this.isDebug.getIsDebug().then((isDebug: boolean) => {
					if (isDebug) {
						this.hostURL = this.testHost;
					} else {
						this.hostURL = this.prodHost;
					}
					this.newAppUrl = `${this.hostURL}appVersionAction/disposeScanCode`;
				})
			]);
		} else {
			return Promise.resolve();
		}
	}
}
