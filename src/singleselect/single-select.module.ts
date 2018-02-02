import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwUtilModule} from "../utils/util.module";
import {GwSingleSelectComponent} from "./single-select.component";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    declarations: [
        GwSingleSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot(),
        GwUtilModule
    ],
    exports: [
        GwSingleSelectComponent
    ]
})
export class GwSingleSelectModule {
}
