import { Component, ViewChild } from '@angular/core';
import { Alert, Nav, Platform, Events, Keyboard, IonicApp, NavController, Tabs } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { FileTransfer, FileTransferObject, FileTransferError } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { SettingsPage } from './pages/settings/settings';
import { LoginPage } from './pages/login/login';
import { AuthService } from './services/auth.service';
import { TipsService } from './services/tips.service';
import { ConfigService } from './services/config.service';
import { LoginService } from './pages/login/login.service';
import { AppService } from './app.service';
import { TabsPage } from './pages/tabs/tabs';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ServerData } from './models/server-data.model';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
	templateUrl: 'app.html',
	providers: [AppService]
})
export class AppComponent {
	@ViewChild(Nav) nav: Nav;
	rootPage = null;
	pages: Array<{ code: string, title: string, component: any }>;
	backButtonPressed: boolean = false;  // 用于判断返回键是否触发
	schemeUrl: string;

	constructor(public platform: Platform,
				public network: Network,
				public events: Events,
				public keyboard: Keyboard,
				public ionicApp: IonicApp,
				public fileTransfer: FileTransfer,
				public fileOpener: FileOpener,
				public file: File,
				public loginService: LoginService,
				public androidPermissions: AndroidPermissions,
				public tips: TipsService,
				public config: ConfigService,
				public appService: AppService,
				public screenOrientation: ScreenOrientation,
				public authService: AuthService) {

		this.pages = [
			{code: 'setting', title: '设置', component: SettingsPage},
			{code: 'notice', title: '通知', component: SettingsPage}
		];

		// （通过 URL Scheme 打开 APP）定义 handleOpenURL 方法，用于获取 URL 上的数据
		(window as any).handleOpenURL = (schemeUrl: string) => {
			this.schemeUrl = schemeUrl;
		};

		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.config.initAppInfo().then(() => {
				this.requestPermissions();
				this.checkDisConnect();
				this.registerBackButtonAction();
				// this.checkLatestVersion();
				this.isLogin();
			});
		});
	}

	/**
	 * 提前获取部分权限（android）
	 */
	requestPermissions() {
		const permissions: string[] = [
			this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
			this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
			this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
		];
		this.androidPermissions.requestPermissions(permissions);
	}

	/**
	 * 注册返回按键事件
	 */
	registerBackButtonAction() {
		this.platform.registerBackButtonAction(() => {

			// 如果键盘开启则隐藏键盘
			if (this.keyboard.isOpen()) {
				this.keyboard.close();
				return;
			}

			// 隐藏加载动画
			const activePortal: any = this.ionicApp._loadingPortal.getActive();
			if (activePortal) {
				activePortal.dismiss();
				activePortal.onDidDismiss();
				return;
			}

			// 设置竖屏
			this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

			// 根据当前导航进行不同的处理（mainTabs对象是在TabsPage定义的ion-tabs，instantTabs对象是在InstantCommPage定义的ion-tabs）
			const mainTabs: Tabs = this.nav.getActive().instance.mainTabs;
			if (mainTabs) {
				const mainNav: NavController = mainTabs.getSelected();
				const instantTabs: Tabs = mainNav.getActive().instance.instantTabs;
				if (instantTabs) {
					const instantNav: NavController = instantTabs.getSelected();
					instantNav.canGoBack() ? instantNav.pop() : mainNav.pop();
					return;
				} else {
					mainNav.canGoBack() ? mainNav.pop() : this.showExit();
					return;
				}
			} else {

				// this.showExit() 为退出 APP，如果不退出 APP 而是让 APP 后台运行可使用 this.backgroundMode.moveToBackground()
				this.nav.canGoBack() ? this.nav.pop() : this.showExit();
			}
			return;
		}, 1);
	}

	/**
	 * 双击退出提示框
	 */
	showExit() {
		if (this.backButtonPressed) { // 当触发标志为true时，即2秒内双击返回按键则退出APP
			this.platform.exitApp();
		} else {
			this.tips.toast({
				message: '再按一次退出应用',
				duration: 2000,
				position: 'top'
			});
			this.backButtonPressed = true;
			// 2秒内没有再次点击返回则将触发标志标记为false
			const id: any = setTimeout(() => {
				clearTimeout(id);
				this.backButtonPressed = false;
			}, 2000);
		}
	}

	/**
	 * 验证是否已经登录
	 */
	isLogin() {
		this.authService.getToken().then((token: any) => {
			if (token) {
				this.authService.getUserInfo().then((userInfo: any) => {
					if (userInfo) {
						this.nav.setRoot(TabsPage);
					} else {
						this.nav.setRoot(LoginPage);
					}
				});
			} else {
				this.nav.setRoot(LoginPage);
			}
		});
	}

	openPage(page) {
		this.nav.push(page.component);
	}

	onLogout() {
		this.nav.setRoot(LoginPage);
		// this.loginService.logout().subscribe((serverData: any) => {
		// 	if (serverData.status === 200) {
		// 		this.authService.removeToken().then(() => {
		// 			this.nav.setRoot(LoginPage);
		// 		});
		// 	} else {
		// 		this.tips.alert({
		// 			title: '温馨提示',
		// 			message: '登录失败，请联系技术人员处理！',
		// 			buttons: ['确定']
		// 		});
		// 	}
		// });
	}

	/**
	 * 检测新版本
	 */
	checkLatestVersion() {
		this.appService.checkLatestVersion().subscribe((serverData: ServerData) => {
			if (serverData.code === 'ok') {
				const hasNew: boolean = serverData.result.split('.').join('') - this.config.versionNumber.split('.').join('') > 0;
				if (hasNew) {
					let message: string;
					if (this.network.type === 'wifi') {
						message = '是否确认升级？';
					} else {
						message = '建议您在WIFI条件下进行升级，是否确认升级？';
					}
					this.tips.confirm({
						title: `发现新版本${serverData.result}`,
						message: message,
						buttons: [
							{
								text: '取消'
							},
							{
								text: '升级',
								handler: () => {
									const id: number = setTimeout(() => {
										clearTimeout(id);
										this.downloadNewVersion();
									});
								}
							}
						]
					});
				}
			}
		});
	}

	/**
	 * 下载新版本APP
	 */
	downloadNewVersion() {
		const fileTransferObject: FileTransferObject = this.fileTransfer.create();
		// 只适用android平台
		const outUrl = `${this.file.externalDataDirectory || this.file.dataDirectory}ionicStart_${this.config.versionNumber}_${new Date().getTime()}.apk`;
		const downloadAlert: Alert = this.tips.alert({
			title: '下载中...',
			buttons: [
				{
					text: '取消',
					handler: () => {
						fileTransferObject.abort();
					}
				}
			]
		});
		let scale = '0%';
		const intervalId: any = setInterval(() => {
			downloadAlert.setTitle(`已下载${scale}`);
		}, 500);
		fileTransferObject.onProgress((event: ProgressEvent) => {
			const val: string = Math.floor((event.loaded / event.total) * 100) + '%';
			if (scale !== val) {
				scale = val;
			}
		});
		fileTransferObject.download(this.config.newAppUrl, outUrl).then((result: any) => {
			clearInterval(intervalId);
			this.fileOpener.open(outUrl, 'application/vnd.android.package-archive').then(() => {
				this.tips.dismiss(downloadAlert);
			}).catch((e) => {
				console.error('Error openening file', e);
			});
		}, (err: FileTransferError) => {
			clearInterval(intervalId);
			this.tips.dismiss(downloadAlert);
			if (err.code !== 4) { // 当下载取消时不提示
				this.tips.alert({
					title: '下载失败，请重试！',
					buttons: [
						{
							text: '取消'
						},
						{
							text: '重试',
							handler: () => {
								const id: any = setTimeout(() => {
									clearTimeout(id);
									this.downloadNewVersion();
								});
							}
						}
					]
				});
			} else if (err.code === 4) {
				this.tips.toast({
					message: '下载已取消！',
					duration: 3000,
					position: 'top'
				});
			}
		});
	}

	/**
	 * 检查网络是否断开
	 */
	checkDisConnect() {
		this.network.onDisconnect().subscribe(() => {
			this.config.network = false;
			this.events.publish('network', this.config.network);
			this.checkConnect();
		});
	}

	/**
	 * 检查网络是否重新连接
	 */
	checkConnect() {
		const connectSubscription: any = this.network.onConnect().subscribe(() => {
			connectSubscription.unsubscribe();
			this.config.network = true;
			this.events.publish('network', this.config.network);
		});
	}
}
