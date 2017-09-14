import { Pipe } from "@angular/core";
var LinkAgeFilter = (function () {
    function LinkAgeFilter() {
    }
    LinkAgeFilter.prototype.transform = function (data, name) {
        return !name ? data : data.filter(function (item) {
            return item.id.startsWith(name + '-');
        });
    };
    return LinkAgeFilter;
}());
export { LinkAgeFilter };
LinkAgeFilter.decorators = [
    { type: Pipe, args: [{
                name: 'gwlinkAgeFilter',
                pure: false
            },] },
];
LinkAgeFilter.ctorParameters = function () { return []; };
//# sourceMappingURL=linkAge.filter.js.map