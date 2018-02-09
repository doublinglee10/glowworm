import {Injectable} from "@angular/core";
import {GwConfirmConfig} from "./confirm.config";
import {GwOverlayService} from "../core/overlay.service";
import {GwConfirmComponent} from "./confirm.component";

@Injectable()
export class GwConfirmService {

    config: GwConfirmConfig = {
        confirmText: '确认',
        cancelText: '取消',
        onConfirm: Function.prototype,
        onCancel: Function.prototype
    };

    constructor(private overlayService: GwOverlayService) {
    }

    show(config: GwConfirmConfig) {
        let {overlayRef, componentRef} = this.overlayService.openBlock(GwConfirmComponent);
        let component: GwConfirmComponent = componentRef.instance;
        component.overlayRef = overlayRef;
        component.config = {...this.config, ...config};
    }
}