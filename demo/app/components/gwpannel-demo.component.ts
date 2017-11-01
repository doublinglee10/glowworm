import {Component, ContentChild, Input, OnInit, TemplateRef, Type, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'gwpanel-demo',
    template: `
        <gw-panel [title]="'this is a title'" [content]="'this is a content'" [lazy]="true" [closable]="true"
                  [gwClass]="'box-warning'">

        </gw-panel>

        <gw-panel [lazy]="true">
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

}