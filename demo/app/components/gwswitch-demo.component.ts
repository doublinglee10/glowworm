import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gwswitch-demo',
    template: `
        <div>
            <h2>basic switch</h2>
            <gw-switch [(ngModel)]="basicSwitch" 
                       [hostStyle]="{display: 'block'}"
                        [checkValue]="'1'" 
                        [unCheckValue]="'2'" 
                        [onBeforeChange]="onBeforeChange">
                <span checked>开</span>
                <span unchecked>关</span>
            </gw-switch>
            {{basicSwitch}}
        </div>
        <div>
            <h2>basic switch include text</h2>
            <p>You can use text or icon in switch</p>
            <gw-switch [(ngModel)]="basicTextSwitch1">
                <span checked>on</span>
                <span unchecked>off</span>
            </gw-switch>
            <gw-switch [(ngModel)]="basicTextSwitch2" [hostClass]="'block'">
                <span class="glyphicon glyphicon-ok" checked></span>
                <span class="glyphicon glyphicon-remove" unchecked></span>
            </gw-switch>
            <gw-switch [(ngModel)]="basicTextSwitch2">
                <span checked>开</span>
                <span unchecked>关</span>
            </gw-switch>
        </div>
        <div>
            <h2>switch disabled</h2>
            <p>you can set switch is disabled</p>
            <gw-switch [(ngModel)]="basicDisabledSwitch" [disabled]="switchDisabled">
                <span checked>on</span>
                <span unchecked>off</span>
            </gw-switch>
            <br>
            <button class="btn  btn-primary btn-sm" (click)="toggleSwitchDisabled()">toggle disabled</button>
        </div>
        <div>
            <h2>siwtch size</h2>
            <p>we have tow switch size 'xs' 'sm' 'default' and 'large' </p>
            <div class="row">
                <div class="col-sm-1">
                    <gw-switch [size]="'xs'">
                        <span checked>on</span>
                        <span unchecked>off</span>
                    </gw-switch>
                </div>
                <div class="col-sm-1">
                    <gw-switch [size]="'sm'">
                        <span checked>on</span>
                        <span unchecked>off</span>
                    </gw-switch>
                </div>
                <div class="col-sm-1">
                    <gw-switch [size]="'md'">
                        <span checked>on</span>
                        <span unchecked>off</span>
                    </gw-switch>
                </div>
                <div class="col-sm-1">
                    <gw-switch [size]="'lg'">
                        <span checked>on</span>
                        <span unchecked>off</span>
                    </gw-switch>
                </div>
            </div>
            <div class="row text-center">
                <h4 class="col-sm-1">xs</h4>
                <h4 class="col-sm-1">sm</h4>
                <h4 class="col-sm-1">Default</h4>
                <h4 class="col-sm-1">lg</h4>
            </div>
        </div>
        <div>
            <h2>switch color</h2>
            <p>we have four switch color similar bootstrap button color</p>
            <button (click)="changeSwitchType('primary')" class="btn btn-primary">primary</button>
            <button (click)="changeSwitchType('danger')" class="btn btn-danger">danger</button>
            <button (click)="changeSwitchType('info')" class="btn btn-info">info</button>
            <button (click)="changeSwitchType('warning')" class="btn btn-warning">warning</button>
            <br>
            <br>
            <gw-switch [type]="switchType" [checkValue]="2" [unCheckValue]="3" [(ngModel)]="basicTypeSwitch">
                <span checked>on</span>
                <span unchecked>off</span>
            </gw-switch>
            <br>
            <br>
            <gw-switch [type]="switchType" [size]="'lg'" [(ngModel)]="basicTypeSwitch1">
                <span checked>on</span>
                <span unchecked>off</span>
            </gw-switch>
        </div>
    `,
    styles: []
})

export class GwSwitchDemoComponent {
    basicSwitch = '1';
    basicTextSwitch1 = false;
    basicTextSwitch2 = true;
    basicDisabledSwitch = true;
    switchDisabled = true;

    switchType: string;
    basicTypeSwitch = false;
    basicTypeSwitch1 = false;

    toggleSwitchDisabled() {
        this.switchDisabled = !this.switchDisabled
    }

    changeSwitchType(type: string): void {
        this.switchType = type;
    }

    constructor() {

    }

    onBeforeChange(): Observable<boolean> {
        console.log(arguments);
        const confirm = window.confirm('Save ?');
        return Observable.of(confirm);
    }
}