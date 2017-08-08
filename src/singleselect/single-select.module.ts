import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PopoverModule} from "ngx-bootstrap";
import {GWUtilModule} from "../utils/util.module";
import {GWSingleSelectComponent} from "./single-select.component";

@NgModule({
    declarations: [
        GWSingleSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule.forRoot(),
        GWUtilModule
    ],
    exports: [
        GWSingleSelectComponent
    ]
})
export class GWSingleSelectModule {
}
