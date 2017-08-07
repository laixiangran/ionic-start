/**
 * Created by laixiangran on 2016/8/7.
 * homepage：http://www.laixiangran.cn
 * 请求服务
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { TipsService } from './tips.service';
import { Alert, AlertOptions, App, Loading } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestService {
	alertAlert: Alert = null;

	constructor(private http: Http,
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
	 * @returns {Observable<any>}
	 */
	post(url: string, body: any, showLoader: boolean = true): Observable<any> {
		let loader: Loading;
		if (showLoader) {
			loader = this.tips.loader();
		}
		const headers = new Headers({
			'Content-Type': 'application/json',
			'URMS_LOGIN_TOKEN': this.authService.token
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(this.config.hostURL + url, body && JSON.stringify(body), options).map((res: Response) => {
			const id = setTimeout(() => {
				clearTimeout(id);
				this.tips.dismiss(loader);
			});
			return res.json();
		}).catch((error: Response): Observable<any> => {
			const id = setTimeout(() => {
				clearTimeout(id);
				this.tips.dismiss(loader);
			});
			this.handlerError(error);
			return Observable.throw(error.json().error || 'Server Error');
		});
	}

	/**
	 * get请求
	 * @param {string} url 请求路径
	 * @param {boolean} [showLoader=true] 是否显示加载动画
	 * @returns {Observable<any>}
	 */
	get(url: string, showLoader: boolean = true): Observable<any> {
		let loader: Loading;
		if (showLoader) {
			loader = this.tips.loader();
		}
		const headers = new Headers({
			'Content-Type': 'application/json',
			'URMS_LOGIN_TOKEN': this.authService.token
		});
		const options = new RequestOptions({headers: headers});
		return this.http.get(this.config.hostURL + url, options).map((res: Response) => {
			const id = setTimeout(() => {
				clearTimeout(id);
				this.tips.dismiss(loader);
			});
			return res.json();
		}).catch((error: Response): Observable<any> => {
			const id = setTimeout(() => {
				clearTimeout(id);
				this.tips.dismiss(loader);
			});
			this.handlerError(error);
			return Observable.throw(error.json().error || 'Server Error');
		});
	}

	/**
	 * 请求报错之后的操作
	 * @param error 错误信息
	 */
	private handlerError(error: Response) {
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
		} else {
			alertOptions = {
				title: '系统出错了',
				message: error.json().error || 'Server Error',
				buttons: ['确定']
			};
		}
		if (this.alertAlert) {
			this.alertAlert.dismiss().then(() => {
				this.alertAlert = this.tips.alert(alertOptions);
			});
			return;
		}
		this.alertAlert = this.tips.alert(alertOptions);
	}
}
