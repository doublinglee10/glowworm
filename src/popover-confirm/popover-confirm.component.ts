import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {BasePopover} from "../utils/popover.class";

@Component({
    selector: 'gw-popover-confirm',
    styleUrls: ['./popover-confirm.component.css'],
    template: `
        <div [class.hidden]="hidden">
            <gw-popover-container [styler]="styler">
                <div class="title">{{title}}</div>
                <hr>
                <div class="footer">
                    <button class="btn btn-primary btn-xs" (click)="doConfirm()">确认</button>
                    <button class="btn btn-default btn-xs" (click)="doCancel()">取消</button>
                </div>
            </gw-popover-container>
        </div>
    `
})
export class GWPopoverConfirmComponent extends BasePopover {

    @Input() styler: any;
    @Input() title: string;

    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    constructor(public el: ElementRef) {
        super();
    }

    doConfirm() {
        this.onConfirm.emit();
        this.hide();
    }

    doCancel() {
        this.onCancel.emit();
        this.hide();
    }
}