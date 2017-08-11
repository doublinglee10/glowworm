import {Component, ElementRef, TemplateRef} from "@angular/core";

@Component({
    selector: 'md-popover-container',
    styleUrls: ['./popover.component.css'],
    template: `
        <div [class.hidden]="hidden" [ngStyle]="style" class="modal_window mw-right mw-bottom mw-block">
            <ng-template [ngTemplateOutlet]="template"></ng-template>
        </div>
    `
})
export class GWPopoverComponent {

    template: TemplateRef<any>;
    hidden: boolean = true;

    style: any = {};

    constructor(public el: ElementRef) {
    }

    setStyle(style: any) {
        this.style = {...this.style, ...style};
    }
}