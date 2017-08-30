import {Component} from "@angular/core";

@Component({
    selector: 'gw-popover-container',
    styleUrls: ['./popover.component.css'],
    template: ` 
        <div class="modal_window mw-right mw-block">
            <ng-content></ng-content>
        </div>
    `
})
export class GWPopoverContainerComponent {

}