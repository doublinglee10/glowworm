import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'popselect-demo',
    template: `
        <div style="padding:100px;background-color:pink;">
            <div>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [zIndex]="zIndex"
                        [placement]="placement">
                    {{popselect || '请选择'}}
                </button>

                <button class="btn btn-default btn-xs" (click)="changeModel()">change modle</button>
                <button class="btn btn-default btn-xs" (click)="changeData(15)">change data</button>
                <button class="btn btn-default btn-xs" (click)="changePlacement()">change placement</button>
                <button class="btn btn-default btn-xs" (click)="changeFilterKeys()">change filterKeys</button>
                <button class="btn btn-default btn-xs" (click)="changeZIndex()">change zIndex</button>
                <button class="btn btn-default btn-xs" (click)="changeShowFilter()">change showFilter</button>
            </div>
        </div>
    `
})
export class PopselectDemoComponent implements OnInit {

    placement: string = 'top';

    filterKeys: string[] = ['text'];

    popselect: any;

    data: any[];

    zIndex: number = 10000;

    showFilter: boolean = true;

    ngOnInit() {
        this.changeData(10);
    }

    changeModel() {
        this.popselect = 9;
    }

    changeData(count: number) {
        let _data = [];
        for (let i = 0; i < count; i++) {
            _data.push({
                id: i,
                text: `<span style="color:red;">text</span>` + i
            })
        }

        this.data = _data;
    }

    changePlacement() {
        this.placement = 'bottom';
    }

    changeFilterKeys() {
        this.filterKeys = ['id'];
    }

    changeZIndex() {
        this.zIndex = 200000;
    }

    changeShowFilter() {
        this.showFilter = false;
    }
}