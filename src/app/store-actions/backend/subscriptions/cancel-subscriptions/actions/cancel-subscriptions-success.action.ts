import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store-actions/action-types';

export class CancelSubscriptionsSuccessAction implements Action {
  readonly type = actionTypes.CANCEL_SUBSCRIPTIONS_SUCCESS;

  constructor(
    public payload: api.CancelSubscriptionsResponse200Body['payload']
  ) {}
}