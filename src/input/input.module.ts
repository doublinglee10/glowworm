import {NgModule} from "@angular/core";
import {GWInputComponent} from "./input.component";
import {PopoverModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        GWInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule.forRoot()
    ],
    exports: [
        GWInputComponent
    ]
})
export class GWInputModule {
}
