import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";
import {PopinputDemoComponent} from "./components/popinput-demo.conponent";

const routes: Routes = [
    // {
    //     path: 'dynamic-table',
    //     component: DynamicTableComponent
    // },
    {
        path: 'popinput',
        component: PopinputDemoComponent
    },
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
