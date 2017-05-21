import { Component } from '@angular/core';

import { NativePage } from "../native/native";
import { MapPage } from "../map/map";
import { StatisticPage } from '../statistic/statistic';
import { RulesPage } from "../rules/rules";
import { ToolsPage } from "../tools/tools";
import { StatusBar } from "@ionic-native/status-bar";
import { ConfigService } from "../../services/config.service";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root: any = NativePage;
    tab2Root: any = MapPage;
    tab3Root: any = StatisticPage;
    tab4Root: any = RulesPage;
    tab5Root: any = ToolsPage;

    constructor(
        private statusBar: StatusBar,
        private config: ConfigService) {}

    ionViewDidEnter() {
        this.statusBar.backgroundColorByHexString(this.config.mainStatusBarColor);
    }
}
