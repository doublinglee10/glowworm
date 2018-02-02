import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gwselect-demo',
    template: `
        <h1>gw-select</h1>
        <p>
            <gw-toolbar>
                <gw-select #gwcontrol
                           [label]="'单选'"
                           [closeable]="true"
                           [multiple]="false"
                           [disabled]="disabled"

                           [showSelect]="true"
                           [(selectModel)]="selectModel"
                           [selectData]="options"
                           (onSelectChange)="log('select', $event)"

                           [(ngModel)]="ngModel"
                           [data]="options"
                           (onSave)="log('save', $event)"
                           (onCancel)="log('cancel', $event)"
                >
                </gw-select>
            </gw-toolbar>

            <button class="btn btn-sm" (click)="disabled = !disabled">toggle disabled</button>
        </p>
        <p>
            <gw-select
                    [label]="'单选'"
                    [closeable]="true"
                    [multiple]="false"

                    [showSelect]="true"
                    [(selectModel)]="selectModel"
                    [selectData]="options"
                    (onSelectChange)="log('select', $event)"

                    [(ngModel)]="ngModel"
                    [data]="options"
                    (onSave)="log('save', $event)"
                    (onCancel)="log('cancel', $event)"
            >
            </gw-select>

            {{selectModel | json}}
            {{ngModel | json}}
        </p>

        <p>
            <gw-select
                    [label]="'<span style=color:red;>多选</span>'"
                    [closeable]="true"
                    [multiple]="true"
                    [clearSave]="true"

                    [showSelect]="true"
                    [(selectModel)]="selectModel2"
                    [selectData]="options2"
                    (onSelectChange)="log('select2', $event)"

                    [onBeforeSave]="onBeforeSave"
                    [(ngModel)]="ngModel2"
                    [data]="options2"
                    (onSave)="log('save2', $event)"
                    (onCancel)="log('cancel2', $event)"
            >
            </gw-select>

            {{selectModel2 | json}}
            {{ngModel2 | json}}
        </p>

        <div class="row">
            <div class="col-md-4"><input type="text" class="form-control"/></div>
            <div class="col-md-4"><input type="text" class="form-control"/></div>
            <div class="col-md-4">
                <gw-select #select
                           [label]="'<span style=color:red;>多选</span>'"
                           [closeable]="false"
                           [multiple]="true"
                           [clearSave]="true"
                           [gwClass]="'form-control form-control-glowworm'"

                           [showSelect]="true"
                           [(selectModel)]="selectModel2"
                           [selectData]="options2"
                           (onSelectChange)="log('select2', $event)"

                           [(ngModel)]="ngModel2"
                           [data]="options2"
                           (onSave)="log('save2', $event)"
                           (onCancel)="log('cancel2', $event)">
                    <ng-template #extra>
                        <a class="btn btn-xs" (click)="selectAll();select.hide();">全选</a>
                        <a class="btn btn-xs" (click)="checkAll();select.hide();">全部</a>
                    </ng-template>
                </gw-select>
            </div>
        </div>
        <p>
            {{msg}}
        </p>
    `
})
export class GwSelectDemoComponent implements OnInit {

    disabled = false;
    ngModel: any;
    selectModel: any = 'idfa';
    options = [];

    ngModel2: any;
    selectModel2: any = 'idfa';
    options2 = [];

    msg: any;

    ngOnInit() {
        let mac = {text: `<span style="color:red;">MAC</span>`, id: 'mac'};
        let idfa = {text: 'IDFA', id: 'idfa', disabled: true};
        let udid = {text: 'UDID', id: 'udid'};
        let ip = {text: 'IP', id: 'ip'};
        let idfv = {text: 'IDFV', id: 'idfv'};
        let dUniqueID = {text: 'palmDeviceId', id: 'dUniqueID'};

        this.options = [mac, idfa, idfv, udid, ip, dUniqueID];
        this.options2 = [mac, idfa, idfv, udid, ip, dUniqueID];
    }

    onBeforeSave(): Observable<boolean> {
        console.log(arguments);
        const confirm = window.confirm('Save ?');
        return Observable.of(confirm);
    }

    selectAll() {
        this.ngModel2 = [...this.options2];
        this.options2 = this.options2.map(item => {
            return {
                ...item,
                disabled: false
            }
        });
    }

    checkAll() {
        this.ngModel2 = [...this.options2];
        this.options2 = this.options2.map(item => {
            return {
                ...item,
                disabled: true
            }
        });
    }

    log(event_type, event) {
        this.msg = `触发事件: ${event_type} ${event}`;
        console.warn(arguments);
    }
}