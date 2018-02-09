import {Component, Input} from "@angular/core";
import {GwPopInputDirective} from "./popinput.directive";

@Component({
    selector: 'gw-popinput',
    styleUrls: ['../styles/glowworm.css'],
    template: `
        <gw-triangle [placement]="origin.placement">
            <div class="gw-popinput">
                <div class="gw-popinput-title" *ngIf="title" [innerHTML]="origin.title | safeHtml"></div>
                <div class="gw-popinput-body">
                    <input type="text" [(ngModel)]="origin.val"/>
                </div>
                <div class="gw-popinput-footer">
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
export class GwPopInputComponent {

    @Input() origin: GwPopInputDirective;

}