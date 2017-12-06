import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'gwinput-demo',
    template: `
        <p>
            <gw-toolbar>
                <gw-input #gwcontrol
                          [label]="'设备信息'"
                          [btnSize]="'btn-xs'"
                          [enabled]="true"
                          [closeable]="true"
                          [placeholder]="'设备信息'"

                          [showSelect]="true"
                          [selectData]="selectData"
                          [(selectModel)]="selectModel"
                          (onSelectChange)="log('onSelectChange', $event)"

                          [(ngModel)]="value"
                          (onSave)="log('onSave', $event)"
                          (onCancel)="log('onCancel', $event)"

                          name="deviceinfo">
                </gw-input>
            </gw-toolbar>
            {{selectModel}}
            {{value}}
        </p>
        <p>
            <gw-input #gwcontrol
                      [label]="'设备信息'"
                      [btnSize]="'btn-xs'"
                      [enabled]="true"
                      [closeable]="true"
                      [placeholder]="'设备信息'"

                      [showSelect]="true"
                      [selectData]="selectData"
                      [(selectModel)]="selectModel"
                      (onSelectChange)="log('onSelectChange', $event)"

                      [(ngModel)]="value"
                      (onSave)="log('onSave', $event)"
                      (onCancel)="log('onCancel', $event)"

                      name="deviceinfo">
            </gw-input>
            {{selectModel}}
            {{value}}
        </p>
        <p>
            <gw-input #gwcontrol
                      [label]="'设备信息'"
                      [btnSize]="'btn-xs'"
                      [enabled]="true"
                      [closeable]="true"

                      [showSelect]="false"
                      [selectData]="selectData"
                      [(selectModel)]="selectModel"
                      (onSelectChange)="log('onSelectChange', $event)"

                      [(ngModel)]="value"
                      (onSave)="log('onSave', $event)"
                      (onCancel)="log('onCancel', $event)"

                      name="deviceinfo">
            </gw-input>
            {{selectModel}}
            {{value}}
        </p>
    `
})
export class GwInputDemoComponent implements OnInit {

    selectModel: string = 'mac';

    selectData = [];
    value: string = 'val';

    ngOnInit() {
        let mac = {text: 'MAC', id: 'mac'};
        let idfa = {text: 'IDFA', id: 'idfa'};
        let udid = {text: 'UDID', id: 'udid'};
        let ip = {text: 'IP', id: 'ip'};

        this.selectData = [mac, idfa, ip];
    }

    log() {
        console.warn(arguments);
    }
}