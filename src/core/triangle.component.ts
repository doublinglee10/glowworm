import {Component, HostBinding, Input} from "@angular/core";
import {Placement} from "./placement";

@Component({
    selector: 'gw-triangle',
    styleUrls: ['../styles/triangle.css'],
    template: `
        <div class="triangle triangle-{{_placement}}">
            <ng-content></ng-content>
        </div>
    `
})
export class TriangleComponent {

    _placement: Placement = Placement.BOTTOM_LEFT;

    @HostBinding('style.display') display = 'inline-block';
    @HostBinding('style.marginTop.px') top = 8;
    @HostBinding('style.marginBottom.px') bottom = 0;
    @HostBinding('style.marginLeft.px') left = 0;
    @HostBinding('style.marginRight.px') right = 0;

    @Input() set placement(placement: Placement) {
        this._placement = placement;

        switch (placement) {
            case Placement.TOP:
            case Placement.TOP_LEFT:
            case Placement.TOP_RIGHT:
                this.top = this.left = this.right = 0;
                this.bottom = 8;
                break;
            case Placement.BOTTOM:
            case Placement.BOTTOM_LEFT:
            case Placement.BOTTOM_RIGHT:
                this.left = this.right = this.bottom = 0;
                this.top = 8;
                break;
            case Placement.LEFT:
            case Placement.LEFT_TOP:
            case Placement.LEFT_BOTTOM:
                this.left = this.top = this.bottom = 0;
                this.right = 8;
                break;
            case Placement.RIGHT:
            case Placement.RIGHT_TOP:
            case Placement.RIGHT_BOTTOM:
                this.right = this.top = this.bottom = 0;
                this.left = 8;
                break;
        }
    }

}