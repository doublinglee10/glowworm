import {AfterContentInit, Component, ContentChildren, ElementRef, QueryList} from "@angular/core";
import {GWControl} from "../utils/gw-control";

@Component({
    selector: 'gw-toolbar',
    styleUrls: ['./toolbar.component.css'],
    templateUrl: './toolbar.component.html'
})
export class GWToolbarComponent implements AfterContentInit {

    @ContentChildren('gwcontrol') fields: QueryList<ElementRef>;

    _filter: string;
    data: any[];

    ngAfterContentInit(): void {
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
