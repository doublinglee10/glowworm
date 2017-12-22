import {
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import {GWPopoverComponent} from "./popover.component";

@Directive({
    selector: '[gw-popover]',
    exportAs: 'gw-popover'
})
export class GWPopoverDirective implements OnInit, OnDestroy {

    @Input() template: TemplateRef<any>;
    @Input() disabled: boolean = false;

    private popover: GWPopoverComponent;

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
            if (!this.disabled) {
                this.reposition();
                this.zone.run(() => {
                    this.popover.toggle();
                });
            }
        } else if (this.popover.el.nativeElement.contains(event.target)) {
            // this.popover.show();
        } else if (!this.popover.hidden) {
            if (!this.disabled) {
                this.zone.run(() => {
                    this.popover.hide();
                });
            }
        }
    }

    private createComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GWPopoverComponent);
        this.viewContainerRef.clear();
        let componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.popover = (<GWPopoverComponent>componentRef.instance);
        this.popover.template = this.template;
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
        this.popover.setStyle({
            top: this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + 'px',
            left: this.el.nativeElement.offsetLeft + 'px'
        });
    }
}