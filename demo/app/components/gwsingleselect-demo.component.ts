import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'gwsingleselect-demo',
    template: `

        <h1>gw-single-select</h1>

        <p>
            <gw-toolbar>
                <gw-single-select #gwcontrol
                                  [label]="'单选'"
                                  [closeable]="true"

                                  [showSelect]="true"
                                  [(selectModel)]="selectModel"
                                  [selectData]="options"
                                  (onSelectChange)="log('select', $event)"

                                  [(ngModel)]="ngModel"
                                  [data]="options"
                                  (onSave)="log('save', $event)"
                                  (onCancel)="log('cancel', $event)"
                >
                </gw-single-select>
            </gw-toolbar>
        </p>
        <p>
            <gw-single-select
                    [label]="'单选'"
                    [closeable]="true"
                    [clearSave]="true"

                    [showSelect]="true"
                    [(selectModel)]="selectModel"
                    [selectData]="options"
                    (onSelectChange)="log('select', $event)"

                    [(ngModel)]="ngModel"
                    [data]="options"
                    (onSave)="log('save', $event)"
                    (onCancel)="log('cancel', $event)"
            >
            </gw-single-select>

            {{selectModel | json}}
            {{ngModel | json}}
        </p>


        <p>
            {{msg}}
        </p>
    `
})
export class GwSingleSelectDemoComponent implements OnInit {

    ngModel: any;
    selectModel: any = 'idfa';
    options = [];

    msg: any;

    ngOnInit() {
        let mac = {text: 'MAC', id: 'mac'};
        let idfa = {text: 'IDFA', id: 'idfa'};
        let udid = {text: 'UDID', id: 'udid'};
        let ip = {text: 'IP', id: 'ip'};
        let idfv = {text: 'IDFV', id: 'idfv'};
        let dUniqueID = {text: 'palmDeviceId', id: 'dUniqueID'};

        this.options = [mac, idfa, idfv, udid, ip, dUniqueID];
    }


    log(event_type, event) {
        this.msg = `触发事件: ${event_type} ${event}`;
        console.warn(arguments);
    }
}