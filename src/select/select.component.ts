import {Component, forwardRef, Input, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWSelect} from "../utils/select.modal";
import {GWControl} from "../utils/gw-control";
import {PopoverDirective} from "ngx-bootstrap";

export const GW_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWSelectComponent),
    multi: true
};

@Component({
    selector: 'gw-select',
    styleUrls: ['./select.component.css'],
    templateUrl: './select.component.html',
    providers: [GW_SELECT_VALUE_ACCESSOR]
})
export class GWSelectComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(PopoverDirective) popover: PopoverDirective;

    @Input() singleSelect: boolean = true;

    _filter: string;

    data: GWSelect[];
    values: any[] = [];
    onChange: any;
    onTouched: any;

    get labels(): string {
        return this.values.map((value) => value.label).join(',');
    }

    @Input('data') set _data(data: any[]) {
        this.data = data;
        this.refreshUI();
    }

    clear() {
        this.data.forEach((item: any) => {
            item.__checked__ = false;
        });
    }

    save() {
        this.popover.hide();
        this.values = this.data.filter((value: any) => value.__checked__);
        this.onTouched();
        this.onChange(this.values);
    }

    cancel() {
        this.popover.hide();
        this.refreshUI();
        this.onTouched();
        this.onChange(this.values);
    }

    remove() {
        this.values = [];
        this.enabled = false;
        this.clear();
        this.onTouched();
        this.onChange(this.values);
        this.onRemove();
    }

    onSelect(item: any) {
        if (this.singleSelect && item.__checked__) {
            this.data.forEach((item: any) => {
                item.__checked__ = false;
            });
            item.__checked__ = true;
        }
    }

    writeValue(obj: any): void {
        this.values = obj || [];
        this.refreshUI();
    }

    refreshUI() {
        this.data.forEach((item: any) => item.__checked__ = false);
        this.values.forEach((select: GWSelect) => {
            this.data.forEach((item: any) => {
                if (select.id == item.id) {
                    item.__checked__ = true
                }
            });
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}