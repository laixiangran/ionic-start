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
	marker: any;

	constructor(public config: ConfigService) {
		this.options = {
			enableHighAccuracy: true // 是否使用GPS（高精度）
		};
	}

	ionViewDidEnter() {
		if (this.amap) {
			this.watchPosition();
		}
	}

	ionViewDidLeave() {
		clearInterval(this.watchId);
		this.coordinates = [];
	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	amapReady($event: EssenceIonAMapComponent) {
		this.amapComponent = $event;
		this.amap = $event.getMap();
		this.watchPosition();
	}

	amapDestroy($event) {
		console.log($event);
	}

	watchPosition() {
		navigator.geolocation.watchPosition((position: Position) => {
			const coordinate: number[] = [position.coords.longitude, position.coords.latitude];
			const isPush: boolean = this.coordinates.every((c: number[]) => {
				return c.join() !== coordinate.join();
			});
			if (isPush) {
				this.coordinates.push(coordinate);
				if (this.polyline) {
					this.polyline.setPath(JSON.parse(JSON.stringify(this.coordinates)));
				} else {
					this.polyline = new this.amapComponent.eAMap.Polyline({
						path: JSON.parse(JSON.stringify(this.coordinates)), // 设置线覆盖物路径
						strokeColor: '#3366FF', // 线颜色
						strokeOpacity: 1, // 线透明度
						strokeWeight: 2, // 线宽
						strokeStyle: 'solid', // 线样式
						strokeDasharray: [10, 5], // 补充线样式
					});
					this.polyline.setMap(this.amap);
				}
				if (this.marker) {
					this.amap.remove([this.marker]);
				}
				this.marker = new this.amapComponent.eAMap.Marker({
					icon: './assets/images/map/loc.png',
					position: [position.coords.longitude, position.coords.latitude]
				});
				this.marker.setMap(this.amap);
				this.amap.setFitView([this.marker]);
			}
		}, (error: PositionError) => {
			console.log(error);
		}, this.options);
	}
}
