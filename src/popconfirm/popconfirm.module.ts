import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GwCoreModule} from "../core/core.module";
import {GwPopConfirmComponent} from "./popconfirm.component";
import {GwPopConfirmDirective} from "./popconfirm.directive";


@NgModule({
    imports: [
        CommonModule,
        GwCoreModule.forRoot()
    ],
    declarations: [
        GwPopConfirmComponent,
        GwPopConfirmDirective
    ],
    exports: [
        GwPopConfirmDirective
    ],
    entryComponents: [
        GwPopConfirmComponent
    ]
})
export class GwPopconfirmModule {

}