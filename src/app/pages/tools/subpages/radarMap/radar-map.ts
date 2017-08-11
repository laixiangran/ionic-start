/**
 * Created by monica on 2017/5/4.
 */

import { Component } from '@angular/core';
import { MenuController, NavParams } from 'ionic-angular';
import { TipsService } from '../../../../services/tips.service';
import { Sys } from '../../../../utils/sys';

@Component({
	selector: 'page-radar-map',
	templateUrl: 'radar-map.html'
})
export class RadarMapPage {
	nowDate: Date = new Date();
	dataList: any[] = [];
	DateTime: string = this.nowDate.getFullYear() + (this.nowDate.getMonth() < 9 ? '-0' : '-') + (this.nowDate.getMonth() + 1) + (this.nowDate.getDate() < 10 ? '-0' : '-') + this.nowDate.getDate();
	maxDate: string = JSON.parse(JSON.stringify(this.DateTime));
	httpUrl: string = 'http://pi.weather.com.cn/i/product/pic/l/sevp_aoc_rdcp_sldas_ebref_ancn_l88_pi_';
	curImg: any;
	curStep: number = 0;
	curImgTime: any;
	playBoolean: boolean = false;
	timer: any;
	operateText: string = '播放';
	fullImg: boolean = false;

	constructor(public params: NavParams,
				public menu: MenuController,
				public tipsService: TipsService) {
		const curTime = new Date();
		curTime.setHours(curTime.getHours() - 1);
		this.initData(curTime);
		this.curImg = this.dataList[0];
		this.curImgTime = this.curImg.time;
	}

	ionViewDidEnter() {
		this.menu.enable(false);
	}

	ionViewDidLeave() {
		this.menu.enable(true);
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}

	/**
	 * 初始化数据
	 */
	initData(curTime) {
		this.dataList = [];
		for (let i = 0; i < 24; i++) {
			for (let j = 9; j >= 0; j--) {
				curTime.setMinutes(j * 6);
				const date = new Date(curTime);
				date.setHours(date.getHours() - 8);
				const filename = Sys.dateFormat(date, 'yyyyMMddhhmm00') + '001.png';
				this.dataList.unshift({url: filename, time: Sys.dateFormat(curTime, 'yyyy-MM-dd hh:mm')});
			}
			curTime.setHours(curTime.getHours() - 1);
		}
	}

	/**
	 * 日期选择
	 */
	selectDate() {
		const curTime = new Date(this.DateTime);
		curTime.setHours(new Date().getHours() - 1);
		curTime.setMinutes(new Date().getMinutes());
		this.initData(curTime);
		this.curImg = this.dataList[0];
	}

	/**
	 * 点击事件
	 */
	mouseOperate() {
		if (!this.playBoolean) {
			this.fullImg = true;
			this.operateText = '暂停';
			this.playBoolean = true;
			this.curStep++;
			this.curImg = this.dataList[this.curStep];
		} else {
			this.operateText = '播放';
			this.playBoolean = false;
			if (this.timer === null) {
				return
			}
			clearTimeout(this.timer);
			this.timer = null;
		}
	}

	/**
	 * 上一张按钮点击事件
	 */
	preImg() {
		this.curStep--;
		this.curImg = this.dataList[this.curStep];
	}

	/**
	 * 下一张按钮点击事件
	 */
	nextImg() {
		this.curStep++;
		this.curImg = this.dataList[this.curStep];
	}


	/**
	 * 图片加载好之后
	 * @param $event
	 */
	imgLoad() {
		this.curImgTime = this.curImg.time;
		if (this.playBoolean) {
			this.curStep++;
			clearTimeout(this.timer);
			this.timer = null;
			if (this.curStep === this.dataList.length) {
				this.curStep = 0;
				this.playBoolean = false;
				this.tipsService.alert({subTitle: '播放结束', enableBackdropDismiss: true});
				this.curImg = this.dataList[this.curStep];
			} else {
				this.timer = window.setTimeout(() => {
					this.curImg = this.dataList[this.curStep];
				}, 600);
			}
		}
	}

	fullView(isFull: boolean) {
		this.fullImg = isFull;
	}
}
