import {Component} from "@angular/core";
import {OurpalmTable} from "ngx-ourpalm-table";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'popconfirm-demo',
    template: `
        <gw-panel [title]="'gw-toolbar'">
            <div style="margin-bottom:10px;">
                <gw-toolbar #bar [showType]="'withMore'">
                    <gw-input #gwcontrol #input
                              [label]="'公司'"
                              [(ngModel)]="inputModel"
                              [closeable]="true"
                              [enabled]="true"
                              [showSelect]="false">
                    </gw-input>
                    <gw-input #gwcontrol #input
                              [label]="'公司'"
                              [(ngModel)]="inputSelectModel"
                              [closeable]="true"
                              [enabled]="true"
                              [showSelect]="true"
                              [selectData]="inputSelectData">
                    </gw-input>
                    <gw-rangeinput #gwcontrol #input
                                   [label]="'年龄'"
                                   [closeable]="true"
                                   [enabled]="true"
                                   [(minModel)]="minModel"
                                   [(maxModel)]="maxModel"
                                   [min]="18"
                                   [max]="50"
                                   [step]="2"
                                   [showSelect]="true"
                                   [(selectModel)]="rangeSelectModel"
                                   [selectData]="[{id: '0', text: '先生'}, {id: '1', text: '女士'}]"
                                   (onSelectChange)="log($event)"
                                   (onSave)="log($event)"
                                   (onCancel)="log($event)">
                    </gw-rangeinput>

                    <gw-single-select #gwcontrol
                                      [label]="'配置singleSelect'"
                                      [data]="[{id: '0', text: '测试一'}, {id: '1', text: '测试二'}]"
                                      [(ngModel)]="selectModel"
                                      [closeable]="true"
                                      [enabled]="true"
                                      [showSelect]="false"
                                      (onSave)="log($event)">
                    </gw-single-select>
                    <gw-single-select #gwcontrol
                                      [label]="'配置singleSelect--linkAge'"
                                      [selectData]="[{id: '0', text: '测试一'}, {id: '1', text: '测试二'}]"
                                      [data]="linkAgeData"
                                      [(ngModel)]="selectModel"
                                      [closeable]="true"
                                      [enabled]="true"
                                      [showSelect]="true"
                                      (onSave)="log($event)">
                    </gw-single-select>
                    <gw-single-select #gwcontrol
                                      [label]="'配置singleSelect'"
                                      [data]="selectXData"
                                      [(ngModel)]="selectXModel"
                                      [closeable]="true"
                                      [enabled]="true"
                                      [showSelect]="true"
                                      [selectData]="singleSelectData"
                                      (onSave)="log($event)">
                    </gw-single-select>

                    <gw-single-select #gwcontrol
                                      [label]="'配置singleSelect'"
                                      [data]="selectXData"
                                      [(ngModel)]="selectX2Model"
                                      [closeable]="true"
                                      [enabled]="true"
                                      [showSelect]="true"
                                      [selectData]="singleSelectData"
                                      (onSave)="log($event)">
                    </gw-single-select>

                    <gw-datepicker #gwcontrol
                                   label="日期1"
                                   [options]="{singleDatePicker:false,opens:'center',timePickerIncrement :1,locale:{ format: 'YYYY-MM-DD' }}"
                                   [(ngModel)]="dateModel1">
                    </gw-datepicker>

                    <gw-datepicker #gwcontrol
                                   label="日期2"
                                   [options]="{singleDatePicker:true,opens:'center',timePickerIncrement :1,locale:{ format: 'YYYY-MM-DD'}}"
                                   [(ngModel)]="dateModel2">
                    </gw-datepicker>
                </gw-toolbar>
                <button class="btn btn-xs btn-default pull-right" (click)='search()'><i class="fa fa-search" ></i>查询</button>
            </div>
            <div class="table-responsive">
                <ourpalm-table [table]="table">
                    <ourpalm-table-column
                            [column]="{header: 'Select', field: 'checkAll', checkbox: true}"></ourpalm-table-column>
                    <ourpalm-table-column
                            [column]="{header: 'Number', field: 'number', rownumbers: true}"></ourpalm-table-column>
                    <ourpalm-table-column [column]="{header: 'ID', field: 'ID'}">
                        <ng-template let-row="$row">
                            {{row.ID}}
                        </ng-template>
                    </ourpalm-table-column>
                    <ourpalm-table-column [column]="{header: 'Price', field: 'Price', sort: true}">
                        <ng-template let-row="$row">
                            {{row.Price}}
                        </ng-template>
                    </ourpalm-table-column>
                    <ourpalm-table-column [column]="{header: 'Cost', field: 'Cost'}">
                        <ng-template let-row="$row">
                            {{row.Cost}}
                        </ng-template>
                    </ourpalm-table-column>
                    <ourpalm-table-column [column]="{header: 'Url', field: 'Url'}">
                        <ng-template let-row="$row">
                            {{row.Url}}
                        </ng-template>
                    </ourpalm-table-column>
                    <ourpalm-table-column [column]="{header: 'Other', field: 'Other'}">
                        <ng-template let-row="$row">
                            {{row.Other}}
                        </ng-template>
                    </ourpalm-table-column>
                </ourpalm-table>
            </div>
        </gw-panel>
    `
})
export class ToolbarDemoComponent {
    title = 'app';

    inputModel: any;
    inputSelectModel: any;
    minModel: any;
    maxModel: any;
    rangeSelectModel: any;
    selectModel: any;
    selectXModel: any;
    selectX2Model: any;
    dateModel1: any;
    dateModel2: any;
    inputSelectData: any;
    linkAgeData: any;
    selectXData: any;
    singleSelectData: any;

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

    table: OurpalmTable;

    constructor(private http: HttpClient) {
        this.table = new OurpalmTable({
            loadData: (table: OurpalmTable, callback: (page: any) => {}) => {
                this.http
                    .get('http://rapapi.org/mockjsdata/3828/ngx-ourpalm-table/cardview.do')
                    .subscribe((result: any) => {
                        console.log(result);
                        callback({
                            total: result.data.length,
                            rows: result.data
                        });
                    });
            }
        });
    }
    search(){
    }
    log(xxx) {
        console.warn(arguments);
    }
}