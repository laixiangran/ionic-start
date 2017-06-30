/**
 * Created by laixiangran on 2016/8/7.
 * homepage：http://www.laixiangran.cn
 * 请求服务
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { TipsService } from './tips.service';
import { App, Loading } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

@Injectable()
export class RequestService {

	constructor(private http: Http,
				private appCtrl: App,
				private tips: TipsService,
				private authService: AuthService,
				private configService: ConfigService) {

	}

	/**
	 * post请求
	 *
	 * @param {string} url 请求路径
	 * @param {*} body body
	 * @param {boolean} [showLoader=true] 是否显示加载动画
	 * @returns {Observable<any>}
	 *
	 * @memberof RequestService
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
		return this.http.post(this.formateUrl(url), body && JSON.stringify(body), options).map((res: Response) => {
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
	 *
	 * @param {string} url 请求路径
	 * @param {boolean} [showLoader=true] 是否显示加载动画
	 * @returns {Observable<any>}
	 *
	 * @memberof RequestService
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
		return this.http.get(this.formateUrl(url), options).map((res: Response) => {
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
		console.log(error);
		if (error.status === 0) {
			this.tips.alert({
				title: '连接超时',
				message: '请检查网络是否已经断开了！',
				buttons: ['确定']
			});
		} else if (error.status === 401) {
			this.tips.alert({
				title: '未登录',
				message: '马上去登录！',
				buttons: [{
					text: '确定',
					handler: () => {
						this.appCtrl.getRootNav().setRoot(LoginPage);
					}
				}]
			});
		} else if (error.status === 404) {
			this.tips.alert({
				title: '请求未找到',
				message: '请求路径出错了，请联系开发人员！',
				buttons: ['确定']
			});
		} else {
			this.tips.alert({
				title: '系统出错了',
				message: error.json().error || 'Server Error',
				buttons: ['确定']
			});
		}
	}

	private formateUrl(url: string): string {
		let newUrl: string;
		if (url.indexOf('.json') > 0) {
			newUrl = url;
		} else {
			newUrl = this.configService.hostURL + url;
		}
		return newUrl;
	}
}
