/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 高德地图组件类
 */

import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild, ElementRef } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Geolocation, Geoposition } from 'ionic-native';
import { Observable } from "rxjs";

import { TransformService } from "./transform.service";

@Component({
    selector: "essence-ng2-amap",
    templateUrl: "essence-ng2-amap.component.html"
})
export class EssenceNg2AMapComponent implements OnInit, OnDestroy {
    private map: any;
    private convertAPI = "http://restapi.amap.com/v3/assistant/coordinate/convert?key=0df36377c23e75585d4ed4fcb4baf807";
    private tempLocation: any = null;
    private locationMarker: any;
    private locationZoom: number = 16;
    private isStartLocation: boolean = false;

    public initZoom: number;
    public initCenter: any;
    @ViewChild("amap") elRef: ElementRef;
    @Input() options: any;
    @Input() showCurrentLocation: boolean = false;
    @Input() showLocationMarker: boolean = true;
    @Input() showTraffic: boolean = false;
    @Output() ready: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() destroy: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() location: EventEmitter<any> = new EventEmitter<any>(false);

    constructor(
        private http: Http,
        private transformService: TransformService) {

    }

    ngOnInit() {
        this.initMap();
    }

    ngOnDestroy() {
        this.map && this.map.destroy();
        this.destroy.emit('amap is destroy!');
    }

	/**
	 * 初始化地图
	 */
    initMap() {
        if (window['AMap']) {
            this.map = new AMap.Map(this.elRef.nativeElement, this.options);
            if (this.showTraffic) {
                new AMap.TileLayer.Traffic({
                    map: this.map,
                    interval: 60
                });
            }
            this.showCurrentLocation && this.currentLocation();
            this.initZoom = this.map.getZoom();
            this.initCenter = this.map.getCenter();
            this.map.on("complete", () => {
                this.ready.emit(this);
            });
        }
    }

    /**
     * 设置地图中心
     * @param position
     */
    setCenter(position: number[]) {
        this.map.setZoomAndCenter(this.initZoom, position);
        this.initZoom = this.map.getZoom();
        this.initCenter = this.map.getCenter();
    }

    /**
     * 创建覆盖物
     * @param markerOptions
     * @returns {AMap.Marker}
     */
    createMarker(markerOptions: any): any {
        return new AMap.Marker(markerOptions);
    }

	/**
	 * 创建点标记的图标
	 * @param iconOptions
	 * @returns {AMap.Icon}
	 */
    creatIcon(iconOptions: any): any {
        return new AMap.Icon(iconOptions);
    }

	/**
	 * 创建地物对象的像素尺寸
	 * @param width
	 * @param height
	 * @returns {AMap.Size}
	 */
    creatSize(width: number, height: number): any {
        return new AMap.Size(width, height);
    }

    /**
     * 获取地图对象
     * @returns {any}
     */
    getMap() {
        return this.map;
    }

    /**
     * GPS或者百度坐标转为高德坐标
     * @param coordArr [{x: number, y: number}]
     * @param coordsys 'gps' or 'baidu'
     * @returns {Observable<any>}
     */
    fromGPSOrBAIDU(coordArr: Array<Object>, coordsys: string = "gps"): Observable<any> {
        let url = this.convertAPI + "&coordsys=" + coordsys + "&locations=";
        url += this.coordArrToString(coordArr);
        return this.getCoord(url);
    }

	/**
	 * 设置为初始范围
	 */
    fullMap() {
        this.initParams();
        this.map.setZoomAndCenter(this.initZoom, this.initCenter);
    }

	/**
	 * 根据是否存在this.locationMarker进行初始化参数
	 * @returns {boolean}
	 */
    initParams(): boolean {
        if (this.locationMarker) {
            this.map.remove([this.locationMarker]);
            this.locationMarker = null;
            this.tempLocation = null;
            this.location.emit({
                code: 'cancle',
                info: '取消定位',
                result: this.tempLocation
            });
            return false;
        } else {
            return true;
        }
    }

    /**
     * 定位
     */
    currentLocation(): void {
        if (this.initParams()) {
            this.isStartLocation = true;
            Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position: Geoposition) => {
                let currLocation: any = this.transformService.gcj2wgs(position.coords.latitude, position.coords.longitude);
                this.tempLocation = {
                    x: currLocation.lng,
                    y: currLocation.lat
                };
                this.fromGPSOrBAIDU([this.tempLocation]).subscribe((data: any) => {
                    let aPosition: any[] = data.locations.split(",");
                    this.map.setZoomAndCenter(this.locationZoom, aPosition);
                    if (this.showLocationMarker) {
                        this.locationMarker = this.createMarker({
                            icon: this.creatIcon({
                                image: './assets/img/map/loc.png'
                            }),
                            position: aPosition
                        });
                        this.locationMarker.setMap(this.map);
                    }
                    this.isStartLocation = false;
                    this.location.emit({
                        code: 'ok',
                        info: '定位成功',
                        result: this.tempLocation
                    });
                });
            }).catch((error: any) => {
                this.isStartLocation = false;
                this.location.emit({
                    code: 'error',
                    info: '定位失败',
                    result: error
                });
            });
        }
    }

	/**
	 * 坐标数组转换成字符串
	 * @param coordArr
	 * @returns {string}
	 */
    private coordArrToString(coordArr: Array<Object>): string {
        let coordStr = "";
        coordArr.forEach((coord: any, index: number) => {
            coordStr += (coord.POINT_X || coord.x) + "," + (coord.POINT_Y || coord.y) + ";";
        });
        return coordStr;
    }

	/**
	 * 获取转换结果
	 * @param url
	 * @returns {Observable<R>}
	 */
    private getCoord(url: string): Observable<any> {
        let headers: Headers = new Headers();
        const opts: RequestOptions = new RequestOptions();
        headers.append("Content-Type", "application/json");
        opts.headers = headers;
        return this.http.get(url, opts).map(
            (res: Response) => res.json()
        ).catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        return Observable.throw(error.json().error || "Server Error");
    }
}




