import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as actionTypes from '@app/store-actions/action-types';
import * as api from '@app/api/_index';
import * as services from '@app/services/_index';
import * as helper from '@app/helper/_index';

@Injectable()
export class ResetUserPasswordFailEffect {
  @Effect() resetUserPasswordFail$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.RESET_USER_PASSWORD_FAIL),
    mergeMap((action: actions.ResetUserPasswordFailAction) => {
      let status = helper.getResponseBodyInfoStatus(action.payload.error);
      if (
        status &&
        [
          api.ServerResponseStatusEnum.RESET_PASSWORD_ERROR_USER_DOES_NOT_EXIST
        ].indexOf(status) > -1
      ) {
        this.myDialogService.showInfoDialog(status);

        return of({ type: 'EMPTY ACTION' });
      } else {
        return of(
          new actions.BackendFailAction({ error: action.payload.error })
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private myDialogService: services.MyDialogService
  ) {}
}
