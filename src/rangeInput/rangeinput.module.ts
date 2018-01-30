import {NgModule} from "@angular/core";
import {GWRangeInputComponent} from "./rangeinput.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWRangeInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwPopoverModule.forRoot()
    ],
    exports: [
        GWRangeInputComponent
    ]
})
export class GwRangeInputModule {
}
