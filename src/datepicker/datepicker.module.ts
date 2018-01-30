import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GWDatepickerComponent} from "./datepicker.component";
import {DatepickerConfig} from "./config.server";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    imports: [
        CommonModule,
        GwCoreModule.forRoot()
    ],
    declarations: [GWDatepickerComponent],
    exports: [GWDatepickerComponent]
})
export class GwDatepickerModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GwDatepickerModule,
            providers: [DatepickerConfig]
        };
    }

}
