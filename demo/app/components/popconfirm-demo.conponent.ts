import {Component} from "@angular/core";

@Component({
    selector: 'popconfirm-demo',
    template: `
        <div class="container" style="margin-top:200px;">
            <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'<span style=color:red;>您确定要删除吗?</span>'"
                            [placement]="'top-left'">
                        top-left
                    </button>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'top'">
                        top
                    </button>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'top-right'">
                        top-right
                    </button>
                </div>
                <div class="col-md-2">

                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'left-top'">
                        left-top
                    </button>
                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'right-top'">
                        right-top
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'left'">
                        left
                    </button>
                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'right'">
                        right
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'left-bottom'">
                        left-bottom
                    </button>
                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">

                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'right-bottom'">
                        right-bottom
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'bottom-left'">
                        bottom-left
                    </button>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'bottom'">
                        bottom
                    </button>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-xs" gw-popconfirm
                            [title]="'您确定要删除吗?'"
                            [placement]="'bottom-right'">
                        bottom-right
                    </button>
                </div>
                <div class="col-md-2">

                </div>
            </div>
        </div>
    `
})
export class PopconfirmDemoComponent {

}