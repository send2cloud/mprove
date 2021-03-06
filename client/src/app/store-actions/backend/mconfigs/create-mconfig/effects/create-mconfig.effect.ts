import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as actionTypes from '@app/store-actions/action-types';
import * as services from '@app/services/_index';

@Injectable()
export class CreateMconfigEffect {
  @Effect() createMconfig$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.CREATE_MCONFIG),
    mergeMap((action: actions.CreateMconfigAction) =>
      this.backendService.createMconfig(action.payload.api_payload).pipe(
        map(
          body =>
            new actions.CreateMconfigSuccessAction({
              api_payload: body.payload,
              navigate: action.payload.navigate
            })
        ),
        catchError(e => of(new actions.CreateMconfigFailAction({ error: e })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: services.BackendService
  ) {}
}
