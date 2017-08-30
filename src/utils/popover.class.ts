export abstract class BasePopover {

    hidden: boolean = true;

    show() {
        this.hidden = false;
    }

    hide() {
        this.hidden = true;
    }

    toggle() {
        this.hidden = !this.hidden;
    }
}