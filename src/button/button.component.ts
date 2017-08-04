import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'gw-button',
    styleUrls: ['./button.component.css'],
    templateUrl: './button.component.html'
})
export class GWButtonComponent {

    @Input() values: string[] = [];
    @Input() label: string;

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() onClear: EventEmitter<void> = new EventEmitter<void>();

    clear() {
        this.values = [];
        this.onClear.emit();
    }

    click() {
        this.onClick.emit();
    }

}