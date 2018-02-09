import {Component, ViewEncapsulation} from "@angular/core";
import {GwConfirmDirective} from "./confirm.directive";

/**
 <gw-confirm
 [title]=""
 [content]=""
 [confirmClass]=""
 [confirmText]=""
 (onConfirm)=""
 [cancelText]=""
 (onCancel)="">
 </gw-confirm>
 */
@Component({
    selector: 'gw-confirm',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/glowworm.css'],
    template: `
        <div class="gw-confirm" [ngClass]="origin.gwClass">
            <ng-container *ngIf="origin.title">
                <div class="gw-confirm-title" [innerHTML]="origin.title | safe"></div>
            </ng-container>
            <ng-container *ngIf="origin.content">
                <div class="gw-confirm-body">
                    <ng-container *ngIf="origin.typeofContent() === 'string'">
                        <span [innerHTML]="origin.content | safe"></span>
                    </ng-container>
                    <ng-container *ngIf="origin.typeofContent() === 'template'">
                        <ng-template [ngTemplateOutlet]="origin.content"></ng-template>
                    </ng-container>
                    <ng-container *ngIf="origin.typeofContent() === 'component'">
                        <ng-container *ngComponentOutlet="origin.content"></ng-container>
                    </ng-container>
                </div>
            </ng-container>
            <div class="gw-confirm-footer">
                <button class="btn btn-primary btn-xs" (click)="origin.onConfirmEvent()" [innerHTML]="origin.confirmText | safe"></button>
                <button class="btn btn-default btn-xs" (click)="origin.onCancelEvent()" [innerHTML]="origin.cancelText | safe"></button>
            </div>
        </div>
    `
})
export class GwConfirmComponent {

    origin: GwConfirmDirective;

}