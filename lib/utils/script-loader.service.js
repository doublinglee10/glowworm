import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
var ScriptLoaderService = (function () {
    function ScriptLoaderService() {
        this.scripts = [];
    }
    ScriptLoaderService.prototype.load = function (script) {
        var _this = this;
        return new Observable(function (observer) {
            var existingScript = _this.scripts.find(function (s) { return s.src == script.src; });
            if (existingScript && existingScript.loaded) {
                observer.next(existingScript);
                observer.complete();
            }
            else {
                _this.scripts = _this.scripts.concat([script]);
                var scriptElement = document.createElement("script");
                scriptElement.type = "text/javascript";
                scriptElement.src = script.src;
                scriptElement.onload = function () {
                    script.loaded = true;
                    observer.next(script);
                    observer.complete();
                };
                scriptElement.onerror = function (error) {
                    observer.error("Couldn't load script " + script.src);
                };
                document.getElementsByTagName('body')[0].appendChild(scriptElement);
            }
        });
    };
    return ScriptLoaderService;
}());
export { ScriptLoaderService };
ScriptLoaderService.decorators = [
    { type: Injectable },
];
ScriptLoaderService.ctorParameters = function () { return []; };
//# sourceMappingURL=script-loader.service.js.map