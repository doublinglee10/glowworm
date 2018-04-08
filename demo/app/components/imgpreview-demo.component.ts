import {Component} from "@angular/core";

let imgUrl = '//bbsimg.gamebean.com/bbsimg/slideshow/3dtankezhengbafuli.jpg';

@Component({
    selector: 'gwimgpreview-demo',
    template: `
        <div>
            <img gw-imgpreview
                 #imgpreview="gw-imgpreview"
                 style="width:500px;"
                 [(isOpen)]="isOpen"
                 [attr.src]="imageUrl"
                 [lgSrc]="imageUrl">
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

    openImg() {
        this.isOpen = true;
    }

}