
### Example

```xml
<gw-toolbar>
    <gw-input #gwcontrol
              [label]="'公司'"
              [(ngModel)]="inputModel"
              [btnSize]="'btn-sm'"
              [closeable]="false"
              [enabled]="true"
              [showSelect]="true"
              [selectData]="[{id: '0', label: '0'}, {id: '1', label: '1'}]"
              [selectValue]="{id: '0', label: '1'}"
              >
    </gw-input>
</gw-toolbar>
```

### @Input


|	method				  |	 param 		      | 	            	desc 					|
|-------------------------|-------------------|-------------------------------------------------|
|	label                 |    string         |      显示的标签                                |
|	ngModel               |    string         |      双向绑定值                                |
|	btnSize               |    string         |      按钮大小，可取值有：'btn-lg' 'btn-sm' 'btn-xs' 'btn-flat' 'disabled' 'default'                                |
|	closeable             |    boolean        |      是否可以关闭                                |
|	enabled               |    boolean        |      默认是否显示                                |
|	showSelect            |    boolean        |      是否显示辅助的下拉选择                                |
|	selectData            |    any[]          |      辅助的下拉选择数据，每条数据必须包含id,label属性.                         |
|	selectValue           |    any            |      辅助的下拉value                                |






