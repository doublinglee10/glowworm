import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {GwTabsComponent} from "../../../src/tabs/tabs.component";
@Component({
    selector: 'gw-tab-dymatic-demo',
    template: `
        <div>
            <h3>测试动态tab的产生的问题提</h3>
            <div style="margin-bottom: 10px">
                <button (click)="addTab()">添加tabs</button>
            </div>
            <div>
                <gw-tabs [storeKey]="'tabsdemo'"
                         [storeType]="'local'"
                         (onAdd)="tabsAdded($event)"
                      [sortable]="true"
                         #tabsWrapper
                >
                    <gw-tab *ngFor="let tab of tabs;let index = index" [tabId]="index" [content]="tab.content" [title]="tab.name">
                    </gw-tab>
                </gw-tabs>
            </div>

        </div>
    `
})

export class GWTabDymaticDemoComponent implements AfterViewInit {
    tabs: Array<any> = [];
    @ViewChild('tabsWrapper')
    tabsCom: GwTabsComponent;
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
    addTab() {
        let tabsLength =  this.tabs.length
        this.tabs.push({
            name: `tab${this.tabs.length}`,
            content: '测试11111'
        })
        console.log(this.tabsCom)
        console.log(this.tabs)
        setTimeout(() => {
            this.tabsCom.selectTab(tabsLength.toString())
        })

    }
    tabsAdded(event) {
        console.log(event)
    }
    ngAfterViewInit() {

    }
}

