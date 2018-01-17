import {TemplateRef} from "@angular/core";

export function typeofTemplateInput(content: any): string {
    if (typeof content === 'undefined')
        return 'undefined';
    if (typeof content === 'string')
        return 'string';
    if (content instanceof TemplateRef)
        return 'template';
    return 'component';
}