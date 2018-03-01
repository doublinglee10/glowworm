import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gwpanel-demo',
    template: `
        <button class="btn btn-sm btn-primary" (click)="toggleCollapsed();">toggle collapsed</button>
        <gw-panel [title]="title2" [content]="'this is a content'"
                  [(collapsed)]="collapsed"
                  [lazy]="true"
                  [closable]="true"
                  [onClosing]="onClosing"
                  [gwClass]="'box-warning'">
            <ng-template #title2>
                <span style="color:red;">this is a other title</span>
                <span style="color:blue;">{{collapsed}}</span>
            </ng-template>
            <ng-template #extra>
                <button class="btn btn-box-tool">
                    <i class="fa fa-gear"></i>
                </button>
            </ng-template>
        </gw-panel>

        <gw-panel [lazy]="false">
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

        <gw-panel [lazy]="false">
            Panel 内容
            use &lt;ng-content&gt;&lt;/ng-content&gt;
        </gw-panel>
    `
})
export class GwPanelDemoComponent {

    collapsed = false;

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

    onClosing(): Observable<boolean> {
        const confirm = window.confirm('Do you really want to remove this tag?');
        return Observable.of(confirm);
    }
}