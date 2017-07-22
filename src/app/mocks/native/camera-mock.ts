/**
 * Created by laixiangran on 2017/6/12.
 * homepage：http://www.laixiangran.cn.
 */

import { Camera } from '@ionic-native/camera';

export class CameraMock extends Camera {
	getPicture(options) {
		return new Promise((resolve, reject) => {
			resolve('BASE_64_ENCODED_DATA_GOES_HERE');
		});
	}
}
