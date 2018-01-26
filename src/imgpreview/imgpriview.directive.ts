import {ComponentRef, Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {GwImgPreviewComponent} from "./imgpreview.component";
import {filter, take} from "rxjs/operators";

const ESCAPE = 27;

@Directive({
    selector: '[gw-imgpreview]',
    exportAs: 'gw-imgpreview'
})
export class GwImgPreviewDirective {

    @Input() src: string;
    @Input() lgSrc: string;
    @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

    /** @Input() */
    _isOpen: boolean;
    private _overlayRef: OverlayRef;
    private _componentRef: ComponentRef<GwImgPreviewComponent>;

    constructor(private _overlay: Overlay) {
    }

    @Input() set isOpen(isOpen: boolean) {
        if (isOpen !== this._isOpen) {
            if (isOpen) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    get isOpen() {
        return this._isOpen;
    }

    private getOverlayConfig() {
        let positionStrategy = this._overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        let overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'overlay-backdrop-class',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy
        });
        return overlayConfig;
    }

    private createOverlay() {
        if (!this._overlayRef && (this.src || this.lgSrc)) {
            this._overlayRef = this._overlay.create(this.getOverlayConfig());
            this._componentRef = this._overlayRef.attach(new ComponentPortal(GwImgPreviewComponent));
            this._componentRef.instance.imageUrl = this.lgSrc || this.src;
            this._overlayRef.backdropClick().subscribe(() => this.close());
            this._isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    @HostListener('click')
    open() {
        this.createOverlay();
    }

    @HostListener('document:keydown', ['$event'])
    private keydown(event: KeyboardEvent) {
        if (event.keyCode === ESCAPE) {
            this.close();
        }
    }

    close() {
        if (this._overlayRef) {
            this._componentRef.instance.animationStateChanged
                .pipe(
                    filter((event: any) => event.phaseName === 'done' && event.toState === 'leave'),
                    take(1)
                )
                .subscribe(() => {
                    this._overlayRef.dispose();
                    this._overlayRef = null;
                    this._isOpen = false;
                    this.isOpenChange.emit(this.isOpen);
                });
            this._componentRef.instance.startExitAnimation();
        }
    }
}