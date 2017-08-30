import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";
import {FormsModule} from "@angular/forms";
import * as moment from "moment";
import {TestComponent} from "./test.component";
import {DatepickerConfig} from "../../src/datepicker/config.server";


@NgModule({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        GlowwormModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private config: DatepickerConfig) {
        const format = config.locale.format, timePickerIncrement = this.config.timePickerIncrement;
        const today_s = moment(moment().format('YYYY-MM-DD')).format(format),
            today_e = moment(today_s).add(1, 'days').subtract(timePickerIncrement, 's').format(format),
            yesterday_s = moment(moment().format('YYYY-MM-DD')).subtract(1, 'days').format(format),
            yesterday_e = moment(yesterday_s).add(1, 'days').subtract(timePickerIncrement, 's').format(format),
            week_s = moment(today_s).subtract(moment().isoWeekday() - 1, 'days').format(format),
            week_e = moment(week_s).add(7, 'days').subtract(timePickerIncrement, 's').format(format),
            lastWeek_s = moment(week_s).subtract(7, 'days').format(format),
            lastWeek_e = moment(week_e).subtract(7, 'days').format(format),
            month_s = moment(moment().format('YYYY-MM-DD')).subtract(moment().date() - 1, 'days').format(format),
            month_e = moment(month_s).add(1, 'month').subtract(timePickerIncrement, 's').format(format),
            lastMonth_s = moment(month_s).subtract(1, 'month').format(format),
            lastMonth_e = moment(month_e).subtract(1, 'month').format(format);
        Object.assign(
            config,
            {
                opens: 'center',
                singleDatePicker: false,
                jqueryPath: '/assets/jquery.min.js',
                momentPath: '/assets/datepicker/moment.min.js',
                datepickerPath: '/assets/datepicker/daterangepicker.js',
                startDate: today_s,
                endDate: today_e,
                ranges: {
                    //今天、昨天  本周、上周 本月、上月
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
