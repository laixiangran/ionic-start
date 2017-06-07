import { Component, ViewChild } from '@angular/core';
import { Alert, Nav, Platform, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Transfer, TransferObject, FileTransferError } from "@ionic-native/transfer";
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { SettingsPage } from './pages/settings/settings';
import { LoginPage } from "./pages/login/login";
import { AuthService } from "./services/auth.service";
import { TipsService } from "./services/tips.service";
import { ConfigService } from "./services/config.service";
import { LoginService } from "./pages/login/login.service";
import { ServerData } from "./models/server-data";
import { AppService } from "./app.service";

@Component({
    templateUrl: 'app.html',
    providers: [AppService]
})
export class AppComponent {

    @ViewChild(Nav) nav: Nav;

    disconnectAlert: Alert = null;
    connectAlert: Alert = null;
    rootPage = null;
    pages: Array<{ code: string, title: string, component: any }>;

    constructor(public platform: Platform,
                public network: Network,
                public events: Events,
                public transfer: Transfer,
                public fileOpener: FileOpener,
                public file: File,
                public loginService: LoginService,
                public tipsService: TipsService,
                public config: ConfigService,
                public appService: AppService,
                public authService: AuthService) {

        this.initializeApp();

        this.pages = [
            {code: 'setting', title: '设置', component: SettingsPage},
            {code: 'notice', title: '通知', component: SettingsPage}
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.checkDisConnect(); // 检查网络是否断开
            this.config.initAppInfo().then(() => {
                this.nav.setRoot(LoginPage);
                this.checkLatestVersion();
            });
        });
    }

    openPage(page) {
        this.nav.push(page.component);
    }

    onLogout() {
        this.loginService.logout().subscribe((serverData: ServerData) => {
            if (serverData.code == 'ok') {
                this.authService.removeToken().then(() => {
                    this.nav.setRoot(LoginPage);
                });
            }
        });
    }

    /**
     * 检测新版本
     */
    checkLatestVersion() {
        this.appService.checkLatestVersion().subscribe((serverData: ServerData) => {
            if (serverData.code === 'ok') {
                let hasNew: boolean = serverData.result.split('.').join('') - this.config.versionNumber.split('.').join('') > 0;
                if (hasNew) {
                    let message: string;
                    if (this.network.type == 'wifi') {
                        message = '是否确认升级？';
                    } else {
                        message = '建议您在WIFI条件下进行升级，是否确认升级？';
                    }
                    this.tipsService.confirm({
                        title: `发现新版本${serverData.result}`,
                        message: message,
                        buttons: [
                            {
                                text: '取消'
                            },
                            {
                                text: '升级',
                                handler: () => {
                                    this.downloadNewVersion();
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
        const fileTransfer: TransferObject = this.transfer.create();

        // this.file.externalRootDirectory在android平台才有效
        let outUrl: string = `${this.file.externalRootDirectory}nxhh_${new Date().getTime()}.apk`;

        if (this.platform.is('ios')) {
            // TODO 在ios平台需另外处理
            // outUrl = `${this.file.dataDirectory}nxhh_${new Date().getTime()}`;
        }

        let alert: Alert = this.tipsService.alert({
            title: '下载中...',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                        fileTransfer.abort();
                    }
                }
            ]
        });
        fileTransfer.download(this.config.newAppUrl, outUrl).then((result: any) => {
            this.fileOpener.open(outUrl, 'application/vnd.android.package-archive').then(() => {
                this.tipsService.dismiss(alert);
                console.log('File is opened');
            }).catch((e) => {
                console.error('Error openening file', e);
            });
        }, (err: FileTransferError) => {
            if (err.code != 4) { // 当下载取消时不提示
                this.tipsService.alert({
                    title: '下载失败，请重试！',
                    buttons: [
                        {
                            text: '取消'
                        },
                        {
                            text: '重试',
                            handler: () => {
                                this.downloadNewVersion();
                            }
                        }
                    ]
                });
            } else if (err.code === 4) {
                this.tipsService.toast({
                    message: '下载已取消！',
                    duration: 3000,
                    position: 'top'
                });
            }
        });
        let scale: string = '0%';
        fileTransfer.onProgress((event: ProgressEvent) => {
            let val: string = Math.floor((event.loaded / event.total) * 100) + '%';
            if (scale != val) {
                scale = val;
                alert.setTitle(`已下载${scale}`);
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
            if (!this.disconnectAlert) {
                this.disconnectAlert = this.tipsService.alert({
                    title: '无网络连接',
                    message: '请检查网络是否断开了！',
                    buttons: [
                        {
                            text: '确定',
                            handler: () => {
                                clearTimeout(id);
                                if (this.disconnectAlert) {
                                    this.disconnectAlert.dismiss();
                                    this.disconnectAlert = null;
                                }
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
                                clearTimeout(id);
                                if (this.connectAlert) {
                                    this.connectAlert.dismiss();
                                    this.connectAlert = null;
                                }
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
