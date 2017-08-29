import { Component, ViewChild } from '@angular/core';
import { MessagePage } from './subpages/message/message';
import { PersonPage } from './subpages/person/person';
import { Events, MenuController, NavController, Tabs } from 'ionic-angular';

@Component({
	selector: 'page-instant-comm',
	templateUrl: 'instant-comm.html'
})
export class InstantCommPage {
	@ViewChild('instantTabs') instantTabs: Tabs;
	messagePage = MessagePage;
	personPage = PersonPage;

	constructor(public navCtrl: NavController,
				public menu: MenuController,
				public event: Events) {
	}

	ionViewDidEnter() {
		this.menu.enable(false);
		this.event.subscribe('backMainPage', () => {
			this.navCtrl.pop();
		});
	}

	ionViewDidLeave() {
		this.menu.enable(true);
		this.event.unsubscribe('backMainPage');
	}
}
