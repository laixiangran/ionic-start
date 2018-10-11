/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录服务
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../services/request.service';
import { ServerData } from '../../models/server-data.model';

@Injectable()
export class LoginService {

	constructor(private rs: RequestService) {
	}

	login(user: any): Observable<ServerData> {
		return this.rs.post('/LoginAction/Login', user);
	}

	logout(): Observable<ServerData> {
		return this.rs.post('/LoginAction/Logout', null);
	}

	/**
	 * 获取用户信息
	 * @returns {Observable<any>}
	 */
	getUserInfo(): Observable<ServerData> {
		return this.rs.post('/SysUserAction/getMyInfo', null);
	}
}
