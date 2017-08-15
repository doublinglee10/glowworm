import {Component} from "@angular/core";
import {InputModal, MultiSelectModal, SelectModal} from "../../src/utils/select.modal";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    dateModel: any;

    inputModel: string = 'app';
    inputSelectModel: InputModal = {
        value: 'app ...',
        selectValue: '0'
    };

    selectData = [
        {label: '012', id: 0},
        {label: '1', id: 1},
        {label: '2', id: 2},
        {label: '3', id: 3},
        {label: '445', id: 4},
        {label: '5', id: 5},
        {label: '6', id: 6},
        {label: '7', id: 7},
        {label: '8', id: 8}
    ];

    selectModel: any;

    selectXModel: SelectModal = {
        value: '1',
        selectValue: '1'
    };

    multiSelectModel: any = [{id: '0'}];

    multiXSelectModel: MultiSelectModal = {
        value: [{id: '0'}],
        selectValue: '1'
    };

    log() {
        console.log(this.dateModel);
    }
}
