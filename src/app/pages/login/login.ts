/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录页面（组件）
 */

import { Component } from "@angular/core";
import { Events, MenuController, AlertController, NavController, Platform, Loading } from "ionic-angular";
import { Md5 } from "ts-md5/dist/md5";

import { LoginService } from "./login.service";
import { TabsPage } from "../tabs/tabs";
import { ServerData } from "../../models/server-data";
import { AuthService } from "../../services/auth.service";
import { TipsService } from "../../services/tips.service";
import { ConfigService } from "../../services/config.service";
import { Network } from "@ionic-native/network";
import { StatusBar } from "@ionic-native/status-bar";
import { TransferObject, Transfer, FileTransferError } from "@ionic-native/transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";

@Component({
    selector: 'page-login',
    templateUrl: "login.html"
})
export class LoginPage {

    user: any = {};
    isShowInfo: boolean = false;

    constructor(
        public navCtrl: NavController,
        public platform: Platform,
        public fileOpener: FileOpener,
        public file: File,
        public network: Network,
        public statusBar: StatusBar,
        public transfer: Transfer,
        public configService: ConfigService,
        public loginService: LoginService,
        public tipsService: TipsService,
        public authService: AuthService,
        public alertCtrl: AlertController,
        public menu: MenuController,
        public events: Events) {
    }

    ionViewDidLoad() {
        // 如果提示新版本之后就不再提示
        if (this.configService.isCheckNewVersion) {
            this.isLogin();
        } else {
            // 检测是否有新版本，如果有就提示更新
            this.loginService.checkLatestVesion().subscribe((serverData: ServerData) => {
                if (serverData.code === 'ok') {
                    this.configService.getVersionNumber().then((versionNumber: any) => {
                        let hasNew: boolean = serverData.result.version.split('.').join('') - versionNumber.split('.').join('') > 0;
                        if (hasNew) {
                            let message: string;
                            if (this.network.type == 'wifi') {
                                message = '是否确认升级？';
                            } else {
                                message = '建议您在WIFI条件下进行升级，是否确认升级？';
                            }
                            this.tipsService.confirm({
                                title: '发现新版本',
                                message: message,
                                buttons: [
                                    {
                                        text: '取消',
                                        handler: () => {
                                            this.isLogin();
                                        }
                                    },
                                    {
                                        text: '升级',
                                        handler: () => {
                                            this.downloadNewVersion();
                                        }
                                    }
                                ]
                            });
                        } else {
                            this.isLogin();
                        }
                    });
                } else {
                    this.isLogin();
                }
            });
        }
    }

    ionViewDidEnter() {
        this.menu.enable(false); // 禁用侧边菜单栏
        this.statusBar.backgroundColorByHexString("#85CAFE");
    }

    ionViewDidLeave() {
        this.menu.enable(true);
    }

    /**
   * 验证是否已经登录
   * 
   * 
   * @memberof LoginPage
   */
    isLogin() {
        this.configService.isCheckNewVersion = true;
        this.authService.getToken().then((token: any) => {
            if (token) {
                this.authService.getUserInfo().then((userInfo: any) => {
                    this.navCtrl.setRoot(TabsPage);
                });
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

        // 在ios平台需另外处理
        if (this.platform.is('ios')) {
            // outUrl = `${this.file.dataDirectory}nxhh_${new Date().getTime()}`;
        }

        let loader: Loading = this.tipsService.loader({ content: "下载中..." });
        fileTransfer.download(this.configService.newAppUrl, outUrl).then((result: any) => {
            this.tipsService.dismiss(loader);
            this.fileOpener.open(outUrl, 'application/vnd.android.package-archive').then(() => {
                console.log('File is opened')
            }).catch((e) => {
                console.error('Error openening file', e)
            });
        }, (err: FileTransferError) => {
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
        });
        fileTransfer.onProgress((event: ProgressEvent) => {
            let scale: string = Math.floor((event.loaded / event.total) * 100) + '%';
            loader.setContent(`已下载${scale}`);
        });
    }

    onLogin(isValid: boolean) {
        if (isValid) {
            if (this.configService.network) {
                this.loginService.login({
                    username: this.user.username,
                    password: Md5.hashStr(this.user.password)
                }).subscribe((serverData: any) => {
                    if (serverData.code === 'ok') {
                        this.authService.setToken(serverData.result.token).then(() => {
                            this.loginService.getUserInfo().subscribe((data: ServerData) => {
                                if (data.code == 'ok') {
                                    this.authService.setUserInfo(data.result);
                                    this.navCtrl.setRoot(TabsPage);
                                }
                            });
                        });
                    }
                }, (error: any) => {
                    console.error(error);
                });
            } else {
                this.tipsService.alert({
                    title: '无网络连接',
                    message: '请检查网络是否断开了！',
                    buttons: ['确定']
                });
            }
        } else {
            this.tipsService.alert({
                title: '温馨提示',
                message: '必须输入用户名和密码！',
                buttons: ['确定']
            });
        }
    }

    onSubmit() {
        this.loginService.login(this.user).subscribe((serverData: ServerData) => {
            if (serverData.code == 'ok') {
                this.authService.setToken(serverData.result.token).then((token: string) => {
                    this.loginService.getUserInfo().subscribe((data: ServerData) => {
                        if (data.code == 'ok') {
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
