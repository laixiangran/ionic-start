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
	marker: any;

	constructor(public config: ConfigService) {
		this.options = {
			enableHighAccuracy: true // 是否使用GPS（高精度）
		};
	}

	ionViewDidEnter() {
		if (this.amap) {
			this.getPosition();
		}
	}

	ionViewDidLeave() {
	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	amapReady($event: EssenceIonAMapComponent) {
		this.amapComponent = $event;
		this.amap = $event.getMap();
		this.getPosition();
	}

	amapDestroy($event) {
		console.log($event);
	}

	getPosition() {
		navigator.geolocation.getCurrentPosition((...args: any[]) => {
			const position: Position = args[0];
			const extra: any = args[1];
			if (extra.type === 162 || extra.type === 62) {
				this.getPosition();
				return;
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
		}, (error: PositionError) => {
			console.error(error);
		}, this.options);
	}
}
