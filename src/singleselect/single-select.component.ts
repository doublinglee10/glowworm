import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWSelect, SelectModal} from "../utils/select.modal";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";

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

    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    _filter: string;

    data: GWSelect[];
    value: string | SelectModal;
    selectLabel: string;

    _select_modal: string;
    _select_value: GWSelect;
    _single_select_value: GWSelect;

    onChange: any;
    onTouched: any;

    @Input('data') set _data(data: any[]) {
        this.data = data || [];
        this.refreshUI();
    }

    clear() {
        if (this.data) {
            this.data.forEach((item: any) => {
                item.__checked__ = false;
            });
        }
    }

    updateNgModel() {
        this.onTouched();
        this.onChange(this.value);
    }

    save() {
        let single_data = this.data.filter((item: any) => item.__checked__);
        let select_data = this.selectData.filter((item: any) => item.id == this._select_modal);
        this._single_select_value = single_data.length > 0 ? single_data[0] : {};
        if (this.showSelect) {
            this._select_value = select_data.length > 0 ? select_data[0] : {};
            this.value = {
                value: this._single_select_value.id,
                selectValue: this._select_value.id
            }
        } else {
            this.value = this._single_select_value.id;
        }

        this.updateNgModel();
        this.onSave.emit(this.value);
    }

    cancel() {
        this.refreshUI();
        this.updateNgModel();
    }

    remove() {
        this._single_select_value = {};
        this._select_value = {};
        this.value = this.showSelect ? {value: '', selectValue: ''} : '';
        this.enabled = false;
        this.updateNgModel();
        this.refreshUI();
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

    writeValue(val: string | SelectModal): void {
        if (val) {
            if (this.showSelect) {
                if (this.data) {
                    this.data.forEach((item: any) => {
                        if (item.id == (<SelectModal>val).value) {
                            this._single_select_value = item;
                        }
                    });
                }

                if (this.selectData) {
                    let data = this.selectData.filter((item: any) => {
                        return item.id == (<SelectModal>val).selectValue
                    });
                    if (data.length > 0) {
                        this._select_value = data[0];
                    }
                }
            } else {
                if (this.data) {
                    this.data.forEach((item: any) => {
                        if (item.id == val) {
                            this._single_select_value = item;
                        }
                    });
                }
            }
        } else {
            this._single_select_value = null;
            this._select_value = null;
            this._select_modal = '';
        }

        this.value = val;
        this.refreshUI();
    }

    refreshUI() {
        this.data.forEach((item: any) => item.__checked__ = false);
        this.data.forEach((item: any) => {
            if (this._single_select_value && this._single_select_value.id == item.id) {
                item.__checked__ = true;
            }
        });
        if (this.showSelect && this.value) {
            this._select_modal = (<SelectModal>this.value).selectValue;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}