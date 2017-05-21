import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from "@ionic-native/app-version";
import { BackgroundMode } from '@ionic-native/background-mode';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BatteryStatus } from '@ionic-native/battery-status';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Transfer } from "@ionic-native/transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import { VideoPlayer } from "@ionic-native/video-player";

import { AppComponent } from './app.component';

// page
import { LoginPage } from "./pages/login/login";
import { TabsPage } from './pages/tabs/tabs';
import { NativePage } from "./pages/native/native";
import { MapPage } from "./pages/map/map";
import { StatisticPage } from './pages/statistic/statistic';
import { RulesPage } from "./pages/rules/rules";
import { SettingsPage } from './pages/settings/settings';

import { AuthService } from "./services/auth.service";
import { RequestService } from "./services/request.service";
import { ConfigService } from "./services/config.service";
import { EssenceNg2AMapModule } from "./components/essence-ng2-amap/essence-ng2-amap.module";
import { EssenceNg2ChartModule } from "essence-ng2-chart";
import { TipsService } from "./services/tips.service";
import { LoginService } from "./pages/login/login.service";
import { ToolsPage } from "./pages/tools/tools";
import { RealTimeTrafficPage } from "./pages/tools/subpages/realTimeTraffic/realTimeTraffic";
import { WeatherReportPage } from "./pages/tools/subpages/weatherReport/weatherReport";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(AppComponent, {
            mode: 'ios',
            iconMode: 'ios',
            backButtonText: '返回',
            tabsHideOnSubPages: 'true',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',
            pageTransition: 'ios'
        }),
        IonicStorageModule.forRoot(),
        EssenceNg2ChartModule,
        EssenceNg2AMapModule
    ],
    declarations: [
        AppComponent,
        LoginPage,
        TabsPage,
        NativePage,
        MapPage,
        StatisticPage,
        RulesPage,
        SettingsPage,
        ToolsPage,
        RealTimeTrafficPage,
        WeatherReportPage
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        LoginPage,
        TabsPage,
        NativePage,
        MapPage,
        StatisticPage,
        RulesPage,
        SettingsPage,
        ToolsPage,
        RealTimeTrafficPage,
        WeatherReportPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ConfigService,
        AuthService,
        TipsService,
        LoginService,
        RequestService,
        AppVersion,
        BackgroundMode,
        BarcodeScanner,
        BatteryStatus,
        Network,
        StatusBar,
        SplashScreen,
        Transfer,
        FileOpener,
        File,
        VideoPlayer
    ]
})
export class AppModule {
}
