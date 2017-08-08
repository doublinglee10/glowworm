import {Component, ElementRef, forwardRef, Input, OnInit} from "@angular/core";
import {DatepickerConfig} from "./config.server";
import {ScriptLoaderService, ScriptModel} from "../utils/script-loader.service";
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
    <button type="button" class="btn btn-default btn-xs" [hidden]="!enabled">
      <span id="dateHost">
        <span class="author">{{label}}</span>
        <span class="value">{{_value}}</span>
        <span class="arrow"><span class="caret"></span></span>
      </span>
      <span class="glyphicon glyphicon-remove" (click)="remove()"></span>
    </button>
  `,
  styles: ['[hidden] { display: none !important;}'],
  providers: [GW_DATE_VALUE_ACCESSOR]
})
export class GWDatepickerComponent extends GWControl implements OnInit, ControlValueAccessor {
  @Input()
  options: DatepickerConfig | string;

  @Input()
  JsPath: any;
  @Input()
  label: string;


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
      if (this.JsPath && this.JsPath.split(',').length >= 2) {
        const _path: string[] = this.JsPath.split(',');


        let jq$: Observable<ScriptModel> = this.loader.load({
          src: _path[0]
        })

        let moment$: Observable<ScriptModel> = this.loader.load({
          src: _path[1]
        })

        let daterangepicker$: Observable<ScriptModel> = this.loader.load({
          src: _path[2]
        })

        jq$.subscribe(res1 => {
          moment$.subscribe(res2 => {
            daterangepicker$.subscribe(res3 => {
              this.datepickerInit(config);
            })
          })
        })


      } else {
        console.warn('datepicker 4.x is missing (moment,jquery)');
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
