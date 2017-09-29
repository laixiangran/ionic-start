/**
 * Created by laixiangran on 2017/7/16.
 * homepage：http://www.laixiangran.cn.
 * 发送的消息对象
 */
export class SendMessage {
	/**
	 * 消息内容
	 */
	info: string;

	/**
	 * 发送人员
	 */
	recipients: string[];

	/**
	 * 消息类型
	 */
	type: number = 0;
}

