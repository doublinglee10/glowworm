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
    value: string;
    onChange: any;
    onTouched: any;

    @Input('data') set _data(data: any[]) {
        this.data = data;
        this.refreshUI();
    }

    clear() {
        this.data.forEach((item: any) => {
            item.__checked__ = false;
        });
    }

    updateNgModel() {
        this.onTouched();
        this.onChange(this.value);
    }

    save() {
        this.popover.hide();
        let checkeds = this.data.filter((value: any) => value.__checked__);
        this.value = checkeds.length > 0 ? checkeds[0].id : '';
        this.updateNgModel();
        this.onSelectEvent.emit(this.value);
    }

    cancel() {
        this.popover.hide();
        this.refreshUI();
        this.updateNgModel();
    }

    remove() {
        this.value = '';
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

    writeValue(obj: any): void {
        this.value = obj;
        this.refreshUI();
    }

    refreshUI() {
        this.data.forEach((item: any) => item.__checked__ = false);
        this.data.forEach((item: any) => {
            if (this.value == item.id) {
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