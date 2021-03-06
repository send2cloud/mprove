import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as configs from '@app/configs/_index';
import * as interfaces from '@app/interfaces/_index';
import * as selectors from '@app/store-selectors/_index';

@Component({
  moduleId: module.id,
  selector: 'm-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  dynamicAssetsBaseUrl: string = configs.pathConfig.dynamicAssetsBaseUrl;
  staticAssetsBaseUrl: string = configs.pathConfig.staticAssetsBaseUrl;

  userFirstName$ = this.store
    .select(selectors.getUserFirstName)
    .pipe(filter(v => !!v));

  userLastName$ = this.store
    .select(selectors.getUserLastName)
    .pipe(filter(v => !!v));

  userPictureUrlBig$ = this.store
    .select(selectors.getUserPictureUrlBig)
    .pipe(filter(v => !!v));

  constructor(
    private store: Store<interfaces.AppState>,
    @Inject(configs.APP_CONFIG) public appConfig: interfaces.AppConfig,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl(
        this.staticAssetsBaseUrl + '/assets/app/icons/logout.svg'
      )
    );
  }

  logout() {
    this.store.dispatch(new actions.LogoutUserAction({ empty: true }));
  }
}
