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
                            [placement]="'topLeft'">
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
                            [placement]="'topRight'">
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
                            [placement]="'leftTop'">
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
                            [placement]="'rightTop'">
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
                            [placement]="'leftBottom'">
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
                            [placement]="'rightBottom'">
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
                            [placement]="'bottomLeft'">
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
                            (onConfirm)="yes()"
                            (onCancel)="no()"
                            [title]="'您确定要删除吗?'"
                            [placement]="'bottomRight'">
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

    yes() {
        alert('yes');
    }

    no() {
        alert('no');
    }
}