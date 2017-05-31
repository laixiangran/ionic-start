import {Component} from "@angular/core";
import {NavController, AlertController} from 'ionic-angular';
import { EssenceIonAMapComponent } from "essence-ionic";

@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage {
	amapComponent: EssenceIonAMapComponent; // 当前地图控件对象
	amap: any; // 当前地图对象
	amapOpts: any; // 初始化地图参数
	currLocation: any; // 当前位置信息

	constructor (public navCtrl: NavController,
				 public alertCtrl: AlertController) {

	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	amapReady ($event: EssenceIonAMapComponent) {
		this.amapComponent = $event;
		this.amap = $event.getMap();
	}

	amapDestroy ($event) {
		console.log($event);
	}
}
