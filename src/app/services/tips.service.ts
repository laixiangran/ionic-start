/**
 * Created by laixiangran on 2017/3/24.
 * homepage：http://www.laixiangran.cn
 * Alert、Loading、Toast、ActionSheet统一管理服务
 */

import { Injectable } from "@angular/core";
import {
	AlertController, ActionSheetController, LoadingController, ToastController, Alert,
	ActionSheet, ActionSheetOptions, Loading, LoadingOptions, Toast, ToastOptions, AlertOptions
} from "ionic-angular";

@Injectable()
export class TipsService {

	currentAlert: Alert;
	currentConfirm: Alert;
	currentLoader: Loading;
	currentActionSheet: ActionSheet;
	currentToast: Toast;

	constructor(
		public alertCtrl: AlertController,
		public actionSheetCtrl: ActionSheetController,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController) {
	}

	/**
	 * 隐藏所有的弹出视图控件
	 */
	hideAllViewController() {
		this.dismissAlert();
		this.dismissConfirm();
		this.dismissActionSheet();
		this.dismissLoader();
		this.dismissToast();
	}

	/**
	 * 弹出警告框
	 * @param AlertOptions
	 * @returns {Alert}
	 */
	alert(alertOptions: AlertOptions): Alert {
		this.hideAllViewController();
		this.currentAlert = this.alertCtrl.create(alertOptions);
		this.currentAlert.present();
		return this.currentAlert;
	}

	/**
	 * 隐藏弹出警告框
	 * 
	 * 
	 * @memberof TipsService
	 */
	dismissAlert() {
		if (this.currentAlert) {
			this.currentAlert.dismiss();
			this.currentAlert = null;
		}
	}


	/**
	 * 弹出确认框
	 * @param AlertOptions
	 * @returns {Alert}
	 */
	confirm(alertOptions: AlertOptions): Alert {
		this.hideAllViewController();
		this.currentConfirm = this.alertCtrl.create(alertOptions);
		this.currentConfirm.present();
		return this.currentConfirm;
	}

	/**
	 * 隐藏弹出确认框
	 * 
	 * 
	 * @memberof TipsService
	 */
	dismissConfirm() {
		if (this.currentConfirm) {
			this.currentConfirm.dismiss();
			this.currentConfirm = null;
		}
	}

	/**
	 * 工作表控件
	 * @param actionSheetOptions
	 * @returns {ActionSheet}
	 */
	actionSheet(actionSheetOptions: ActionSheetOptions): ActionSheet {
		this.hideAllViewController();
		this.currentActionSheet = this.actionSheetCtrl.create(actionSheetOptions);
		this.currentActionSheet.present();
		return this.currentActionSheet;
	}

	/**
	 * 隐藏工作表控件
	 * 
	 * 
	 * @memberof TipsService
	 */
	dismissActionSheet() {
		if (this.currentActionSheet) {
			this.currentActionSheet.dismiss();
			this.currentActionSheet = null;
		}
	}

	/**
	 * 加载控件
	 * @param loadingOptions
	 * @returns {Loading}
	 */
	loader(loadingOptions?: LoadingOptions): Loading {
		this.hideAllViewController();
		this.currentLoader = this.loadingCtrl.create(loadingOptions);
		this.currentLoader.present();
		return this.currentLoader;
	}

	/**
	 * 隐藏加载控件
	 * 
	 * 
	 * @memberof TipsService
	 */
	dismissLoader() {
		if (this.currentLoader) {
			this.currentLoader.dismiss();
			this.currentLoader = null;
		}
	}

	/**
	 * 提示横幅
	 * @param toastOptions
	 * @returns {Toast}
	 */
	toast(toastOptions: ToastOptions): Toast {
		this.hideAllViewController();
		this.currentToast = this.toastCtrl.create(toastOptions);
		this.currentToast.present();
		return this.currentToast;
	}

	/**
	 * 隐藏提示横幅
	 * 
	 * 
	 * @memberof TipsService
	 */
	dismissToast() {
		if (this.currentToast) {
			this.currentToast.dismiss();
			this.currentToast = null;
		}
	}
}
