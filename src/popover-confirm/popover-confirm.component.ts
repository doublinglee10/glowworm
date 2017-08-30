import {Component} from "@angular/core";

@Component({
    selector: 'gw-popover-confirm',
    template: `
        <gw-popover-container>
            <div>您确定要删除吗?</div>
            <hr>
            <button>OK</button>
            <button>Cancel</button>
        </gw-popover-container>
    `
})
export class GWPopoverConfirmComponent{

}