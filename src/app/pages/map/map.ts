import { Component } from '@angular/core';
import { EssenceIonAMapComponent } from 'essence-ionic';
import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage {
	amapComponent: EssenceIonAMapComponent; // 当前地图控件对象
	amap: any; // 当前地图对象
	options: PositionOptions;
	coordinates: any[] = [];
	watchId: number;
	polyline: any;

	constructor(public config: ConfigService) {
		this.options = {
			enableHighAccuracy: true, // 是否使用 GPS
			maximumAge: 0, // 缓存时间
			timeout: 30000 // 超时时间
		};
	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	amapReady($event: EssenceIonAMapComponent) {
		this.amapComponent = $event;
		this.amap = $event.getMap();
		navigator.geolocation.getCurrentPosition((position: Position) => {
			this.coordinates.push([position.coords.longitude, position.coords.latitude]);
		}, (error: PositionError) => {
			console.log(error);
		}, this.options);
		this.watchId = navigator.geolocation.watchPosition((position: Position) => {
			this.coordinates.push([position.coords.longitude, position.coords.latitude]);
			if (this.polyline) {
				this.polyline.setPath(this.coordinates);
			} else {
				this.polyline = new this.amapComponent.eAMap.Polyline({
					path: this.coordinates, // 设置线覆盖物路径
					strokeColor: '#3366FF', // 线颜色
					strokeOpacity: 1, // 线透明度
					strokeWeight: 2, // 线宽
					strokeStyle: 'solid', // 线样式
					strokeDasharray: [10, 5], // 补充线样式
				});
				this.polyline.setMap(this.amap);
			}
			this.amap.setFitView();
		}, (error: PositionError) => {
			console.log(error);
		}, this.options);
	}

	amapDestroy($event) {
		navigator.geolocation.clearWatch(this.watchId);
		console.log($event);
	}
}
