import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-rules',
	templateUrl: 'rules.html'
})
export class RulesPage {
	items = [
		{
			name: '天气预报',
			icon: 'partly-sunny',
			color: '#EA5854'
		},
		{
			name: '通讯录',
			icon: 'person',
			color: '#4FDDD1'
		}
	];

	constructor(public navCtrl: NavController) { }

	itemSelected(item: string) {
		console.log('Selected Item', item);
	}
}
