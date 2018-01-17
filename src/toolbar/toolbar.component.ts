import {AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList} from "@angular/core";
import {GWControl} from "../utils/gw-control";

@Component({
    selector: 'gw-toolbar',
    styleUrls: ['./toolbar.component.css'],
    templateUrl: './toolbar.component.html'
})
export class GWToolbarComponent implements AfterContentInit {

    @ContentChildren('gwcontrol') _fields: QueryList<ElementRef>;

    @Input() showType: 'always' | 'withMore' = 'always';

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
