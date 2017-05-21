/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { EssenceIonVideoplayerComponent } from "./essence-ion-videoplayer.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        EssenceIonVideoplayerComponent
    ],
    entryComponents: [
        EssenceIonVideoplayerComponent
    ],
    exports: [
        EssenceIonVideoplayerComponent
    ]
})
export class EssenceIonVideoplayerModule {
}
