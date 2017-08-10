import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";
import {FormsModule} from "@angular/forms";
import {DatepickerConfig} from  "../../src/datepicker/config.server";
import * as moment from "moment";
import {DatepickerConfig} from "../../src/datepicker/config.server";
import {TestComponent} from "./test.component";


@NgModule({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        GlowwormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private config: DatepickerConfig) {
    const today = moment(moment().format('YYYY-MM-DD')).format(this.config.locale.format);
    Object.assign(
      config,
      {
        opens:'center',
        singleDatePicker:false,
        jqueryPath: '/assets/jquery.min.js',
        momentPath: '/assets/datepicker/moment.min.js',
        datepickerPath: '/assets/datepicker/daterangepicker.js',
        startDate:today,
        endDate:today,
        ranges:{
          '今天': [
            today, moment(today).add(1,'days').subtract(this.config.timePickerIncrement,'minute').format(this.config.locale.format)
          ]
        }
      }
    );

  }
    constructor(private config: DatepickerConfig) {
        Object.assign(this.config, {
            jqueryPath: '/assets/jquery.min.js',
            momentPath: '/assets/datepicker/moment.min.js',
            datepickerPath: '/assets/datepicker/daterangepicker.js'
        })
    }
}
