import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWSelect} from "../utils/select.modal";
import {GWControl} from "../utils/gw-control";
import {PopoverDirective} from "ngx-bootstrap";

export const GW_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWMultiSelectComponent),
    multi: true
};

@Component({
    selector: 'gw-multi-select',
    styleUrls: ['./multi-select.component.css'],
    templateUrl: './multi-select.component.html',
    providers: [GW_SELECT_VALUE_ACCESSOR]
})
export class GWMultiSelectComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(PopoverDirective) popover: PopoverDirective;

    @Output('onSelect') onSelectEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

    _filter: string;

    data: GWSelect[];
    values: any[] = [];
    onChange: any;
    onTouched: any;
    selectLabel: string;

    get labels(): string {
        return this.values.map((value) => value.text).join(',');
    }

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
        this.onTouched();
        this.onChange(this.values);
    }

    save() {
        this.popover.hide();
        this.values = this.data.filter((value: any) => value.__checked__);
        if (this.showSelect) {
            let data = this.selectData.filter((item: any) => item.id == this.selectValue);
            if (data.length > 0) {
                this.selectLabel = data[0].text;
            }
        }
        this.updateNgModel();
        this.onSelectEvent.emit(this.values);
    }

    cancel() {
        this.popover.hide();
        this.refreshUI();
        this.updateNgModel();
    }

    remove() {
        this.values = [];
        this.enabled = false;
        this.clear();
        this.updateNgModel();
        this.onRemove();
    }

    writeValue(obj: any): void {
        this.values = obj || [];
        if (this.showSelect) {
            let data = this.selectData.filter((item: any) => item.id == this.selectValue);
            if (data.length > 0) {
                this.selectLabel = data[0].text;
            }
        }
        this.refreshUI();
    }

    refreshUI() {
        this.data.forEach((item: any) => item.__checked__ = false);
        this.values.forEach((select: GWSelect) => {
            this.data.forEach((item: any) => {
                if (select.id == item.id) {
                    item.__checked__ = true;
                    select.text = item.text;
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