/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录页面（组件）
 */

import {Component} from "@angular/core";
import {Events, MenuController, AlertController, NavController} from "ionic-angular";
import {LoginService} from "./login.service";
import {TabsPage} from "../tabs/tabs";
import {ServerData} from "../../models/server-data";
import {AuthService} from "../../services/auth.service";
import {TipsService} from "../../services/tips.service";

@Component({
    selector: 'page-login',
    templateUrl: "login.html"
})
export class LoginPage {

    user: any = {};
    isShowInfo: boolean = false;

    constructor (public navCtrl: NavController,
                 public loginService: LoginService,
                 public tipsService: TipsService,
                 public authService: AuthService,
                 public alertCtrl: AlertController,
                 public menu: MenuController,
                 public events: Events) {
    }

    ionViewDidEnter () {
        this.menu.enable(false); // 禁用侧边菜单栏

        // 验证是否已经登录
        this.tipsService.loader();
        this.authService.getToken().then((token: any) => {
            this.tipsService.dismissLoader();
            if (token) {
                this.authService.getUserInfo().then((userInfo: any) => {
                    this.navCtrl.setRoot(TabsPage);
                });
            }
        });
    }

    ionViewDidLeave () {
        this.menu.enable(true);
    }

    onSubmit () {
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
