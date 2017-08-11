import {
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import {GWPopoverComponent} from "./popover.component";

@Directive({
    selector: '[gw-popover]',
    exportAs: 'gw-popover'
})
export class GWPopoverDirective implements OnInit {

    @Input() template: TemplateRef<any>;

    private popover: GWPopoverComponent;

    constructor(private el: ElementRef,
                private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        console.info(this.el.nativeElement);
        this.createComponent();
        this.initEvent();
    }

    private createComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GWPopoverComponent);
        this.viewContainerRef.clear();
        let componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.popover = (<GWPopoverComponent>componentRef.instance);
        this.popover.template = this.template;
    }

    private initEvent() {
        document.addEventListener('click', (event) => {
            if (this.el.nativeElement.contains(event.target)) {
                this.popover.hidden = !this.popover.hidden;
                if (!this.popover.hidden) {
                    this.popover.setStyle({
                        top: this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + 'px',
                        left: this.el.nativeElement.offsetLeft + 'px'
                    });
                }
            } else if (this.popover.el.nativeElement.contains(event.target)) {
                this.popover.hidden = false;
            } else {
                this.popover.hidden = true;
            }
        });
    }

    show() {
        this.popover.hidden = false;
    }

    hide() {
        this.popover.hidden = true;
    }
}