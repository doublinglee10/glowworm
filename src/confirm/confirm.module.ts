import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GwConfirmComponent} from "./confirm.component";
import {GwConfirmDirective} from "./confirm.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GwConfirmComponent,
        GwConfirmDirective
    ],
    exports: [
        GwConfirmDirective
    ],
    entryComponents: [
        GwConfirmComponent
    ]
})
export class GwConfirmModule {
}