import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
	selector: 'essence-ion-videoplayer',
	templateUrl: './essence-ion-videoplayer.component.html'
})
export class EssenceIonVideoplayerComponent implements OnInit {

	@ViewChild('videoToolbar') videoToolbar: ElementRef;
	@Input() width: number = 0;
	@Input() height: number = 0;
	@Input() source: string;
	@Input() poster: string;
	@Output() ready: EventEmitter<any> = new EventEmitter<any>(false);

	videoElem: HTMLVideoElement; // video dom对象
	videoUrl: SafeResourceUrl; // 视频路径
	currentTime: string; // 视频播放的当前时间
	totalTime: string; // 视频总时间
	play_progress: number = 0; // 播放的进度条长度值
	canPlay: boolean = true; // false：加载中，true：可以播放

	constructor(
		public domSanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.source);
		this.ready.emit('video viewer initialize!');
	}

	/**
	 * 当浏览器已加载视频的元数据时
	 * @param e
	 */
	onLoadedmetadata(e: any) {
		this.videoElem = e.target as HTMLVideoElement;
		this.totalTime = this.getFormatTime(this.videoElem.duration);
		this.currentTime = this.getFormatTime(this.videoElem.currentTime);
	}

	/**
	 * 当浏览器可以播放视频时
	 * @param e
	 */
	onCanPlay(e: any) {
		this.canPlay = true;
		console.log('can play');
	}

	/**
	 * 当视频已开始或不再暂停时
	 * @param e
	 */
	onPlay(e: any) {
		console.log('play');
	}

	/**
	 * 当视频在已因缓冲而暂停或停止后已就绪时
	 * @param e
	 */
	onPlaying(e: any) {
		this.canPlay = false;
		console.log('playing');
	}

	/**
	 * 	当视频由于需要缓冲下一帧而停止
	 * @param e
	 */
	onWaiting(e: any) {
		this.canPlay = false;
		console.log('waiting');
	}

	/**
	 * 当目前的播放列表已结束时
	 * @param e
	 */
	OnEnded(e: any) {
		console.log('play end');
	}

	/**
	 * 当目前的播放位置已更改时
	 * @param e
	 */
	onTimeupdate(e: any) {
		this.canPlay = true;
		this.currentTime = this.getFormatTime(this.videoElem.currentTime);
		this.play_progress = this.videoElem.currentTime / this.videoElem.duration * this.videoToolbar.nativeElement.clientWidth;
	}

	/**
	 * 当浏览器正在下载视频时
	 * @param e 
	 */
	onProgress(e: any) {
		console.log('progress');
	}

	/**
	 * 当浏览器可在不因缓冲而停顿的情况下进行播放时
	 * @param e 
	 */
	onCanplaythrough(e: any) {
		console.log('canplaythrough');
	}

	/**
	 * 返回表示视频错误状态的 MediaError 对象
	 * @param e 
	 */
	onError(e: any) {
		console.error('error');
	}

	/**
	 * 播放视频
	 */
	play() {
		if (this.videoElem.ended) {
			this.videoElem.currentTime = 0;
		}
		this.videoElem.play();
	}

	/**
	 * 暂停视频
	 */
	pause() {
		this.videoElem.pause();
	}

	/**
	 * 播放/暂停
	 */
	playOrPause() {
		(this.videoElem && this.videoElem.paused) ? this.play() : this.pause();
	}

	/**
	 * 重新加载video元素
	 */
	reload(videoElem: HTMLVideoElement) {
		if (videoElem.networkState != 3) {
			this.canPlay = false
		};
		videoElem.load();
	}

	/**
	 * 将数字格式化成hh:mm:ss时间格式
	 * @param value 
	 */
	getFormatTime(value: number): string {
		let h: string = parseInt(value / 3600 + '') < 10 ? '0' + parseInt(value / 3600 + '') : '' + parseInt(value / 3600 + ''),
			m: string = parseInt(value % 3600 / 60 + '') < 10 ? '0' + parseInt(value % 3600 / 60 + '') : '' + parseInt(value % 3600 / 60 + ''),
			s: string;
		if (value >= 60) {
			s = value % 3600 % 60 < 10 ? '0' + parseInt(value % 3600 % 60 + '') : '' + parseInt(value % 3600 % 60 + '');
		} else if (value < 60 && value >= 10) {
			s = '' + parseInt(value + '');
		} else if (value < 10) {
			s = '0' + parseInt(value + '');
		}
		return `${h}:${m}:${s}`;
	}
}
