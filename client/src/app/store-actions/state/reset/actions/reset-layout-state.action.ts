import { Action } from '@ngrx/store';
import * as actionTypes from '@app/store-actions/action-types';

export class ResetLayoutStateAction implements Action {
  readonly type = actionTypes.RESET_LAYOUT_STATE;

  constructor() {}
}
