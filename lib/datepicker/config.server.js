import { Injectable } from '@angular/core';
var DatepickerConfig = (function () {
    function DatepickerConfig() {
        this.singleDatePicker = false;
        this.timePicker = true;
        this.timePickerIncrement = 5;
        this.showDropdowns = true;
        this.timePicker24Hour = true;
        this.autoUpdateInput = false;
        this.showCustomRangeLabel = false;
        this.alwaysShowCalendars = true;
        this.opens = "right";
        this.showYear = true;
        this.locale = {
            format: 'YYYY-MM-DD HH:mm:ss',
            applyLabel: '确定',
            customRangeLabel: "自定义",
            cancelLabel: '清空',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        };
    }
    return DatepickerConfig;
}());
export { DatepickerConfig };
DatepickerConfig.decorators = [
    { type: Injectable },
];
DatepickerConfig.ctorParameters = function () { return []; };
//# sourceMappingURL=config.server.js.map