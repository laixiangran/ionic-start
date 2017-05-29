import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundMode, BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BatteryStatusResponse, BatteryStatus } from "@ionic-native/battery-status";

import { ConfigService } from "../../services/config.service";
import { VideoPlayer } from "@ionic-native/video-player";

@Component({
	selector: 'page-native',
	templateUrl: 'native.html'
})
export class NativePage {

	barcodeData: any;
	batteryStatusResponse: BatteryStatusResponse;

	constructor(public navCtrl: NavController,
		public backgroundMode: BackgroundMode,
		public barcodeScanner: BarcodeScanner,
		public batteryStatus: BatteryStatus,
		public videoPlayer: VideoPlayer,
		public configService: ConfigService) {
	}

	ionViewDidLoad() {
		if (this.configService.hasCordova) {

			// 监听后台模式事件
			this.backgroundMode.on('enable').subscribe((event: any) => {
				console.log('启用后台模式！');
			});
			this.backgroundMode.on('disable').subscribe((event: any) => {
				console.log('禁用后台模式！');
			});
			this.backgroundMode.on('activate').subscribe((event: any) => {
				console.log('进入后台模式！');
			});
			this.backgroundMode.on('failure').subscribe((event: any) => {
				console.log('已退出后台模式！');
			});
			this.backgroundMode.on('deactivate').subscribe((event: any) => {
				console.log('后台模式失败！');
			});

			// 监听电池状态
			this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
				this.batteryStatusResponse = status;
			});
		}
	}

	/**
	 * 播放视频
	 *
	 *
	 * @memberof NativePage
	 */
	playVideo() {
		this.videoPlayer.play('http://www.laixiangran.cn/CDN/custom/video/test.mp4').then(() => {
			console.log('video completed');
		}).catch(err => {
			console.log(err);
		});
	}

	/**
	 * 启用后台模式
	 */
	enableBackgroundMode() {
		this.backgroundMode.enable();
	}

	/**
	 * 禁用后台模式
	 */
	disableBackgroundMode() {
		this.backgroundMode.disable();
	}

	/**
	 * 覆盖默认标题，代码和文本
	 * @param configure
	 */
	setBackgroundModeConfigure(configure: BackgroundModeConfiguration) {
		this.backgroundMode.setDefaults(configure);
	}

	/**
	 * 修改显示的内容
	 * @param options
	 */
	configureBackgroundMode(options: BackgroundModeConfiguration) {
		this.backgroundMode.configure(options);
	}

	/**
	 * 扫码
	 */
	openBarcodeScanner() {
		this.barcodeScanner.scan({
			showFlipCameraButton: true,
			showTorchButton: true,
			prompt: '将二维码/条形码放入框内，即可自动扫描'
		}).then((barcodeData: any) => {
			this.barcodeData = barcodeData;
			console.log(barcodeData);
		}, (err: any) => {
			console.log(err);
		});
	}

	/**
	 * 编码
	 */
	encodeToBarcodeScanner(type: string, text: any) {
		this.barcodeScanner.encode(type, text).then((data: any) => {
			console.log(data);
		});
	}
}
