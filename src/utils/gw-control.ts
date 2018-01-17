import {EventEmitter, Input, Output} from "@angular/core";
import {GWToolbarComponent} from "../toolbar/toolbar.component";

export type BtnSize = 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default';

export abstract class GWControl {

    @Input() btnSize: BtnSize = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;

    @Input() label: string;
    @Input() showSelect: boolean = false;
    @Input() selectData: any[] = []; // {id: any, text: string}[]
    @Input() selectModel: any; // id: any
    @Output() selectModelChange: EventEmitter<any> = new EventEmitter(); // {id: any, text: string}

    /**
     * @deprecated
     */
    @Input() linkAge: boolean = false;

    onRemove: Function = Function.prototype;

    @Input() set toolbar(toolbar: GWToolbarComponent) {
        toolbar && toolbar.addFieldComponent(this);
    }
}
