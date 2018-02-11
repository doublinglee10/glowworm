import {Component, EventEmitter, ViewEncapsulation} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector: 'gw-imgpreview',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/glowworm.css'],
    animations: [
        trigger('fade', [
            state('fadeOut', style({opacity: 0})),
            state('fadeIn', style({opacity: 1})),
            transition('* => fadeIn', animate(ANIMATION_TIMINGS))
        ]),
        trigger('slideContent', [
            state('void', style({transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0})),
            state('enter', style({transform: 'none', opacity: 1})),
            state('leave', style({transform: 'translate3d(0, 25%, 0)', opacity: 0})),
            transition('* => *', animate(ANIMATION_TIMINGS)),
        ])
    ],
    template: `
        <div [@slideContent]="animationState"
             (@slideContent.start)="onAnimationStart($event)"
             (@slideContent.done)="onAnimationDone($event)">
            <img [@fade]="loading ? 'fadeOut' : 'fadeIn'"
                 (load)="onLoad($event)"
                 [style.opacity]="loading ? 0 : 1"
                 [src]="imageUrl"/>
            <div *ngIf="loading" class="loader"></div>
        </div>
    `
})
export class GwImgPreviewComponent {

    private _imageUrl: string;

    animationState: 'void' | 'enter' | 'leave' = 'enter';
    loading: boolean = false;

    animationStateChanged = new EventEmitter<AnimationEvent>();

    set imageUrl(imageUrl: string) {
        this._imageUrl = imageUrl;
        this.loading = true;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation() {
        this.animationState = 'leave';
    }

    onLoad(event: Event) {
        this.loading = false;
    }
}