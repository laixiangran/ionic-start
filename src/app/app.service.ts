/**
 * Created by laixiangran on 2017/5/20.
 * homepage：http://www.laixiangran.cn
 */

import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { RequestService } from "./services/request.service";
import { ServerData } from "./models/server-data";

@Injectable()
export class AppService {

	constructor(private rs: RequestService) {
	}

	/**
	 * 检测服务器最新的APP版本号
	 *
	 * @returns {Observable<ServerData>}
	 *
	 * @memberof LoginService
	 */
	checkLatestVersion(): Observable<ServerData> {
		return new Observable<ServerData>((subscriber: Subscriber<ServerData>) => {
			subscriber.next(new ServerData('检查成功！', 'ok', '1.0.0'));
			subscriber.complete();
		});
		// return this.rs.post("appVersionAction/getLatestVersion", null, false);
	}
}