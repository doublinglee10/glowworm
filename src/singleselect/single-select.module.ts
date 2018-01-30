import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwUtilModule} from "../utils/util.module";
import {GwSingleSelectComponent} from "./single-select.component";
import {GwPopoverModule} from "../popover/popover.module";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    declarations: [
        GwSingleSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot(),
        GwPopoverModule.forRoot(),
        GwUtilModule
    ],
    exports: [
        GwSingleSelectComponent
    ]
})
export class GwSingleSelectModule {
}
