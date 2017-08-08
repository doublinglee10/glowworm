import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";
import {FormsModule} from "@angular/forms";
import {DatepickerConfig} from  "../../src/datepicker/config.server";


@NgModule({
  declarations: [
    AppComponent
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
    Object.assign(this.config,{
      jqueryPath: '/assets/jquery.min.js',
      momentPath: '/assets/datepicker/moment.min.js',
      datepickerPath: '/assets/datepicker/daterangepicker.js'
    })
  }
}
