import {Component, Input} from "@angular/core";
import {Placement} from "./placement";

@Component({
    selector: 'gw-triangle',
    styleUrls: ['../styles/triangle.css'],
    template: `
        <div class="triangle triangle-{{placement}}">
            <ng-content></ng-content>
        </div>
    `
})
export class TriangleComponent {

    @Input() placement: Placement = Placement.BOTTOM_LEFT;

}