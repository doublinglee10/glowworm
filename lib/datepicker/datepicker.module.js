import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GWDatepickerComponent } from "./datepicker.component";
import { DatepickerConfig } from "./config.server";
import { ScriptLoaderService } from "../utils/script-loader.service";
var DatepickerModule = (function () {
    function DatepickerModule() {
    }
    DatepickerModule.forRoot = function () {
        return {
            ngModule: DatepickerModule,
            providers: [DatepickerConfig, ScriptLoaderService]
        };
    };
    return DatepickerModule;
}());
export { DatepickerModule };
DatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [GWDatepickerComponent],
                exports: [GWDatepickerComponent]
            },] },
];
DatepickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datepicker.module.js.map