import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";
import {PopinputDemoComponent} from "./components/popinput-demo.conponent";
import {GwInputDemoComponent} from "./components/gwinput-demo.component";
import {GwconfirmDemoComponent} from "./components/gwconfirm-demo.component";
import {PopselectDemoComponent} from "./components/popselect-demo.conponent";
import {ContextMenuDemoComponent} from "./components/contextmenu-demo.component";
import {GwTabsDemoComponent} from "./components/gwtabs-demo.component";
import {GwPanelDemoComponent} from "./components/gwpannel-demo.component";
import {GwSwitchDemoComponent} from "./components/gwswitch-demo.component";
import {GwSelectDemoComponent} from "./components/gwselect-demo.component";
import {GwSingleSelectDemoComponent} from "./components/gwsingleselect-demo.component";
import {GwInputsDemoComponent} from "./components/gwinputs-demo.component";
import {DatepickerDemoComponent} from "./components/datePicker-demo.component";
import {ImgPreviewDemoComponent} from "./components/imgpreview-demo.component";
import {PopSingleSelectDemoComponent} from "./components/popsingleselect-demo.conponent";
import {GWTabDymaticDemoComponent} from "./components/gw-tab-dymatic-demo.component";
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
    },
    {
        path: 'gwpopselect',
        component: PopselectDemoComponent
    },
    {
        path: 'gwpopsingleselect',
        component: PopSingleSelectDemoComponent
    },
    {
        path: 'gwcontextmenu',
        component: ContextMenuDemoComponent
    },
    {
        path: 'gwtabs',
        component: GwTabsDemoComponent
    },
    {
      path: 'gwtabsDymatic',
        component: GWTabDymaticDemoComponent
    },
    {
        path: 'gwpannel',
        component: GwPanelDemoComponent
    },
    {
        path: 'gwSwitch',
        component: GwSwitchDemoComponent
    },
    {
        path: 'gwselect',
        component: GwSelectDemoComponent
    },
    {
        path: 'gwsingleselect',
        component: GwSingleSelectDemoComponent
    },
    {
        path: 'gwinputs',
        component: GwInputsDemoComponent
    },
    {
        path: 'gwdatepicker',
        component: DatepickerDemoComponent
    },
    {
        path: 'gwimgpreview',
        component: ImgPreviewDemoComponent
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
