import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ClipboardModule } from 'ngx-clipboard';
import * as Raven from 'raven-js';
import { APP_DIALOGS } from '@app/app-dialogs';
import { APP_EFFECTS } from '@app/app-effects';
import { APP_META_REDUCERS_ARRAY } from '@app/app-meta-reducers-array';
import { APP_PROVIDERS } from '@app/app-providers';
import { APP_REDUCERS_OBJECT } from '@app/app-reducers-object';
import { APP_ROUTES } from '@app/app-routes';
import { AppComponent } from '@app/app.component';
import * as helper from '@app/helper/_index';
import { MyCovalentModule } from '@app/modules/my-covalent.module';
import { MyMaterialModule } from '@app/modules/my-material.module';
import { SharedModule } from '@app/modules/shared.module';
import { SpaceModule } from '@app/modules/space.module';
import { ValidationMsgModule } from '@app/modules/validation-msg.module';
import { environment } from '@env/environment';

// let options2 = { 'release': 'a2.1.0', 'autoBreadcrumbs': { 'xhr': false } };
// Raven
//   .config('https://dce19ce2043947e4943a09a2255336d8@sentry.io/121453', options2)
//   .install();
if (environment.canUseRaven === true) {
  Raven.config(
    'https://3f5855e2b10b4c4c8b786ff69c1fe3a6@sentry.io/1208233'
  ).install();
}

@NgModule({
  declarations: [AppComponent, ...APP_DIALOGS],
  entryComponents: [...APP_DIALOGS],
  imports: [
    EffectsModule.forRoot(APP_EFFECTS),
    MyMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    SpaceModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        authScheme: 'Bearer ',
        tokenGetter: helper.getToken, // for jwtInterceptor
        whitelistedDomains: [
          'localhost',
          'localhost:4200',
          'localhost:8080',
          'test.mprove.io',
          'stage.mprove.io',
          'mprove.io'
        ]
      }
    }),
    MyCovalentModule,
    ClipboardModule,
    ValidationMsgModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    StoreModule.forRoot(APP_REDUCERS_OBJECT, {
      metaReducers: APP_META_REDUCERS_ARRAY
    }),
    RouterModule.forRoot(APP_ROUTES, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    })
  ],
  bootstrap: [AppComponent],
  providers: [...APP_PROVIDERS],
  exports: [AppComponent]
})
export class AppModule {}