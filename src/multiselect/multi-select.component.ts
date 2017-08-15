import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWSelect, MultiSelectModal} from "../utils/select.modal";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";

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

    @Output('onSelect') onSelectEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    _filter: string;

    data: GWSelect[];
    values: any[] | MultiSelectModal;

    _select_modal: string;
    _select_value: GWSelect;
    _multi_select_value: any[] | GWSelect[];

    onChange: any;
    onTouched: any;

    get labels(): string {
        if (this.values) {
            if (this.showSelect) {
                return ((<MultiSelectModal>this.values).value as any[]).map((item: any) => item.text).join(',');
            } else {
                return (this.values as any[]).map((item: any) => item.text).join(',');
            }
        }
        return '';
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
        if (this.showSelect) {
            this.values = {
                value: [...this._multi_select_value],
                selectValue: this._select_modal
            }
        } else {
            this.values = [...this._multi_select_value];
        }
        this.onTouched();
        this.onChange(this.values);
    }

    save() {
        this._multi_select_value = this.data.filter((value: any) => value.__checked__);
        if (this.showSelect) {
            let select_data = this.selectData.filter((item: any) => item.id == this._select_modal);
            this._select_value = select_data.length > 0 ? select_data[0] : {};
        }
        this.updateNgModel();
        this.onSelectEvent.emit(this.values);
    }

    cancel() {
        this.refreshUI();
        this.updateNgModel();
    }

    remove() {
        this._select_value = {};
        this._select_modal = '';
        this._multi_select_value = [];
        this.enabled = false;
        this.updateNgModel();
        this.refreshUI();
        this.onRemove();
        this.onSelectEvent.emit(this.values);
    }

    writeValue(val: any[] | MultiSelectModal): void {
        if (val) {
            if (this.showSelect) {
                if (this.selectData) {
                    let select_data = this.selectData.filter((item: any) => item.id == (<MultiSelectModal>val).selectValue);
                    this._select_value = select_data.length > 0 ? select_data[0] : {};
                }

                if (this.data) {
                    let array = [];
                    let values: GWSelect[] = (<MultiSelectModal>val).value;
                    values.forEach((select: any | GWSelect) => {
                        this.data.forEach((item: any) => {
                            if (select.id == item.id) {
                                array.push(item);
                            }
                        });
                    });
                    this._multi_select_value = array;
                }
            } else {
                if (this.data) {
                    let array = [];
                    let values: GWSelect[] = val as GWSelect[];
                    values.forEach((select: any | GWSelect) => {
                        this.data.forEach((item: any) => {
                            if (select.id == item.id) {
                                array.push(item);
                            }
                        });
                    });
                    this._multi_select_value = array;
                }
            }
        } else {
            this._multi_select_value = [];
        }

        this.refreshUI();
    }

    refreshUI() {
        if (this.data && this._multi_select_value) {
            this.data.forEach((item: any) => item.__checked__ = false);
            (<any[]>this._multi_select_value).forEach((select: any | GWSelect) => {
                this.data.forEach((item: any) => {
                    if (select.id == item.id) {
                        item.__checked__ = true;
                    }
                });
            });

            if (this.showSelect && this.values) {
                this._select_modal = (<MultiSelectModal>this.values).selectValue;
            }
        }

    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}