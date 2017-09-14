var BasePopover = (function () {
    function BasePopover() {
        this.hidden = true;
    }
    BasePopover.prototype.show = function () {
        this.hidden = false;
    };
    BasePopover.prototype.hide = function () {
        this.hidden = true;
    };
    BasePopover.prototype.toggle = function () {
        this.hidden = !this.hidden;
    };
    return BasePopover;
}());
export { BasePopover };
//# sourceMappingURL=popover.class.js.map