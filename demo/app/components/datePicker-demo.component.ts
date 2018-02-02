import {Component} from "@angular/core";
import {ContextMenuService} from "../../../src/context-menu/context-menu.service";
import {DatepickerConfig} from "../../../src/datepicker/config.server";

declare let moment;

@Component({
    selector: 'gwdatePicker-demo',
    template: `
        <gw-datepicker label="最后回复时间" [options]="myOption"></gw-datepicker>
        <div class="row">
            <div class="col-md-4"><input type="text" class="form-control"/></div>
            <div class="col-md-4"><input type="text" class="form-control"/></div>
            <div class="col-md-4">
                <gw-datepicker label="最后回复时间"
                               [gwClass]="'form-control form-control-glowworm'"
                               [closeable]="false"
                               [options]="myOption">
                </gw-datepicker>
            </div>
        </div>
    `
})
export class DatepickerDemoComponent {
    myOption = {
        unDeepCopy: true,
        ranges: { //今天、昨天  本周、上周 本月、上月
            '今天2': [
                '2018-01-15', '2018-01-15'
            ]
        }
    }

    constructor(private contextMenuService: ContextMenuService, private config: DatepickerConfig) {
        console.log(this.contextMenuService);
        this.setDatepickerConfig();
    }

    setDatepickerConfig() {
        const format = this.config.locale.format, timePickerIncrement = this.config.timePickerIncrement;
        const today_s = moment(moment().format('YYYY-MM-DD')).format(format),
            today_e = moment(today_s).add(1, 'days').subtract(timePickerIncrement, 'seconds').format(format),
            yesterday_s = moment(moment().format('YYYY-MM-DD')).subtract(1, 'days').format(format),
            yesterday_e = moment(yesterday_s).add(1, 'days').subtract(timePickerIncrement, 'seconds').format(format),
            week_s = moment(today_s).subtract(moment().isoWeekday() - 1, 'days').format(format),
            week_e = moment(week_s).add(7, 'days').subtract(timePickerIncrement, 'seconds').format(format),
            lastWeek_s = moment(week_s).subtract(7, 'days').format(format),
            lastWeek_e = moment(week_e).subtract(7, 'days').format(format),
            month_s = moment(moment().format('YYYY-MM-DD')).subtract(moment().date() - 1, 'days').format(format),
            month_e = moment(month_s).add(1, 'month').subtract(timePickerIncrement, 'seconds').format(format),
            lastMonth_s = moment(month_s).subtract(1, 'month').format(format),
            lastMonth_e = moment(month_e).subtract(1, 'month').format(format);
        Object.assign(this.config, {
                opens: 'center',
                singleDatePicker: false,
                startDate: today_s,
                endDate: today_e,
                ranges: { //今天、昨天  本周、上周 本月、上月
                    '今天': [
                        today_s, today_e
                    ],
                    '昨天': [
                        yesterday_s, yesterday_e
                    ],
                    '本周': [
                        week_s, week_e
                    ],
                    '上周': [
                        lastWeek_s, lastWeek_e
                    ],
                    '本月': [
                        month_s, month_e
                    ],
                    '上月': [
                        lastMonth_s, lastMonth_e
                    ]
                }
            }
        );
    }

}