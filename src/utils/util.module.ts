import {NgModule} from "@angular/core";
import {GWSelectFilter} from "../utils/select.filter";
import {LinkAgeFilter} from "./linkAge.filter";

@NgModule({
    declarations: [
        GWSelectFilter,
        LinkAgeFilter
    ],
    imports: [],
    exports: [
        GWSelectFilter,
        LinkAgeFilter
    ]
})
export class GwUtilModule {
}
