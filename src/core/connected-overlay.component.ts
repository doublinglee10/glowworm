import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {CdkOverlayOrigin, ConnectionPositionPair} from "@angular/cdk/overlay";
import {fromEvent} from "rxjs/observable/fromEvent";
import {Subscription} from "rxjs/Subscription";
import {filter} from "rxjs/operators";

/**
 * use case :
 * <button class="btn btn-sm" cdkOverlayOrigin #overlayOrigin="cdkOverlayOrigin">这个按钮用来打开overlay</button>
 * <gw-connected-overlay [overlayOrigin]="overlayOrigin">
 *      这里是overlay的内容
 * </gw-connected-overlay>
 */
@Component({
    selector: 'gw-connected-overlay',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/glowworm.css'],
    template: `
        <ng-template
                cdk-connected-overlay
                [cdkConnectedOverlayHasBackdrop]="true"
                [cdkConnectedOverlayBackdropClass]="backdropClass"
                [cdkConnectedOverlayPositions]="positions"
                [cdkConnectedOverlayOffsetX]="offsetX"
                [cdkConnectedOverlayOffsetY]="offsetY"
                [cdkConnectedOverlayOrigin]="overlayOrigin"
                [cdkConnectedOverlayOpen]="isOpened"
                (backdropClick)="hide()"
                (detach)="hide()">
            <ng-content></ng-content>
        </ng-template>
    `
})
export class GwConnectedOverlayComponent implements OnInit, OnDestroy {

    @Input() isOpened: boolean = false;
    @Input() overlayOrigin: CdkOverlayOrigin;
    @Input() backdropClass = 'overlay-backdrop-transparent';
    @Input() disabled: boolean = false;
    positions: ConnectionPositionPair[];
    offsetX: number;
    offsetY: number;

    clickSub: Subscription;

    @Input() set position(position: ConnectionPositionPair) {
        if (position) {
            this.positions = [position];
            this.offsetX = position.offsetX;
            this.offsetY = position.offsetY;
        }
    }

    ngOnInit() {
        let el = this.overlayOrigin.elementRef.nativeElement;
        this.clickSub = fromEvent(el, 'click').pipe(
            filter(() => !this.disabled)
        ).subscribe(() => {
            this.toggle();
        });
    }

    ngOnDestroy() {
        this.clickSub && this.clickSub.unsubscribe();
    }

    show() {
        this.isOpened = true;
    }

    hide() {
        this.isOpened = false;
    }

    toggle() {
        this.isOpened = !this.isOpened;
    }
}