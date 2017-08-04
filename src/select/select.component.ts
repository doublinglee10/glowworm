import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'gw-select',
    styleUrls: ['./select.component.css'],
    templateUrl: './select.component.html'
})
export class GWSelectComponent {

    @Input() label: string;
    @Input() data: any[];

    @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();

    values: any[];

    clear() {

    }

    save() {

    }

    cancel() {

    }

    remove() {
        this.clear();

        this.onRemove.emit();
    }
}