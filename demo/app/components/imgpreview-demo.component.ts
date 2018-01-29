import {Component} from "@angular/core";

let imgUrl = 'https://t12.baidu.com/it/u=221595116,50634168&fm=173&s=B1A9DB1544C457511EBF7C6E03008068&w=500&h=333&img.JPEG';

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