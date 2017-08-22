import {NgModule} from "@angular/core";
import {GWRangeInputComponent} from "./rangeinput.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
      GWRangeInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
    ],
    exports: [
      GWRangeInputComponent
    ]
})
export class GWRangeInputModule {
}
