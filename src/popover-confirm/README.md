
### Example

```xml
<button gw-popover-confirm
                 [title]="'您确定删除吗?'"
                 (onConfirm)="onConfirm()"
                 (onCancel)="onCancel()">
    确认
</button>
```

### @Input


|	method				  |	   param          |  	desc 					|
|-------------------------|-------------------|-------------------------------------------------|
|	title                 |    string         |    显示标题                  |


### @Output




|	event				  |	   param          | 	            	desc 					|
|-------------------------|-------------------|-------------------------------------------------|
|	onConfirm                |    null        |      当用户点击确认按钮时触发                      |
|	onCancel                |    null        |      当用户点击取消按钮时触发                      |

