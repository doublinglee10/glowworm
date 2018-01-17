import {NgModule} from "@angular/core";
import {GWInputComponent} from "./input.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
    ],
    exports: [
        GWInputComponent
    ]
})
export class GWInputModule {
}
