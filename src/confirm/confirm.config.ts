import {TemplateRef} from "@angular/core";

export interface GwConfirmConfig {
    title?: string;
    content?: string | TemplateRef<any> | any;
    gwClass?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: Function;
    onCancel?: Function;
}