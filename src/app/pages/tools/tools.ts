import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { WeatherReportPage } from './subpages/weatherReport/weatherReport';
import { RealTimeTrafficPage } from './subpages/realTimeTraffic/realTimeTraffic';
import { RadarMapPage } from './subpages/radarMap/radar-map';
import { SatelliteCloudPage } from './subpages/satelliteCloud/satellite-cloud';
import { InstantCommPage } from './subpages/instantComm/instant-comm';

@Component({
	selector: 'page-tools',
	templateUrl: 'tools.html'
})
export class ToolsPage {
	items = [
		{
			name: '天气预报',
			icon: 'partly-sunny',
			color: '#EA5854',
			component: WeatherReportPage
		},
		{
			name: '实时交通',
			icon: 'subway',
			color: '#FC9300',
			component: RealTimeTrafficPage
		},
		{
			name: '雷达图',
			icon: 'analytics',
			color: '#27ea71',
			component: RadarMapPage
		},
		{
			name: '卫星云图',
			icon: 'cloudy',
			color: '#3eb1fc',
			component: SatelliteCloudPage
		},
		{
			name: '即时交流',
			icon: 'call',
			color: '#ac87fc',
			component: InstantCommPage
		}
	];

	constructor(public navCtrl: NavController,
				public menu: MenuController) {
	}

	itemSelected(item: any) {
		this.navCtrl.push(item.component);
	}
}
