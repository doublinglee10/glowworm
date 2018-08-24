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
                <div>this is test</div>
                <gw-tabs [storeKey]="'tabsDatademo'" [sortable]="true" #tabsWrapper
                         (onSortStart)="sorting = true"
                         (onSort)="onSortEndEvent()">
                    <gw-tab *ngFor="let tabs of tabsData;let tabsIndex = index" [closable]="true"  [tabId]="tabsIndex" [content]="content" [title]="tabs.title">
                        <ng-template #content>
                            <div style="padding: 20px;"> 中间的测试文字</div>
                            <gw-tabs [storeKey]="'tabsDemo'" [sortable]="true">
                                <gw-tab *ngFor="let tab of tabs.tabs;let index = index" [closable]="true"  [tabId]="index" [content]="tabContent" [title]="tab.name">
                                    <ng-template #tabContent> 
                                        <div style="padding: 50px;">{{tab.content}}</div>
                                    </ng-template>
                                </gw-tab>
                            </gw-tabs>
                        </ng-template>

                    </gw-tab>
                </gw-tabs>
            </div>

        </div>
    `
})

export class GWTabDymaticDemoComponent implements AfterViewInit {
    tabsData: Array<any> = [];
    @ViewChild('tabsWrapper')
    tabsCom: GwTabsComponent;
    sorting: boolean = false;
    constructor() {
        this.tabsData = [
            {
                title: 'tabData1',
                tabs: [
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
            },
            {
                title: 'tabData2',
                tabs: [
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
            },
            {
                title: 'tabData3',
                tabs: [
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
            },
            {
                title: 'tabData4',
                tabs: [
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
            },

        ]
    }
    addTab() {
        let tabsLength =  this.tabsData.length
        // this.tabs.push({
        //     name: `tab${this.tabs.length}`,
        //     content: '测试11111'
        // })
        // console.log(this.tabsCom)
        // console.log(this.tabs)
        // setTimeout(() => {
        //     this.tabsCom.selectTab(tabsLength.toString())
        // })

    }
    // 排序完成的情况
    onSortEndEvent() {
        this.sorting = false;
        // let tabIds = this.tabs.tabs.filter(tab => !!tab).map(tab => tab.tabId);
        console.log(this.sorting)
    }
    tabsAdded(event) {
        console.log(event)
    }
    ngAfterViewInit() {

    }
}

