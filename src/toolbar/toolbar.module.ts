import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PopoverModule} from "ngx-bootstrap";
import {GWToolbarComponent} from "./toolbar.component";
import {GWUtilModule} from "../utils/util.module";

@NgModule({
    declarations: [
        GWToolbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule.forRoot(),
        GWUtilModule
    ],
    exports: [
        GWToolbarComponent
    ]
})
export class GWToolbarModule {
}
