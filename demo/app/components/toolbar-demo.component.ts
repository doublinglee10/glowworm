import {Component, TemplateRef, ViewChild} from "@angular/core";
import {OurpalmTable} from "ngx-ourpalm-table";
import {HttpClient} from "@angular/common/http";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

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
            </div>
            <div style="margin-bottom:10px;">
                <div class="btn-group">
                    <button type="button" class="btn btn-default btn-xs">弹窗demo</button>
                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a (click)="showLgx()">大</a></li>
                        <li><a (click)="showLg()">中</a></li>
                        <li><a (click)="showSm()">小</a></li>
                        <li><a (click)="showInline()">inline</a></li>
                    </ul>
                </div>
                <button class="btn btn-xs btn-default pull-right" (click)='search()'><i class="fa fa-search"></i>查询
                </button>
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

        <ng-template #modalTpl>
            <div class="modal-header">
                <h4 class="modal-title pull-left">添加账户</h4>
                <button type="button" class="close pull-right" (click)="addModalRef.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
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

                    </gw-toolbar>
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
            </div>
        </ng-template>

        <ng-template #modalMiddleTpl>
            <div class="modal-header">
                <h4 class="modal-title pull-left">添加账户</h4>
                <button type="button" class="close pull-right" (click)="addModalRef.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>渠道</label>
                        <gw-select [label]="''"
                                   [gwClass]="'form-control form-control-glowworm'"
                                   [btnSize]="'default'"
                                   [closeable]="false"
                                   [multiple]="true"
                                   [(ngModel)]="add.selectModel"
                                   [data]="[{id:'1',text:'text1'},{id:2,text:'text2'}]">
                        </gw-select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <div class="form-group">
                            <label>更新时间</label>
                            <gw-datepicker [label]="''"
                                           [gwClass]="'form-control form-control-glowworm'"
                                           [closeable]="false"
                                           [btnSize]="'default'"
                                           [(ngModel)]="add.upgradeTime"
                                           [options]="{singleDatePicker:true}">
                            </gw-datepicker>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>账户分类</label>
                        <select class="form-control" [(ngModel)]="add.accountClassId">
                            <option value="">请选择</option>
                            <option *ngFor="let clazz of accountClasses" [value]="clazz.classId">
                                {{clazz.className}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>手机</label>
                        <input class="form-control" [(ngModel)]="add.phonenumber">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>账户分类</label>
                        <select class="form-control" [(ngModel)]="add.accountClassId">
                            <option value="">请选择</option>
                            <option *ngFor="let clazz of accountClasses" [value]="clazz.classId">
                                {{clazz.className}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>手机</label>
                        <input class="form-control" [(ngModel)]="add.phonenumber">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" (click)="addAccount()">添加</button>
            </div>
        </ng-template>

        <ng-template #modalSmTpl>
            <div class="modal-header">
                <h4 class="modal-title pull-left">添加账户</h4>
                <button type="button" class="close pull-right" (click)="addModalRef.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>渠道</label>
                            <gw-select [label]="''"
                                       [gwClass]="'form-control form-control-glowworm'"
                                       [btnSize]="'default'"
                                       [closeable]="false"
                                       [multiple]="true"
                                       [(ngModel)]="add.selectModel"
                                       [data]="[{id:'1',text:'text1'},{id:2,text:'text2'}]">
                            </gw-select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="form-group">
                                <label>更新时间</label>
                                <gw-datepicker [label]="''"
                                               [gwClass]="'form-control form-control-glowworm'"
                                               [closeable]="false"
                                               [btnSize]="'default'"
                                               [(ngModel)]="add.upgradeTime"
                                               [options]="{singleDatePicker:true}">
                                </gw-datepicker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>账户分类</label>
                            <select class="form-control" [(ngModel)]="add.accountClassId">
                                <option value="">请选择</option>
                                <option *ngFor="let clazz of accountClasses" [value]="clazz.classId">
                                    {{clazz.className}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>手机</label>
                            <input class="form-control" [(ngModel)]="add.phonenumber">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" (click)="addAccount()">添加</button>
            </div>
        </ng-template>

        <ng-template #modelInlineTpl>
            <div class="modal-header">
                <h4 class="modal-title pull-left">修改邮箱</h4>
                <button type="button" class="close pull-right" (click)="addModalRef.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <fieldset>
                        <!-- Text input-->
                        <div class="form-group">
                            <label class="col-md-2 control-label">
                                新邮箱地址
                            </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control input-sm" [disabled]="disabled">
                            </div>
                            <div class="col-md-4">
                                <button class="btn btn-default btn-sm btn-block" [disabled]="disabled">获取验证码</button>
                            </div>
                        </div>
                        <!-- Text input-->
                        <div class="form-group">
                            <label class="col-md-2 control-label">
                                验证码
                            </label>
                            <div class="col-md-10">
                                <input type="text" [disabled]="disabled" class="form-control input-sm">
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="modal-footer">
                <button [class.hidden]="!disabled" class="btn btn-primary" (click)="disabled = false">编辑</button>
                <button [class.hidden]="disabled" class="btn btn-primary">修改</button>
                <button [class.hidden]="disabled" class="btn btn-default" (click)="disabled = true">取消</button>
            </div>
        </ng-template>
    `
})
export class ToolbarDemoComponent {

    disabled = true;
    add: any = {};
    addModalRef: BsModalRef;
    @ViewChild('modalTpl') addTemplate: TemplateRef<any>;
    @ViewChild('modalSmTpl') addSmTemplate: TemplateRef<any>;
    @ViewChild('modalMiddleTpl') modalMiddleTpl: TemplateRef<any>;
    @ViewChild('modelInlineTpl') modelInlineTpl: TemplateRef<any>;

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

    constructor(private http: HttpClient,
                private modalService: BsModalService) {
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

    showInline() {
        this.disabled = true;
        this.add = {};
        this.addModalRef = this.modalService.show(this.modelInlineTpl, {backdrop: 'static'});
    }

    showSm() {
        this.disabled = true;
        this.add = {};
        this.addModalRef = this.modalService.show(this.addSmTemplate, {backdrop: 'static'});
    }

    showLg() {
        this.add = {};
        this.addModalRef = this.modalService.show(this.modalMiddleTpl, {backdrop: 'static', class: 'modal-lg'});
    }

    showLgx() {
        this.add = {};
        this.addModalRef = this.modalService.show(this.addTemplate, {backdrop: 'static', class: 'modal-lg-x'});
    }

    search() {
    }

    log(xxx) {
        console.warn(arguments);
    }
}