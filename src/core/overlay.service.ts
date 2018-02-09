import {ComponentRef, ElementRef, Injectable} from "@angular/core";
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {getPositions, Placement} from "./placement";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";

@Injectable()
export class GwOverlayService {

    constructor(private overlay: Overlay) {
    }

    openConnected<T>(elementRef: ElementRef, component: ComponentType<T>, placement: Placement = Placement.BOTTOM_LEFT): { overlayRef: OverlayRef, componentRef: ComponentRef<T> } {
        let position: ConnectionPositionPair = getPositions(placement);
        let positionStrategy = this.overlay.position()
            .connectedTo(elementRef, {
                originX: position.originX,
                originY: position.originY
            }, {
                overlayX: position.overlayX,
                overlayY: position.overlayY
            })
            .withOffsetX(position.offsetX)
            .withOffsetY(position.offsetY);
        let overlayConfig = new OverlayConfig({
            positionStrategy,
            hasBackdrop: true,
            backdropClass: 'overlay-backdrop-transparent'
        });
        let overlayRef: OverlayRef = this.overlay.create(overlayConfig);
        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
        let componentRef: ComponentRef<T> = overlayRef.attach(new ComponentPortal(component));
        return {
            overlayRef,
            componentRef
        }
    }

    openBlock<T>(component: ComponentType<T>): { overlayRef: OverlayRef, componentRef: ComponentRef<T> } {
        let positionStrategy = this.overlay.position().global().centerVertically().centerHorizontally();
        let scrollStrategy = this.overlay.scrollStrategies.block();
        let overlayConfig = new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: true,
            backdropClass: 'overlay-backdrop-transparent'
        });
        let overlayRef: OverlayRef = this.overlay.create(overlayConfig);
        let componentRef: ComponentRef<T> = overlayRef.attach(new ComponentPortal(component));
        return {
            overlayRef,
            componentRef
        };
    }
}