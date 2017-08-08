
### Example

```xml
<gw-toolbar>
     <gw-datepicker #gwcontrol  label="日期" options="{singleDatePicker:false}" [(ngModel)]="dateModel" >
    </gw-datepicker>
</gw-toolbar>

import {DatepickerConfig} from  "XXX/datepicker/config.server";
export class AppModule {
  constructor(private config: DatepickerConfig) {
    Object.assign(this.config,{
      jqueryPath: '/assets/jquery.min.js',
      momentPath: '/assets/datepicker/moment.min.js',
      datepickerPath: '/assets/datepicker/daterangepicker.js'
    })
  }
}
```

### @Input


|	method				  |	 param 		      | 	            	desc 					|
|-------------------------|-------------------|-------------------------------------------------|
|	label                 |    string         |      显示的标签                                |
|	ngModel               |    string         |      双向绑定值                                |
|	btnSize               |    string         |      按钮大小，可取值有：'btn-lg' 'btn-sm' 'btn-xs' 'btn-flat' 'disabled' 'default'                                |
|	closeable             |    boolean        |      是否可以关闭                                |
|	enabled               |    boolean        |      默认是否显示                                |


### options配置项
[参考地址](http://www.daterangepicker.com)
#### 附加配置 （动态加载依赖第三方插件jquery,moment,datepicker）
    jqueryPath?:string = '';
    momentPath?:string = '';
    datepickerPath?:string = '';

注意事项： 1 模板配置权限高于config配置
          2 config配置不能改变引用地址 
    
 





