import {NgModule} from "@angular/core";
import {GWPopoverConfirmDirective} from "./popover-confirm.directive";
import {CommonModule} from "@angular/common";
import {GWPopoverConfirmComponent} from "./popover-confirm.component";
import {GWPopoverModule} from "../popover/popover.module";

/**
 * @deprecated
 */
@NgModule({
    imports: [
        CommonModule,
        GWPopoverModule.forRoot()
    ],
    declarations: [
        GWPopoverConfirmDirective,
        GWPopoverConfirmComponent
    ],
    exports: [
        GWPopoverConfirmDirective,
        GWPopoverConfirmComponent
    ],
    entryComponents: [
        GWPopoverConfirmComponent
    ]
})
export class GWPopoverConfirmModule {

}