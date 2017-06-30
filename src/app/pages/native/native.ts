import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { BackgroundMode, BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BatteryStatusResponse, BatteryStatus } from '@ionic-native/battery-status';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VideoPlayer } from '@ionic-native/video-player';

import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'page-native',
	templateUrl: 'native.html'
})
export class NativePage {

	barcodeData: any;
	batteryStatusResponse: BatteryStatusResponse;
	subscriptions: Subscription[] = [];

	constructor(public navCtrl: NavController,
				public backgroundMode: BackgroundMode,
				public barcodeScanner: BarcodeScanner,
				public batteryStatus: BatteryStatus,
				public videoPlayer: VideoPlayer,
				public camera: Camera,
				public configService: ConfigService) {
	}

	ionViewDidEnter() {
		if (this.configService.hasCordova) {

			// 将所有的订阅放在一个数组中，方便一次性取消
			this.subscriptions.push(
				this.backgroundMode.on('enable').subscribe((event: any) => {
					console.log('启用后台模式！');
				}),
				this.backgroundMode.on('disable').subscribe((event: any) => {
					console.log('禁用后台模式！');
				}),
				this.backgroundMode.on('activate').subscribe((event: any) => {
					console.log('进入后台模式！');
				}),
				this.backgroundMode.on('failure').subscribe((event: any) => {
					console.log('已退出后台模式！');
				}),
				this.backgroundMode.on('deactivate').subscribe((event: any) => {
					console.log('后台模式失败！');
				}),
				this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
					this.batteryStatusResponse = status;
				})
			);

			console.log(this.subscriptions);
		}
	}

	ionViewDidLeave() {
		if (this.configService.hasCordova) {

			// 取消所有的订阅
			this.subscriptions.forEach((subscription: Subscription) => {
				subscription.unsubscribe();
			});
		}
	}

	playCamera() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};
		this.camera.getPicture(options).then((imageData) => {
			console.log(imageData);
		}, (err) => {
			console.error(err);
		});
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
