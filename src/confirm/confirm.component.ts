import {Component, TemplateRef, ViewEncapsulation} from "@angular/core";
import {GwConfirmConfig} from "./confirm.config";
import {OverlayRef} from "@angular/cdk/overlay";

@Component({
    selector: 'gw-confirm',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/glowworm.css'],
    template: `
        <div class="gw-confirm" [ngClass]="config.gwClass">
            <ng-container *ngIf="config.title">
                <div class="gw-confirm-title" [innerHTML]="config.title | safe"></div>
            </ng-container>
            <ng-container *ngIf="config.content">
                <div class="gw-confirm-body">
                    <ng-container *ngIf="typeofContent() === 'string'">
                        <span [innerHTML]="config.content | safe"></span>
                    </ng-container>
                    <ng-container *ngIf="typeofContent() === 'template'">
                        <ng-template [ngTemplateOutlet]="config.content"></ng-template>
                    </ng-container>
                    <ng-container *ngIf="typeofContent() === 'component'">
                        <ng-container *ngComponentOutlet="config.content"></ng-container>
                    </ng-container>
                </div>
            </ng-container>
            <div class="gw-confirm-footer">
                <button class="btn btn-primary btn-xs" (click)="onConfirmEvent()" [innerHTML]="config.confirmText | safe"></button>
                <button class="btn btn-default btn-xs" (click)="onCancelEvent()" [innerHTML]="config.cancelText | safe"></button>
            </div>
        </div>
    `
})
export class GwConfirmComponent {

    config: GwConfirmConfig;
    overlayRef: OverlayRef;

    onConfirmEvent() {
        this.config.onConfirm();
        this.overlayRef.dispose();
    }

    onCancelEvent() {
        this.config.onCancel();
        this.overlayRef.dispose();
    }

    typeofContent(): string {
        if (typeof this.config.content === 'undefined')
            return 'undefined';
        if (typeof this.config.content === 'string')
            return 'string';
        if (this.config.content instanceof TemplateRef)
            return 'template';
        return 'component';
    }
}