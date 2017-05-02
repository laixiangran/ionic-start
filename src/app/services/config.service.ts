/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 配置服务
 */

import {Injectable} from "@angular/core";
import {AppVersion} from "@ionic-native/app-version";

@Injectable()
export class ConfigService {
    public hostURL: string = ''; // api主路径
	public network: boolean = true; // 网络是否连接
	public appName: any; // app名称
	public packageName: any; // 包名称
	public versionCode: any; // 版本编码
	public versionNumber: any; //版本号
	public hasCordova: boolean; // 是否存在cordova

    constructor (public appVersion: AppVersion) {
    	this.hasCordova = window['cordova'];
    	// 在虚拟机器或者真机上有效
    	if (this.hasCordova) {
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
}
