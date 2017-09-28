/**
 * Created by laixiangran on 2016/8/7.
 * homepage：http://www.laixiangran.cn
 * 管理令牌与用户信息服务
 */

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
	userInfo: any = null; // 用户信息
	userInfoItemName: string = this.config.userInfoItemName; // 保存用户信息的key
	token: string = null; // 令牌
	tokenItemName: string = this.config.tokenItemName; // 保存令牌的key

	constructor(private storage: Storage, private config: ConfigService) {}

	setToken(value: any): Promise<any> {
		this.token = value;
		return this.storage.set(this.tokenItemName, value);
	}

	getToken(): Promise<any> {
		return this.storage.get(this.tokenItemName).then((value: any) => {
			this.token = value;
			return this.token;
		});
	}

	removeToken(): Promise<any> {
		this.token = null;
		return this.storage.remove(this.tokenItemName);
	}

	setUserInfo(value: any): Promise<any> {
		this.userInfo = value;
		return this.storage.set(this.userInfoItemName, value);
	}

	getUserInfo(): Promise<any> {
		return this.storage.get(this.userInfoItemName).then((value: any) => {
			this.userInfo = value;
			return this.userInfo;
		});
	}

	removeUserInfo(): Promise<any> {
		this.userInfo = null;
		return this.storage.remove(this.userInfoItemName);
	}
}
