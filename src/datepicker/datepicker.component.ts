import {Component, ElementRef, EventEmitter, Input, OnInit, Output, forwardRef, ViewChild} from '@angular/core';
import {DatepickerConfig} from "./config.server";
import {ScriptLoaderService, ScriptModel} from "../utils/script-loader.service";
import {Observable} from "rxjs/Observable";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {PopoverDirective} from "ngx-bootstrap";

declare let moment: any, $: any, daterangepicker: any;

export const GW_DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GWDatepickerComponent),
  multi: true
};

@Component({
  selector: 'gw-datepicker',
  template: `
    <button type="button"  class="btn btn-default {{btnSize}}" [hidden]="!enabled">
      <span id="dateHost">
        <span class="author">{{label}}</span>
        <span class="value">{{_value}}</span>
        <span class="arrow"><span class="caret"></span></span>
      </span>
      <ng-container *ngIf="closeable">
        <span class="glyphicon glyphicon-remove" (click)="remove();"></span>
      </ng-container>
    </button>
  `,
  styles: ['[hidden] { display: none !important;}'],
  providers: [GW_DATE_VALUE_ACCESSOR]
})
export class GWDatepickerComponent extends GWControl implements OnInit, ControlValueAccessor {
  @Input()
  options: DatepickerConfig | string;


  @Input()
  label: string;
  @Output() CancelCalendarDaterangepicker = new EventEmitter();

  _value: string;
  onChange: any;
  onTouched: any;

  constructor(private config: DatepickerConfig, private input: ElementRef, private loader: ScriptLoaderService) {
    super();
  }

  ngOnInit() {
    this.datepickerPreInit(this.config);
  }

  datepickerInit(config: DatepickerConfig) {
    //this.picker.locale = $.extend({},this.picker.locale,this.options['locale']);
    let options = $.extend(true, {}, config, (typeof  this.options === 'string' ? eval('(' + this.options + ')') : this.options));

    options.singleDatePicker && (options.ranges = undefined);
    this.config = options;

    (<any>$(this.input.nativeElement).find('#dateHost')).daterangepicker(options, this.callback.bind(this));

    $(this.input.nativeElement).find('#dateHost').on('cancel.daterangepicker',(ev, picker)=>{
      this.value = null;
    })
  }

  private callback(start?: any, end?: any): void {
    start = start.format(this.config.locale.format);
    if (!this.config.singleDatePicker) {
      end = end.format(this.config.locale.format);
      this.value = `${start} - ${end}`;
    } else {
      this.value = start;
    }
  }

  //检查依赖插件  若不存在异步加载
  datepickerPreInit(config: DatepickerConfig) {
    if (typeof moment === 'undefined' || typeof $ === 'undefined' || typeof daterangepicker === 'undefined') {
      let {  jqueryPath,momentPath,datepickerPath } = config;
      if (jqueryPath||momentPath||datepickerPath) {

        if(typeof $ !== 'undefined'){
          this.loader.scripts.push({src:jqueryPath,loaded:true});
        }
        if(typeof moment !== 'undefined'){
          this.loader.scripts.push({src:momentPath,loaded:true});
        }
        if(typeof daterangepicker !== 'undefined'){
          this.loader.scripts.push({src:datepickerPath,loaded:true});
        }

        let jq$: Observable<ScriptModel> = this.loader.load({
          src: jqueryPath
        })

        let moment$: Observable<ScriptModel> = this.loader.load({
          src: momentPath
        })

        let daterangepicker$: Observable<ScriptModel> = this.loader.load({
          src:datepickerPath
        })

        jq$.subscribe(res1 => {
          moment$.subscribe(res2 => {
            daterangepicker$.subscribe(res3 => {
              this.datepickerInit(config);
            })
          })
        })


      } else {
        console.warn('datepicker 4.x is missing (moment||jquery||daterangepicker)');
      }
    } else {
      this.datepickerInit(config);
    }
  }


  remove() {
    this._value = null;
    this.enabled = false;
    this.selectValue = null;
    this.onRemove();
  }

  set value(value: string) {
    this._value = value;
    this.onTouched && this.onTouched();
    this.onChange && this.onChange(this._value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
