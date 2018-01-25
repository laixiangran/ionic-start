/**
 * Created by laixiangran on 2018/1/25.
 * homepage：http://www.laixiangran.cn.
 * 定位服务
 * 安卓手机需要安装cordova-plugin-baidu-geolocation插件。安装方法：cordova plugin add https://github.com/laixiangran/cordova-plugin-baidu-geolocation --variable API_KEY=百度分配的AK --save
 */

import { Injectable } from '@angular/core';
import { ServerData } from '../models/server-data.model';

/**
 * 定位返回的扩展信息
 */
export interface Extra {
	type: number, // 定位类型。161：网络定位结果，61：GPS定位结果，66：离线定位结果
	gpsAccuracyStatus: number, // GPS质量。0：GPS质量判断未知，1：GPS质量判断好，2：GPS质量判断中等，3：GPS质量判断差
	addr: string // 详细地址信息
}

export interface Location {
	watchId?: number,
	position: Position,
	extra: Extra
}

@Injectable()
export class GeolocationService {

	constructor() {
	}

	/**
	 * 获取当前位置
	 * @param {PositionOptions} positionOptions
	 * @returns {Promise<ServerData>}
	 */
	getCurrentPosition(positionOptions: PositionOptions): Promise<ServerData> {
		return new Promise<any>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((...args: any[]) => {
				const position: Position = args[0],
					extra: Extra = args[1],
					location: Location = {
						position: position,
						extra: extra
					};
				resolve({
					code: 'ok',
					info: '定位成功！',
					result: location
				});
			}, (error: PositionError) => {
				resolve({
					code: 'error',
					info: '定位失败！',
					result: error
				});
			}, positionOptions);
		});
	}

	/**
	 * 持续追踪位置变更
	 * @param {PositionOptions} positionOptions
	 * @returns {Promise<ServerData>}
	 */
	watchPosition(positionOptions: PositionOptions): Promise<ServerData> {
		return new Promise<any>((resolve, reject) => {
			const watchId: number = navigator.geolocation.watchPosition((...args: any[]) => {
				const position: Position = args[0],
					extra: any = args[1],
					location: Location = {
						watchId: watchId,
						position: position,
						extra: extra
					};
				resolve({
					code: 'ok',
					info: '定位成功！',
					result: location
				});
			}, (error: PositionError) => {
				resolve({
					code: 'error',
					info: '定位失败！',
					result: error
				});
			}, positionOptions);
		});
	}

	/**
	 * 清除位置追踪
	 * @param {number} watchId 持续追踪id
	 */
	clearWatch(watchId: number): void {
		navigator.geolocation.clearWatch(watchId);
	}
}
