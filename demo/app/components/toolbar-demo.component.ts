import {Component} from "@angular/core";
import {DatepickerConfig} from "../../../src/datepicker/config.server";
import * as moment from "moment";

@Component({
    selector: 'popconfirm-demo',
    template: `
        <h1>gw-toolbar</h1>

        <gw-toolbar #bar [showType]="'withMore'">

            <p>
                <gw-input #gwcontrol #input
                          [label]="'公司'"
                          [(ngModel)]="inputModel"
                          [closeable]="true"
                          [enabled]="true"
                          [showSelect]="false"
                >
                </gw-input>

                {{inputModel}}

                <button class="btn btn-xs" (click)="inputModel=null;">set null</button>
            </p>

            <p>
                <gw-input #gwcontrol #input
                          [label]="'公司'"
                          [(ngModel)]="inputSelectModel"
                          [closeable]="true"
                          [enabled]="true"
                          [showSelect]="true"
                          [selectData]="inputSelectData"
                >
                </gw-input>

                {{inputSelectModel | json}}

                <button class="btn btn-xs" (click)="inputSelectModel=null;">set null</button>
                <button class="btn btn-xs" (click)="changeInputSelectData()">change data</button>
                <button class="btn btn-xs" (click)="changeInputSelectValue()">change value</button>
            </p>

            <p>
                <gw-rangeinput #gwcontrol #input
                               [label]="'年龄'"
                               [closeable]="true"
                               [enabled]="true"
                               [(minModel)]="rangeStart"
                               [(maxModel)]="rangeEnd"
                               [min]="18"
                               [max]="50"
                               [step]="2"
                               [showSelect]="true"
                               [(selectModel)]="rangeSelectModel"
                               [selectData]="[{id: '0', text: '先生'}, {id: '1', text: '女士'}]"
                               (onSelectChange)="log('rangeinput', 'select change', $event)"
                               (onSave)="log('rangeinput', 'save', $event)"
                               (onCancel)="log('rangeinput', 'cancel', $event)"
                >
                </gw-rangeinput>
                {{rangeStart}}
                {{rangeEnd}}
                {{rangeSelectModel}}
            </p>

            <p>
                <gw-single-select #gwcontrol
                                  [label]="'配置singleSelect'"
                                  [data]="[{id: '0', text: '测试一'}, {id: '1', text: '测试二'}]"
                                  [(ngModel)]="selectModel"
                                  [closeable]="true"
                                  [enabled]="true"
                                  [showSelect]="false"
                                  (onSave)="log($event);"
                >
                </gw-single-select>

                {{selectModel | json}}

                <button class="btn btn-xs" (click)="selectModel=null;">set null</button>
            </p>

            <p>
                <gw-single-select #gwcontrol
                                  [label]="'配置singleSelect--linkAge'"
                                  [selectData]="[{id: '0', text: '测试一'}, {id: '1', text: '测试二'}]"
                                  [data]="linkAgeData"
                                  [(ngModel)]="selectModel"
                                  [closeable]="true"
                                  [enabled]="true"
                                  [showSelect]="true"
                                  (onSelectChange)="changeData($event)"
                                  (onSave)="log($event);"
                >
                </gw-single-select>

                {{selectModel | json}}

                <button class="btn btn-xs" (click)="selectModel=null;">set null</button>
            </p>

            <p>
                <gw-single-select #gwcontrol
                                  [label]="'配置singleSelect'"
                                  [data]="selectXData"
                                  [(ngModel)]="selectXModel"
                                  [closeable]="true"
                                  [enabled]="true"
                                  [showSelect]="true"
                                  [selectData]="singleSelectData"
                                  (onSave)="log($event)"
                >
                </gw-single-select>

                <gw-single-select #gwcontrol
                                  [label]="'配置singleSelect'"
                                  [data]="selectXData"
                                  [(ngModel)]="selectX2Model"
                                  [closeable]="true"
                                  [enabled]="true"
                                  [showSelect]="true"
                                  [selectData]="singleSelectData"
                                  (onSave)="log($event)"
                >
                </gw-single-select>


                {{selectXModel | json}}

                <button class="btn btn-xs" (click)="selectXModel=null;">set null</button>
            </p>

            <p>
                <gw-datepicker #gwcontrol
                               label="日期1"
                               options='{singleDatePicker:false,opens:"center",timePickerIncrement :1,locale:{ format: "YYYY-MM-DD"}}'
                               [(ngModel)]="dateModel1">
                </gw-datepicker>

                <gw-datepicker #gwcontrol
                               label="日期2"
                               options='{singleDatePicker:true,opens:"center",timePickerIncrement :1,locale:{ format: "YYYY-MM-DD"}}'
                               [(ngModel)]="dateModel2">
                </gw-datepicker>
            </p>


            <!-- <app-test [toolbar]="bar"></app-test>-->

        </gw-toolbar>
    `
})
export class ToolbarDemoComponent {
    title = 'app';
    dateModel1: any;
    dateModel2: any;

    inputModel: string = 'app';
    inputSelectModel = {
        value: 'app ...',
        selectValue: '0'
    };

    rangeStart: number = 20;
    rangeEnd: number = 23;
    rangeSelectModel: any;

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

    selectXModel: string;

    selectX2Model: string;

    singleSelectData = [{id: '0', text: 'woman'}, {id: '1', text: 'man'}];

    selectXData = [{id: '0', text: '测试一'}, {id: '1', text: '测试二'}];

    constructor(private config: DatepickerConfig) {
        console.log('app', new Boolean(true) === new Boolean(true));
        this.setDateConfig();
    }

    setDateConfig() {
        const format = this.config.locale.format, timePickerIncrement = this.config.timePickerIncrement;
        const today_s = moment(moment().format('YYYY-MM-DD')).format(format),
            today_e = moment(today_s).add(1, 'days').subtract(timePickerIncrement, 's').format(format),
            yesterday_s = moment(moment().format('YYYY-MM-DD')).subtract(1, 'days').format(format),
            yesterday_e = moment(yesterday_s).add(1, 'days').subtract(timePickerIncrement, 's').format(format),
            week_s = moment(today_s).subtract(moment().isoWeekday() - 1, 'days').format(format),
            week_e = moment(week_s).add(7, 'days').subtract(timePickerIncrement, 's').format(format),
            lastWeek_s = moment(week_s).subtract(7, 'days').format(format),
            lastWeek_e = moment(week_e).subtract(7, 'days').format(format),
            month_s = moment(moment().format('YYYY-MM-DD')).subtract(moment().date() - 1, 'days').format(format),
            month_e = moment(month_s).add(1, 'month').subtract(timePickerIncrement, 's').format(format),
            lastMonth_s = moment(month_s).subtract(1, 'month').format(format),
            lastMonth_e = moment(month_e).subtract(1, 'month').format(format);
        Object.assign(
            this.config,
            {
                opens: 'center',
                singleDatePicker: false,
                jqueryPath: '/assets/jquery.min.js',
                momentPath: '/assets/datepicker/moment.min.js',
                datepickerPath: '/assets/datepicker/daterangepicker.js',
                startDate: today_s,
                endDate: today_e,
                ranges: {
                    //今天、昨天  本周、上周 本月、上月
                    '今天': [
                        today_s, today_e
                    ],
                    '昨天': [
                        yesterday_s, yesterday_e
                    ],
                    '本周': [
                        week_s, week_e
                    ],
                    '上周': [
                        lastWeek_s, lastWeek_e
                    ],
                    '本月': [
                        month_s, month_e
                    ],
                    '上月': [
                        lastMonth_s, lastMonth_e
                    ]
                }
            }
        );
    }

    linkAgeData = [{id: '0-01', text: '测试一01'}, {id: '0-02', text: '测试一02'}, {id: '1-01', text: '测试二01'}, {
        id: '2-02',
        text: '测试二02'
    }];

    changeData(ev: any) {
        this.linkAgeData = this.linkAgeData.filter(item => {
            return item.id.startsWith(ev + '-');
        });
        console.log(this.linkAgeData);
    }

    inputSelectData = [{id: '0', text: 'woman'}, {id: '1', text: 'man'}];

    changeInputSelectData() {
        this.inputSelectData = [{id: '0', text: 'woman'}, {id: '1', text: 'man'}, {id: '', text: '请选择'}];
    }

    changeInputSelectValue() {
        this.inputSelectModel = {
            value: 'app ...',
            selectValue: ''
        };
    }

    log() {
        console.warn(arguments);
    }
}