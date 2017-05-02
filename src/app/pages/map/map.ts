import {Component} from "@angular/core";
import {NavController, AlertController} from 'ionic-angular';
import {EssenceNg2AMapComponent} from "../../components/essence-ng2-amap/essence-ng2-amap.component";

@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage {
	amapComponent: EssenceNg2AMapComponent; // 当前地图控件对象
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
	amapReady ($event: EssenceNg2AMapComponent) {
		this.amapComponent = $event;
		this.amap = $event.getMap();
	}

	amapDestroy ($event) {
		console.log($event);
	}
}
