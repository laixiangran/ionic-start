import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { InstantCommService } from '../../instant-comm.service';
import { ServerData } from '../../../../../../models/server-data';
import { ContactPage } from '../contact/contact';

@Component({
	selector: 'page-person',
	templateUrl: 'person.html'
})
export class PersonPage {
	presons: any[] = [];

	constructor(public event: Events,
				public navCtrl: NavController,
				public instantCommService: InstantCommService) {
	}

	ionViewDidEnter() {
		const sub: Subscription = this.instantCommService.queryUsers().subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.presons = serverData.result;
			}
		});
	}

	contact(person: any) {
		const sub: Subscription = this.instantCommService.addSysMessageTalk(person.C_TALK_USERID).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
		});
		this.navCtrl.push(ContactPage, {'person': person});
	}

	back() {
		this.event.publish('backMainPage');
	}

	trackById(index: number, talker: any) {
		return talker.C_TALK_USERID;
	}
}
