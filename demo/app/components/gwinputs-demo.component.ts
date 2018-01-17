import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gwinputs-demo',
    template: `
        <h1>gw-inputs</h1>

        <p>
            <gw-toolbar>
                <gw-inputs #gwcontrol
                           [label]="'设备信息'"
                           [btnSize]="'btn-xs'"
                           [enabled]="true"
                           [disabled]="disabled"
                           [closeable]="true"
                           [placeholder]="'设备信息'"

                           [(ngModel)]="value"
                           (onSave)="log('onSave', $event)"
                           (onCancel)="log('onCancel', $event)"

                           name="deviceinfo">
                </gw-inputs>
            </gw-toolbar>
            
            <button class="btn btn-xs" (click)="disabled = !disabled">toggle disabled</button>
            
            {{value}}
        </p>
        <p>
            <gw-inputs #gwcontrol
                       [label]="'设备信息'"
                       [btnSize]="'btn-xs'"
                       [enabled]="true"
                       [closeable]="true"
                       [placeholder]="'设备信息'"

                       [(ngModel)]="value"

                       [clearSave]="true"
                       [onBeforeSave]="onBeforeSave"
                       (onSave)="log('onSave', $event)"
                       (onCancel)="log('onCancel', $event)"

                       name="deviceinfo">
            </gw-inputs>
            {{value}}
        </p>
        <p>
            <gw-inputs #gwcontrol
                       [label]="'设备信息'"
                       [btnSize]="'btn-xs'"
                       [enabled]="true"
                       [closeable]="true"
                       [placeholder]="'... ...'"

                       [(ngModel)]="value"
                       [clearSave]="true"
                       (onSave)="log('onSave', $event)"
                       (onCancel)="log('onCancel', $event)"

                       name="deviceinfo">
            </gw-inputs>
            {{value}}
        </p>
    `
})
export class GwInputsDemoComponent implements OnInit {

    value: string[] = ['hello', 'world'];

    disabled = false;

    ngOnInit() {
    }

    onBeforeSave(): Observable<boolean> {
        console.log(arguments);
        const confirm = window.confirm('Save ?');
        return Observable.of(confirm);
    }

    log() {
        console.warn(arguments);
    }
}