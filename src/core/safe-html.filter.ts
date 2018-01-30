import {DomSanitizer} from "@angular/platform-browser";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'safeHtml',
    pure: true
})
export class SafeHtmlFilter implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(val: any): any {
        return this.sanitizer.bypassSecurityTrustHtml(val);
    }
}