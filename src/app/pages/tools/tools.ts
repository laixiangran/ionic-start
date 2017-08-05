import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeatherReportPage } from './subpages/weatherReport/weatherReport';
import { RealTimeTrafficPage } from './subpages/realTimeTraffic/realTimeTraffic';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
	selector: 'page-tools',
	templateUrl: 'tools.html'
})
export class ToolsPage implements OnInit {
	@ViewChild(SignaturePad) signaturePad: SignaturePad;
	@ViewChild('signaturePadDiv') signaturePadDiv: ElementRef;

	videoUrl: string = 'http://www.laixiangran.cn/CDN/custom/video/test.mp4';

	signaturePadOptions: Object;

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
		}
	];

	constructor(public navCtrl: NavController) {}

	ngOnInit() {
		this.signaturePadOptions = {
			canvasWidth: this.signaturePadDiv.nativeElement.clientWidth,
			canvasHeight: 200
		};
	}

	itemSelected(item: any) {
		this.navCtrl.push(item.component);
	}

	videoViewerReady($event: any) {
		console.log($event);
	}

	drawStart() {
		console.log('begin drawing');
	}

	drawComplete() {
		console.log('drawing complete');
		// console.log(this.signaturePad.toDataURL());
	}

	clearSignature() {
		this.signaturePad.clear();
	}
}
