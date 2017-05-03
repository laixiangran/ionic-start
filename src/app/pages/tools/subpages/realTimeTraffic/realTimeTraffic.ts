/**
 * Created by laixiangran on 2017/3/22.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from "@angular/core";
import { EssenceNg2AMapComponent } from "../../../../components/essence-ng2-amap/essence-ng2-amap.component";

@Component({
    selector: 'page-realTimeTraffic',
    templateUrl: 'realTimeTraffic.html'
})
export class RealTimeTrafficPage {

    amapOpts: any; // 初始化地图参数

    constructor() { }

    amapReady(amapComponent: EssenceNg2AMapComponent) {}

    amapDestroy($event) {}

    amapLocation($event) {}

}
