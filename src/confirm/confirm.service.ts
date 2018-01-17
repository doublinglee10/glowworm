import {ComponentRef, Injectable} from "@angular/core";
import {ComponentLoaderService} from "../core/component-loader.service";
import {GwConfirmComponent} from "./confirm.component";
import {GwConfirmConfig} from "./confirm.config";

@Injectable()
export class GwConfirmService {

    constructor(private componentLoader: ComponentLoaderService) {
    }

    show(config: GwConfirmConfig) {
        let componentRef = this.componentLoader.appendComponentToBody(GwConfirmComponent);
        let confirm: GwConfirmComponent = componentRef.instance;
        confirm.title = config.title || confirm.title;
        confirm.content = config.content || confirm.content;
        confirm.confirmClass = config.confirmClass || confirm.confirmClass;
        confirm.confirmText = config.confirmText || confirm.confirmText;
        confirm.zIndex = config.zIndex || confirm.zIndex;
        confirm.cancelText = config.cancelText || confirm.cancelText;
        confirm.onConfirm.subscribe(() => {
            this._destroy(componentRef);
            config.onConfirm && config.onConfirm();
        });
        confirm.onCancel.subscribe(() => {
            this._destroy(componentRef);
            config.onCancel && config.onCancel();
        });
    }

    private _destroy(componentRef: ComponentRef<any>): void {
        if (componentRef) {
            this.componentLoader.removeComponentFormBody(componentRef);
            componentRef = null;
        }
    }
}