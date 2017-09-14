import {Component} from "@angular/core";

@Component({
    selector: 'popconfirm-demo',
    template: `
        <div style="padding:100px;background-color:pink;">
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'top'">
                top
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'top-left'">
                top-left
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'top-right'">
                top-right
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'bottom'">
                bottom
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'bottom-left'">
                bottom-left
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'bottom-right'">
                bottom-right
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'left'">
                left
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'left-top'">
                left-top
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'left-bottom'">
                left-bottom
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'right'">
                right
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'right-top'">
                right-top
            </button>
            <button class="btn btn-primary btn-xs" gw-popconfirm
                    [title]="'您确定要删除吗?'"
                    [placement]="'right-bottom'">
                right-bottom
            </button>
        </div>
    `
})
export class PopconfirmDemoComponent {

}