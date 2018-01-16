import {Component} from "@angular/core";
import {ContextMenuService} from "../../../src/context-menu/context-menu.service";

@Component({
    selector: 'gwdatePicker-demo',
    template: `  <gw-datepicker  label="最后回复时间" ></gw-datepicker> 
    `
})
export class DatepickerDemoComponent {
    myOption = {
        ranges: { //今天、昨天  本周、上周 本月、上月
            '今天2': [
                '2018-01-15', '2018-01-15'
            ]
        }
    }

    constructor(private contextMenuService: ContextMenuService) {
        console.log(this.contextMenuService);
    }


}