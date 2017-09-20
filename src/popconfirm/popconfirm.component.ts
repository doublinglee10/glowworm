import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {GwOverlayDirective} from "../core/overlay.directive";
import {Placement} from "../core/placement";

@Component({
    selector: 'gw-popconfirm',
    styleUrls: ['../styles/triangle.css', '../styles/glowworm.css'],
    template: `
        <div gw-overlay
                   [source]="source"
                   [placement]="placement"
                   [zIndex]="zIndex">
            <div class="triangle triangle-{{placement}}">
                <div class="gw-popconfirm">
                    <div class="gw-popconfirm-title" *ngIf="title">
                        {{title}}
                    </div>
                    <div class="gw-popconfirm-footer">
                        <button class="btn btn-xs btn-primary" (click)="onConfirmEvent($event)">{{confirmText}}</button>
                        <button class="btn btn-xs btn-default" (click)="onCancelEvent($event)">{{cancelText}}</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class GwPopConfirmComponent {

    @Input() title: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';
    @Input() placement: Placement = 'bottom-left';
    @Input() source: ElementRef;
    @Input() zIndex: number;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild(GwOverlayDirective) overlay: GwOverlayDirective;

    onConfirmEvent(event: Event) {
        this.overlay.hide();
        this.onConfirm.emit(event);
    }

    onCancelEvent(event: Event) {
        this.overlay.hide();
        this.onCancel.emit(event);
    }
}