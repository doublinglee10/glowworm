export interface locale {
    format?: string;
    applyLabel?: string;
    customRangeLabel?: string;
    cancelLabel?: string;
    daysOfWeek?: Array<string>;
    monthNames?: Array<string>;
    firstDay?: number;
}
export declare class DatepickerConfig {
    jqueryPath?: string;
    momentPath?: string;
    datepickerPath?: string;
    singleDatePicker?: boolean;
    timePicker?: boolean;
    timePickerIncrement?: number;
    showDropdowns?: boolean;
    timePickerSeconds?: boolean;
    timePicker24Hour?: boolean;
    autoUpdateInput?: boolean;
    showCustomRangeLabel?: boolean;
    alwaysShowCalendars?: boolean;
    opens?: string;
    showYear?: boolean;
    locale?: locale;
    ranges?: Object;
    startDate?: string;
    endDate?: string;
    constructor();
}
