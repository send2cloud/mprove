import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as actionTypes from '@app/store-actions/action-types';
import * as services from '@app/services/_index';

@Injectable()
export class RegenerateRepoRemotePublicKeyEffect {
  @Effect() regenerateRepoRemotePublicKey$: Observable<
    Action
  > = this.actions$.pipe(
    ofType(actionTypes.REGENERATE_REPO_REMOTE_PUBLIC_KEY),
    mergeMap((action: actions.RegenerateRepoRemotePublicKeyAction) =>
      this.backendService.regenerateRepoRemotePublicKey(action.payload).pipe(
        map(
          body =>
            new actions.RegenerateRepoRemotePublicKeySuccessAction(body.payload)
        ),
        catchError(e =>
          of(new actions.RegenerateRepoRemotePublicKeyFailAction({ error: e }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: services.BackendService
  ) {}
}
