/**
 * Created by laixiangran on 2017/3/22.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from '@angular/core';
import { EssenceIonAMapComponent } from 'essence-ionic';
import { ConfigService } from '../../../../services/config.service';
import { MenuController } from 'ionic-angular';

@Component({
	selector: 'page-realtime-traffic',
	templateUrl: 'realTimeTraffic.html'
})
export class RealTimeTrafficPage {

	amapOpts: any; // 初始化地图参数

	constructor(public config: ConfigService, public menu: MenuController) {}

	ionViewDidEnter() {
		this.menu.enable(false);
	}

	ionViewDidLeave() {
		this.menu.enable(true);
	}

	amapReady(amapComponent: EssenceIonAMapComponent) {}

	amapDestroy($event) {}

	amapLocation($event) {}
}
