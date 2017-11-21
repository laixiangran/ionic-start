/**
 * Created by laixiangran on 2016/8/7.
 * homepage：http://www.laixiangran.cn
 * 请求服务
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { TipsService } from './tips.service';
import { Alert, AlertOptions, App, Loading } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { ServerData } from '../models/server-data.model';

@Injectable()
export class RequestService {
	alertAlert: Alert = null;

	constructor(private http: HttpClient,
				private appCtrl: App,
				private tips: TipsService,
				private authService: AuthService,
				private config: ConfigService) {
	}

	/**
	 * post请求
	 * @param {string} url 请求路径
	 * @param {*} body body
	 * @param {boolean} [showLoader=true] 是否显示加载动画
	 * @param {boolean} [isMock=false] 是否模拟请求
	 * @returns {Observable<any>}
	 */
	post(url: string, body: any, showLoader: boolean = true, isMock: boolean = false): Observable<ServerData> {
		console.log('dd');
		let loader: Loading;
		if (showLoader) {
			loader = this.tips.loader();
		}
		const headers = new HttpHeaders({
				'Content-Type': 'application/json',
				'URMS_LOGIN_TOKEN': this.authService.token
			}),
			options = {headers: headers},
			requesUrl: string = (isMock ? this.config.mockDomain : this.config.domain) + url;
		return new Observable<ServerData>((subscriber: Subscriber<any>) => {
			this.http.post(requesUrl, body && JSON.stringify(body), options).subscribe((serverData: ServerData) => {
				const id = setTimeout(() => {
					clearTimeout(id);
					this.tips.dismiss(loader);
				});
				subscriber.next(serverData);
				subscriber.complete();
			}, (error: HttpErrorResponse) => {
				const id = setTimeout(() => {
					clearTimeout(id);
					this.tips.dismiss(loader);
				});
				this.handlerError('post', error, url, body, showLoader, isMock, subscriber);
			});
		});
	}

	/**
	 * get请求
	 * @param {string} url 请求路径
	 * @param {boolean} [showLoader=true] 是否显示加载动画
	 * @param {boolean} [isMock=false] 是否模拟请求
	 * @returns {Observable<any>}
	 */
	get(url: string, showLoader: boolean = true, isMock: boolean = false): Observable<any> {
		console.log('dd');
		let loader: Loading;
		if (showLoader) {
			loader = this.tips.loader();
		}
		const headers = new HttpHeaders({
				'Content-Type': 'application/json',
				'URMS_LOGIN_TOKEN': this.authService.token
			}),
			options = {headers: headers},
			requesUrl: string = (isMock ? this.config.mockDomain : this.config.domain) + url;
		return new Observable<ServerData>((subscriber: Subscriber<any>) => {
			this.http.get(requesUrl, options).subscribe((serverData: ServerData) => {
				const id = setTimeout(() => {
					clearTimeout(id);
					this.tips.dismiss(loader);
				});
				subscriber.next(serverData);
				subscriber.complete();
			}, (error: HttpErrorResponse) => {
				const id = setTimeout(() => {
					clearTimeout(id);
					this.tips.dismiss(loader);
				});
				this.handlerError('get', error, url, null, showLoader, isMock, subscriber);
			});
		});
	}

	/**
	 * 请求出错之后的处理
	 * @param {string} type 请求类型（post or get）
	 * @param {HttpErrorResponse} error 错误对象
	 * @param {string} url 请求路径
	 * @param {any} obj 请求body
	 * @param {boolean} showLoader 是否显示加载动画
	 * @param {boolean} isMock 是否模拟请求
	 * @param {Subscriber} subscriber 当前请求的订阅对象
	 */
	private handlerError(type: string, error: HttpErrorResponse, url: string, obj?: any, showLoader?: boolean, isMock?: boolean, subscriber?: Subscriber<any>) {
		let alertOptions: AlertOptions = null;
		if (error.status === 0) {
			alertOptions = {
				title: '连接超时',
				message: '请检查网络是否已经断开了！',
				buttons: ['确定']
			};
		} else if (error.status === 401) {
			alertOptions = {
				title: '未登录',
				message: '马上去登录！',
				buttons: [{
					text: '确定',
					handler: () => {
						this.authService.removeToken().then(() => {
							this.appCtrl.getRootNav().setRoot(LoginPage);
						});
					}
				}]
			};
		} else if (error.status === 404) {
			alertOptions = {
				title: '请求未找到',
				message: '请求路径出错了，请联系开发人员！',
				buttons: ['确定']
			};
			if (!isMock) { // 只模拟一次
				if (this.config.isDev || this.config.isTest) { // 开发环境或者测试环境
					isMock = true;
					if (type === 'post') {
						this.post(url, obj, showLoader, isMock).subscribe((data: ServerData) => {
							subscriber.next(data);
							subscriber.complete();
						});
					} else if (type === 'get') {
						this.get(url, showLoader, isMock).subscribe((data: ServerData) => {
							subscriber.next(data);
							subscriber.complete();
						});
					}
					return;
				}
			}
		} else {
			alertOptions = {
				title: '系统出错了',
				message: error.message || 'Server Error',
				buttons: ['确定']
			};
		}
		if (this.alertAlert) {
			this.alertAlert.dismiss().then(() => {
				this.alertAlert = this.tips.alert(alertOptions);
			});
		} else {
			this.alertAlert = this.tips.alert(alertOptions);
		}
		subscriber.error(error);
		subscriber.complete();
		throw error;
	}
}
