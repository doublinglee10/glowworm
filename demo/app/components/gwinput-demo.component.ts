import {SelectModal} from "../../../src/utils/select.modal";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'gwinput-demo',
    template: `
        <gw-input #gwcontrol
                  [label]="'设备信息'"
                  [(ngModel)]="value"
                  [closeable]="true"
                  [showSelect]="true"
                  [selectData]="options"
                  name="deviceinfo">
        </gw-input>

        <button (click)="setValue()">setValue</button>
        <button (click)="getValue()">getValue</button>
    `
})
export class GwInputDemoComponent implements OnInit {

    options = [];
    value: SelectModal = {value: '', selectValue: ''};

    ngOnInit() {
        let mac = {text: 'MAC', id: 'mac'};
        let idfa = {text: 'IDFA', id: 'idfa'};
        let udid = {text: 'UDID', id: 'udid'};
        let ip = {text: 'IP', id: 'ip'};
        let idfv = {text: 'IDFV', id: 'idfv'};
        let dUniqueID = {text: 'palmDeviceId', id: 'dUniqueID'};

        this.options = [mac, idfa, idfv, udid, ip, dUniqueID];
    }

    setValue() {
        this.value = {
            value: 'xxxxxxxxxxxxxxx', selectValue: 'mac'
        };
        console.log(this.value);
    }

    getValue() {
        console.log(this.value);
    }
}