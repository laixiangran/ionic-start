import { Component, OnInit } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { WeatherReportPage } from './subpages/weatherReport/weatherReport';
import { RealTimeTrafficPage } from './subpages/realTimeTraffic/realTimeTraffic';
import { RadarMapPage } from './subpages/radarMap/radar-map';
import { SatelliteCloudPage } from './subpages/satelliteCloud/satellite-cloud';

@Component({
	selector: 'page-tools',
	templateUrl: 'tools.html'
})
export class ToolsPage implements OnInit {
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
			icon: 'md-analytics',
			color: '#27ea71',
			component: RadarMapPage
		},
		{
			name: '卫星云图',
			icon: 'md-cloudy',
			color: '#3eb1fc',
			component: SatelliteCloudPage
		}
	];

	constructor(public navCtrl: NavController,
				public menu: MenuController) {}

	ngOnInit() {
	}

	itemSelected(item: any) {
		this.navCtrl.push(item.component);
	}
}
