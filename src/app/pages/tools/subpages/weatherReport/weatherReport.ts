/**
 * Created by laixiangran on 2017/3/22.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';

import { RequestService } from '../../../../services/request.service';
import { TransformService } from '../../../../services/transform.service';

@Component({
	selector: 'page-weather-report',
	templateUrl: 'weatherReport.html'
})
export class WeatherReportPage {

	currentPosition: string; // 当前定位坐标，'105.925833,38.400789'
	cityInfo: any; // 定位的城市信息
	weatherReport: any; // 天气预报信息
	live: any;
	forecasts: any[];
	weatherType: string = 'fine';
	dayType: string = 'day';
	weekArr: string[] = ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

	constructor(public http: Http,
				public rs: RequestService,
				public statusBar: StatusBar,
				public transform: TransformService) {
	}

	ionViewDidEnter() {

		// 简单判断白天及黑夜，18：00 - 6：00算黑夜
		if (new Date().getHours() >= 6 && new Date().getHours() < 18) {
			this.dayType = 'day';
		} else {
			this.dayType = 'night';
		}

		this.statusBar.backgroundColorByHexString('#0f69bd');

		this.currentLocation().then((currLocation: any) => {
			this.currentPosition = `${currLocation.lng},${currLocation.lat}`;
			this.reverseGeocoding(this.currentPosition).subscribe((cityInfoResult: any) => {
				if (cityInfoResult.status === '1') {
					this.cityInfo = cityInfoResult.regeocode;
					this.getWeatherInfo(this.cityInfo.addressComponent.adcode).subscribe((weatherInfoResult: any) => {
						if (weatherInfoResult.status === '1') {
							this.weatherReport = weatherInfoResult.forecasts[0];
							this.live = this.weatherReport.casts[0];
							this.forecasts = this.weatherReport.casts.slice(1);
							if (this.live[`${this.dayType}weather`].indexOf('晴') >= 0) {
								this.weatherType = 'fine';
								this.statusBar.backgroundColorByHexString('#0f69bd');
							} else {
								this.weatherType = 'cloudy';
								this.statusBar.backgroundColorByHexString('#4b5967');
							}
						}
					});
				}
			});
		});
	}

	ionViewDidLeave() {
		this.statusBar.backgroundColorByHexString('#1D89DA');
	}

	/**
	 * 获取当前坐标信息
	 *
	 * @returns {Promise<any>}
	 *
	 * @memberOf WeatherReportPage
	 */
	currentLocation(): Promise<any> {
		const options: PositionOptions = {
			enableHighAccuracy: true,  // 是否使用 GPS
			maximumAge: 30000,         // 缓存时间
			timeout: 27000            // 超时时间
		};
		return new Promise<any>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((position: Position) => {
				const currLocation: any = this.transform.gcj2wgs(position.coords.latitude, position.coords.longitude);
				resolve(currLocation);
			}, (error: PositionError) => {
				console.log(error);
				reject(error);
			}, options)
		});
	}

	/**
	 * 逆地理编码，使用高德地图提供的服务
	 *
	 * @param {string} currentPosition 经纬度坐标
	 * @returns {Observable<any>}
	 *
	 * @memberOf WeatherReportPage
	 */
	reverseGeocoding(currentPosition: string): Observable<any> {
		const headers: Headers = new Headers();
		const opts: RequestOptions = new RequestOptions();
		headers.append('Content-Type', 'application/json');
		opts.headers = headers;
		return this.http.get(`http://restapi.amap.com/v3/geocode/regeo?key=0df36377c23e75585d4ed4fcb4baf807&location=${currentPosition}&extensions=all`, opts).map(
			(res: Response) => res.json()
		).catch((error: Response) => {
			return Observable.throw(error.json().error || 'Server Error');
		});
	}

	/**
	 * 根据行政区编码获取天气预报信息，使用高德提供的服务
	 *
	 * @param {number} adcode 行政区编码
	 * @returns {Observable<any>}
	 *
	 * @memberOf WeatherReportPage
	 */
	getWeatherInfo(adcode: number): Observable<any> {
		const headers: Headers = new Headers();
		const opts: RequestOptions = new RequestOptions();
		headers.append('Content-Type', 'application/json');
		opts.headers = headers;
		return this.http.get(`http://restapi.amap.com/v3/weather/weatherInfo?key=0df36377c23e75585d4ed4fcb4baf807&city=${adcode}&extensions=all`, opts).map(
			(res: Response) => res.json()
		).catch((error: Response) => {
			return Observable.throw(error.json().error || 'Server Error');
		});
	}
}
