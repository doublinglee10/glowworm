import {Directive, HostListener, Input, OnDestroy, OnInit} from "@angular/core";
import {ContextMenuService} from "./context-menu.service";
import {ContextMenu} from "./context-menu";

@Directive({
    selector: '[gw-contextmenu]'
})
export class GwContextMenuDirective implements OnInit, OnDestroy {

    @Input() menus: ContextMenu[];
    @Input() customClass: any;
    @Input() filters: (event: MouseEvent) => boolean;

    constructor(private service: ContextMenuService) {
    }

    ngOnInit() {
        this.service.onMenuDirectiveInit();
    }

    ngOnDestroy() {
        this.service.onMenuDirectiveDestroy();
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: MouseEvent): void {
        if (this.filters) {
            if (this.filters(event)) {
                this.service.show.next({
                    menus: this.menus,
                    event: event,
                    class: this.customClass
                });
            }
        } else {
            this.service.show.next({
                menus: this.menus,
                event: event,
                class: this.customClass
            });
            event.preventDefault();
            event.stopPropagation();
        }
    }
}