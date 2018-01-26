import {NgModule} from "@angular/core";
import {GwImgPreviewComponent} from "./imgpreview.component";
import {CommonModule} from "@angular/common";
import {OverlayModule} from "@angular/cdk/overlay";
import {GwImgPreviewDirective} from "./imgpriview.directive";

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    declarations: [
        GwImgPreviewDirective,
        GwImgPreviewComponent
    ],
    entryComponents: [
        GwImgPreviewComponent
    ],
    exports: [
        GwImgPreviewDirective
    ]
})
export class GwImgPreviewModule {
}