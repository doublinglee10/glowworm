import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GWDatepickerComponent} from "./datepicker.component";
import {DatepickerConfig} from "./config.server";
import {ScriptLoaderService} from "../utils/script-loader.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GWDatepickerComponent],
  exports:[GWDatepickerComponent],
  providers:[DatepickerConfig,ScriptLoaderService]
})
export class DatepickerModule {

}
