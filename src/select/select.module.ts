import {NgModule} from "@angular/core";
import {GWSelectComponent} from "./select.component";
import {PopoverModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        GWSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule.forRoot(),
    ],
    exports: [
        GWSelectComponent
    ]
})
export class GWSelectModule {
}
