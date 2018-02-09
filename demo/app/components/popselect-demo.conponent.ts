import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'popselect-demo',
    template: `
        <div style="padding:100px;background-color:pink;">
            <div>
                <button class="btn btn-default btn-xs" (click)="changeModel()">change modle</button>
                <button class="btn btn-default btn-xs" (click)="changeData(8)">change data</button>
                <button class="btn btn-default btn-xs" (click)="changeFilterKeys()">change filterKeys</button>
                <button class="btn btn-default btn-xs" (click)="changeShowFilter()">change showFilter</button>
            </div>
            <div>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'top'">
                    top
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'topLeft'">
                    top-left
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'topRight'">
                    top-right
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'bottom'">
                    bottom
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'bottomLeft'">
                    bottom-left
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'bottomRight'">
                    bottom-right
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'left'">
                    left
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'leftTop'">
                    left-top
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'leftBottom'">
                    left-bottom
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'right'">
                    right
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'rightTop'">
                    right-top
                </button>
                <button class="btn btn-primary btn-xs" gw-popselect
                        [(ngModel)]="popselect"
                        [data]="data"
                        [showFilter]="showFilter"
                        [filterKeys]="filterKeys"
                        [placement]="'rightBottom'">
                    right-bottom
                </button>
            </div>
            
            <div>
                {{popselect}}
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
        this.changeData(5);
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

    changeFilterKeys() {
        this.filterKeys = ['id'];
    }

    changeShowFilter() {
        this.showFilter = false;
    }
}