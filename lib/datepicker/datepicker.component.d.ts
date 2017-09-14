import { ElementRef, OnInit } from '@angular/core';
import { DatepickerConfig } from "./config.server";
import { ScriptLoaderService } from "../utils/script-loader.service";
import { ControlValueAccessor } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
export declare const GW_DATE_VALUE_ACCESSOR: any;
export declare class GWDatepickerComponent extends GWControl implements OnInit, ControlValueAccessor {
    private config;
    private input;
    private loader;
    options: DatepickerConfig | string;
    label: string;
    _value: string;
    onChange: any;
    onTouched: any;
    constructor(config: DatepickerConfig, input: ElementRef, loader: ScriptLoaderService);
    remove(): void;
    ngOnInit(): void;
    datepickerPreInit(): void;
    datepickerInit(): void;
    value: {
        start: string;
        end: string;
        range: string;
    };
    writeValue(obj: {
        start: string;
        end: string;
        range: string;
    }): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
