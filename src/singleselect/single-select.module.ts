import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GWUtilModule} from "../utils/util.module";
import {GWSingleSelectComponent} from "./single-select.component";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWSingleSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
        GWUtilModule
    ],
    exports: [
        GWSingleSelectComponent
    ]
})
export class GWSingleSelectModule {
}
