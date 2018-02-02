import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gwinput-demo',
    template: `
        <h1>gw-input</h1>

        <p>
            <gw-toolbar>
                <gw-input #gwcontrol
                          [label]="'设备信息'"
                          [btnSize]="'btn-xs'"
                          [enabled]="true"
                          [disabled]="disabled"
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

            <button (click)="disabled = !disabled">toggle disabled</button>

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

                      [clearSave]="true"
                      [onBeforeSave]="onBeforeSave"
                      (onSave)="log('onSave', $event)"
                      (onCancel)="log('onCancel', $event)"

                      name="deviceinfo">
            </gw-input>
            {{selectModel}}
            {{value}}
        </p>
        <div class="row">
            <div class="col-md-4"><input type="text" class="form-control"/></div>
            <div class="col-md-4"><input type="text" class="form-control"/></div>
            <div class="col-md-4">
                <gw-input #gwcontrol
                          [label]="'设备信息'"
                          [gwClass]="'form-control'"
                          [btnSize]="'btn-xs'"
                          [enabled]="true"
                          [closeable]="true"

                          [showSelect]="false"
                          [selectData]="selectData"
                          [(selectModel)]="selectModel"
                          (onSelectChange)="log('onSelectChange', $event)"

                          [(ngModel)]="value"
                          [clearSave]="true"
                          (onSave)="log('onSave', $event)"
                          (onCancel)="log('onCancel', $event)"

                          name="deviceinfo">
                </gw-input>
            </div>
        </div>
        {{selectModel}}
        {{value}}
    `
})
export class GwInputDemoComponent implements OnInit {

    selectModel: string = 'mac';

    disabled: boolean = false;
    selectData = [];
    value: string = 'val';

    ngOnInit() {
        let mac = {text: 'MAC', id: 'mac'};
        let idfa = {text: 'IDFA', id: 'idfa'};
        let udid = {text: 'UDID', id: 'udid'};
        let ip = {text: 'IP', id: 'ip'};

        this.selectData = [mac, idfa, ip];
    }

    onBeforeSave(): Observable<boolean> {
        console.log(arguments);
        const confirm = window.confirm('Save ?');
        return Observable.of(confirm);
    }

    log(args1, args2) {
        console.warn(arguments);
    }
}