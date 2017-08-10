export class Sys {

	constructor() { }

	/**
	 * 时间格式化
	 * @static
	 * @param {*} value
	 * @param {string} fmt
	 * @returns
	 */
	public static dateFormat(value: any, fmt: string): string { // author: meizz
		const date: Date = new Date(value);
		const o = {
			'M+': date.getMonth() + 1, // 月份
			'd+': date.getDate(), // 日
			'h+': date.getHours(), // 小时
			'm+': date.getMinutes(), // 分
			's+': date.getSeconds(), // 秒
			'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
			'S': date.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (const k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
			}
		}
		return fmt;
	}

	/**
	 * 将数字格式化成hh:mm:ss
	 * @static
	 * @param {number} value
	 * @returns
	 */
	public static timeFormat(value: number): string {
		const h: string = parseInt(value / 3600 + '', 10) < 10 ? '0' + parseInt(value / 3600 + '', 10) : '' + parseInt(value / 3600 + '', 10),
			m: string = parseInt(value % 3600 / 60 + '', 10) < 10 ? '0' + parseInt(value % 3600 / 60 + '', 10) : '' + parseInt(value % 3600 / 60 + '', 10);
		let s: string;
		if (value >= 60) {
			s = value % 3600 % 60 < 10 ? '0' + parseInt(value % 3600 % 60 + '', 10) : '' + parseInt(value % 3600 % 60 + '', 10);
		} else if (value < 60 && value >= 10) {
			s = '' + parseInt(value + '', 10);
		} else if (value < 10) {
			s = '0' + parseInt(value + '', 10);
		}
		return `${h}:${m}:${s}`;
	}

	/**
	 * 根据文件路径分析文件名、扩展名、mimeType
	 * @param {string} filePath 文件路径
	 * @returns
	 */
	public static resolveFilePath(filePath: string): any {
		const path: string = filePath,
			pathSplit: string[] = path.split('/'),
			name: string = pathSplit[pathSplit.length - 1],
			extension: string = name.split('.')[name.split('.').length - 1];
		return {
			path: path,
			name: name,
			extension: extension,
			mimeType: Sys.getMimeType(extension)
		};
	}

	/**
	 * 根据扩展名获取mimeType
	 * @param {string} extension 文件扩展名
	 * @returns {string}
	 */
	public static getMimeType(extension: string): string {
		let mimeType: string;
		if (extension.match(/(pdf)$/i)) {
			mimeType = 'application/pdf;';
		} else if (extension.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i)) {
			mimeType = 'video/x-msvideo;video/mpeg;video/x-matroska;video/quicktime;video/mp4;video/3gpp;video/webm;video/x-ms-wmv;';
		} else if (extension.match(/(mp3|wav)$/i)) {
			mimeType = 'audio/mpeg;audio/x-wav;';
		} else if (extension.match(/(png|jpg|jpeg|jpe|gif|bmp|tiff|tif|psd)$/i)) {
			mimeType = 'image/png;image/jpeg;image/bmp;image/tiff;image/vnd.adobe.photoshop;';
		} else if (extension.match(/(ppt|pptx)$/i)) {
			mimeType = 'application/vnd.ms-powerpoint;application/vnd.openxmlformats-officedocument.presentationml.presentation;';
		} else if (extension.match(/(xls|xlsx)$/i)) {
			mimeType = 'application/vnd.ms-excel;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;';
		} else if (extension.match(/(doc|docx)$/i)) {
			mimeType = 'application/msword;application/vnd.openxmlformats-officedocument.wordprocessingml.document;';
		} else if (extension.match(/(txt)$/i)) {
			mimeType = 'text/plain;';
		} else if (extension.match(/(zip|rar|tar|gzip|gz|7z)$/i)) {
			mimeType = 'application/zip;application/x-rar-compressed;application/x-tar;application/x-7z-compressed;';
		} else {
			mimeType = 'application/octet-stream;';
		}
		return mimeType;
	}
}
