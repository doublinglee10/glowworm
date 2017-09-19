import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";
import {PopinputDemoComponent} from "./components/popinput-demo.conponent";
import {GwInputDemoComponent} from "./components/gwinput-demo.component";
import {GwconfirmDemoComponent} from "./components/gwconfirm-demo.component";

const routes: Routes = [
    {
        path: 'popinput',
        component: PopinputDemoComponent
    },
    {
        path: 'toolbar',
        component: ToolbarDemoComponent
    },
    {
        path: 'gwpopconfirm',
        component: PopconfirmDemoComponent
    },
    {
        path: 'gwinput',
        component: GwInputDemoComponent
    },
    {
        path: 'gwconfirm',
        component: GwconfirmDemoComponent
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
