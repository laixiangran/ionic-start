/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 * 登录服务
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../../../services/request.service';
import { SendMessage } from '../../../../models/send-message.model';
import { ServerData } from '../../../../models/server-data.model';

@Injectable()
export class InstantCommService {

	constructor(private rs: RequestService) {
	}

	/**
	 * 查询交流人员
	 * @param {boolean} showLoader 是否显示加载动画
	 * @returns {Observable<ServerData>}
	 */
	queryRecentTalkUsers(showLoader: boolean): Observable<ServerData> {
		return this.rs.post('MessageController/queryRecentTalkUsers', null, showLoader);
	}

	/**
	 * 获取交流内容
	 * @param {string} userId 用户id
	 * @param {boolean} showLoader 是否显示加载动画
	 * @returns {Observable<ServerData>}
	 */
	queryRecentTalkContent(userId: string, showLoader: boolean): Observable<ServerData> {
		return this.rs.post('MessageController/queryRecentTalkContent', {'userId': userId}, showLoader);
	}

	/**
	 * 添加交流人
	 * @param {string} talkUserid 交流人员id
	 * @returns {Observable<ServerData>}
	 */
	addSysMessageTalk(talkUserid: string): Observable<ServerData> {
		return this.rs.post('SysMessageTalkAction/addSysMessageTalk', {'talkUserid': talkUserid}, false);
	}

	/**
	 * 删除交流人
	 * @param {string} talkUserid 交流人员id
	 * @returns {Observable<ServerData>}
	 */
	deleteSysMessageTalk(talkUserid: string): Observable<ServerData> {
		return this.rs.post('SysMessageTalkAction/deleteSysMessageTalk', {'talkUserid': talkUserid});
	}

	/**
	 * 发送消息
	 * @param {SendMessage} message 发送的消息对象
	 * @returns {Observable<ServerData>}
	 */
	sendMessage(message: SendMessage): Observable<ServerData> {
		return this.rs.post('MessageController/sendMessage', message, false);
	}

	/**
	 * 查询联系人
	 * @param {string} condition 查询关键字
	 * @returns {Observable<ServerData>}
	 */
	queryUsers(condition: string = ''): Observable<ServerData> {
		return this.rs.post('SysUserAction/queryUserByCondition', {'condition': condition});
	}
}
