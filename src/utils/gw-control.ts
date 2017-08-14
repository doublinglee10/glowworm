import {Input} from "@angular/core";

export type BtnSize = 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default';

export abstract class GWControl {

    @Input() btnSize: BtnSize = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;

    @Input() label: string;
    @Input() showSelect: boolean = false;
    @Input() selectData: any[] = [];

    @Input() selectValue: any;

    onRemove: Function = Function.prototype;
}