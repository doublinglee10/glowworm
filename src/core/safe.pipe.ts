import {Pipe} from "@angular/core";
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from "@angular/platform-browser";

@Pipe({
    name: 'safe'
})
export class SafePipe {

    constructor(protected _sanitizer: DomSanitizer) {

    }

    transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'style':
                return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'html':
            default:
                return this._sanitizer.bypassSecurityTrustHtml(value);
        }
    }

}