import {Component, ViewEncapsulation} from "@angular/core";
import {GwPopSelectDirective} from "./popselect.directive";

@Component({
    selector: 'gw-popselect',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/triangle.css', '../styles/glowworm.css'],
    template: `
        <gw-triangle [placement]="origin.placement">
            <div class="gw-popselect">
                <div class="gw-popselect-filter" *ngIf="showFilter">
                    <input type="text" placeholder="过滤..." [(ngModel)]="origin._filterVal">
                </div>
                <div class="gw-popselect-body">
                    <ul>
                        <li *ngFor="let item of (origin.data | multiKeysFilter:_filterVal:filterKeys)">
                            <label>
                                <input type="checkbox" [(ngModel)]="item.checked" name="checkbox"
                                       (change)="origin.onCheckboxChange(item)">
                                <span [innerHTML]="item.text | safe"></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="gw-popselect-footer">
                    <button class="btn btn-xs btn-primary" (click)="origin.onConfirmEvent($event)">确认</button>
                    <button class="btn btn-xs btn-default" (click)="origin.onCancelEvent($event)">取消</button>
                </div>
            </div>
        </gw-triangle>
    `
})
export class GwPopSelectComponent {

    origin: GwPopSelectDirective;

}