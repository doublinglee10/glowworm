import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PopoverModule} from "ngx-bootstrap";
import {GWUtilModule} from "../utils/util.module";
import {GWMultiSelectComponent} from "./multi-select.component";

@NgModule({
    declarations: [
        GWMultiSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule.forRoot(),
        GWUtilModule
    ],
    exports: [
        GWMultiSelectComponent
    ]
})
export class GWMultiSelectModule {
}
