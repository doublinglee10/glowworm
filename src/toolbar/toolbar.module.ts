import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GWToolbarComponent} from "./toolbar.component";
import {GWUtilModule} from "../utils/util.module";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWToolbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
        GWUtilModule
    ],
    exports: [
        GWToolbarComponent
    ]
})
export class GWToolbarModule {
}
