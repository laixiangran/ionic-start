/**
 * Created by laixiangran on 2017/3/22.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from "@angular/core";
import { EssenceIonAMapComponent } from "../../../../components/essence-ion-amap/essence-ion-amap.component";

@Component({
    selector: 'page-realTimeTraffic',
    templateUrl: 'realTimeTraffic.html'
})
export class RealTimeTrafficPage {

    amapOpts: any; // 初始化地图参数

    constructor() { }

    amapReady(amapComponent: EssenceIonAMapComponent) {}

    amapDestroy($event) {}

    amapLocation($event) {}

}
