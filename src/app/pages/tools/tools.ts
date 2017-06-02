import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { WeatherReportPage } from "./subpages/weatherReport/weatherReport";
import { RealTimeTrafficPage } from "./subpages/realTimeTraffic/realTimeTraffic";
import { SignaturePad } from "angular2-signaturepad/signature-pad";

@Component({
    selector: 'page-tools',
    templateUrl: 'tools.html'
})
export class ToolsPage implements OnInit {
    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    @ViewChild('signaturePadDiv') signaturePadDiv: HTMLDivElement;

    // videoUrl: string = 'http://www.laixiangran.cn/CDN/custom/video/test.mp4';
    videoUrl: string = 'assets/videos/test.mp4';

    signaturePadOptions: Object;

    constructor(public navCtrl: NavController) {}

    ngOnInit() {
        this.signaturePadOptions = {
            canvasWidth: this.signaturePadDiv.offsetWidth,
            canvasHeight: 200
        };
    }

    items = [
        {
            name: "天气预报",
            icon: "partly-sunny",
            color: "#EA5854",
            component: WeatherReportPage
        },
        {
            name: "实时交通",
            icon: "subway",
            color: "#FC9300",
            component: RealTimeTrafficPage
        }
    ];

    itemSelected(item: any) {
        this.navCtrl.push(item.component);
    }

    videoViewerReady($event: any) {
        console.log($event);
    }

    drawComplete() {
        console.log(this.signaturePad.toDataURL());
    }

    drawStart() {
        console.log('begin drawing');
    }
}
