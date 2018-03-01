import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    Type,
    ViewEncapsulation
} from "@angular/core";
import {typeofTemplateInput} from "../utils/template-input";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";

@Component({
    selector: 'gw-panel',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/glowworm.css'],
    template: `
        {{collapsed}}
        <div class="box {{collapsed ? 'collapsed-box' : ''}}" [ngClass]="gwClass" *ngIf="display">
            <div class="box-header with-border" *ngIf="title">
                <ng-template #panel_header>
                    <h3 class="box-title">{{title}}</h3>
                </ng-template>
                <ng-container *ngIf="_typeofContent(title) === 'string'">
                    <ng-template [ngTemplateOutlet]="panel_header"></ng-template>
                    <div class="box-tools pull-right">
                        <ng-container *ngIf="extra">
                            <ng-template [ngTemplateOutlet]="extra"></ng-template>
                        </ng-container>
                        <button *ngIf="toggle" class="btn btn-box-tool" (click)="togglePanel()">
                            <i class="fa" [ngClass]="{'fa-minus': !collapsed, 'fa-plus': collapsed}"></i>
                        </button>
                        <button *ngIf="closable" class="btn btn-box-tool" (click)="closePanel()">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </ng-container>
                <ng-container *ngIf="_typeofContent(title) === 'template'">
                    <ng-template [ngTemplateOutlet]="title"></ng-template>
                    <div class="box-tools pull-right">
                        <ng-container *ngIf="extra">
                            <ng-template [ngTemplateOutlet]="extra"></ng-template>
                        </ng-container>
                        <button *ngIf="toggle" class="btn btn-box-tool" (click)="togglePanel()">
                            <i class="fa" [ngClass]="{'fa-minus': !collapsed, 'fa-plus': collapsed}"></i>
                        </button>
                        <button *ngIf="closable" class="btn btn-box-tool" (click)="closePanel()">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </ng-container>
            </div>
            <div class="box-body" *ngIf="!lazy || !isFirst">
                <ng-container *ngIf="_typeofContent(content) === 'string'">
                    {{content}}
                </ng-container>
                <ng-container *ngIf="_typeofContent(content) === 'template'">
                    <ng-template [ngTemplateOutlet]="content"></ng-template>
                </ng-container>
                <ng-container *ngIf="_typeofContent(content) === 'component'">
                    <ng-container *ngComponentOutlet="content"></ng-container>
                </ng-container>
                <ng-container *ngIf="_typeofContent(content) === 'undefined'">
                    <ng-content></ng-content>
                </ng-container>
            </div>
            <div class="box-footer" *ngIf="footer">
                <ng-container *ngIf="_typeofContent(footer) === 'string'">
                    {{footer}}
                </ng-container>
                <ng-container *ngIf="_typeofContent(footer) === 'template'">
                    <ng-template [ngTemplateOutlet]="footer"></ng-template>
                </ng-container>
                <ng-container *ngIf="_typeofContent(footer) === 'component'">
                    <ng-container *ngComponentOutlet="footer"></ng-container>
                </ng-container>
            </div>
        </div>
    `
})
export class GwPanelComponent implements OnInit {

    @Input() gwClass: string = 'box-primary';
    @Input() title: string | TemplateRef<any>;
    @Input() content: string | TemplateRef<any> | Type<any>;
    @Input() footer: string | TemplateRef<any> | Type<any>;
    @Input() toggle: boolean = true;
    @Input() closable: boolean;
    @Input() extra: TemplateRef<any>;

    /** @Input()  是否折叠*/
    collapsed: boolean;
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter();

    /** @Input() */
    lazy: boolean;

    isFirst: boolean = true;
    display: boolean = true;

    @ContentChild('title') _title: TemplateRef<any>;
    @ContentChild('content') _content: TemplateRef<any>;
    @ContentChild('footer') _footer: TemplateRef<any>;
    @ContentChild('extra') _extra: TemplateRef<any>;

    /**
     * 关闭前触发的事件
     */
    @Input() onClosing: () => Observable<boolean>;
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.title = this.title || this._title;
        this.content = this.content || this._content;
        this.footer = this.footer || this._footer;
        this.extra = this.extra || this._extra;
    }

    @Input('collapsed') set _collapsed(collapsed: boolean) {
        this.collapsed = collapsed;
        this.isFirst = false;
    }

    @Input('lazy') set _lazy(lazy: boolean) {
        this.lazy = lazy;
        if (lazy) {
            if (!this.collapsed) {
                this.collapsed = true;
                setTimeout(() => {
                    this.collapsedChange.emit(this.collapsed);
                });
            }
        }
    }

    togglePanel() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
        this.isFirst = false;
    }

    closePanel() {
        const subscribeFn = (closed: boolean) => {
            if (closed) {
                this.display = false;
                this.onClose.emit();
            }
        };

        this.onClosing ? this.onClosing().pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    /**
     * @inner
     */
    _typeofContent(content: string): string {
        return typeofTemplateInput(content);
    }

}