import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {Router, TitleStrategy} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {TasksModule} from './tasks/tasks.module';
import {SpinnerComponent} from './widgets';
import {PageTitleStrategy} from './core';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './core/interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, // import HttpClientModule after BrowserModule
    HttpClientModule,
    FormsModule,
    LayoutModule,
    TasksModule,
    SpinnerComponent,
    // MUST BE LAST
    AppRoutingModule,
  ],
  providers: [{provide: TitleStrategy, useClass: PageTitleStrategy}, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
