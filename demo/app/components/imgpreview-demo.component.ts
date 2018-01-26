import {Component} from "@angular/core";

let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/machinelabs-production.appspot.com/o/exe' +
    'cutions%2F1506415557004-HkTTQ5Dob%2Foutputs%2Fgenerated__at_iteration_7.png?alt=media&token=e1fa2dc3-df0d-4b9c-9c82-526eb28628f7';

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