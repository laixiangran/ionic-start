/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {EssenceIonAMapComponent} from "./essence-ion-amap.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        EssenceIonAMapComponent
    ],
    entryComponents: [
        EssenceIonAMapComponent
    ],
    exports: [
        EssenceIonAMapComponent
    ]
})
export class EssenceIonAMapModule {
}
