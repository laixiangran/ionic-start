import {Component} from '@angular/core';

import { NavController } from 'ionic-angular';
import { WeatherReportPage } from "./subpages/weatherReport/weatherReport";
import { RealTimeTrafficPage } from "./subpages/realTimeTraffic/realTimeTraffic";

@Component({
    selector: 'page-tools',
    templateUrl: 'tools.html'
})
export class ToolsPage {

    constructor (public navCtrl: NavController) {}

    items = [
        {
            name: "天气预报",
            icon: "partly-sunny",
            color: "#EA5854",
            component: WeatherReportPage
        },
        {
            name: "实时交通",
            icon: "subway",
            color: "#FC9300",
            component: RealTimeTrafficPage
        }
    ];

    itemSelected (item: any) {
        this.navCtrl.push(item.component);
    }
}
