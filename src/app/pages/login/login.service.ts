/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录服务
 */

import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";
import { RequestService } from "../../services/request.service";
import { ServerData } from "../../models/server-data";
import { Subscriber } from "rxjs/Subscriber";

@Injectable()
export class LoginService {

    constructor(private rs: RequestService) { }

    login(user: any): Observable<ServerData> {
        return new Observable<ServerData>((subscriber: Subscriber<ServerData>) => {
            subscriber.next(new ServerData('登录成功', 'ok', { token: '123456789' }));
            subscriber.complete();
        });
        // return this.rs.post("LoginAction/Login", user);
    }

    logout(): Observable<ServerData> {
        return new Observable<ServerData>((subscriber: Subscriber<ServerData>) => {
            subscriber.next(new ServerData('退出成功', 'ok', null));
            subscriber.complete();
        });
        // return this.rs.post("LoginAction/Logout", null);
    }

    /**
     * 获取用户信息
     * @returns {Observable<any>}
     */
    getUserInfo(): Observable<ServerData> {
        return new Observable<ServerData>((subscriber: Subscriber<ServerData>) => {
            subscriber.next(new ServerData('退出成功', 'ok', { name: '管理员' }));
            subscriber.complete();
        });
        // return this.rs.post("SysUserAction/getMyInfo", null);
    }

    /**
     * 检测服务器最新的APP版本号
     * 
     * @returns {Observable<ServerData>} 
     * 
     * @memberof LoginService
     */
    checkLatestVesion(): Observable<ServerData> {
        return new Observable<ServerData>((subscriber: Subscriber<ServerData>) => {
            subscriber.next(new ServerData('检测成功！', 'ok', { version: '1.0.0' }));
            subscriber.complete();
        });
    }
}
