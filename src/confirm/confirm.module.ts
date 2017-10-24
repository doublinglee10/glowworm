import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GwConfirmComponent} from "./confirm.component";
import {GwConfirmDirective} from "./confirm.directive";
import {GwConfirmService} from "./confirm.service";

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

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GwConfirmModule,
            providers: [GwConfirmService]
        };
    }
}