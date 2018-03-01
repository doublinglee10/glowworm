import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GwCoreModule} from "../core/core.module";
import {GwPopSingleSelectComponent} from "./pop-singleselect.component";
import {GwPopSingleSelectDirective} from "./pop-singleselect.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot()
    ],
    declarations: [
        GwPopSingleSelectComponent,
        GwPopSingleSelectDirective
    ],
    exports: [
        GwPopSingleSelectDirective
    ],
    entryComponents: [
        GwPopSingleSelectComponent
    ]
})
export class GwPopSingleSelectModule {
}