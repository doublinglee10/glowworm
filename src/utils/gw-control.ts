import {Input} from "@angular/core";

export abstract class GWControl {

    @Input() enabled: boolean = true;

    @Input() label: string;
    @Input() showSelect: boolean = false;
    @Input() selectData: any[] = [];
    @Input() selectValue: any;

    onRemove: Function = Function.prototype;
}