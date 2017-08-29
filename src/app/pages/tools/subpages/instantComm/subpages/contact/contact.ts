import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { ConfigService } from '../../../../../../services/config.service';
import { Content, NavParams } from 'ionic-angular';
import { InstantCommService } from '../../instant-comm.service';
import { Subscription } from 'rxjs/Subscription';
import { ServerData } from '../../../../../../models/server-data';
import { SendMessage } from '../../../../../../models/send-message.model';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage implements AfterViewChecked {
	@ViewChild(Content) content: Content;
	person: any;
	initLoad: boolean = true;
	currentMessages: any[];
	intervalId: any;

	constructor(public instantCommService: InstantCommService,
				public params: NavParams,
				public config: ConfigService,
				public statusBar: StatusBar) {
		this.person = this.params.get('person');
	}

	ionViewDidEnter() {
		this.statusBar.backgroundColorByHexString('#F1F1F1');
		this.queryRecentTalkContent();
		this.intervalId = setInterval(() => {
			this.queryRecentTalkContent(false);
		}, 3000);
	}

	ionViewDidLeave() {
		clearInterval(this.intervalId);
		this.statusBar.backgroundColorByHexString(this.config.mainStatusBarColor);
	}

	ngAfterViewChecked() {
		if (this.initLoad) {
			this.content.scrollToBottom();
		}
	}

	queryRecentTalkContent(showLoader: boolean = true) {
		const sub: Subscription = this.instantCommService.queryRecentTalkContent(this.person.C_TALK_USERID, showLoader).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				if (this.currentMessages) {
					this.initLoad = false;
				}
				this.currentMessages = serverData.result;
			}
		});
	}

	send(messageInput: HTMLInputElement) {
		const message: SendMessage = new SendMessage(messageInput.value, [this.person.C_TALK_USERID]);
		messageInput.value = '';
		const sub: Subscription = this.instantCommService.sendMessage(message).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.currentMessages.push(serverData.result);
			}
		});
	}

	trackById(index: number, message: any) {
		return message.C_ID;
	}

}
