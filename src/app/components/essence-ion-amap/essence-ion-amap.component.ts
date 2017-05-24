/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 高德地图组件类
 */

import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild, ElementRef } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

import { EssenceIonAMapTransformService } from "./essence-ion-amap-transform.service";

@Component({
    selector: "essence-ion-amap",
    templateUrl: "essence-ion-amap.component.html",
    providers: [EssenceIonAMapTransformService]
})
export class EssenceIonAMapComponent implements OnInit, OnDestroy {
    private map: any;
    private convertAPI = "http://restapi.amap.com/v3/assistant/coordinate/convert?key=0df36377c23e75585d4ed4fcb4baf807";
    private tempLocation: any = null;
    private locationMarker: any;
    private locationZoom: number = 16;
    private isStartLocation: boolean = false;
    private trafficTileLayer: any;
    private isShowTraffic: boolean = false;
    initZoom: number;
    initCenter: any;
    vertrefresh: number = 10;

    @ViewChild("amap") elRef: ElementRef;
    @Input() options: any;
    @Input() showCurrentLocation: boolean = false;
    @Input() showLocationMarker: boolean = true;
    @Input() set showTraffic(value: boolean) {
        this.isShowTraffic = value;
        if (value) {
            this.trafficTileLayer && this.trafficTileLayer.show();
        } else {
            this.trafficTileLayer && this.trafficTileLayer.hide();
        }
    };
    @Output() ready: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() destroy: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() location: EventEmitter<any> = new EventEmitter<any>(false);

    constructor(
        private http: Http,
        private transformService: EssenceIonAMapTransformService) {

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
            this.trafficTileLayer = new AMap.TileLayer.Traffic({
                map: this.map,
                autoRefresh: true,
                interval: this.vertrefresh
            });
            if (this.isShowTraffic) {
                this.trafficTileLayer.show();
            } else {
                this.trafficTileLayer.hide();
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
     * 设置地图范围
     * 
     * @param {number[]} southWest 
     * @param {number[]} northEast 
     * 
     * @memberof EssenceNg2AMapComponent
     */
    setBounds(southWest: number[], northEast: number[]) {
        let bounds: any = new AMap.Bounds(southWest, northEast)
        this.map.setBounds(bounds);
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

    creatPixel(x: Number, y: Number): any {
        return new AMap.Pixel(x, y);
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
            this.getCurrentPosition().then(() => {
                this.isStartLocation = false;
            });
        }
    }

    getCurrentPosition(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let options: PositionOptions = {
                enableHighAccuracy: true,  // 是否使用 GPS
                maximumAge: 30000,         // 缓存时间
                timeout: 27000            // 超时时间
            };
            navigator.geolocation.getCurrentPosition((position: Position) => {
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
                    this.location.emit({
                        code: 'ok',
                        info: '定位成功',
                        result: this.tempLocation
                    });
                    resolve();
                });
            }, (error: PositionError) => {
                this.location.emit({
                    code: 'error',
                    info: '定位失败',
                    result: error
                });
                reject();
            }, options);
        });
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
        return this.http.get(url, opts).map((res: Response) => {
            return res.json()
        }).catch((error: Response) => {
            return Observable.throw(error.json().error || "Server Error");
        });
    }
}




