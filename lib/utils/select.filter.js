import { Pipe } from "@angular/core";
var GWSelectFilter = (function () {
    function GWSelectFilter() {
    }
    GWSelectFilter.prototype.transform = function (data, name) {
        return !name ? data : data.filter(function (item) { return item.text.includes(name); });
    };
    return GWSelectFilter;
}());
export { GWSelectFilter };
GWSelectFilter.decorators = [
    { type: Pipe, args: [{
                name: 'gwSelectFilter',
                pure: false
            },] },
];
GWSelectFilter.ctorParameters = function () { return []; };
//# sourceMappingURL=select.filter.js.map