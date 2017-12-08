import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwUtilModule} from "../utils/util.module";
import {GwSingleSelectComponent} from "./single-select.component";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GwSingleSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
        GwUtilModule
    ],
    exports: [
        GwSingleSelectComponent
    ]
})
export class GWSingleSelectModule {
}
