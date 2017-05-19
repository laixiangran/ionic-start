import {Component, ViewChild} from '@angular/core';
import {Alert, Nav, Platform, Events} from 'ionic-angular';
import {Network} from '@ionic-native/network';

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
    rootPage = null;
    pages: Array<{ code: string, title: string, component: any }>;

    constructor (public platform: Platform,
                 public network: Network,
                 public events: Events,
                 public loginService: LoginService,
                 public tipsService: TipsService,
                 public config: ConfigService,
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
            this.checkDisConnect(); // 检查网络是否断开
            this.config.initAppInfo().then(() => {
                this.nav.setRoot(LoginPage);
            });
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
            this.config.network = false;
            this.events.publish('network', this.config.network);
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
                // 3秒之后隐藏
                let id: number = setTimeout(() => {
                    clearTimeout(id);
                    if (this.disconnectAlert) {
                        this.disconnectAlert.dismiss();
                        this.disconnectAlert = null;
                    }
                }, 3000);
                this.checkConnect();
            }
        });
    }

    /**
     * 检查网络是否重新连接
     */
    checkConnect(): any {
        this.connectAlert = null;
        let connectSubscription: any = this.network.onConnect().subscribe(() => {
            setTimeout(() => {
                this.config.network = true;
                this.events.publish('network', this.config.network);
                this.addAmapScript();
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
                    // 3秒之后隐藏
                    let id: number = setTimeout(() => {
                        clearTimeout(id);
                        if (this.connectAlert) {
                            this.connectAlert.dismiss();
                            this.connectAlert = null;
                        }
                    }, 3000);
                    this.disconnectAlert = null;
                }
            }, 1000);
        });
        return connectSubscription;
    }

    /**
     * 动态添加高德地图api
     */
    addAmapScript() {
        let head = document.getElementsByTagName('head')[0],
            script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://webapi.amap.com/maps?v=1.3&key=92876784ab731cccce8ebd5a8030290f";
        if (!window['AMap']) {
            head.appendChild(script);
        }
        script.onload = () => {
            this.events.publish('reloadAMap');
        };
    }
}
