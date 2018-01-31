import {NgModule} from "@angular/core";
import {GwInputComponent} from "./input.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GwInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwPopoverModule.forRoot(),
    ],
    exports: [
        GwInputComponent
    ]
})
export class GwInputModule {
}
