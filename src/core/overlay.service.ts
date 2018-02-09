import {ComponentRef, ElementRef, Injectable} from "@angular/core";
import {
    ConnectedOverlayPositionChange,
    ConnectedPositionStrategy,
    ConnectionPositionPair,
    Overlay,
    OverlayConfig,
    OverlayRef
} from "@angular/cdk/overlay";
import {getPositions, Placement} from "./placement";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GwOverlayService {

    constructor(private overlay: Overlay) {
    }

    openConnected<T>(elementRef: ElementRef,
                     component: ComponentType<T>,
                     placement: string = Placement.BOTTOM_LEFT): {
        overlayRef: OverlayRef,
        componentRef: ComponentRef<T>,
        onPositionChange: Observable<ConnectedOverlayPositionChange>
    } {
        let positions: ConnectionPositionPair[] = getPositions(placement);
        let first: ConnectionPositionPair = positions[0];
        let positionStrategy: ConnectedPositionStrategy = this.overlay.position()
            .connectedTo(elementRef, {originX: first.originX, originY: first.originY}, {
                overlayX: first.overlayX,
                overlayY: first.overlayY
            })
            .withPositions(positions);
        let scrollStrategy = this.overlay.scrollStrategies.reposition();
        let overlayConfig = new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: true,
            backdropClass: 'overlay-backdrop-transparent'
        });
        let overlayRef: OverlayRef = this.overlay.create(overlayConfig);
        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
        let componentRef: ComponentRef<T> = overlayRef.attach(new ComponentPortal(component));
        return {
            overlayRef,
            componentRef,
            onPositionChange: positionStrategy.onPositionChange
        }
    }

    openBlock<T>(component: ComponentType<T>): { overlayRef: OverlayRef, componentRef: ComponentRef<T> } {
        let positionStrategy = this.overlay.position().global().centerVertically().centerHorizontally();
        let scrollStrategy = this.overlay.scrollStrategies.block();
        let overlayConfig = new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: true
        });
        let overlayRef: OverlayRef = this.overlay.create(overlayConfig);
        let componentRef: ComponentRef<T> = overlayRef.attach(new ComponentPortal(component));
        return {
            overlayRef,
            componentRef
        };
    }
}