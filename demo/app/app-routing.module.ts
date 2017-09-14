import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";

const routes: Routes = [
    // {
    //     path: 'dynamic-table',
    //     component: DynamicTableComponent
    // },
    // {
    //     path: 'static-table',
    //     component: StaticTableComponent
    // },
    {
        path: 'toolbar',
        component: ToolbarDemoComponent
    },
    {
        path: 'popconfirm',
        component: PopconfirmDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
