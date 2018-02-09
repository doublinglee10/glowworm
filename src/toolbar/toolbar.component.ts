import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList
} from "@angular/core";
import {GWControl} from "../utils/gw-control";
import {Placement} from "../core/placement";

@Component({
    selector: 'gw-toolbar',
    styleUrls: ['./toolbar.component.css'],
    template: `
        <ng-content></ng-content>

        <button [class.hidden]="!_show" type="button" class="btn btn-default btn-xs"
                cdkOverlayOrigin #overlayOrigin="cdkOverlayOrigin">
            <span class="glyphicon glyphicon-plus"></span>
        </button>

        <gw-connected-overlay #overlay
                              [overlayOrigin]="overlayOrigin"
                              [(placement)]="placement"
                              (placementChange)="placementChange.emit($event)">
            <gw-triangle [placement]="placement">
                <div class="popover-container">
                    <div class="popover-main">
                        <div class="input">
                            <input type="text" [(ngModel)]="_filter" name="value" placeholder="过滤...">
                        </div>
                        <ul>
                            <li *ngFor="let item of (data | gwSelectFilter:_filter)">
                                <label>
                                    <input type="checkbox" [(ngModel)]="item.__checked__" name="checkbox">
                                    <span>{{item.label}}</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="popover-hr"></div>
                    <div class="popover-footer">
                        <div class="left">
                            <a class="btn btn-xs" (click)="clear()">清除</a>
                        </div>
                        <div class="right">
                            <button class="btn btn-primary btn-xs" (click)="overlay.hide();save()">保存</button>
                            <button class="btn btn-default btn-xs" (click)="overlay.hide();cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </gw-triangle>
        </gw-connected-overlay>
    `
})
export class GWToolbarComponent implements AfterContentInit {

    @ContentChildren('gwcontrol') _fields: QueryList<ElementRef>;

    @Input() showType: 'always' | 'withMore' = 'always';
    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    _show: boolean = true;

    fields: any[] = [];
    _filter: string;
    data: any[];

    addFieldComponent(component: GWControl) {
        component.onRemove = this.onRemove.bind(this);
        this.fields.push(component);
    }

    ngAfterContentInit(): void {
        this.fields = [...this._fields.toArray(), ...this.fields];

        this.fields.forEach((item: any) => {
            let control = item as GWControl;
            control.onRemove = this.onRemove.bind(this);
        });

        this.refreshUI();
    }

    refreshUI() {
        this.data = [];
        this.fields.filter((item: any) => {
            let control = item as GWControl;
            return !control.enabled;
        }).forEach((item: any) => {
            let control = item as GWControl;
            this.data.push({
                label: control.label,
                component: control
            })
        });

        if (this.showType == 'withMore') {
            this._show = this.data.length > 0;
        }
    }

    onRemove() {
        this.refreshUI();
    }

    clear() {
        this.data.forEach((item: any) => {
            item.__checked__ = false;
        });
    }

    save() {
        this.data.forEach((item: any) => {
            if (item.__checked__) {
                let control = item.component as GWControl;
                control.enabled = true;
            }
        });
        this.refreshUI();
    }

    cancel() {
        this.clear();
    }

}
