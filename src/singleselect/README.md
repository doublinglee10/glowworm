
### Example

```xml
<gw-toolbar>
    <gw-single-select #gwcontrol
                      [label]="'配置singleSelect'"
                      [data]="[{id: '0', text: '测试一'}, {id: '1', text: '测试二'}]"
                      [(ngModel)]="selectModel"
                      [btnSize]="'btn-sm'"
                      [closeable]="false"
                      [enabled]="true"
                      [showSelect]="true"
                      [selectData]="[{id: '0', text: 'woman'}, {id: '1', text: 'man'}]"
                      (onSave)="onSelect($event)"
    >
    </gw-single-select>
</gw-toolbar>
```

### @Input


|	method				  |	   param          | 	            	desc 					|
|-------------------------|-------------------|-------------------------------------------------|
|	label                 |    string         |      显示的标签                                |
|	data                  |    any[]          |      下拉选择的数据源                           |
|	ngModel               |string \| SelectModal|      双向绑定值                                |
|	btnSize               |    string         |      按钮大小，可取值有：'btn-lg' 'btn-sm' 'btn-xs' 'btn-flat' 'disabled' 'default'                                |
|	closeable             |    boolean        |      是否可以关闭                                |
|	enabled               |    boolean        |      默认是否显示                                |
|	showSelect            |    boolean        |      是否显示辅助的下拉选择                                |
|	selectData            |    any[]          |      辅助的下拉选择数据，每条数据必须包含id,label属性.                         |


### @Output




|	event				  |	   param          | 	            	desc 					|
|-------------------------|-------------------|-------------------------------------------------|
|	onSave                |    id             |      当用户点击save按钮时触发                      |
|	onDataselect          |                   |      on select change event                     |

