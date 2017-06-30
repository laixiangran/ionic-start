/**
 * Created by laixiangran on 2017/3/22.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from '@angular/core';
import { EssenceIonAMapComponent } from 'essence-ionic';

@Component({
	selector: 'page-realtime-traffic',
	templateUrl: 'realTimeTraffic.html'
})
export class RealTimeTrafficPage {

	amapOpts: any; // 初始化地图参数

	constructor() { }

	amapReady(amapComponent: EssenceIonAMapComponent) {}

	amapDestroy($event) {}

	amapLocation($event) {}

}
