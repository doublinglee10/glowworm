import {Directive, Input, Output, EventEmitter} from "@angular/core";


@Directive({
    selector: '[gw-popover-confirm]'
})
export class GWPopoverConfirmDirective {

    @Input() title: string;
    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    constructor() {

    }
}