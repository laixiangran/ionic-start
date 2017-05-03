/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 配置服务
 */

import { Injectable } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version";

@Injectable()
export class ConfigService {
	hostURL: string = 'http://192.168.0.21/nxhh/';
	network: boolean = true; // 网络是否连接
	newAppUrl: string = `${this.hostURL}assets/apk/nxhh.apk`; // 新app的下载路径
	isCheckNewVersion: boolean = false; // 是否检查了最新版本的APP
	appName: any; // app名称
	packageName: any; // 包名称
	versionCode: any; // 版本编码
	versionNumber: any; //版本号
	hasCordova: boolean; // 是否存在cordova

	constructor(public appVersion: AppVersion) {
		this.hasCordova = window['cordova'];
		// 在虚拟机器或者真机上有效
		if (this.hasCordova) {

			this.hostURL = 'http://119.60.6.29:8888/';

			appVersion.getAppName().then((appName: any) => {
				this.appName = appName;
			});
			appVersion.getPackageName().then((packageName: any) => {
				this.packageName = packageName;
			});
			appVersion.getVersionCode().then((versionCode: any) => {
				this.versionCode = versionCode;
			});
			appVersion.getVersionNumber().then((versionNumber: any) => {
				this.versionNumber = versionNumber;
			});
		}
	}

	getVersionNumber(): Promise<any> {
		if (this.hasCordova) {
			return this.appVersion.getVersionNumber().then((versionNumber: any) => {
				this.versionNumber = versionNumber;
				return this.versionNumber;
			});
		} else {
			return Promise.resolve('9.0.0');
		}
	}
}
