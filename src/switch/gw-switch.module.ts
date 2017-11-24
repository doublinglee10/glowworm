import {NgModule} from '@angular/core'
import {CommonModule} from "@angular/common"

import {GwSwitchComponent} from './gw-switch.component'

@NgModule({
    exports:[GwSwitchComponent],
    declarations:[GwSwitchComponent],
    imports:[CommonModule]
})

export class GwSwitchModule{

}