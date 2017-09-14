import { EventManager } from "@angular/platform-browser";
import { NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
export declare class WindowResizeService {
    private eventManager;
    private ngZone;
    readonly onResize$: Observable<Window>;
    private resizeSubject;
    constructor(eventManager: EventManager, ngZone: NgZone);
    private onResize(event);
}
