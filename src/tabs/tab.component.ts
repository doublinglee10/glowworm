import {Component, ContentChild, Input, OnInit, TemplateRef, Type} from "@angular/core";

export type StringLike = string | TemplateRef<any> | Type<any>;

@Component({
    selector: 'gw-tab',
    template: `<ng-content></ng-content>`
})
export class GwTabComponent implements OnInit {

    /**
     * @inner
     */
    isFirstSelected: boolean = true;

    @Input() tabId: any;
    @Input() title: StringLike;
    @Input() content: StringLike;

    @Input() lazy: boolean;
    @Input() disabled: boolean;
    @Input() closable: boolean;
    @Input() selected: boolean;

    @ContentChild('title') _title: TemplateRef<any>;
    @ContentChild('content') _content: TemplateRef<any>;

    ngOnInit() {
        this.title = this.title || this._title;
        this.content = this.content || this._content;
    }
}