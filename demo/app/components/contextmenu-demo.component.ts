import {Component} from "@angular/core";

@Component({
    selector: 'gwcontextmenu-demo',
    template: `
        <div style="padding:100px;background-color:deeppink;height:200px;" gw-contextmenu [menus]="menus"></div>
    `
})
export class ContextMenuDemoComponent {
    menus = [{text: 'Come On', show: true}, {text: 'Go', show: true}, {text: 'Back', show: true}];
}