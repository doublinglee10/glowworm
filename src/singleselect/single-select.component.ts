import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWSelect} from "../utils/select.modal";
import {GWControl} from "../utils/gw-control";
import {PopoverDirective} from "ngx-bootstrap";

export const GW_SINGLE_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWSingleSelectComponent),
    multi: true
};

@Component({
    selector: 'gw-single-select',
    styleUrls: ['./single-select.component.css'],
    templateUrl: './single-select.component.html',
    providers: [GW_SINGLE_SELECT_VALUE_ACCESSOR]
})
export class GWSingleSelectComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(PopoverDirective) popover: PopoverDirective;

    @Output('onSelect') onSelectEvent: EventEmitter<string> = new EventEmitter<string>();

    _filter: string;

    data: GWSelect[];
    value: any;
    onChange: any;
    onTouched: any;

    @Input('data') set _data(data: any[]) {
        this.data = data || [];
        this.refreshUI();
    }

    clear() {
        this.data.forEach((item: any) => {
            item.__checked__ = false;
        });
    }

    updateNgModel() {
        let id = this.value ? this.value.id : '';
        this.onTouched();
        this.onChange(id);
    }

    save() {
        this.popover.hide();
        let checkeds = this.data.filter((value: any) => value.__checked__);
        this.value = checkeds.length > 0 ? checkeds[0] : {};
        this.updateNgModel();
        this.onSelectEvent.emit(this.value);
    }

    cancel() {
        this.popover.hide();
        this.refreshUI();
        this.updateNgModel();
    }

    remove() {
        this.value = {};
        this.enabled = false;
        this.clear();
        this.updateNgModel();
        this.onRemove();
    }

    onSelect(item: any) {
        if (item.__checked__) {
            this.data.forEach((item: any) => {
                item.__checked__ = false;
            });
            item.__checked__ = true;
        }
    }

    writeValue(obj: string): void {
        this.data.forEach((item: any) => {
            if (item.id == obj) {
                this.value = item;
            }
        });
        this.refreshUI();
    }

    refreshUI() {
        this.data.forEach((item: any) => item.__checked__ = false);
        this.data.forEach((item: any) => {
            if (this.value && this.value.id == item.id) {
                item.__checked__ = true;
            }
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}