import { EventManager } from "@angular/platform-browser";
import { Injectable, NgZone } from "@angular/core";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
var WindowResizeService = (function () {
    function WindowResizeService(eventManager, ngZone) {
        var _this = this;
        this.eventManager = eventManager;
        this.ngZone = ngZone;
        this.resizeSubject = new Subject();
        this.ngZone.runOutsideAngular(function () {
            _this.eventManager.addGlobalEventListener('window', 'resize', _this.onResize.bind(_this));
        });
    }
    Object.defineProperty(WindowResizeService.prototype, "onResize$", {
        get: function () {
            return this.resizeSubject.asObservable().debounceTime(10);
        },
        enumerable: true,
        configurable: true
    });
    WindowResizeService.prototype.onResize = function (event) {
        this.resizeSubject.next(event.target);
    };
    return WindowResizeService;
}());
export { WindowResizeService };
WindowResizeService.decorators = [
    { type: Injectable },
];
WindowResizeService.ctorParameters = function () { return [
    { type: EventManager, },
    { type: NgZone, },
]; };
//# sourceMappingURL=window-resize.service.js.map