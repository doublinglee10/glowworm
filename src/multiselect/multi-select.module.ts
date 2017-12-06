import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwUtilModule} from "../utils/util.module";
import {GWMultiSelectComponent} from "./multi-select.component";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWMultiSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
        GwUtilModule
    ],
    exports: [
        GWMultiSelectComponent
    ]
})
export class GWMultiSelectModule {
}
