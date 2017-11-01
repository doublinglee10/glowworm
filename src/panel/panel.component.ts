import {Component, ContentChild, Input, OnInit, TemplateRef, Type, ViewEncapsulation} from "@angular/core";
import {typeofTemplateInput} from "../utils/template-input";

@Component({
    selector: 'gw-panel',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/glowworm.css'],
    template: `
        <div class="box {{collapsed ? 'collapsed-box' : ''}}" [ngClass]="gwClass" *ngIf="display">
            <div class="box-header with-border">
                <ng-template #panel_header>
                    <h3 class="box-title">{{title}}</h3>
                    <div class="box-tools pull-right">
                        <button *ngIf="toggle" class="btn btn-box-tool" (click)="togglePanel()">
                            <i class="fa" [ngClass]="{'fa-minus': !collapsed, 'fa-plus': collapsed}"></i>
                        </button>
                        <button *ngIf="closable" class="btn btn-box-tool" (click)="removePanel()">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </ng-template>
                <ng-container *ngIf="_typeofContent(title) === 'string'">
                    <ng-template [ngTemplateOutlet]="panel_header"></ng-template>
                </ng-container>
                <ng-container *ngIf="_typeofContent(title) === 'template'">
                    <ng-template [ngTemplateOutlet]="title"></ng-template>
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
    @Input() collapsed: boolean;

    /** @Input() */
    lazy: boolean;

    isFirst: boolean = true;
    display: boolean = true;

    @ContentChild('title') _title: TemplateRef<any>;
    @ContentChild('content') _content: TemplateRef<any>;
    @ContentChild('footer') _footer: TemplateRef<any>;

    ngOnInit() {
        this.title = this.title || this._title;
        this.content = this.content || this._content;
        this.footer = this.footer || this._footer;
    }

    @Input('lazy') set _lazy(lazy: boolean) {
        this.lazy = lazy;
        if (lazy) {
            this.collapsed = true;
        }
    }

    togglePanel() {
        this.collapsed = !this.collapsed;
        this.isFirst = false;
    }

    removePanel() {
        this.display = false;
    }

    /**
     * @inner
     */
    _typeofContent(content: string): string {
        return typeofTemplateInput(content);
    }

}