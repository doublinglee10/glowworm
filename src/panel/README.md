## Panel

#### Demo
```xml
import {Component} from "@angular/core";

@Component({
    selector: 'gwconfirm-demo',
    template: `
        <gw-panel [title]="'title'" [content]="'component'">
        </gw-panel>

        <gw-panel [title]="'title'" [content]="component" [lazy]="true">
        </gw-panel>

        <gw-panel [title]="'title'" [content]="component" [lazy]="true">
            <ng-template #title>
                Panel 标题
            </ng-template>
            <ng-template #content>
                Panel 内容
            </ng-template>
            <ng-template #footer>
                Panel Footer
            </ng-template>
        </gw-panel>
    `
})
export class GwPanelDemoComponent {

    component = GwDemoComponent;

}
```




#### Panel

|	属性名				  |	 属性值类型 		  | 	   默认值 	   |		描述 					|
|-------------------------|-------------------|--------------------|-----------------------------|
|	title     		 	  |     string   	  |		''			   |	panel标签头					   |
|	content		    	  | string \| template \| component | ''   |	panel标签体		      	  |
|	lazy	     		  |     boolean   	  |		false	   	   |	是否延迟初始化				 |
|	closable    		  |     boolean   	  |		false   	   |	tab页是否可以关闭,默认不可以关闭			 |
|	#title      		  |     ng-template	  |		           	   |	标题标识		 |
|	#content       		  |     ng-template	  |		           	   |	内容标识			 |
|	#footer     		  |     ng-template	  |		           	   |	底部标识			 |
