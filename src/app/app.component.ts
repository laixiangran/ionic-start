import {Component, ViewChild} from '@angular/core';
import {Alert, Nav, Platform} from 'ionic-angular';
import {Network} from '@ionic-native/network';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SettingsPage} from './pages/settings/settings';
import {LoginPage} from "./pages/login/login";
import {AuthService} from "./services/auth.service";
import {TipsService} from "./services/tips.service";
import {ConfigService} from "./services/config.service";
import {LoginService} from "./pages/login/login.service";
import {ServerData} from "./models/server-data";

@Component({
    templateUrl: 'app.html'
})
export class AppComponent {

    @ViewChild(Nav) nav: Nav;

    disconnectAlert: Alert = null;
    connectAlert: Alert = null;
    rootPage = LoginPage;
    pages: Array<{ code: string, title: string, component: any }>;

    constructor (public platform: Platform,
                 public network: Network,
                 public loginService: LoginService,
                 public statusBar: StatusBar,
                 public splashScreen: SplashScreen,
                 public tipsService: TipsService,
                 public configService: ConfigService,
                 public authService: AuthService) {

        this.initializeApp();

        this.pages = [
            {code: 'setting', title: '设置', component: SettingsPage},
            {code: 'notice', title: '通知', component: SettingsPage}
        ];
    }

    openPage (page) {
        this.nav.push(page.component);
    }

    initializeApp () {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault(); // 设置状态栏样式
            this.splashScreen.hide(); // 隐藏启动页
            this.checkDisConnect(); // 检查网络是否断开
        });
    }

    onLogout () {
        this.loginService.logout().subscribe((serverData: ServerData) => {
            if (serverData.code == 'ok') {
                this.authService.removeToken().then(() => {
                    this.nav.setRoot(LoginPage);
                });
            }
        });
    }

    /**
     * 检查网络是否断开
     */
    checkDisConnect () {
        this.network.onDisconnect().subscribe(() => {
            this.configService.network = false;
            if (!this.disconnectAlert) {
                this.disconnectAlert = this.tipsService.alert({
                    title: '无网络连接',
                    message: '请检查网络是否断开了！',
                    buttons: [
                        {
                            text: '确定',
                            handler: () => {
                                this.disconnectAlert.dismiss();
                                this.disconnectAlert = null;
                            }
                        }
                    ]
                });
                this.checkConnect();
            }
        });
    }

    /**
     * 检查网络是否重新连接
     * @param callback
     */
    checkConnect (callback?: any): any {
        this.connectAlert = null;
        let connectSubscription: any = this.network.onConnect().subscribe(() => {
            setTimeout(() => {
                this.configService.network = true;
                callback && callback();
                connectSubscription.unsubscribe();
                if (!this.connectAlert) {
                    this.connectAlert = this.tipsService.alert({
                        title: '温馨提示',
                        subTitle: `网络已连接，网络类型：${this.network.type}`,
                        buttons: [{
                            text: '确定',
                            handler: () => {
                                this.connectAlert.dismiss();
                                this.connectAlert = null;
                            }
                        }]
                    });
                    this.disconnectAlert = null;
                }
            }, 1000);
        });
        return connectSubscription;
    }
}
