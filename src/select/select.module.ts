import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GwSelectComponent} from "./select.component";
import {GwPopoverModule} from "../popover/popover.module";
import {GwUtilModule} from "../utils/util.module";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot(),
        GwUtilModule,
        GwPopoverModule.forRoot()
    ],
    declarations: [
        GwSelectComponent
    ],
    exports: [
        GwSelectComponent
    ]
})
export class GwSelectModule {
}