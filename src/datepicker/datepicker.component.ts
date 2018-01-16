import {Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {DatepickerConfig} from "./config.server";
import {ScriptLoaderService, ScriptModel} from "../core/script-loader.service";
import {Observable} from "rxjs/Observable";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";

declare let moment: any, $: any, daterangepicker: any;

export const GW_DATE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWDatepickerComponent),
    multi: true
};

@Component({
    selector: 'gw-datepicker',
    template: `
        <button type="button" class="btn btn-default {{btnSize}}" [hidden]="!enabled">
            <span #dateHost>
                <span class="author">{{label}}</span>
                <span style="color:#797979">{{_value}}</span>
                <span class="arrow"><span class="caret"></span></span>
            </span>
            <ng-container *ngIf="closeable">
                <span class="glyphicon glyphicon-remove" (click)="remove();"></span>
            </ng-container>
        </button>
    `,
    styleUrls: ['./datepicker.component.css'],
    providers: [GW_DATE_VALUE_ACCESSOR]
})
export class GWDatepickerComponent extends GWControl implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    options: DatepickerConfig | string = {};

    @Input()
    label: string;

    @ViewChild('dateHost')
    dateHost: ElementRef;

    _value: string;
    onChange: any;
    onTouched: any;

    constructor(private config: DatepickerConfig, private input: ElementRef, private loader: ScriptLoaderService) {
        super();
    }


    remove() {
        this._value = null;
        this.enabled = false;
        this.onRemove();
    }

    ngOnInit() {
        this.datepickerPreInit();
    }

    //检查依赖插件  若不存在异步加载
    datepickerPreInit() {
        if (typeof moment === 'undefined' || typeof $ === 'undefined' || typeof daterangepicker === 'undefined') {
            let {jqueryPath, momentPath, datepickerPath} = this.config;
            if (jqueryPath || momentPath || datepickerPath) {

                if (typeof $ !== 'undefined') {
                    this.loader.scripts.push({src: jqueryPath, loaded: true});
                }
                if (typeof moment !== 'undefined') {
                    this.loader.scripts.push({src: momentPath, loaded: true});
                }
                if (typeof daterangepicker !== 'undefined') {
                    this.loader.scripts.push({src: datepickerPath, loaded: true});
                }

                let jq$: Observable<ScriptModel> = this.loader.load({
                    src: jqueryPath
                })

                let moment$: Observable<ScriptModel> = this.loader.load({
                    src: momentPath
                })

                let daterangepicker$: Observable<ScriptModel> = this.loader.load({
                    src: datepickerPath
                })

                jq$.subscribe(res1 => {
                    moment$.subscribe(res2 => {
                        daterangepicker$.subscribe(res3 => {
                            this.datepickerInit();
                        })
                    })
                })


            } else {
                console.warn('datepicker 4.x is missing (moment||jquery||daterangepicker)');
            }
        } else {
            this.datepickerInit();
        }
    }

    datepickerInit() {
        this.options = (typeof  this.options === 'string' ? eval('(' + this.options + ')') : this.options);
        let unDeepCopy =  this.config.unDeepCopy||this.options['unDeepCopy'];
        let options = $.extend(!unDeepCopy, {}, this.config,this.options );

        options.singleDatePicker && (options.ranges = undefined);
        this.config = options;
        const ele: any = $(this.dateHost.nativeElement);
        ele.daterangepicker(options);

        ele.on('cancel.daterangepicker', (ev, picker) => {
            this.value = null;
        });

        ele.on('apply.daterangepicker', (ev, picker) => {
            this.value = {
                start: picker.startDate.format(this.config.locale.format),
                end: picker.endDate.format(this.config.locale.format),
                range: picker.chosenLabel
            }
        })
    }

    set value(value: { start: string, end: string, range: string }) {

        if (value && !!value.range && this.config.ranges[value.range]) {
            this._value = value.range;
            [value.start, value.end] = this.config.ranges[value.range];
        } else if (value && this.config.singleDatePicker) {
            this._value = value.start;
        } else if (value && value.start && value.end) {
            this._value = value.start + ' - ' + value.end;
        } else {
            this._value = null;
        }

        this.onTouched && this.onTouched();
        this.onChange && this.onChange(value);

        //回显面板
        let ele = $(this.dateHost.nativeElement);
        if (ele.data('daterangepicker') && value) {
            let {start = '', end = ''} = value;
            if (ele.data('daterangepicker') && start) {
                ele.data('daterangepicker').setStartDate(start);
                !end && (end = start);
            }
            if (ele.data('daterangepicker') && end) {
                ele.data('daterangepicker').setEndDate(end);
            }
        }
    }

    writeValue(obj: { start: string, end: string, range: string }): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    destroyPicker() {
        try {
            (<any>$(this.dateHost.nativeElement)).data('daterangepicker').remove();
        } catch (e) {
            console.log(e.message);
        }
    }

    ngOnDestroy() {
        this.destroyPicker();
    }
}
