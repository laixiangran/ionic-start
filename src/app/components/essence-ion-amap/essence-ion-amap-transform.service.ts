/**
 * Created by laixiangran on 2016/8/7.
 * homepage：http://www.laixiangran.cn
 * Transform coordinate between earth(WGS-84) and mars in china(GCJ-02).
 * earth(WGS-84) 与 china(GCJ-02)互转
 */

import {Injectable} from "@angular/core";

interface location {
	lat: number,
	lng: number
}

@Injectable()
export class EssenceIonAMapTransformService {

	private earthR = 6378137.0;

	constructor () {
	}

	private outOfChina (lat: number, lng: number): boolean {
		if ((lng < 72.004) || (lng > 137.8347)) {
			return true;
		}
		if ((lat < 0.8293) || (lat > 55.8271)) {
			return true;
		}
		return false;
	}

	private transform (x: number, y: number): location {
		let xy = x * y,
			absX = Math.sqrt(Math.abs(x)),
			xPi = x * Math.PI,
			yPi = y * Math.PI,
			d = 20.0 * Math.sin(6.0 * xPi) + 20.0 * Math.sin(2.0 * xPi),
			lat = d,
			lng = d;

		lat += 20.0 * Math.sin(yPi) + 40.0 * Math.sin(yPi / 3.0);
		lng += 20.0 * Math.sin(xPi) + 40.0 * Math.sin(xPi / 3.0);

		lat += 160.0 * Math.sin(yPi / 12.0) + 320 * Math.sin(yPi / 30.0);
		lng += 150.0 * Math.sin(xPi / 12.0) + 300.0 * Math.sin(xPi / 30.0);

		lat *= 2.0 / 3.0;
		lng *= 2.0 / 3.0;

		lat += -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * xy + 0.2 * absX;
		lng += 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * xy + 0.1 * absX;

		return {lat: lat, lng: lng}
	}

	private delta (lat: number, lng: number): location {
		let ee = 0.00669342162296594323,
			d = this.transform(lng - 105.0, lat - 35.0),
			radLat = lat / 180.0 * Math.PI,
			magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		let sqrtMagic = Math.sqrt(magic);
		d.lat = (d.lat * 180.0) / ((this.earthR * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
		d.lng = (d.lng * 180.0) / (this.earthR / sqrtMagic * Math.cos(radLat) * Math.PI);
		return d;
	}

	wgs2gcj (wgsLat: number, wgsLng: number) {
		if (this.outOfChina(wgsLat, wgsLng)) {
			return {lat: wgsLat, lng: wgsLng};
		}
		let d = this.delta(wgsLat, wgsLng);
		return {lat: wgsLat + d.lat, lng: wgsLng + d.lng};
	}

	gcj2wgs (gcjLat: number, gcjLng: number) {
		if (this.outOfChina(gcjLat, gcjLng)) {
			return {lat: gcjLat, lng: gcjLng};
		}
		let d = this.delta(gcjLat, gcjLng);
		return {lat: gcjLat - d.lat, lng: gcjLng - d.lng};
	}

	gcj2wgs_exact (gcjLat: number, gcjLng: number) {
		// newCoord = oldCoord = gcjCoord
		let newLat = gcjLat, newLng = gcjLng,
			oldLat = newLat, oldLng = newLng,
			threshold = 1e-6; // ~0.55 m equator & latitude

		for (let i = 0; i < 30; i++) {
			// oldCoord = newCoord
			oldLat = newLat;
			oldLng = newLng;
			// newCoord = gcjCoord - wgs_to_gcj_delta(newCoord)
			let tmp = this.wgs2gcj(newLat, newLng);
			// approx difference using gcj-space difference
			newLat -= gcjLat - tmp.lat;
			newLng -= gcjLng - tmp.lng;
			// diffchk
			if (Math.max(Math.abs(oldLat - newLat), Math.abs(oldLng - newLng)) < threshold) {
				break;
			}
		}
		return {lat: newLat, lng: newLng};
	}

	distance (latA: number, lngA: number, latB: number, lngB: number) {
		let pi180 = Math.PI / 180,
			arcLatA = latA * pi180,
			arcLatB = latB * pi180,
			x = Math.cos(arcLatA) * Math.cos(arcLatB) * Math.cos((lngA - lngB) * pi180),
			y = Math.sin(arcLatA) * Math.sin(arcLatB),
			s = x + y;

		if (s > 1) {
			s = 1;
		}
		if (s < -1) {
			s = -1;
		}

		let alpha = Math.acos(s),
			distance = alpha * this.earthR;

		return distance;
	}

	gcj2bd (gcjLat: number, gcjLng: number) {
		if (this.outOfChina(gcjLat, gcjLng)) {
			return {lat: gcjLat, lng: gcjLng};
		}

		let x = gcjLng,
			y = gcjLat,
			z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI),
			theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI),
			bdLng = z * Math.cos(theta) + 0.0065,
			bdLat = z * Math.sin(theta) + 0.006;

		return {lat: bdLat, lng: bdLng};
	}

	bd2gcj (bdLat: number, bdLng: number) {
		if (this.outOfChina(bdLat, bdLng)) {
			return {lat: bdLat, lng: bdLng};
		}

		let x = bdLng - 0.0065,
			y = bdLat - 0.006,
			z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI),
			theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI),
			gcjLng = z * Math.cos(theta),
			gcjLat = z * Math.sin(theta);

		return {lat: gcjLat, lng: gcjLng};
	}

	wgs2bd (wgsLat: number, wgsLng: number) {
		let gcj = this.wgs2gcj(wgsLat, wgsLng);
		return this.gcj2bd(gcj.lat, gcj.lng);
	}

	bd2wgs (bdLat: number, bdLng: number) {
		let gcj = this.bd2gcj(bdLat, bdLng);
		return this.gcj2wgs(gcj.lat, gcj.lng);
	}
}
