import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit, OnDestroy {

	constructor(public menu: MenuController) {
	}

	ngOnInit() {
		this.menu.enable(false);
		// StatusBar.backgroundColorByHexString("#4DC6F3");
	}

	ngOnDestroy() {
		this.menu.enable(true);
	}
}
