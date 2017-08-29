/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录服务
 */

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../../../services/request.service';
import { ServerData } from '../../../../models/server-data';
import { SendMessage } from '../../../../models/send-message.model';

@Injectable()
export class InstantCommService {

	constructor(private rs: RequestService) {
	}

	/**
	 * 查询交流人员
	 * @returns {Observable<any>}
	 */
	queryRecentTalkUsers(showLoader: boolean): Observable<ServerData> {
		return this.rs.post('MessageController/queryRecentTalkUsers', null, showLoader);
	}

	/**
	 * 获取交流内容
	 * @param userId
	 * @returns {Observable<any>}
	 */
	queryRecentTalkContent(userId: string, showLoader: boolean): Observable<ServerData> {
		return this.rs.post('MessageController/queryRecentTalkContent', {'userId': userId}, showLoader);
	}

	/**
	 * 添加交流人
	 * @param talkUserid
	 * @returns {Observable<any>}
	 */
	addSysMessageTalk(talkUserid: string): Observable<ServerData> {
		return this.rs.post('SysMessageTalkAction/addSysMessageTalk', {'talkUserid': talkUserid}, false);
	}

	/**
	 * 删除交流人
	 * @param talkUserid
	 * @returns {Observable<any>}
	 */
	deleteSysMessageTalk(talkUserid: string): Observable<ServerData> {
		return this.rs.post('SysMessageTalkAction/deleteSysMessageTalk', {'talkUserid': talkUserid});
	}

	/**
	 * 发送消息
	 * @param message
	 * @returns {Observable<any>}
	 */
	sendMessage(message: SendMessage): Observable<ServerData> {
		return this.rs.post('MessageController/sendMessage', message, false);
	}

	/**
	 * 查询联系人
	 * @param condition
	 * @returns {Observable<any>}
	 */
	queryUsers(condition: string = ''): Observable<ServerData> {
		return this.rs.post('SysUserAction/queryUserByCondition', {'condition': condition});
	}
}
