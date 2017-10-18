### demo


```xml
<div gw-contextmenu
     [menus]="menus"
     [filters]="filters"
     [class]="'customClass'">
</div>
```


```javascript
export class ContextMenuDemoComponent {

    menus = [{text: 'Come On', show: true}, {text: 'Go', show: true}, {text: 'Back', show: true}];

    filters(event: MouseEvent): boolean {
        let nodeName = (<any>event.target).nodeName;
        if (nodeName == 'INPUT') {
            event.stopPropagation();
            return false;
        } else {
            event.preventDefault();
            event.stopPropagation();
            return true;
        }
    }
}
```

### API

|	输入/输出				  |	    类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	menus    		 	  |  ContextMenu[]    |		无   		   |	菜单数据					   |
|	customClass		      |     string  	  |		无     	       |	自定义class				|
|	filters 		      | (event)=>boolean  |		无        	   |	过滤是否要显示右键菜单				|

### ContextMenu

|	字段				      |	    类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	text    		 	  |     string        |		无   		   |	菜单名字     			   |
|	iconCls		          |     string  	  |		无     	       |	菜单icon  				|
|	separator		      |     boolean  	  |		false     	   |	分割线     				|
|	show		          |boolean \| ()=>boolean |		true   	   |	是否显示    				|
|	onclick		          |     function  	  |		无        	   |	点击事件    				|
|	submenus		      |     ContextMenu[] |		无        	   |	子菜单     				|
