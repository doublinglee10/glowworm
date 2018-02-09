import {Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewEncapsulation} from "@angular/core";
import {CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair} from "@angular/cdk/overlay";
import {fromEvent} from "rxjs/observable/fromEvent";
import {Subscription} from "rxjs/Subscription";
import {filter} from "rxjs/operators";
import {getPlacement, getPositions, Placement} from "./placement";

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
                [cdkConnectedOverlayOrigin]="overlayOrigin"
                [cdkConnectedOverlayOpen]="isOpened"
                (positionChange)="positionChangeEvent($event)"
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

    /** @Input() */
    placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    positions: ConnectionPositionPair[];
    clickSub: Subscription;

    @Input('placement') set _placement(placement: string) {
        this.placement = placement;
        this.positions = getPositions(this.placement);
    }

    constructor(public ngZone: NgZone) {
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

    positionChangeEvent(change: ConnectedOverlayPositionChange) {
        let placement = getPlacement(change.connectionPair);
        if (this.placement != placement) {
            this.ngZone.run(() => {
                this.placement = placement;
                this.placementChange.emit(this.placement);
            });
        }
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