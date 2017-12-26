import {Component} from "@angular/core";
import {ContextMenuService} from "../../../src/context-menu/context-menu.service";

@Component({
    selector: 'gwcontextmenu-demo',
    template: `
        <div style="padding:100px;background-color:deeppink;height:200px;"
             gw-contextmenu
             [menus]="menus"
             [filters]="filters">
            <input type="text" style="width:300px;margin:10px;">
        </div>
    `
})
export class ContextMenuDemoComponent {

    menus = [{text: `<span style="color:red;">Come On</span>`, show: true}, {text: 'Go', show: true}, {text: 'Back', show: true}];

    constructor(private contextMenuService: ContextMenuService) {
        console.log(this.contextMenuService);
    }

    filters(event: MouseEvent): boolean {
        let nodeName = (<any>event.target).nodeName;
        if (nodeName == 'INPUT') {
            // event.preventDefault();
            event.stopPropagation();
            return false;
        } else {
            event.preventDefault();
            event.stopPropagation();
            return true;
        }
    }
}