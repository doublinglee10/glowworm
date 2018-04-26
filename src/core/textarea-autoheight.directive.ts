import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {fromEvent} from "rxjs/observable/fromEvent";
import {debounceTime} from "rxjs/operators";

@Directive({
    selector: 'textarea[autoHeight]'
})
export class TextareaAutoHeight implements OnInit, OnDestroy {

    @Input() maxHeight: number;

    private subscription: Subscription;

    constructor(public el: ElementRef) {
    }

    ngOnInit() {
        this.subscription = fromEvent(this.el.nativeElement, 'keyup')
            .pipe(
                debounceTime(100)
            )
            .subscribe(() => {
                this.el.nativeElement.style.height = 'auto';
                let scrollHeight = this.el.nativeElement.scrollHeight;
                let height = scrollHeight;
                if (this.maxHeight && this.maxHeight < scrollHeight) {
                    this.el.nativeElement.style.overflow = 'auto';
                    height = this.maxHeight;
                } else {
                    this.el.nativeElement.style.overflow = 'hidden';
                }
                this.el.nativeElement.style.height = `${height}px`;
            });
    }

    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }
}