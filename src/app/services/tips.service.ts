/**
 * Created by laixiangran on 2017/3/24.
 * homepage：http://www.laixiangran.cn
 * Alert、Loading、Toast、ActionSheet统一管理服务
 */

import {Injectable} from "@angular/core";
import {
	AlertController, ActionSheetController, LoadingController, ToastController, Alert,
	ActionSheet, ActionSheetOptions, Loading, LoadingOptions, Toast, ToastOptions, AlertOptions, ViewController
} from "ionic-angular";

@Injectable()
export class TipsService {

	constructor (public alertCtrl: AlertController,
				 public actionSheetCtrl: ActionSheetController,
				 public loadingCtrl: LoadingController,
				 public toastCtrl: ToastController) {
	}

	/**
	 * 隐藏控件
	 *
	 *
	 * @memberof TipsService
	 */
	dismiss (currentViewer: ViewController): Promise<any> {
		return currentViewer && currentViewer.dismiss();
	}

	/**
	 * 弹出警告框
	 * @param AlertOptions
	 * @returns {Alert}
	 */
	alert (alertOptions: AlertOptions): Alert {
		alertOptions.enableBackdropDismiss = false;
		let currentAlert: Alert = this.alertCtrl.create(alertOptions);
		currentAlert.present();
		return currentAlert;
	}

	/**
	 * 弹出确认框
	 * @param AlertOptions
	 * @returns {Alert}
	 */
	confirm (alertOptions: AlertOptions): Alert {
		let currentConfirm: Alert = this.alertCtrl.create(alertOptions);
		currentConfirm.present();
		return currentConfirm;
	}

	/**
	 * 工作表控件
	 * @param actionSheetOptions
	 * @returns {ActionSheet}
	 */
	actionSheet (actionSheetOptions: ActionSheetOptions): ActionSheet {
		let currentActionSheet: ActionSheet = this.actionSheetCtrl.create(actionSheetOptions);
		currentActionSheet.present();
		return currentActionSheet;
	}

	/**
	 * 加载控件
	 * @param loadingOptions
	 * @returns {Loading}
	 */
	loader (loadingOptions: LoadingOptions = {}): Loading {
		loadingOptions.showBackdrop = false;
		let currentLoader: Loading = this.loadingCtrl.create(loadingOptions);
		currentLoader.present();
		return currentLoader;
	}

	/**
	 * 提示横幅
	 * @param toastOptions
	 * @returns {Toast}
	 */
	toast (toastOptions: ToastOptions): Toast {
		let currentToast: Toast = this.toastCtrl.create(toastOptions);
		currentToast.present();
		return currentToast;
	}
}
