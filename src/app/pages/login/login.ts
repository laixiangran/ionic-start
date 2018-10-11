/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录页面（组件）
 */

import { Component, ViewChild } from '@angular/core';
import { Content, MenuController, NavController, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth.service';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	@ViewChild(Content) content: Content;

	user: any = {};

	constructor(public navCtrl: NavController,
				public platform: Platform,
				public network: Network,
				public statusBar: StatusBar,
				public config: ConfigService,
				public authService: AuthService,
				public menu: MenuController) {
	}

	ionViewDidEnter() {
		this.menu.enable(false); // 禁用侧边菜单栏
		this.statusBar.backgroundColorByHexString(this.config.loginStatusBarColor);
		this.content.setScrollElementStyle('overflow', 'hidden');
	}

	ionViewDidLeave() {
		this.menu.enable(true);
	}

	onLogin() {
		this.navCtrl.setRoot(TabsPage);
	}
}
