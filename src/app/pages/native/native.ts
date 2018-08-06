import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BackgroundMode, BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BatteryStatusResponse, BatteryStatus } from '@ionic-native/battery-status';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
import { MediaCapture, CaptureError, CaptureImageOptions, MediaFile, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { ConfigService } from '../../services/config.service';
import { NavController } from 'ionic-angular';
import { FileDemoPage } from './subpages/file-demo/file-demo';

@Component({
	selector: 'page-native',
	templateUrl: 'native.html'
})
export class NativePage {
	barcodeData: any;
	batteryStatusResponse: BatteryStatusResponse;
	subscriptions: Subscription[] = [];

	constructor(public backgroundMode: BackgroundMode,
				public nativeGeocoder: NativeGeocoder,
				public navCtrl: NavController,
				public barcodeScanner: BarcodeScanner,
				public batteryStatus: BatteryStatus,
				public videoPlayer: VideoPlayer,
				public camera: Camera,
				public mediaCapture: MediaCapture,
				public streamingMedia: StreamingMedia,
				public configService: ConfigService) {
	}

	ionViewDidEnter() {
		console.log('ionViewDidEnter');
		if (!this.configService.isDev) {
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
				this.backgroundMode.on('deactivate').subscribe((event: any) => {
					console.log('退出后台模式！');
				}),
				this.backgroundMode.on('failure').subscribe((event: any) => {
					console.log('后台模式失败！');
				}),
				this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
					this.batteryStatusResponse = status;
				})
			);
		}
	}

	ionViewDidLeave() {
		if (!this.configService.isDev) {
			// 取消所有的订阅
			this.subscriptions.forEach((subscription: Subscription) => {
				subscription.unsubscribe();
			});
		}
	}

	playCamera() {
		this.camera.getPicture().then((imageUrl) => {
			console.log(imageUrl);
		}, (err) => {
			console.error(err);
		});
	}

	/**
	 * 播放静态视频
	 */
	playVideo() {
		const videoOptions: VideoOptions = {
			scalingMode: 1
		};
		this.videoPlayer.play('http://www.laixiangran.cn/CDN/custom/video/test.mp4', videoOptions).then(() => {
			console.log('Video completed');
		}).catch((err: any) => {
			console.log(err);
		});
	}

	/**
	 * 播放实时视频
	 */
	playVideo2() {
		const videoOptions: VideoOptions = {
			scalingMode: 2
		};
		this.videoPlayer.play('http://www.laixiangran.cn/CDN/custom/video/test.mp4', videoOptions).then(() => {
			console.log('Video completed');
		}).catch((err: any) => {
			console.log(err);
		});
	}

	/**
	 * 播放静态视频流
	 */
	playVideoStreaming() {
		const videoUrl: string = 'http://www.laixiangran.cn/CDN/custom/video/test.mp4';
		const options: StreamingVideoOptions = {
			successCallback: () => {
				console.log('Video played');
			},
			errorCallback: (err: any) => {
				console.log(err);
			}
		};
		this.streamingMedia.playVideo(videoUrl, options);
	}

	/**
	 * 播放动态视频流
	 */
	playVideoStreaming2() {
		const videoUrl: string = 'rtsp://admin:sjq123456@123.56.211.160:9102/MPEG-4/ch1/main/av_stream';
		const options: StreamingVideoOptions = {
			successCallback: () => {
				console.log('Video played');
			},
			errorCallback: (err: any) => {
				console.log(err);
			},
			orientation: 'landscape'
		};
		this.streamingMedia.playVideo(videoUrl, options);
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
	 */
	setBackgroundModeConfigure(configure: BackgroundModeConfiguration) {
		this.backgroundMode.setDefaults(configure);
	}

	/**
	 * 修改显示的内容
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

	/**
	 * 拍照
	 */
	captureImage() {
		const options: CaptureImageOptions = { limit: 1 };
		this.mediaCapture.captureImage(options).then((data: MediaFile[]) => {
			console.log(data);
		}, (err: CaptureError) => {
			console.error(err);
		});
	}

	/**
	 * 录音
	 */
	captureAudio() {
		const options: CaptureAudioOptions = { limit: 1 };
		this.mediaCapture.captureAudio(options).then((data: MediaFile[]) => {
			console.log(data);
		}, (err: CaptureError) => {
			console.error(err);
		});
	}

	/**
	 * 录屏
	 */
	captureVideo() {
		const options: CaptureVideoOptions = { limit: 1 };
		this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
			console.log(data);
		}, (err: CaptureError) => {
			console.error(err);
		});
	}

	/**
	 * 文件详细
	 */
	fileDetail() {
		this.navCtrl.push(FileDemoPage);
	}

	/**
	 * 逆地理编码
	 */
	reverseGeocode() {
		this.nativeGeocoder.reverseGeocode(39.5, 116.5)
			.then((result: NativeGeocoderReverseResult) => {
				console.log(JSON.stringify(result));
			})
			.catch((error: any) => {
				console.log(error);
			});
	}

	/**
	 * 正地理编码
	 */
	forwardGeocode() {
		this.nativeGeocoder.forwardGeocode('beijing')
			.then((coordinates: NativeGeocoderForwardResult) => {
				console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude);
			})
			.catch((error: any) => {
				console.log(error);
			});
	}
}
