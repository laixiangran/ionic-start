import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { MapPage } from './pages/map/map';
import { StatisticPage } from './pages/statistic/statistic';
import { RulesPage } from './pages/rules/rules';
import { SettingsPage } from './pages/settings/settings';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { ConfigService } from './services/config.service';
import { TipsService } from './services/tips.service';
import { LoginService } from './pages/login/login.service';
import { ToolsPage } from './pages/tools/tools';
import { RealTimeTrafficPage } from './pages/tools/subpages/realTimeTraffic/realTimeTraffic';
import { WeatherReportPage } from './pages/tools/subpages/weatherReport/weatherReport';
import { TransformService } from './services/transform.service';
import { EssenceIonicModule } from 'essence-ionic';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IsDebug } from '@ionic-native/is-debug';
import { SatelliteCloudPage } from './pages/tools/subpages/satelliteCloud/satellite-cloud';
import { RadarMapPage } from './pages/tools/subpages/radarMap/radar-map';
import { DateTimeService } from './services/datetime.service';
import { FilePathService } from './services/filepath.service';
import { InstantCommPage } from './pages/tools/subpages/instantComm/instant-comm';
import { MessagePage } from './pages/tools/subpages/instantComm/subpages/message/message';
import { PersonPage } from './pages/tools/subpages/instantComm/subpages/person/person';
import { ContactPage } from './pages/tools/subpages/instantComm/subpages/contact/contact';
import { InstantCommService } from './pages/tools/subpages/instantComm/instant-comm.service';
import { NativePage } from './pages/native/native';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BatteryStatus } from '@ionic-native/battery-status';
import { VideoPlayer } from '@ionic-native/video-player';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { ENgxChartModule } from 'e-ngx-chart';
import { FileDemoPage } from './pages/native/subpages/file-demo/file-demo';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
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
		ENgxChartModule,
		EssenceIonicModule
	],
	declarations: [
		AppComponent,
		LoginPage,
		TabsPage,
		MapPage,
		StatisticPage,
		RulesPage,
		SettingsPage,
		ToolsPage,
		NativePage,
		FileDemoPage,
		RealTimeTrafficPage,
		WeatherReportPage,
		SatelliteCloudPage,
		RadarMapPage,
		InstantCommPage,
		MessagePage,
		PersonPage,
		ContactPage
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AppComponent,
		LoginPage,
		TabsPage,
		MapPage,
		StatisticPage,
		RulesPage,
		SettingsPage,
		ToolsPage,
		NativePage,
		FileDemoPage,
		RealTimeTrafficPage,
		WeatherReportPage,
		SatelliteCloudPage,
		RadarMapPage,
		InstantCommPage,
		MessagePage,
		PersonPage,
		ContactPage
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ConfigService,
		AuthService,
		TipsService,
		LoginService,
		RequestService,
		DateTimeService,
		FilePathService,
		TransformService,
		GeolocationService,
		InstantCommService,
		AppVersion,
		Network,
		StatusBar,
		SplashScreen,
		FileTransfer,
		FileOpener,
		File,
		ScreenOrientation,
		IsDebug,
		BackgroundMode,
		BarcodeScanner,
		BatteryStatus,
		VideoPlayer,
		Camera,
		MediaCapture,
		StreamingMedia,
		NativeGeocoder
	]
})
export class AppModule {
}
