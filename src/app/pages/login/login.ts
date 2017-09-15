/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录页面（组件）
 */

import { Component } from '@angular/core';
import { MenuController, NavController, Platform, Loading } from 'ionic-angular';
import { LoginService } from './login.service';
import { TabsPage } from '../tabs/tabs';
import { ServerData } from '../../models/server-data';
import { AuthService } from '../../services/auth.service';
import { TipsService } from '../../services/tips.service';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { ConfigService } from '../../services/config.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	user: any = {};

	constructor(public navCtrl: NavController,
				public platform: Platform,
				public network: Network,
				public statusBar: StatusBar,
				public config: ConfigService,
				public loginService: LoginService,
				public tips: TipsService,
				public authService: AuthService,
				public menu: MenuController) {
	}

	ionViewDidEnter() {
		this.menu.enable(false); // 禁用侧边菜单栏
		this.statusBar.backgroundColorByHexString(this.config.loginStatusBarColor);
	}

	ionViewDidLeave() {
		this.menu.enable(true);
	}

	onLogin(isValid: boolean) {
		this.navCtrl.setRoot(TabsPage);
		// if (isValid) {
		// 	if (this.config.network) {
		// 		this.loginService.login({
		// 			username: this.user.username,
		// 			password: Md5.hashStr(this.user.password)
		// 		}).subscribe((serverData: any) => {
		// 			if (serverData.status === 1 || serverData.status === -1 || serverData.status === 200) {
		// 				this.authService.setToken(serverData.token).then(() => {
		// 					this.loginService.getUserInfo().subscribe((data: ServerData) => {
		// 						if (data.code === 'ok') {
		// 							this.authService.setUserInfo(data.result).then(() => {
		// 								this.navCtrl.setRoot(TabsPage);
		// 							});
		// 						}
		// 					});
		// 				});
		// 			} else {
		// 				this.tips.alert({
		// 					title: '登录失败',
		// 					message: '用户名或密码错误！',
		// 					buttons: ['确定']
		// 				});
		// 			}
		// 		}, (error: any) => {
		// 			this.tips.alert({
		// 				title: '登录失败',
		// 				message: error,
		// 				buttons: ['确定']
		// 			});
		// 		});
		// 	} else {
		// 		this.tips.alert({
		// 			title: '无网络连接',
		// 			message: '请检查网络是否断开了！',
		// 			buttons: ['确定']
		// 		});
		// 	}
		// } else {
		// 	this.tips.alert({
		// 		title: '温馨提示',
		// 		message: '必须输入用户名和密码！',
		// 		buttons: ['确定']
		// 	});
		// }
	}
}
