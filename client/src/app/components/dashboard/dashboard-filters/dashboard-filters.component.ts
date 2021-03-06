import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as api from '@app/api/_index';
import * as interfaces from '@app/interfaces/_index';
import * as selectors from '@app/store-selectors/_index';
import * as services from '@app/services/_index';
import * as uuid from 'uuid';

@Component({
  moduleId: module.id,
  selector: 'm-dashboard-filters',
  templateUrl: 'dashboard-filters.component.html'
})
export class DashboardFiltersComponent {
  dashboard: api.Dashboard;
  dashboard$ = this.store
    .select(selectors.getSelectedProjectModeRepoDashboard)
    .pipe(tap(x => (this.dashboard = x)));

  dashboardFields: api.DashboardField[] = [];
  dashboardFields$ = this.store
    .select(selectors.getSelectedProjectModeRepoDashboardFields)
    .pipe(
      filter(v => !!v),
      tap(x => {
        this.dashboardFields = JSON.parse(JSON.stringify(x));
        this.cdRef.detectChanges();
      })
    );

  constructor(
    private store: Store<interfaces.AppState>,
    private cdRef: ChangeDetectorRef,
    private structService: services.StructService,
    private navigateService: services.NavigateService
  ) {}

  deleteFraction(
    dashboardField: api.DashboardField,
    dashboardFieldIndex: number,
    fractionIndex: number
  ) {
    if (dashboardField.fractions.length === 1) {
      // do nothing
    } else {
      // should remove fraction
      let fractions = dashboardField.fractions;

      let newFractions = [
        ...fractions.slice(0, fractionIndex),
        ...fractions.slice(fractionIndex + 1)
      ];

      let newDashboardField = Object.assign({}, dashboardField, {
        fractions: newFractions
      });

      let newDashboardFields = [
        ...this.dashboardFields.slice(0, dashboardFieldIndex),
        newDashboardField,
        ...this.dashboardFields.slice(dashboardFieldIndex + 1)
      ];

      let newDashboardId = uuid.v4();

      this.createDashboard(newDashboardId, newDashboardFields);
      this.navigateNewDashboardId(newDashboardId);
    }
  }

  addFraction(dashboardField: api.DashboardField, dashboardFieldIndex: number) {
    let fractions = dashboardField.fractions;

    let fraction = this.structService.generateEmptyFraction();

    let newFractions = [...fractions, fraction];

    let newDashboardField = Object.assign({}, dashboardField, {
      fractions: newFractions
    });

    let newDashboardFields = [
      ...this.dashboardFields.slice(0, dashboardFieldIndex),
      newDashboardField,
      ...this.dashboardFields.slice(dashboardFieldIndex + 1)
    ];

    let newDashboardId = uuid.v4();

    this.createDashboard(newDashboardId, newDashboardFields);
    this.navigateNewDashboardId(newDashboardId);
  }

  updateFraction(
    dashboardField: api.DashboardField,
    dashboardFieldIndex: number,
    event: interfaces.FractionUpdate
  ) {
    let fractions = dashboardField.fractions;

    let newFractions = [
      ...fractions.slice(0, event.fractionIndex),
      event.fraction,
      ...fractions.slice(event.fractionIndex + 1)
    ];

    let newDashboardField = Object.assign({}, dashboardField, {
      fractions: newFractions
    });

    let newDashboardFields = [
      ...this.dashboardFields.slice(0, dashboardFieldIndex),
      newDashboardField,
      ...this.dashboardFields.slice(dashboardFieldIndex + 1)
    ];

    let newDashboardId = uuid.v4();

    this.createDashboard(newDashboardId, newDashboardFields);
    this.navigateNewDashboardId(newDashboardId);
  }

  createDashboard(
    newDashboardId: string,
    newDashboardFields: api.DashboardField[]
  ) {
    this.store.dispatch(
      new actions.CreateDashboardAction({
        project_id: this.dashboard.project_id,
        repo_id: this.dashboard.repo_id,
        old_dashboard_id: this.dashboard.dashboard_id,
        new_dashboard_id: newDashboardId,
        new_dashboard_fields: newDashboardFields
      })
    );
  }

  navigateNewDashboardId(newDashboardId: string) {
    this.store
      .select(selectors.getDashboardsState)
      .pipe(
        map(dashboards =>
          dashboards.findIndex(
            dashboard => dashboard.dashboard_id === newDashboardId
          )
        ),
        filter(index => index > -1),
        take(1)
      )
      .subscribe(() => this.navigateService.navigateDashboard(newDashboardId));
  }
}
