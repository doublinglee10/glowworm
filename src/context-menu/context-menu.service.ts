import {ComponentRef, Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {ContextMenu} from "./context-menu";
import {ComponentLoaderService} from "../core/component-loader.service";
import {GwContextMenuContainerComponent} from "./context-menu.component";

export interface IContextMenuClickEvent {
    event: MouseEvent;
    menus: ContextMenu[];
    class?: any;
}

@Injectable()
export class ContextMenuService {

    show: Subject<IContextMenuClickEvent> = new Subject<IContextMenuClickEvent>();

    constructor(private componentLoader: ComponentLoaderService) {
    }

    private _directive_count = 0;
    private _init: boolean = false;
    private _componentRef: ComponentRef<GwContextMenuContainerComponent>;

    onMenuDirectiveInit() {
        this._directive_count++;
        if (this._directive_count > 0 && !this._init) {
            this._init = true;
            setTimeout(() => {
                this._componentRef = this.componentLoader.appendComponentToBody(GwContextMenuContainerComponent);
            });
        }

    }

    onMenuDirectiveDestroy() {
        this._directive_count--;
        if (this._directive_count <= 0 && this._componentRef) {
            this.componentLoader.removeComponentFormBody(this._componentRef);
            this._componentRef = null;
            this._init = false;
        }
    }
}