## Tabs

#### Demo
```xml
<gw-tabs [vertical]="'bottom'" (onAdd)="" (onClose)="" (onSelect)="" (onUnselect)="" (onBeforeSort)="" (onSort)="">
    <gw-tab [title]="'首页'" [content]="'首页内容'"></gw-tab>
    <gw-tab [title]="'第二页标题'" [closable]="true">
        <ng-template #gwTabContent>
            第二页内容
        </ng-template>
    </gw-tab>
    <gw-tab [disabled]="true">
        <ng-template #gwTabTitle>
            第三页标题
        </ng-template>
        <ng-template #gwTabContent>
            第三页内容
        </ng-template>
    </gw-tab>
    <gw-tab [title]="'四、延迟实例化组件'" [content]="component" [lazy]="true"></gw-tab>
</gw-tabs>
```

```js
@Component()
export class Demo {
    @ViewChild(GwTabsComponent) tabset: GwTabsComponent;

    ngOnInit() {
        this.tabset.addTab({});
        this.tabset.selectTab();
        ...
    }
}

```



#### gw-tabs

|	属性名				  |	 属性值类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	position        	  |     string    	  |		top 		   |	标签选项卡位置 'top' ,'bottom', 'left', 'right'			|
|	sortable        	  |     boolean    	  |		false 		   |	标签选项卡是否可以排序			|
|	storeKey        	  |     string    	  |		''     		   |	存储排序的key			|
|	storeType        	  |'local' \| 'remote'|		''     		   |	存储排序的模式 local --> localStorage  \|  remote --> 服务器存储			|


#### gw-tab

|	属性名				  |	 属性值类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	tabId	     		  |     string   	  |		插入的顺序   	   |	tab页在tabset的唯一标示			 |
|	title     		 	  |     string   	  |		''			   |	tab标签头					   |
|	content		    	  | string \| template \| component | ''   |	tab标签体		      	  |
|	lazy	     		  |     boolean   	  |		false	   	   |	是否延迟初始化				 |
|	disabled     		  |     boolean   	  |		false	   	   |	是否禁用				 |
|	closable    		  |     boolean   	  |		false   	   |	tab页是否可以关闭,默认不可以关闭			 |
|	selected    		  |     boolean   	  |		false   	   |	默认是否选中tab页			 |


#### gw-tabs事件

|	事件名				  |	 参数    		  | 	  		描述 					|
|-------------------------|-------------------|-----------------------------------------|
|	onSelect     		  |     tab对象   	  |		tab页被选中时触发					   |
|	onUnselect		      |     tab对象   	  |		tab页取消选中时触发     	  |
|	onBeforeClose	      |     tab对象   	  |		tab页关闭前触发     	  |
|	onClose 		      |     tab对象   	  |		tab页关闭后触发     	  |
|	onBeforeSort	      |     tab对象   	  |		tab页排序前触发     	  |
|	onSort  	          |     tab对象   	  |		tab页排序后触发     	  |
|	onAdd   	          |     tab对象   	  |		tab页添加后触发     	  |
|	onOrderChange         | { tabId: any }[]  |		每次tab排序发生变化时触发     	  |


#### gw-tabs方法

|	方法名				  |	 参数 		      | 	            	描述 					|
|-------------------------|-------------------|-------------------------------------------------|
|	addTab                |   tab对象          |		 添加tab页			   |
|	insertTab             |   index, tab对象   |		 插入tab页在index位置				   |
|	disabledTab           |   tabId           |		 根据tabId禁用tab页				   |
|	enabledTab            |   tabId           |		 根据tabId启用tab页				   |
|	selectTab             |   tabId           |		 根据tabId选中tab页  |
|	closeTab              |   tabId           |		 根据tabId关闭tab页				   |
|	getSelected           |                   |		 获取当前选中的tab页  |