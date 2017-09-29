/**
 * Created by laixiangran on 2017/5/20.
 * homepage：http://www.laixiangran.cn
 */

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { RequestService } from './services/request.service';
import { ConfigService } from './services/config.service';
import { ServerData } from './models/server-data.model';

@Injectable()
export class AppService {

	constructor(private rs: RequestService, private config: ConfigService) {
	}

	/**
	 * 检测服务器最新的APP版本号
	 * @returns {Observable<ServerData>}
	 */
	checkLatestVersion(): Observable<ServerData> {
		return this.rs.post(this.config.checkNewAppUrl, null, false);
	}
}
