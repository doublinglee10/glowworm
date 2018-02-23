import {Injector, TemplateRef, Type} from "@angular/core";

export class GwTab {

    /**
     * @inner
     */
    isFirstSelected?: boolean = true;

    tabId?: any;
    title?: string;
    content?: string | TemplateRef<any> | Type<any>;

    lazy?: boolean;
    disabled?: boolean;
    closable?: boolean;
    selected?: boolean;
    injector?: Injector;

    constructor(tab: GwTab | object) {
        Object.assign(this, tab);
    }
}