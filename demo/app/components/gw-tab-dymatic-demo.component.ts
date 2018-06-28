import {AfterViewInit, Component} from "@angular/core";
@Component({
    selector: 'gw-tab-dymatic-demo',
    template: `
        <div>
            <h3>测试动态tab的产生的问题提</h3>
            <div>
                <gw-tabs [storeKey]="'tabsdemo'"
                         [storeType]="'local'"
                      [sortable]="true"
                >
                    <gw-tab *ngFor="let tab of tabs" [content]="tab.content" [title]="tab.name">
                    </gw-tab>
                </gw-tabs>
            </div>
        </div>
    `
})

export class GWTabDymaticDemoComponent implements AfterViewInit {
    tabs: Array<any> = [];
    constructor() {
        this.tabs = [
            {
                name: 'tab1',
                content: '测试11111'
            },
            {
                name: 'tab2',
                content: '测试33333'
            },
            {
                name: 'tab3',
                content: '测试3333'
            }
        ]
    }

    ngAfterViewInit() {

    }
}

