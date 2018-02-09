import {Component} from "@angular/core";

@Component({
    selector: 'popinput-demo',
    template: `
        <div style="padding:100px;background-color:pink;">
            <div style="margin:50px 0;">My Input is: <input type="text" [(ngModel)]="val"/></div>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'<span style=color:red;>请输入用户名</span>'"
                    [(ngModel)]="val"
                    [placement]="'top'">
                top
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'topLeft'">
                top-left
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'topRight'">
                top-right
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'bottom'">
                bottom
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'bottomLeft'">
                bottom-left
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'bottomRight'">
                bottom-right
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'left'">
                left
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'leftTop'">
                left-top
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'leftBottom'">
                left-bottom
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'right'">
                right
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'rightTop'">
                right-top
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'rightBottom'">
                right-bottom
            </button>
        </div>
    `
})
export class PopinputDemoComponent {

    val: any = 'angular';

}