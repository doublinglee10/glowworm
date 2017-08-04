import {NgModule} from "@angular/core";
import {GWInputComponent} from "./input.component";
import {GWButtonModule} from "../button/button.module";
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
        GWButtonModule,
        PopoverModule.forRoot()
    ],
    exports: [
        GWInputComponent
    ]
})
export class GWInputModule {
}
