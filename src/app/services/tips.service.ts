/**
 * Created by laixiangran on 2017/3/24.
 * homepage：http://www.laixiangran.cn
 * Alert、Loading、Toast、ActionSheet统一管理服务
 */

import { Injectable } from '@angular/core';
import {
	AlertController, ActionSheetController, LoadingController, ToastController, Alert,
	ActionSheet, ActionSheetOptions, Loading, LoadingOptions, Toast, ToastOptions, AlertOptions, ViewController
} from 'ionic-angular';

@Injectable()
export class TipsService {

	constructor(public alertCtrl: AlertController,
				public actionSheetCtrl: ActionSheetController,
				public loadingCtrl: LoadingController,
				public toastCtrl: ToastController) {
	}

	/**
	 * 隐藏控件
	 * @param currentViewer
	 */
	dismiss(currentViewer: ViewController): Promise<any> {
		return new Promise((resolve, reject) => {
			if (currentViewer) {
				return currentViewer.dismiss();
			} else {
				resolve(null);
			}
		});
	}

	/**
	 * 弹出警告框
	 * @param alertOptions
	 * @param callback
	 * @returns {Alert}
	 */
	alert(alertOptions: AlertOptions, callback?: Function): Alert {
		if (typeof alertOptions.enableBackdropDismiss === 'undefined') {
			alertOptions.enableBackdropDismiss = false; // 默认点击背景不隐藏
		}
		const currentAlert: Alert = this.alertCtrl.create(alertOptions);
		currentAlert.present().then(() => {
			if (callback) {
				callback();
			}
		});
		return currentAlert;
	}

	/**
	 * 弹出确认框
	 * @param alertOptions
	 * @param callback
	 * @returns {Alert}
	 */
	confirm(alertOptions: AlertOptions, callback?: Function): Alert {
		if (typeof alertOptions.enableBackdropDismiss === 'undefined') {
			alertOptions.enableBackdropDismiss = false; // 默认点击背景不隐藏
		}
		const currentConfirm: Alert = this.alertCtrl.create(alertOptions);
		currentConfirm.present().then(() => {
			if (callback) {
				callback();
			}
		});
		return currentConfirm;
	}

	/**
	 * 工作表控件
	 * @param actionSheetOptions
	 * @param callback
	 * @returns {ActionSheet}
	 */
	actionSheet(actionSheetOptions: ActionSheetOptions, callback?: Function): ActionSheet {
		const currentActionSheet: ActionSheet = this.actionSheetCtrl.create(actionSheetOptions);
		currentActionSheet.present().then(() => {
			if (callback) {
				callback();
			}
		});
		return currentActionSheet;
	}

	/**
	 * 加载控件
	 * @param loadingOptions
	 * @param callback
	 * @returns {Loading}
	 */
	loader(loadingOptions: LoadingOptions = {}, callback?: Function): Loading {
		if (typeof loadingOptions.showBackdrop === 'undefined') {
			loadingOptions.showBackdrop = false; // 默认不显示背景
		}
		const currentLoader: Loading = this.loadingCtrl.create(loadingOptions);
		currentLoader.present().then(() => {
			if (callback) {
				callback();
			}
		});
		return currentLoader;
	}

	/**
	 * 提示横幅
	 * @param toastOptions
	 * @param callback
	 * @returns {Toast}
	 */
	toast(toastOptions: ToastOptions, callback?: Function): Toast {
		const currentToast: Toast = this.toastCtrl.create(toastOptions);
		currentToast.present().then(() => {
			if (callback) {
				callback();
			}
		});
		return currentToast;
	}
}
