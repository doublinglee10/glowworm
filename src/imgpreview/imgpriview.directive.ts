import {ChangeDetectorRef, ComponentRef, Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {OverlayRef} from "@angular/cdk/overlay";
import {GwImgPreviewComponent} from "./imgpreview.component";
import {GwOverlayService} from "../core/overlay.service";
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
    private _isOpen: boolean;
    private _overlayRef: OverlayRef;
    private _componentRef: ComponentRef<GwImgPreviewComponent>;

    constructor(private overlayService: GwOverlayService,
                private cdr: ChangeDetectorRef) {
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

    private createOverlay() {
        let {overlayRef, componentRef} = this.overlayService.openBlock(GwImgPreviewComponent, {
            backdropClass: 'overlay-backdrop-class'
        });
        this._componentRef = componentRef;
        this._overlayRef = overlayRef;
        overlayRef.backdropClick().subscribe(() => this.close());
        componentRef.instance.imageUrl = this.lgSrc || this.src;
        componentRef.instance.animationStateChanged
            .pipe(
                filter((event: any) => event.phaseName === 'done' && event.toState === 'enter'),
                take(1)
            )
            .subscribe((event) => {
                this._isOpen = true;
                this.isOpenChange.emit(this.isOpen);
                this.cdr.detectChanges();
            });
    }

    close() {
        if (this.isOpen) {
            this._componentRef.instance.animationStateChanged
                .pipe(
                    filter((event: any) => event.phaseName === 'start'),
                    take(1)
                )
                .subscribe(() => {
                    this._overlayRef.detachBackdrop();
                });
            this._componentRef.instance.animationStateChanged
                .pipe(
                    filter(() => this.isOpen),
                    filter((event: any) => event.phaseName === 'done' && event.toState === 'leave'),
                    take(1)
                )
                .subscribe(() => {
                    this._overlayRef.dispose();
                    this._overlayRef = null;
                    this._isOpen = false;
                    this.isOpenChange.emit(this.isOpen);
                    this.cdr.detectChanges();
                });
            this._componentRef.instance.startExitAnimation();
        }
    }
}