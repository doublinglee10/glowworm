import {
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewContainerRef
} from "@angular/core";
import {GWPopoverConfirmComponent} from "./popover-confirm.component";

/**
 * @deprecated
 */
@Directive({
    selector: '[gw-popover-confirm]'
})
export class GWPopoverConfirmDirective implements OnInit, OnDestroy {

    @Input() styler: any;
    @Input() title: string;

    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    private popover: GWPopoverConfirmComponent;

    constructor(private el: ElementRef,
                private zone: NgZone,
                private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        this.createComponent();
        this.zone.runOutsideAngular(() => {
            window.document.addEventListener('click', this.onClickEvent.bind(this));
        });
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            window.document.removeEventListener('click', this.onClickEvent.bind(this));
        });
    }

    onClickEvent(event: any) {
        if (this.el.nativeElement.contains(event.target)) {
            this.reposition();
            this.zone.run(() => {
                this.popover.toggle();
            });
        } else if (this.popover.el.nativeElement.contains(event.target)) {
            // this.popover.show();
        } else if (!this.popover.hidden) {
            this.zone.run(() => {
                this.popover.hide();
            });
        }
    }

    private createComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GWPopoverConfirmComponent);
        this.viewContainerRef.clear();
        let componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.popover = (<GWPopoverConfirmComponent>componentRef.instance);
        this.popover.title = this.title;
        this.popover.styler = this.styler;
        this.popover.onCancel = this.onCancel;
        this.popover.onConfirm = this.onConfirm;
    }

    show() {
        this.reposition();
        this.popover.show();
    }

    hide() {
        this.popover.hide();
    }

    toggle() {
        this.reposition();
        this.popover.toggle();
    }

    reposition() {
        let styler = {
            top: this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + 'px',
            left: this.el.nativeElement.offsetLeft + 'px'
        };
        this.popover.styler = {...this.styler, ...styler};
    }
}