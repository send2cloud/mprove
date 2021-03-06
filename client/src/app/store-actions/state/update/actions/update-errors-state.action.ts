import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store-actions/action-types';

export class UpdateErrorsStateAction implements Action {
  readonly type = actionTypes.UPDATE_ERRORS_STATE;

  constructor(public payload: api.SwError[]) {}
}
