import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app.module';

window.hasOwnProperty('cordova') && enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
