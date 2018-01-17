import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GwCoreModule} from "../core/core.module";
import {GwPopSelectComponent} from "./popselect.component";
import {GwPopSelectDirective} from "./popselect.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot()
    ],
    declarations: [
        GwPopSelectComponent,
        GwPopSelectDirective
    ],
    exports: [
        GwPopSelectDirective
    ],
    entryComponents: [
        GwPopSelectComponent
    ]
})
export class GwPopselectModule {

}