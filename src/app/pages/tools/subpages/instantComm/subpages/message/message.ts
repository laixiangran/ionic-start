import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { InstantCommService } from '../../instant-comm.service';
import { Subscription } from 'rxjs/Subscription';
import { ServerData } from '../../../../../../models/server-data.model';

@Component({
	selector: 'page-message',
	templateUrl: 'message.html'
})
export class MessagePage {
	currentTalkers: any[] = [];
	intervalId: any;

	constructor(public navCtrl: NavController,
				public instantCommService: InstantCommService,
				public event: Events) {
	}

	ionViewDidEnter() {
		this.queryRecentTalkUsers();
		this.intervalId = setInterval(() => {
			this.queryRecentTalkUsers(false);
		}, 3000);
	}

	ionViewDidLeave() {
		clearInterval(this.intervalId);
	}

	ionViewWillUnload() {
		clearInterval(this.intervalId);
	}

	queryRecentTalkUsers(showLoader: boolean = true) {
		const sub: Subscription = this.instantCommService.queryRecentTalkUsers(showLoader).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.currentTalkers = serverData.result;
			}
		});
	}

	contact(person: any) {
		clearInterval(this.intervalId);
		this.navCtrl.push(ContactPage, {'person': person});
	}

	back() {
		clearInterval(this.intervalId);
		this.event.publish('backMainPage');
	}

	deleteMessage(id: string) {
		const sub: Subscription = this.instantCommService.deleteSysMessageTalk(id).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.queryRecentTalkUsers(false);
			}
		});
	}

	trackById(index: number, talker: any) {
		return talker.C_TALK_USERID;
	}
}
