import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GwSelectComponent} from "./select.component";
import {GWPopoverModule} from "../popover/popover.module";
import {GwUtilModule} from "../utils/util.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GwUtilModule,
        GWPopoverModule.forRoot()
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