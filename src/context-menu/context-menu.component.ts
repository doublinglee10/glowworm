import {Component, forwardRef, Inject, NgZone, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {ContextMenu} from "./context-menu";
import {ContextMenuService, IContextMenuClickEvent} from "./context-menu.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'contextmenu-container',
    styleUrls: ['context-menu.component.css'],
    template: `
        <ng-template #menusTpl let-menus>
            <ul class="dropdown-menu" *ngIf="_showMenus(menus)">
                <ng-container *ngFor="let menu of menus">
                    <ng-container *ngIf="menu.separator">
                        <li class="divider" [class.hidden]="!_showMenu(menu)"></li>
                    </ng-container>
                    <ng-container *ngIf="!menu.separator && !menu.submenus">
                        <li (click)="_onClickMenu(menu)" [class.hidden]="!_showMenu(menu)">
                            <a [class.disabled]="_disabledMenus(menu)">
                                <i [ngClass]="menu.iconCls || 'empty-icon'"></i>
                                <span [innerHTML]="menu.text | safeHtml"></span>
                            </a>
                        </li>
                    </ng-container>
                    <ng-container *ngIf="menu.submenus">
                        <li class="dropdown-submenu" [class.hidden]="!_showMenu(menu)">
                            <a tabindex="-1">
                                <i [ngClass]="menu.iconCls || 'empty-icon'"></i>
                                <span [innerHTML]="menu.text | safeHtml"></span>
                            </a>
                            <ng-container *ngTemplateOutlet="menusTpl;context:{$implicit: menu.submenus}">
                            </ng-container>
                        </li>
                    </ng-container>
                </ng-container>
            </ul>
        </ng-template>

        <div class="row-context-menu" *ngIf="menus" [ngStyle]="styler" [ngClass]="class">
            <ng-container *ngTemplateOutlet="menusTpl; context:{ $implicit: menus }"></ng-container>
        </div>
    `
})
export class GwContextMenuContainerComponent implements OnInit, OnDestroy {

    class: any;
    styler: any;
    hidden: boolean = true;
    menus: ContextMenu[];
    menuSubscribe: Subscription;

    constructor(private ngZone: NgZone,
                private renderer: Renderer2,
                @Inject(forwardRef(() => ContextMenuService)) private service: ContextMenuService) {
    }

    private _clickFun;
    private _menuFun;

    ngOnInit() {
        this.menuSubscribe = this.service.show.subscribe((clickEvent: IContextMenuClickEvent) => {
            this.menus = this._deepCloneMenus(clickEvent.menus);
            this.hidden = false;
            this.styler = {
                zIndex: 2000,
                display: 'block',
                position: 'absolute',
                left: `${clickEvent.event.pageX}px`,
                top: `${clickEvent.event.pageY}px`
            };
            this.class = clickEvent.class;
        });

        this.ngZone.runOutsideAngular(() => {
            this._clickFun = this.renderer.listen(document, 'click', this.clickedOutside.bind(this));
            this._menuFun = this.renderer.listen(document, 'contextmenu', this.clickedOutside.bind(this));
        });
    }

    ngOnDestroy() {
        this.menuSubscribe && this.menuSubscribe.unsubscribe();
        this._clickFun && this._clickFun();
        this._menuFun && this._menuFun();
    }

    // @HostListener('window:click', ['$event'])
    // @HostListener('window:contextmenu', ['$event'])
    clickedOutside(event: MouseEvent): void {
        if (!this.hidden) {
            this.ngZone.run(() => {
                this.hide();
            });
        }
    }

    hide() {
        this.hidden = true;
        this.styler = {
            display: 'none'
        };
    }

    _onClickMenu(menu: ContextMenu) {
        this.hide();
        if (!this._disabledMenus(menu)) {
            menu.onclick && menu.onclick();
        }
    }

    _showMenus(menus: ContextMenu[]): boolean {
        return menus && menus.filter((menu) => !menu.separator).filter(menu => this._showMenu(menu)).length > 0;
    }

    _showMenu(menu: ContextMenu): boolean {
        if (typeof menu.show == "function") {
            return menu.show();
        }
        return menu.show;
    }

    _disabledMenus(menu: ContextMenu): boolean {
        if (typeof menu.disabled == "function") {
            return menu.disabled();
        }
        return menu.disabled;
    }

    private _deepCloneMenus(menus: ContextMenu[]): ContextMenu[] {
        if (!menus) return;

        function deepCloneMenu(menu: ContextMenu): ContextMenu {
            if (menu.submenus) {
                menu.submenus = menu.submenus.map((submenu) => deepCloneMenu(submenu));
            }
            return new ContextMenu(menu);
        }

        return menus.map(menu => deepCloneMenu(menu));
    }

}