import {Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from "@angular/core";

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
        <div class="gw-confirm-mask"></div>
        <div class="gw-confirm" [ngClass]="confirmClass" [ngStyle]="{zIndex: zIndex}">
            <ng-container *ngIf="title">
                <div class="gw-confirm-title" [innerHTML]="title"></div>
            </ng-container>
            <ng-container *ngIf="content">
                <div class="gw-confirm-body">
                    <ng-container *ngIf="typeofContent() === 'string'">
                        {{content}}
                    </ng-container>
                    <ng-container *ngIf="typeofContent() === 'template'">
                        <ng-template [ngTemplateOutlet]="content"></ng-template>
                    </ng-container>
                    <ng-container *ngIf="typeofContent() === 'component'">
                        <ng-container *ngComponentOutlet="content"></ng-container>
                    </ng-container>
                </div>
            </ng-container>
            <div class="gw-confirm-footer">
                <button class="btn btn-primary btn-xs" (click)="onConfirmEvent()">{{confirmText}}</button>
                <button class="btn btn-default btn-xs" (click)="onCancelEvent()">{{cancelText}}</button>
            </div>
        </div>
    `
})
export class GwConfirmComponent {

    @Input() title: string;
    @Input() content: string | TemplateRef<any> | any;
    @Input() confirmClass: string;
    @Input() zIndex: number;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';

    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    onConfirmEvent() {
        this.onConfirm.emit();
    }

    onCancelEvent() {
        this.onCancel.emit();
    }

    typeofContent(): string {
        if (typeof this.content === 'undefined')
            return 'undefined';
        if (typeof this.content === 'string')
            return 'string';
        if (this.content instanceof TemplateRef)
            return 'template';
        return 'component';
    }
}