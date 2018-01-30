import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GWToolbarComponent} from "./toolbar.component";
import {GwUtilModule} from "../utils/util.module";
import {GwPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWToolbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwPopoverModule.forRoot(),
        GwUtilModule
    ],
    exports: [
        GWToolbarComponent
    ]
})
export class GwToolbarModule {
}
