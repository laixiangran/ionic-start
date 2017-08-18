import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Component({
	selector: 'page-file-demo',
	templateUrl: 'file-demo.html'
})
export class FileDemoPage {
	fileDirectorys: string[];

	constructor(public menu: MenuController, public file: File) {
		this.fileDirectorys = [
			'applicationDirectory',
			'applicationStorageDirectory',
			'dataDirectory',
			'cacheDirectory',
			'externalApplicationStorageDirectory',
			'externalDataDirectory',
			'externalCacheDirectory',
			'externalRootDirectory'
		];
	}

	ionViewDidEnter() {
		this.menu.enable(false);
	}

	ionViewDidLeave() {
		this.menu.enable(true);
	}
}
