import {Component, Input} from "@angular/core";
import {GwPopConfirmDirective} from "./popconfirm.directive";

@Component({
    selector: 'gw-popconfirm',
    styleUrls: ['../styles/glowworm.css'],
    template: `
        <gw-triangle [placement]="origin.placement">
            <div class="gw-popconfirm">
                <div class="gw-popconfirm-title" *ngIf="origin.title" [innerHTML]="origin.title | safe"></div>
                <div class="gw-popconfirm-footer">
                    <button class="btn btn-xs btn-primary"
                            (click)="origin.onConfirmEvent($event)"
                            [innerHTML]="origin.confirmText | safe">
                    </button>
                    <button class="btn btn-xs btn-default"
                            (click)="origin.onCancelEvent($event)"
                            [innerHTML]="origin.cancelText | safe">
                    </button>
                </div>
            </div>
        </gw-triangle>
    `
})
export class GwPopConfirmComponent {

    @Input() origin: GwPopConfirmDirective;

}