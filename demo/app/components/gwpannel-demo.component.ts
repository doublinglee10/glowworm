import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gwpanel-demo',
    template: `
        <gw-panel [title]="'this is a title'" [content]="'this is a content'"
                  [lazy]="true"
                  [closable]="true"
                  [onClosing]="onClosing"
                  [gwClass]="'box-warning'">
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
    `
})
export class GwPanelDemoComponent {

    onClosing(): Observable<boolean> {
        const confirm = window.confirm('Do you really want to remove this tag?');
        return Observable.of(confirm);
    }
}