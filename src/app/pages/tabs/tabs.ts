import {Component, OnInit} from '@angular/core';

import {NativePage} from "../native/native";
import {MapPage} from "../map/map";
import {StatisticPage} from '../statistic/statistic';
import {RulesPage} from "../rules/rules";

@Component({
	selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
	tab1Root: any = NativePage;
	tab2Root: any = MapPage;
    tab3Root: any = StatisticPage;
    tab4Root: any = RulesPage;

    constructor () {}

	ngOnInit () {}
}
