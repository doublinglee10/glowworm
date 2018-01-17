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
                    [placement]="'top-left'">
                top-left
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'top-right'">
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
                    [placement]="'bottom-left'">
                bottom-left
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'bottom-right'">
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
                    [placement]="'left-top'">
                left-top
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'left-bottom'">
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
                    [placement]="'right-top'">
                right-top
            </button>
            <button class="btn btn-primary btn-xs" gw-popinput
                    [title]="'请输入用户名'"
                    [(ngModel)]="val"
                    [placement]="'right-bottom'">
                right-bottom
            </button>
        </div>
    `
})
export class PopinputDemoComponent {

    val: any = 'angular';

}