import { NgModule } from "@angular/core";
import { GWSelectFilter } from "../utils/select.filter";
import { LinkAgeFilter } from "./linkAge.filter";
var GWUtilModule = (function () {
    function GWUtilModule() {
    }
    return GWUtilModule;
}());
export { GWUtilModule };
GWUtilModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWSelectFilter,
                    LinkAgeFilter
                ],
                imports: [],
                exports: [
                    GWSelectFilter,
                    LinkAgeFilter
                ]
            },] },
];
GWUtilModule.ctorParameters = function () { return []; };
//# sourceMappingURL=util.module.js.map