/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {EssenceNg2AMapComponent} from "./essence-ng2-amap.component";
import {TransformService} from "./transform.service";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        EssenceNg2AMapComponent
    ],
    entryComponents: [
        EssenceNg2AMapComponent
    ],
    exports: [
        EssenceNg2AMapComponent
    ],
	providers: [
		TransformService
	]
})
export class EssenceNg2AMapModule {
}
