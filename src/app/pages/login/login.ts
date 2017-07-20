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

	onLogin() {
		this.loginService.login(this.user).subscribe((serverData: ServerData) => {
			if (serverData.code === 'ok') {
				this.authService.setToken(serverData.result.token).then((token: string) => {
					this.loginService.getUserInfo().subscribe((data: ServerData) => {
						if (data.code === 'ok') {
							this.authService.setUserInfo(data.result).then(() => {
								this.navCtrl.setRoot(TabsPage);
							});
						}
					});
				});
			}
		});
	}
}
