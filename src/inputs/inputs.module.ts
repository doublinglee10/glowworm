import {NgModule} from "@angular/core";
import {GwInputsComponent} from "./inputs.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GWPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GwInputsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GWPopoverModule.forRoot(),
    ],
    exports: [
        GwInputsComponent
    ]
})
export class GwInputsModule {
}
