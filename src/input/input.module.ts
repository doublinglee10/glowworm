import {NgModule} from "@angular/core";
import {GWInputComponent} from "./input.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GWInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwPopoverModule.forRoot(),
    ],
    exports: [
        GWInputComponent
    ]
})
export class GwInputModule {
}
