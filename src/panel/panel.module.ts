import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GwPanelComponent} from "./panel.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GwPanelComponent
    ],
    exports: [
        GwPanelComponent
    ]
})
export class GwPannelModule {
}