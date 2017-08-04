import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'gw-input',
    styleUrls: ['./input.component.css'],
    templateUrl: './input.component.html'
})
export class GWInputComponent implements OnInit {

    @Input() label: string;
    @Input() value: string;

    @Input() showSelect: boolean = true;
    @Input() selectData: any[] = [{label: '等于', value: 'eq'}];
    @Input() selectValue: string;

    @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();

    _tmp_value: string;

    ngOnInit(): void {
        if (!this.selectValue && this.selectData && this.selectData.length > 0) {
            this.selectValue = this.selectData[0].value
        }
    }

    clear() {
        this._tmp_value = null;
    }

    save() {
        this.value = this._tmp_value;
    }

    cancel() {
        this._tmp_value = this.value;
    }

    remove() {
        this.clear();
        this.selectValue = null;
        this.onRemove.emit();
    }

    getSelectValue() {
        return this.selectValue;
    }
}