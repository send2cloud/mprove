import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import * as api from '@app/api/_index';
import * as uuid from 'uuid';

@Component({
  moduleId: module.id,
  selector: 'm-chart-heat-map',
  templateUrl: 'chart-heat-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartHeatMapComponent {
  @Input() chart: api.Chart;
  @Input() selectFields: api.ModelField[];

  @Output() partChange = new EventEmitter();

  innerPaddingValid: boolean;
  xAxisLabelValid: boolean;
  yAxisLabelValid: boolean;

  constructor() {}

  emitPartChange(chart) {
    this.chart = chart;

    setTimeout(() => {
      this.partChange.emit({
        is_part_valid:
          this.chart.x_field &&
          this.chart.y_fields.length > 0 &&
          this.innerPaddingValid &&
          this.xAxisLabelValid &&
          this.yAxisLabelValid,
        chart: chart
      });
    }, 0);
  }

  toggleXAxis() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      x_axis: !this.chart.x_axis // !
    });

    this.emitPartChange(chart);
  }

  toggleShowXAxisLabel() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      show_x_axis_label: !this.chart.show_x_axis_label // !
    });

    this.emitPartChange(chart);
  }

  xAxisLabelChange(ev) {
    this.xAxisLabelValid = ev.xAxisLabelValid;
    if (ev.chart) {
      this.emitPartChange(ev.chart);
    }
  }

  toggleYAxis() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      y_axis: !this.chart.y_axis // !
    });

    this.emitPartChange(chart);
  }

  toggleShowYAxisLabel() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      show_y_axis_label: !this.chart.show_y_axis_label // !
    });

    this.emitPartChange(chart);
  }

  yAxisLabelChange(ev) {
    this.yAxisLabelValid = ev.yAxisLabelValid;
    if (ev.chart) {
      this.emitPartChange(ev.chart);
    }
  }

  toggleAnimations() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      animations: !this.chart.animations // !
    });
    this.emitPartChange(chart);
  }

  toggleGradient() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      gradient: !this.chart.gradient // !
    });

    this.emitPartChange(chart);
  }

  toggleLegend() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      legend: !this.chart.legend // !
    });

    this.emitPartChange(chart);
  }

  toggleTooltipDisabled() {
    let chart = Object.assign({}, this.chart, {
      chart_id: uuid.v4(),
      tooltip_disabled: !this.chart.tooltip_disabled // !
    });

    this.emitPartChange(chart);
  }

  innerPaddingChange(ev) {
    this.innerPaddingValid = ev.innerPaddingValid;
    if (ev.chart) {
      this.emitPartChange(ev.chart);
    }
  }
}