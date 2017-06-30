import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EssenceChart } from 'essence-ng2-chart';

@Component({
	selector: 'page-statistic',
	templateUrl: 'statistic.html'
})
export class StatisticPage {

	// 默认招标统计
	tabName: string = 'invitation';

	tabInfos: any[] = [
		{index: 0, code: 'invitation', css: 'Eicon icon-zhaobiao', title: '招标统计', color: '#4aa9ff'},
		{index: 1, code: 'compact', css: 'Eicon icon-hetong', title: '合同统计', color: '#69cb79'},
		{index: 2, code: 'project', css: 'Eicon icon-gongchengguanli', title: '工程统计', color: '#ffc239'},
		{index: 3, code: 'capital', css: 'Eicon icon-zijin', title: '资金统计', color: '#fd7075'}
	];

	monthWaterChart: EssenceChart = new EssenceChart({
		chart: {
			type: 'pie'
		},
		title: {
			text: '招标统计一'
		},
		plotOptions: {
			pie: {
				innerSize: 100,
				allowPointSelect: true,
				cursor: 'pointer'
			}
		},
		credits: {
			enabled: false
		},
		legend: {
			align: 'right'
		}
	});

	monthWaterChart1: EssenceChart = new EssenceChart({
		chart: {
			type: 'pie'
		},
		title: {
			text: '招标统计二'
		},
		plotOptions: {
			pie: {
				innerSize: 100,
				allowPointSelect: true,
				cursor: 'pointer'
			}
		},
		credits: {
			enabled: false
		},
		legend: {
			align: 'right'
		}
	});

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		this.monthWaterChart.setSeries([{
			name: '招标数',
			data: [['设计招标', 10], ['监理招标', 12], ['设备招标', 8], ['施工招标', 7], ['其它招标', 5]],
			colors: ['#FFE135', '#EEA308', '#6FBBF2', '#EB8685', '#A87DBE']
		}]);

		this.monthWaterChart1.setSeries([{
			name: '招标数',
			data: [['设计招标', 10], ['监理招标', 12], ['设备招标', 8], ['施工招标', 7], ['其它招标', 5]],
			colors: ['#FFE135', '#EEA308', '#6FBBF2', '#EB8685', '#A87DBE']
		}]);
	}

	tabclick(tabInfo: any) {
		this.tabName = tabInfo.code;
	}
}
