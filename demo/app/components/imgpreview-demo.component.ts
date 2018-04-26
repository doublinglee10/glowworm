import {Component} from "@angular/core";

let imgUrl = '//bbsimg.gamebean.com/bbsimg/slideshow/3dtankezhengbafuli.jpg';
let imgUrl2 = 'assets/test.png';

@Component({
    selector: 'gwimgpreview-demo',
    template: `
        <div>
            <img gw-imgpreview
                 #imgpreview="gw-imgpreview"
                 style="max-width:500px;max-height:300px;"
                 [(isOpen)]="isOpen"
                 [attr.src]="imageUrl"
                 [lgSrc]="imageUrl"
            >
            <img gw-imgpreview
                 #imgpreview="gw-imgpreview"
                 style="max-width:500px;max-height:300px;"
                 [attr.src]="imageUrl2"
                 [lgSrc]="imageUrl2"
            >
        </div>
        <div>
            {{isOpen}}
            <button class="btn btn-default" (click)="openImg()">Open</button>
            <button class="btn btn-default" (click)="imgpreview.open()">Open</button>
        </div>
    `
})
export class ImgPreviewDemoComponent {

    isOpen = false;
    imageUrl = imgUrl;
    imageUrl2 = imgUrl2;

    openImg() {
        this.isOpen = true;
    }

}