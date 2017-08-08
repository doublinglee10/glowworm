import {Component} from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    inputModel: string = 'app';

    selectData = [
        {text: '012', id: 0},
        {text: '1', id: 1},
        {text: '2', id: 2},
        {text: '3', id: 3},
        {text: '445', id: 4},
        {text: '5', id: 5},
        {text: '6', id: 6},
        {text: '7', id: 7},
        {text: '8', id: 8}
    ];
    selectModel: string = '0';
    multiSelectModel: any;

    log() {
        console.log(arguments);
    }
}
